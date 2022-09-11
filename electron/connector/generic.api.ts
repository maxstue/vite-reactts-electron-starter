/**
 * Definitions for generic acces from Guerilla Trading Platform to external data providers and/or brokers
 */
import { IpcMainEvent } from "electron";
import { EventEmitter } from "events";
import { SMA, EMA, VWAP } from "@nenjotsu/technicalindicators";
var TDSequential = require("tdsequential");

/** Type that describes the data returned to frontend for Time and Sales panel. */
export type Tape = { ingressTm?: number, price?: number, size?: number };

/** Type that describes a bar/candle data used by methods and returned to frontend. */
export type Bar = {
    time?: number,
    open?: number,
    close?: number,
    high?: number,
    low?: number,
    volume: number,
    // Additional data for levels. TODO: define a specific type?
    SMA_50?: number,
    SMA_200?: number,
    EMA_5?: number,
    EMA_9?: number,
    EMA_20?: number,
    VWAP_D?: number,
    TD_SEQ_UPa?: number,
    TD_SEQ_DNa?: number,
};

/** Type that describes the data return by getSymbolInfo method. */
export type SymbolInfo = {
    id: number, symbol: string, exchange: string, type: string, description: string,
    pricescale: number, ticker: string, session: string, session_holidays?: number[],
    timezone: string, has_intraday: boolean, has_seconds: boolean,
    has_no_volume: boolean, volume_precision: number, data_status: string
};

/** Type that describes market depth rows returned to frontend for Market depth panel. */
export type MarketDephRow = {
    i: number,
    bidMMID: string, bidSize: number, bidPrice: number,
    askPrice: number, askSize: number, askMMID: string
};

export abstract class GenericApi extends EventEmitter {

    /**
     * Handle a "data" message from the frontend
     * Should start emitting events for:
     * - Market deph data
     * - Time and sales data
     * - Incomplete data bar for chart live update
     * @param event IPC channel to send back data from backend to frontend
     * @param data payload received from frontend
     */
    public abstract onData(event: IpcMainEvent, data: any): void;

    /**
     * getHistoryByTicker: fetch historycal data by ticker
     * @param symbol: string,
     * @param timeframe: string
     * @param from: date from as Unix timestamp
     * @param to: date to as Unix timestamp. Can be empty to fetch data up to now.
     * @return Bar[]
     */
    public abstract getHistoryByTicker(ticker: string, timeframe: string, from: number, to?: number): Promise<Bar[]>;

    /**
     * Fetch info for a symbol. Symbol can optionnaly include exchange.
     * For example "AAPL" or "NASDAQ:AAPL" can be valid symbols.
     * @param ticker symbol to fetch info
     * @return SymbolInfo object or undefined if error
     */
    public abstract getSymbolInfo(ticker: string): Promise<SymbolInfo | undefined>;

    /**
     * fetch_main: drop in replacement for fetch/main.py
     * @param ticker: string,
     * @param timeframe: string
     * @return Promise of Bar[] historical candles
     */
    public abstract fetch_main(ticker: string, timeframe: string): Promise<Bar[]>;

    public abstract createOrder(ticker: string, action: string, quantity: number): Promise<number>;
    public abstract cancelOrder(id: number): void;

    /**
     * Disconnect from server stop the Api
     */
    public abstract stop(): void;

    /**
     * find a contract
     * @param ticker: string can be either a symbol or a combinaison of Exchange:Symbol.
     * Valid examples are "AAPL", ":AAPL", "NASDAQ:AAPL".
     * @param exchange: optional exchange. Ignored if an exchange is provided in ticker.
     * @returns symbol and exchange
     */
    protected explodeTicker(ticker: string, exchange?: string): [symbol: string, exchange: string] {
        let symbol: string;
        const t = ticker.split(":");
        if (t.length == 1) {
            symbol = ticker;
        } else if (t.length == 2) {
            exchange = t[0] || exchange;
            symbol = t[1];
        } else {
            // Error !
            throw (`findContract called with invalid parameters: ${ticker} ${exchange}`)
        }
        if (!exchange) exchange = "";
        return [symbol, exchange];
    }

    protected computeLevels(values: Bar[]): Bar[] {
        // compute trading indicators
        let offset: number;
        let computed: number[];
        // VWAP
        const vwap = new VWAP({
            high: [] as number[],
            low: [] as number[],
            close: [] as number[],
            volume: [] as number[],
        });
        values.forEach((value, i) => {
            const result = vwap.nextValue({
                open: value.open,
                high: value.high,
                low: value.low,
                close: value.close,
                volume: value.volume,
            });
            values[i].VWAP_D = result;
        });
        // SMA 50
        computed = SMA.calculate({ period: 50, values: values.map((i) => (i.close as number)) });
        offset = values.length - computed.length;
        computed.map((value, index) => values[index + offset].SMA_50 = value);
        // SMA 200
        computed = SMA.calculate({ period: 200, values: values.map((i) => (i.close as number)) });
        offset = values.length - computed.length;
        computed.map((value, index) => values[index + offset].SMA_200 = value);
        // EMA 5
        computed = EMA.calculate({ period: 5, values: values.map((i) => (i.close as number)) });
        offset = values.length - computed.length;
        computed.map((value, index) => values[index + offset].EMA_5 = value);
        // EMA 9
        computed = EMA.calculate({ period: 9, values: values.map((i) => (i.close as number)) });
        offset = values.length - computed.length;
        computed.map((value, index) => values[index + offset].EMA_9 = value);
        // EMA 20
        computed = EMA.calculate({ period: 20, values: values.map((i) => (i.close as number)) });
        offset = values.length - computed.length;
        computed.map((value, index) => values[index + offset].EMA_20 = value);
        // TD_SEQ TODO: check results
        const result = TDSequential(values);
        result.forEach((v: { buySetupIndex: number, sellSetupIndex: number }, i: number) => {
            values[i].TD_SEQ_UPa = v.sellSetupIndex;
            values[i].TD_SEQ_DNa = v.buySetupIndex;
        });
        /*
        if (ticker == "AAPL") {
            console.log(ticker, values[values.length - 1].time,
                values[values.length - 1].close,
                values[values.length - 1].VWAP_D,
                values[values.length - 1].TD_SEQ_UPa, values[values.length - 1].TD_SEQ_DNa);
        }
        */
        return values.slice(values.length - 3);

    }

}