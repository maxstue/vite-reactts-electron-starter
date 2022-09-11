/**
 * Wrapper for Interactive Broker API.
 * @author Guerilla team
 */
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
    BarSizeSetting,
    Bar as IbBar,
    Order,
    OrderType,
    OrderAction,
    OpenOrdersUpdate,
} from "@stoqey/ib";
import { IpcMainEvent } from "electron";
import { Bar, Tape, MarketDephRow, SymbolInfo, GenericApi } from "../connector/generic.api";

// connection settings
const reconnectInterval: number = parseInt(process.env.IB_RECONNECT_INTERVAL as string) || 5000;  // API reconnect retry interval
const host: string = process.env.IB_TWS_HOST || "localhost";                                      // TWS host name or IP address
const port: number = parseInt(process.env.IB_TWS_PORT as string) || 4001;                         // API port

// Some configurable parameters
const rows: number = parseInt(process.env.IB_MARKET_ROWS as string) || 7;                         // Number of rows to return
const refreshing: number = parseFloat(process.env.IB_MARKET_REFRESH as string) || 0.5;            // Threshold frequency limit for sending refreshing data to frontend in secs
const barSize: number = parseInt(process.env.IB_BAR_SIZE as string) || 10;                        // bar/candle size in secs

/** IbWrapper is the class that hides IB API details and complexity for use in Gurilla Trading Platform. */
export class IbWrapper extends GenericApi {

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

    // the subscription on orders updates
    private ordersSubscription$?: Subscription;

    /**
     * Class constructor. Setup the connection to IB API and initialize some class members.
     */
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
        this.last_bar = { volume: 0 };

        this.on("emitCandle", this.emitCandle);
        setTimeout(() => this.emit("emitCandle"), 10 * 1000);  // start after 10 secs
    }

    /**
     * Convert a string in YYYYMMDD HH:MM:SS format to a Date object
     * @param value string to be converted
     * @returns Date from string value
     */
    private static stringToDate(value: string): Date {
        // convert YYYYMMDD HH:MM:SS to Date
        // console.log(value);
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        const len = value.length;
        if (len > 8) {
            hours = parseInt(value.substring(len - 8, len - 6));
            minutes = parseInt(value.substring(len - 5, len - 3));
            seconds = parseInt(value.substring(len - 2));
        }
        const result = new Date(
            parseInt(value.substring(0, 4)),
            parseInt(value.substring(4, 6)) - 1,
            parseInt(value.substring(6, 8)),
            hours, minutes, seconds
        );
        // console.log(result);
        return result;
    }

    /**
     * Convert Date to string format YYYYMMDD HH:MM:SS
     * @param value Date to convert
     * @returns Date converted as a string
     */
    private static dateToString(value: Date): string {
        // convert Date to YYYYMMDD HH:MM:SS
        const day: number = value.getDate();
        const month: number = value.getMonth() + 1;
        const year: number = value.getFullYear();
        const hours: number = value.getHours();
        const minutes: number = value.getMinutes();
        const seconds: number = value.getSeconds();
        const date: string = year.toString() + ((month < 10) ? ("0" + month) : month) + ((day < 10) ? ("0" + day) : day);
        const time: string = ((hours < 10) ? ("0" + hours) : hours) + ":" + ((minutes < 10) ? ("0" + minutes) : minutes) + ":" + ((seconds < 10) ? ("0" + seconds) : seconds);
        return date + " " + time;
    }

    private emitCandle(): void {
        if (this.subscription_tape) {
            // console.log("emitCandle", this.last_bar);
            this.last_bar = {
                time: Date.now(),
                open: this.last_bar.close,
                close: this.last_bar.close,
                high: this.last_bar.close,
                low: this.last_bar.close,
                volume: 0
            };
        }
        setTimeout(() => this.emit("emitCandle"), barSize * 1000);
    }

    private processMarketData(type: TickType, tick: MarketDataTick): boolean {
        let changed: boolean = false;
        if ((type == IBApiTickType.LAST) || (type == IBApiTickType.LAST_SIZE)) {
            // console.log("processMarketData", type, IBApiTickType[type], tick);
            if (type == IBApiTickType.LAST) {
                const price: number = tick.value as number;
                // update tape
                this.last_tape = { ingressTm: tick.ingressTm, price, size: undefined };
                // update candle
                this.last_bar.close = price;
                if (!this.last_bar.open) this.last_bar.open = price;
                if (this.last_bar.high) {
                    if (price > this.last_bar.high) this.last_bar.high = price;
                } else {
                    this.last_bar.high = price;
                }
                if (this.last_bar.low) {
                    if (price < this.last_bar.low) this.last_bar.low = price;
                } else {
                    this.last_bar.low = price;
                }
            } else if (type == IBApiTickType.LAST_SIZE) {
                // update tape
                this.last_tape.ingressTm = tick.ingressTm;
                this.last_tape.size = tick.value;
                changed = true;
                // update candle
                this.last_bar.volume += tick.value as number;
            }
        }
        return changed;
    }

    /**
     * find a contract
     * @param ticker: string can be either a symbol or a combinaison of Exchange:Symbol.
     * Valid examples are "AAPL", ":AAPL", "NASDAQ:AAPL".
     * @param exchange: optional exchange. Ignored if an exchange is provided in ticker.
     * @returns Promise<Contract> that will resolve as an IB contrat.
     */
    private findContract(ticker: string, exchange?: string): Promise<Contract> {
        let [symbol, ibexchange] = this.explodeTicker(ticker, exchange);
        if (!ibexchange) ibexchange = "SMART";
        else if (ibexchange == "NASDAQ") ibexchange = "ISLAND"; // depending on IB API version
        const contract: Contract = { secType: SecType.STK, currency: "USD", symbol, exchange: ibexchange };
        return this.api?.getContractDetails(contract)
            .then((details) => details[0].contract);
    }

    private subscribeMarketData(event: IpcMainEvent, contract: Contract): void {
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
                    const content: MarketDephRow[] = [];
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
    }

    private subscribeTimeAndSales(event: IpcMainEvent, contract: Contract): void {
        // Send time and price data to frontend
        this.last_tape = { ingressTm: 0 };
        this.last_bar = { time: Date.now(), volume: 0 };
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
                        symbol: contract.symbol as string,
                        content: this.last_tape as Tape,
                        bar: this.last_bar as Bar,
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
    }

    public onData(event: IpcMainEvent, data: any): void {
        if ((data.type == "selected-asset") && data.content) {
            this.findContract(data.content as string)
                .then((contract: Contract) => {
                    this.subscribeMarketData(event, contract);
                    this.subscribeTimeAndSales(event, contract);
                })
                .catch((err: IBApiNextError) => {
                    // Can't get contract details
                    // cancel all subscriptions
                    this.subscription_mkd?.unsubscribe();
                    this.subscription_tape?.unsubscribe();
                    // send error report to frontend
                    console.log(`findContract failed with '${err.error.message}'`);
                    console.log(data.content);
                    event.sender.send("market-depth", {
                        error: err.error.message,
                    });
                    event.sender.send("stream", {
                        error: err.error.message,
                    });
                });
        }
    }

    // TODO: private?
    protected subscribeOrders(event: IpcMainEvent): void {
        console.log("subscribeOrders");
        this.ordersSubscription$ = this.api
            .getOpenOrders()
            .subscribe({
                next: (data: OpenOrdersUpdate) => {
                    if (data) {
                        console.log("got next event", data.all.length, "open orders");
                        console.log(`${data.added?.length} orders added, ${data.changed?.length} changed`);
                        if (data.added && (data.added.length > 0)) {/* TODO */ };
                        if (data.changed && (data.changed.length > 0)) {/* TODO */ };
                    }
                },
                error: (err: IBApiNextError) => {
                    console.log(`getOpenOrders failed with '${err.error.message}'`);
                    event.sender.send("XXX", {
                        error: err.error.message,
                    });
                },
                complete: () => {
                    console.log("getOpenOrders completed.");
                }
            });
    }

    public async getSymbolInfo(ticker: string): Promise<SymbolInfo | undefined> {
        const symbol = ticker.split(":").at(1);
        const contract: Contract = { secType: SecType.STK, currency: "USD", symbol, exchange: "SMART" };
        return this.api?.getContractDetails(contract).then((details) => {
            // console.log(details);
            const liquidHours: string[] = details[0].tradingHours ? details[0].tradingHours.split(";") : [];
            const next_session: string = liquidHours.filter((item) => !item.endsWith(":CLOSED")).pop() as string;
            const session: string = next_session.substring(9, 13) + next_session.substring(22);
            const session_holidays: number[] = liquidHours.filter((item) => item.endsWith(":CLOSED")).map((item) => parseInt(item.substring(0, 8)));
            const result: SymbolInfo = {
                id: details[0].contract.conId as number,
                symbol: details[0].contract.symbol as string,
                exchange: details[0].contract.primaryExch as string,
                type: "stock",
                description: details[0].longName as string,
                pricescale: 1 / (details[0].minTick || 0.01),
                ticker,
                session,
                session_holidays,
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
            console.log(contract);
            throw Error(msg);
        });
    }

    /**
     * makeDuration compute duration accepted by IB API from timeframe, starting and ending dates
     * @param barSize: bar size (timeframe)
     * @param _from date from
     * @param to date to
     * @return string
     */
    private static makeDuration(barSize: string, from: number, to: number): string {
        const secs = (to - from) / 1000;
        const days = secs / 3600 / 24;
        const weeks = days / 7;
        const months = days / 30.4375;
        // const _years = days / 365.25;
        if (barSize == "1 month") return Math.ceil(months) + " M";
        else if (barSize == "1 week") return Math.ceil(weeks) + " W";
        else if (barSize == "1 day") {
            if (days < 365) return Math.ceil(days) + " D";
            return Math.ceil(days / 365) + " Y"
        }
        else if (barSize.endsWith("hour") || barSize.endsWith("hours")) return Math.ceil(days) + " D";
        else if (days > 3) return Math.ceil(days) + " D";
        else return Math.ceil(secs) + " S";
    }

    /**
     * Fetch Historical Bar Data
     * @param contract The IB Contract you are interested in.
     * @param barSize The data's granularity or Valid Bar Sizes.
     * @param from datetime of first bar in milliseconds since Unix epoch start in UTC timezone.
     * @param to datetime of last bar in milliseconds since Unix epoch start in UTC timezone.
     * @param outRTH include candles/bar outside RTH (Regular Trading Hours)
     * @return Historical Bar Data as Bar[].
     */
    private getHistory(contract: Contract, barSize: string, from: number, to?: number, outRTH?: boolean): Promise<Bar[]> {
        // if (!to) to = Date.now();
        const duration = IbWrapper.makeDuration(barSize, from, (to ? to : Date.now()));
        // console.log(IbWrapper.dateToString(new Date(to)), duration, barSize);
        return this.api?.getHistoricalData(contract, (to ? IbWrapper.dateToString(new Date(to)) : ""), duration, barSize as BarSizeSetting, "TRADES", outRTH ? 0 : 1, 1)
            .then((bars) => {
                return bars.map((ibbar: IbBar) => {
                    return {
                        time: (ibbar.time) ? IbWrapper.stringToDate(ibbar.time).getTime() : undefined,
                        datetime: (ibbar.time) ? IbWrapper.stringToDate(ibbar.time) : undefined,
                        open: ibbar.open as number,
                        close: ibbar.close as number,
                        low: ibbar.low as number,
                        high: ibbar.high as number,
                        volume: ibbar.volume as number,
                    };
                });
            }).catch((err: IBApiNextError) => {
                // Can't get contract details
                const msg = `getHistory failed with '${err.error.message}'`;
                console.log(msg);
                console.log(contract.symbol, barSize, from, to, duration);
                throw Error(msg);
            });
    }

    /**
     * getHistoryByTicker: fetch historycal data by ticker
     * @param symbol: string,
     * @param timeframe: string
     * @param from
     * @param to
     * @return Bar[]
     */
    public getHistoryByTicker(ticker: string, timeframe: string, from: number, to?: number): Promise<Bar[]> {
        return this.findContract(ticker)
            .then((contract) => this.getHistory(contract, timeframe, from, to));
    }

    /**
     * fetch_main: drop in replacement for fetch/main.py
     * @param ticker: string,
     * @param timeframe: string
     * @return Promise of Bar[] historical candles
     */
    public fetch_main(ticker: string, timeframe: string): Promise<Bar[]> {
        var d = new Date();
        return this.findContract(ticker)
            .then((contract) => this.getHistory(contract, timeframe, d.setDate(d.getDate() - 5), Date.now(), true)
                .then((values: Bar[]) => {
                    return this.computeLevels(values);
                }));
    }

    public createOrder(ticker: string, action: string, quantity: number): Promise<number> {
        const order: Order = {
            action: action as OrderAction,
            orderType: OrderType.MKT,
            totalQuantity: quantity,
            transmit: false,
        };
        return this.findContract(ticker)
            .then((contract) => this.api.placeNewOrder(contract, order));
    }

    public cancelOrder(id: number): void {
        return this.api.cancelOrder(id);
    }

    /**
     * disconnect from server stop the Api
     */
    public stop(): void {
        this.subscription_tape?.unsubscribe();
        this.subscription_mkd?.unsubscribe();
        this.ordersSubscription$?.unsubscribe();
        this.api?.disconnect();
        this.error$.unsubscribe();
    }

}

/** Singleton instance of IbWrapper */
// export const ibWrapper: IbWrapper = new IbWrapper();

// This stuff for testing
// const ticker = "NASDAQ:AAPL";
// ibWrapper.getSymbolInfo("NASDAQ:AAPL").then((result) => console.log(result));
// ibWrapper.findContract(ticker)
//     .then((contract) => ibWrapper.getHistory(contract, "1 hour", (new Date("2022-08-22").getTime()))
//         .then((result) => console.log(result)));
// ibWrapper.getHistoryByTicker("NASDAQ:AAPL", "1 day", 1660568058000, 1660654458000)
//     .then((result) => console.log(result));
// ibWrapper.fetch_main("NASDAQ:AAPL", "15 mins").then((result) => console.log(result));
