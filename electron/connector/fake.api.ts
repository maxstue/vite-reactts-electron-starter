/**
 * A fake broker Api usefull to simulate data flow when no connection or no data available.
 */
import { IpcMainEvent } from "electron";
import { Bar, SymbolInfo, GenericApi } from "./generic.api";

const barSize: number = parseInt(process.env.IB_BAR_SIZE as string) || 10;                        // bar/candle size in secs

export class FakeApi extends GenericApi {

    /**
     * Class constructor.
     */
    constructor() {
        super();

        this.on("emitCandle", this.emitCandle);
        setTimeout(() => this.emit("emitCandle"), 10 * 1000);  // start after 10 secs
    }

    private emitCandle(): void {
        /*
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
        */
        setTimeout(() => this.emit("emitCandle"), barSize * 1000);
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
    public onData(_event: IpcMainEvent, _data: any): void {

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

    private makeBar(datetime: number, openprice: number): Bar {
        let closeprice = openprice + (Math.random() * 10) - 4.9;
        if (closeprice < 10) closeprice = 10;
        return {
            time: datetime,
            volume: Math.random() * 10,
            open: openprice,
            high: Math.max(openprice, closeprice) + (Math.random() * 5),
            low: Math.min(openprice, closeprice) - (Math.random() * 5),
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
        if (!to) to = now;
        let datetime = from;
        let price = 100 + (Math.random() * 100);
        console.log(new Date(from), new Date(to as number), step);
        while (datetime < to) {
            const bar = this.makeBar(datetime, price);
            result.push(bar);
            price = bar.close as number;
            datetime += step;
        }
        console.log(result.length);
        return Promise.resolve(result);
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
            description: symbol + "description",
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
        return this.getHistoryByTicker(ticker, timeframe, Date.now() - (5 * 24 * 3600));
    }

    public createOrder(_ticker: string, _action: string, _quantity: number): Promise<number> {
        return Promise.resolve(0);
    }
    public cancelOrder(_id: number): void {

    }

    public stop(): void {

    }

}