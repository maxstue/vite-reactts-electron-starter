const schedule = require("node-schedule");
const quick = require("quick.db");
const uuid = require("uuid").v4;
import { currentApi } from "../connector";

//Periodically hydrate indicator levels for provided symbols
const pollIndicatorLevels = async function (socket: any) {
    await schedule.gracefulShutdown();
    // close previously scheduled levels job(s) to prevent double booking
    const jobs = schedule.scheduledJobs;
    if (!jobs["levels"]) {
        const assets = quick.get("watchlist");
<<<<<<< HEAD:electron/levels/publish.ts
        const symbols = assets.map((item: any) => item.symbol);
        schedule.scheduleJob("levels", "*/1 * * * *", async (time: any) => {
            console.log("publishing levels at time:", time);
=======
        const symbols = assets.map(item => item.symbol);
        schedule.scheduleJob("levels", "*/1 * * * *", async (time) => {
            //console.log("publishing levels at time:", time);
>>>>>>> d49057f1537eea6bd349be0976ea64fb2bcb9589:electron/levels/publish.js
            hydrateCandlesAndIndicators(symbols, socket);
        });
    }
};

/**
 * Fetch last historical data from IB and store candles and indicators in DB and send them to Frontend
 * @param {string[]} symbols List os symbols to process
 * @param socket IPC socket used to send back data to Frontend
 */
function hydrateCandlesAndIndicators(symbols: any, socket: any) {
    // let clientId = 15;
    symbols.map((symbol: any) => {
        // clientId++;
        // pythonPromise("fetch/main.py", symbol, "15 mins", clientId)
        currentApi.fetch_main(symbol, "15 mins")
            .then((candles) => {
                // const candles = JSON.parse(result);
                hydrateCandles(symbol, candles, socket);
                const levels = candles[candles.length - 1]; // RYL: was -2, to check with Idris
                hydrateIndicatorLevels(symbol, levels, socket);
                // console.log(symbol, levels);
            })
            .catch(error => console.log(error, "for", symbol));
    });
}

/**
 * Store symbol's candles in DB and send them to Frontend
 * @param {string} symbol Stock symbol
 * @param {Bar[]} candles Candles to store
 * @param socket IPC socket used to send back data to Frontend
 */
const hydrateCandles = function (symbol: any, candles: any, socket: any) {
    // if (symbol == "AAPL") console.log(candles);
    quick.set(symbol + ".candles", candles);
    socket.send("data", {
        type: "candles",
        content: { symbol: symbol, candles: candles }
    });
    quick.set(symbol + ".updatedAt", (new Date()).toISOString());
};

/**
 * Update DB with new indicators levels and send them to Frontend
 * @param {string} symbol Stock symbol
 * @param {Bar} levels New indicators values
 * @param socket IPC socket used to send back data to Frontend
 */
const hydrateIndicatorLevels = function (symbol: any, levels: any, socket: any) {
    const indicators = ["close", "EMA_5", "EMA_9", "EMA_20", "SMA_50", "SMA_200", "VWAP_D"];
    const keys = Object.keys(levels);
    const levelsChannel = symbol + ".levels";
    let oldLevels = quick.get(levelsChannel) || [];
    keys.map(key => {
        if (indicators.includes(key)) {
            const data = {
                id: uuid(),
                symbol: symbol,
                value: levels[key],
                type: "ma", // "daily", "ma"
                category: "indicator", // "indicator", "candle"
                code: key, // "PP", EMA_20", "TD_UP_6"
                name: key,
                bgcolor: "",
                textcolor: "",
                status: "active",
                display: 1,
                created: Date.now()
            };
            oldLevels = oldLevels.filter((level: any) => level.code !== data.code);
            oldLevels.push(data);
        }
    });
    quick.set(levelsChannel, oldLevels); //TODO: confusing nomenclature
    // const newLevels = quick.get(levelsChannel);
    socket.send("data", {
        type: "levels",
        content: { symbol: symbol, levels: oldLevels }
    });
    quick.set(symbol + ".updatedAt", (new Date()).toISOString());
};

/**
 * Publish symbols' level to Frontend, from current values stored in DB
 * @param {string[]} symbols List of symbols to publish
 * @param {*} pipe IPC pipe used to send data to Frontend
 */
const publishLevels = function (symbols: any, pipe: any) {
    // Get levels from DB
    symbols.map((symbol: any) => {
        const channel = `${symbol}.levels`;
        const data = quick.get(channel);
        if (data) {
            pipe.send("data", {
                type: "levels",
                content: { symbol: symbol, levels: data }
            });
        }
    });
};

const initLevels = function (ipc: any) {
    const assets = quick.get("watchlist");
    const symbols = assets.map((item: any) => item.symbol);
    // ipc.send ("data", {type: "test", content: "now we are just testing from inside the initLevels inside levels/publish.js"})
    // publishLevels(symbols, ipc); Not needed, we would send obsolete values
    hydrateCandlesAndIndicators(symbols, ipc);
};

module.exports = { publishLevels, pollIndicatorLevels, initLevels };
