import { spawn } from "child_process";

export default function pythonPromise(script: string, symbol: string, timeframe: string, clientId: string) {
    return new Promise((resolve, reject) => {
        // console.log(script, symbol, timeframe);
        const python = spawn("python3", [script, symbol, timeframe, clientId]);
        python.stdout.on("data", (data) => {
            // console.log(data.toString());
            resolve(data.toString().trim());
        });

        python.stderr.on("data", (data) => {
            reject(data.toString().trim());
        });
    });
};

// import { ibWrapper } from "../ib/wrapper";

// export default function pythonPromise(script: string, symbol: string, timeframe: string, _clientId?: number): Promise<string> {
//     console.log(script, symbol, timeframe);
//     return ibWrapper.fetch_main(symbol, timeframe).then((result) => JSON.stringify(result));
// }
