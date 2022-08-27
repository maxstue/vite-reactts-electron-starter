import { ibWrapper } from "../ib/wrapper";

export default function pythonPromise(script: string, symbol: string, timeframe: string, _clientId?: number): Promise<string> {
    console.log(script, symbol, timeframe);
    return ibWrapper.fetch_main(symbol, timeframe).then((result) => JSON.stringify(result));
}
