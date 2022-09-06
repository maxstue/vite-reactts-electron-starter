/**
 * Definitions for generic acces from Guerilla Trading Platform to external data providers and/or brokers
 */
import { IpcMainEvent } from "electron";

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

export interface GtpApi {

    onData(event: IpcMainEvent, data: any): void;

}