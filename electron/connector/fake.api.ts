/**
 * A fake broker Api usefull to simulate data flow when no connection or no data available.
 * @author Guerilla team
 */
import { IpcMainEvent } from "electron";
import { Bar, SymbolInfo, GenericApi, Tape, MarketDephRow } from "./generic.api";

// Some configurable parameters
const rows: number = parseInt(process.env.IB_MARKET_ROWS as string) || 7;                         // Number of rows to return
const refreshing: number = parseFloat(process.env.IB_MARKET_REFRESH as string) || 1;            // Threshold frequency limit for sending refreshing data to frontend in secs
const barSize: number = parseInt(process.env.IB_BAR_SIZE as string) || 10;                        // bar/candle size in secs

export class FakeApi extends GenericApi {

    private selectedAsset: string | undefined;

    /**
     * Class constructor.
     */
    constructor() {
        super();

        this.on("emitCandle", this.emitCandle);
        setTimeout(() => this.emit("emitCandle"), 10 * 1000);  // start after 10 secs
        this.on("emitMarketDepth", this.emitMarketDepth);
        setTimeout(() => this.emit("emitMarketDepth"), 10 * 1000);  // start after 10 secs
        this.on("emitTimeAndSales", this.emitTimeAndSales);
        setTimeout(() => this.emit("emitTimeAndSales"), 10 * 1000);  // start after 10 secs
    }

    private emitCandle(): void {
        if (this.selectedAsset && this.last_bar) {
            // send candle to frontend
            // console.log("emitCandle:", this.last_bar);
            // reinit a new bar
            this.last_bar = {
                time: Date.now(),
                open: this.last_bar?.close,
                close: this.last_bar?.close,
                high: this.last_bar?.close,
                low: this.last_bar?.close,
                volume: 0
            };
        }
        setTimeout(() => this.emit("emitCandle"), barSize * 1000);
    }

    private marketDepthIpc: IpcMainEvent | undefined;

    private emitMarketDepth(): void {
        if (this.selectedAsset && this.marketDepthIpc && this.last_tape) {
            let content: MarketDephRow[] = [];
            let bidPrice = this.last_tape.price ? (this.last_tape.price * (1 + (Math.random() / 100))) : 101;
            let askPrice = this.last_tape.price ? (this.last_tape.price * (1 - (Math.random() / 100))) : 99;
            for (let i = 0; i < rows; i++) {
                content.push({
                    i,
                    bidMMID: "bidMMID",
                    bidSize: Math.floor(Math.random() * 5) + 1,
                    bidPrice: Math.round(bidPrice * 100) / 100,
                    askPrice: Math.round(askPrice * 100) / 100,
                    askSize: Math.floor(Math.random() * 5) + 1,
                    askMMID: "askMMID"
                });
                bidPrice = bidPrice * (1 + (Math.random() / 100));
                askPrice = askPrice * (1 - (Math.random() / 100));
            }
            this.marketDepthIpc.sender.send("market-depth", {
                symbol: this.selectedAsset,
                content: content,
            });
        }
        setTimeout(() => this.emit("emitMarketDepth"), refreshing * 1000);
    }

    private TimeAndSalesIpc: IpcMainEvent | undefined;
    private last_tape: Tape | undefined;
    private last_bar: Bar | undefined;

    private makeTape() {
        // compute a new price
        let price = this.last_tape?.price ? this.last_tape?.price + ((Math.random() - 0.45) * 4) : 100;
        if (price < 1) {
            price = 1;
        } else {
            price = Math.round(price * 100) / 100;
        }
        // setup last tape
        this.last_tape = {
            ingressTm: Date.now(),
            price: price,
            size: Math.round((Math.random() * 9) + 1)
        };
        // setup last bar
        if (this.last_bar) {
            this.last_bar = {
                time: this.last_bar.time,
                open: this.last_bar.open,
                volume: this.last_bar.volume + Math.round(Math.random() * 10),
                high: Math.max(this.last_bar.high as number, this.last_tape.price as number),
                low: Math.min(this.last_bar.low as number, this.last_tape.price as number),
                close: this.last_tape.price,
            };
        } else {
            this.last_bar = {
                time: this.last_tape.ingressTm,
                volume: 1,
                open: this.last_tape.price,
                high: this.last_tape.price,
                low: this.last_tape.price,
                close: this.last_tape.price,
            };
        }
    }

    private emitTimeAndSales(): void {
        if (this.selectedAsset && this.TimeAndSalesIpc) {
            this.makeTape();
            // console.log("emitTimeAndSales:", this.last_tape);
            this.TimeAndSalesIpc.sender.send("stream", {
                symbol: this.selectedAsset,
                content: this.last_tape as Tape,
                bar: this.last_bar as Bar,
            });
        }
        setTimeout(() => this.emit("emitTimeAndSales"), refreshing * 1000);
    }

    /**
     * Handle a "data" message from the frontend.
     * Should start emitting events for:
     * - Market deph data
     * - Time and sales data
     * - Incomplete data bar for chart live update
     * @param event IPC channel to send back data from backend to frontend
     * @param data payload received from frontend
     */
    public onData(event: IpcMainEvent, data: any): void {
        if ((data.type == "selected-asset") && data.content) {
            this.selectedAsset = data.content;
            this.marketDepthIpc = event;
            this.TimeAndSalesIpc = event;
        }
    }

    private TimeframeToTicks(timeframe: string): number {
        let multiplier: number;
        if (timeframe.endsWith("sec") || timeframe.endsWith("secs")) multiplier = 1;
        else if (timeframe.endsWith("min") || timeframe.endsWith("mins")) multiplier = 60;
        else if (timeframe.endsWith("hour") || timeframe.endsWith("hours")) multiplier = 3600;
        else if (timeframe.endsWith("day") || timeframe.endsWith("days")) multiplier = 24 * 3600;
        else throw new Error(`FakeApi.TimeframeToTicks. Error: timeframe "${timeframe}" not implemented.`);
        return parseInt(timeframe) * multiplier * 1000;
    }

    private makeReverseBar(datetime: number, closeprice: number): Bar {
        let openprice = closeprice + ((Math.random() - 0.45) * 5);
        if (openprice < 1) openprice = 1;
        return {
            time: datetime,
            volume: 1 + (Math.random() * 10),
            open: openprice,
            high: Math.max(openprice, closeprice) + (Math.random() * 3),
            low: Math.min(openprice, closeprice) - (Math.random() * 3),
            close: closeprice,
        };
    }

    /**
     * getHistoryByTicker: fetch historycal data by ticker
     * @param symbol: string,
     * @param timeframe: string
     * @param from: date from as Unix timestamp
     * @param to: date to as Unix timestamp. Can be empty to fetch data up to now.
     * @return Bar[]
     */
    public getHistoryByTicker(_ticker: string, timeframe: string, from: number, to?: number): Promise<Bar[]> {
        console.log(`FakeApi.getHistoryByTicker(${_ticker}, ${timeframe}, ${from}, ${to})`);
        let result: Bar[] = [];
        const step = this.TimeframeToTicks(timeframe);
        const now = Date.now();
        if (!this.last_tape) this.makeTape();
        if (!to) to = now;
        let datetime = to;
        console.log(new Date(from), new Date(to as number), step);
        let price = this.last_tape?.price as number;
        while (datetime > from) {
            const bar = this.makeReverseBar(datetime, price);
            result.push(bar);
            price = bar.open as number;
            datetime -= step;
        }
        console.log(result.length);
        return Promise.resolve(result.reverse());
    }

    /**
     * Fetch info for a symbol. Symbol can optionnaly include exchange.
     * For example "AAPL" or "NASDAQ:AAPL" can be valid symbols.
     * @param ticker symbol to fetch info
     * @return SymbolInfo object or undefined if error
     */
    public getSymbolInfo(ticker: string): Promise<SymbolInfo | undefined> {
        const [symbol, exchange] = this.explodeTicker(ticker);
        const result: SymbolInfo = {
            id: Math.random() * 16384,
            symbol,
            exchange,
            type: "stock",
            description: symbol + " description",
            pricescale: 100,
            ticker,
            session: "0900-1600",
            session_holidays: [],
            timezone: "UTC",
            has_intraday: true,
            has_seconds: false,
            has_no_volume: false,
            volume_precision: -2,
            data_status: "streaming"
        }
        return Promise.resolve(result);
    }

    /**
     * fetch_main: drop in replacement for fetch/main.py
     * @param ticker: string,
     * @param timeframe: string
     * @return Promise of Bar[] historical candles
     */
    public fetch_main(ticker: string, timeframe: string): Promise<Bar[]> {
        var d = new Date();
        return this.getHistoryByTicker(ticker, timeframe, d.setDate(d.getDate() - 5), Date.now())
            .then((values: Bar[]) => {
                return this.computeLevels(values);
            });
    }

    public createOrder(_ticker: string, _action: string, _quantity: number): Promise<number> {
        return Promise.resolve(0);
    }

    public cancelOrder(_id: number): void {
    }

    public stop(): void {
    }

}