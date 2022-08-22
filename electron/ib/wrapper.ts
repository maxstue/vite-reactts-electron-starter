import { EventEmitter } from "events";
import { Subscription } from "rxjs";
import {
    IBApiNext,
    LogLevel,
    Contract,
    IBApiNextError,
    OrderBookUpdate,
    OrderBookRow,
    OrderBookRows,
    SecType,
    IBApiTickType,
    TickType,
    MarketDataUpdate,
    MarketDataTick,
} from "@stoqey/ib";
import { IpcMainEvent } from "electron";

// connection settings
const reconnectInterval: number = parseInt(process.env.IB_RECONNECT_INTERVAL as string) || 5000;  // API reconnect retry interval
const host: string = process.env.IB_TWS_HOST || "localhost";                                      // TWS host name or IP address
const port: number = parseInt(process.env.IB_TWS_PORT as string) || 4001;                         // API port
const rows: number = parseInt(process.env.IB_MARKET_ROWS as string) || 7;                         // Number of rows to return
const refreshing: number = parseFloat(process.env.IB_MARKET_REFRESH as string) || 0.5;            // Threshold frequency limit for sending refreshing data to frontend in secs
const barSize: number = parseFloat(process.env.IB_BAR_SIZE as string) || 10;                      // bar/candle size in secs

export type Tape = { ingressTm: number, price?: number, size?: number };
export type Bar = { t: number, o?: number, c?: number, v: number, h?: number, l?: number };
export type SymbolInfo = {
    id: number, symbol: string, exchange: string, type: string, description: string,
    pricescale: number, ticker: string, session: string, session_holidays?: number[],
    timezone: string, has_intraday: boolean, has_seconds: boolean,
    has_no_volume: boolean, volume_precision: number, data_status: string
};

export class IbWrapper extends EventEmitter {

    /** The [[IBApiNext]] instance. */
    private api: IBApiNext;
    /** The subscription on the IBApi errors. */
    private error$: Subscription;

    // the subscription on the market depth data
    private subscription_mkd?: Subscription;
    // last time we sent market depth data to frontend
    private last_mkd_data: number;

    // the subscription on the time and sales data
    private subscription_tape?: Subscription;
    private last_tape: Tape;
    private last_bar: Bar;

    constructor() {
        super();

        this.api = new IBApiNext({ reconnectInterval, host, port });
        this.api.logLevel = LogLevel.DETAIL;
        this.error$ = this.api.errorSubject.subscribe((error) => {
            if (error.reqId === -1) {
                console.log(`${error.error.message}`);
            }
        });
        try {
            this.api.connect(Math.round(Math.random() * 16383));
        } catch (error: any) {
            console.log("Connection error", error.message);
            console.log(`IB host: ${host} - IB port: ${port}`);
        }

        this.subscription_mkd = undefined;
        this.last_mkd_data = 0;
        this.subscription_tape = undefined;
        this.last_tape = { ingressTm: 0 };
        this.last_bar = { t: 0, v: 0 };

        this.on("emitCandle", this.emitCandle);
        setTimeout(() => this.emit("emitCandle"), 10 * 1000);  // start after 10 secs
    }

    protected emitCandle(): void {
        if (this.subscription_tape) {
            console.log("emitCandle", this.last_bar);
            this.last_bar = { t: Date.now(), o: this.last_bar.c, v: 0, c: this.last_bar.c, h: this.last_bar.c, l: this.last_bar.c };
        }
        setTimeout(() => this.emit("emitCandle"), barSize * 1000);
    }

    protected processMarketData(type: TickType, tick: MarketDataTick): boolean {
        let changed: boolean = false;
        if ((type == IBApiTickType.LAST) || (type == IBApiTickType.LAST_SIZE)) {
            // console.log("processMarketData", type, IBApiTickType[type], tick);
            if (type == IBApiTickType.LAST) {
                const price: number = tick.value as number;
                // update tape
                this.last_tape = { ingressTm: tick.ingressTm, price, size: undefined };
                // update candle
                this.last_bar.c = price;
                if (!this.last_bar.o) this.last_bar.o = price;
                if (this.last_bar.h) {
                    if (price > this.last_bar.h) this.last_bar.h = price;
                } else {
                    this.last_bar.h = price;
                }
                if (this.last_bar.l) {
                    if (price < this.last_bar.l) this.last_bar.l = price;
                } else {
                    this.last_bar.l = price;
                }
            }
            if (type == IBApiTickType.LAST_SIZE) {
                // update tape
                this.last_tape.ingressTm = tick.ingressTm;
                this.last_tape.size = tick.value;
                changed = true;
                // update candle
                this.last_bar.v += tick.value as number;
            }
        }
        return changed;
    }

    public onAssetSelected(event: IpcMainEvent, symbol: string): void {
        console.log("onAssetSelected", symbol);
        let contract: Contract = { secType: SecType.STK, currency: "USD", symbol, exchange: "SMART" };
        this.api?.getContractDetails(contract).then((details) => {
            // contract resolved
            contract = details[0].contract;
            console.log("selected-asset", contract);
            // Send market depth data to frontend
            this.last_mkd_data = 0;
            this.subscription_mkd?.unsubscribe();
            this.subscription_mkd = this.api?.getMarketDepth(contract, rows, true).subscribe({
                next: (orderBookUpdate: OrderBookUpdate) => {
                    console.log("orderBookUpdate");
                    const now: number = Date.now();
                    if ((now - this.last_mkd_data) > refreshing * 1000) {  // limit to refresh rate to every x seconds
                        this.last_mkd_data = now;
                        const bids: OrderBookRows = orderBookUpdate.all.bids;
                        const asks: OrderBookRows = orderBookUpdate.all.asks;
                        const content: { i: number; bidMMID: string; bidSize: number; bidPrice: number; askPrice: number; askSize: number; askMMID: string }[] = [];
                        for (let i = 0; i < Math.max(bids.size, asks.size); i++) {
                            const bid: OrderBookRow | undefined = bids.get(i);
                            const ask: OrderBookRow | undefined = asks.get(i);
                            if (bid || ask) {
                                const bidMMID: string = bid?.marketMaker as string;
                                const bidSize: number = bid?.size as number;
                                const bidPrice: number = bid?.price as number;
                                const askPrice: number = ask?.price as number;
                                const askSize: number = ask?.size as number;
                                const askMMID: string = ask?.marketMaker as string;
                                content.push({ i, bidMMID, bidSize, bidPrice, askPrice, askSize, askMMID });
                            }
                        }
                        // console.log("content:", content);
                        event.sender.send("market-depth", {
                            symbol: contract.symbol,
                            content: content,
                        });
                    }
                },
                error: (err: IBApiNextError) => {
                    this.subscription_mkd?.unsubscribe();
                    console.log(`getMarketDepth failed with '${err.error.message}'`);
                    event.sender.send("market-depth", {
                        error: err.error.message,
                    });
                },
            });

            // Send time and price data to frontend
            this.last_tape = { ingressTm: 0 };
            this.last_bar = { t: Date.now(), v: 0 };
            this.subscription_tape?.unsubscribe();
            this.subscription_tape = this.api?.getMarketData(contract, "", false, false).subscribe({
                next: (marketData: MarketDataUpdate) => {
                    // console.log("getMarketData");
                    let changed: boolean = false;
                    marketData.added?.forEach((tick, type) => {
                        changed = this.processMarketData(type, tick) || changed;
                    });
                    marketData.changed?.forEach((tick, type) => {
                        changed = this.processMarketData(type, tick) || changed;
                    });
                    if (changed) {
                        // console.log("last_tape:", this.last_tape);
                        event.sender.send("stream", {
                            symbol: contract.symbol,
                            content: this.last_tape,
                        });
                        // console.log("incomplete bar:", this.last_bar);
                    }
                },
                error: (err: IBApiNextError) => {
                    this.subscription_tape?.unsubscribe();
                    console.log(`getMarketData failed with '${err.error.message}'`);
                    event.sender.send("stream", {
                        error: err.error.message,
                    });
                },
            });

        }).catch((err: IBApiNextError) => {
            // Can't get contract details
            // cancel all subscriptions
            this.subscription_mkd?.unsubscribe();
            this.subscription_tape?.unsubscribe();
            // send error report to frontend
            console.log(`getContractDetails failed with '${err.error.message}'`);
            event.sender.send("market-depth", {
                error: err.error.message,
            });
            event.sender.send("stream", {
                error: err.error.message,
            });
        });
    }

    public onData(event: IpcMainEvent, data: any): void {
        if (data.type == "selected-asset") {
            this.onAssetSelected(event, data.content);
        }
    }

    public async getSymbolInfo(ticker: string): Promise<SymbolInfo | undefined> {
        const [exchange, symbol] = ticker.split(":");
        const contract: Contract = { secType: SecType.STK, currency: "USD", symbol, exchange: exchange || "SMART" };
        return this.api?.getContractDetails(contract).then((details) => {
            // console.log(details);
            const liquidHours: string[] = details[0].liquidHours ? details[0].liquidHours.split(";") : [];
            // console.log(liquidHours);
            // console.log(liquidHours.filter((item) => item.endsWith(":CLOSED")));
            const next_session: string = liquidHours.filter((item) => !item.endsWith(":CLOSED")).pop() as string;
            const session: string = next_session.substring(9, 13) + next_session.substring(22);
            const session_holidays: number[] = liquidHours.filter((item) => item.endsWith(":CLOSED")).map((item) => parseInt(item.substring(0, 8)));
            const result: SymbolInfo = {
                id: details[0].contract.conId as number,
                symbol: details[0].contract.symbol as string,
                exchange: details[0].contract.exchange as string,
                type: "stock",
                description: details[0].longName as string,
                pricescale: 1 / (details[0].minTick || 0.01),
                ticker,
                session: session, session_holidays,
                timezone: details[0].timeZoneId as string,
                has_intraday: true, has_seconds: true,
                has_no_volume: false, volume_precision: -2,
                data_status: "streaming"
            };
            return result;
        }).catch((err: IBApiNextError) => {
            // Can't get contract details
            const msg = `getSymbolInfo.getContractDetails failed with '${err.error.message}'`;
            console.log(msg);
            throw Error(msg);
        });
    }

    protected stop() {
        this.api?.disconnect();
        this.error$.unsubscribe();
    }

}

// singleton instance of IbWrapper
export const ibWrapper: IbWrapper = new IbWrapper();

ibWrapper.getSymbolInfo("AAPL").then((result) => console.log(result));
