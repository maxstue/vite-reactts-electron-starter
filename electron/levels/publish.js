const schedule = require("node-schedule");
import pythonPromise from "../common/python-promise";
const quick = require("quick.db");
const uuid = require("uuid").v4;

//Perioidcally hydrate indicator levels for provided symbols
const pollIndicatorLevels = async function (socket) {

    await schedule.gracefulShutdown();
    // close previously scheduled levels job(s) to prevent double booking
    const jobs = schedule.scheduledJobs;
    if (!jobs[ "levels" ]) {
        const assets = quick.get("watchlist");
        const symbols = assets.map(item => item.symbol);
        schedule.scheduleJob("levels", "*/1 * * * *", async (time) => {
            //console.log("fetching levels at time: ", time)
            hydrateCandlesAndIndicators(symbols, socket);
        });
    }
};

function hydrateCandlesAndIndicators(symbols, socket) {
    let clientId = 15;
    symbols.map((symbol) => {
        clientId++;
        pythonPromise("fetch/main.py", symbol, "15 mins", clientId)
            .then(result => {
                const candles = JSON.parse(result);
                hydrateCandles(symbol, candles, socket);
                const levels = candles[ candles.length - 2 ];
                hydrateIndicatorLevels(symbol, levels, socket);
            })
            .catch(error => console.log(error, "for", symbol));
    });
}

const hydrateCandles = function (symbol, candles, socket) {
    quick.set(symbol + ".candles", candles);
    // socket.io.emit("candles", {symbol, candles})
    // socket.io.emit(symbol+".candles", candles)
    socket.send("data", {
        type: "candles",
        content: { symbol: symbol, candles: candles }
    });
};

const hydrateIndicatorLevels = async function (symbol, levels, socket) {
    const indicators = [ "close", "EMA_5", "EMA_9", "EMA_20", "SMA_50", "SMA_200", "VWAP_D" ];
    const keys = Object.keys(levels);
    // const values = Object.values(levels)
    const levelsChannel = symbol + ".levels";
    let oldLevels = quick.get(levelsChannel) || [];

    keys.map(key => {
        if (indicators.includes(key)) {
            const data = {
                id: uuid(),
                symbol: symbol,
                value: levels[ key ],
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
            oldLevels = oldLevels.filter(level => level.code !== data.code);
            oldLevels.push(data);
        }
    });

    //console.log("Indicator Levels hydrated at:", new Date().toISOString())

    quick.set(levelsChannel, oldLevels); //TODO: confusing nomenclature
    const newLevels = quick.get(levelsChannel);

    socket.send("data", {
        type: "levels",
        content: { symbol: symbol, levels: newLevels }
    });

};

const publishLevels = function (symbols, pipe) {
    // Get levels from DB
    const symbolLevels = symbols.map(symbol => {
        const channel = `${ symbol }.levels`;
        const data = quick.get(channel);
        // if (data && pipe) {
        //     pipe.emit("levels", {symbol: symbol, levels: data})
        // }

        if (data) {
            pipe.send("data", {
                type: "levels",
                content: { symbol: symbol, levels: data }
            });
        }
    });
};

const initLevels = function (ipc) {
    const assets = quick.get("watchlist");
    const symbols = assets.map(item => item.symbol);
    // ipc.send ("data", {type: "test", content: "now we are just testing from inside the initLevels inside levels/publish.js"})

    publishLevels(symbols, ipc);


    // const levels = publishLevels(symbols)
    // ipc.send("data", {
    //     type: "levels", 
    //     content: levels
    // })

    hydrateCandlesAndIndicators(symbols, ipc);
};

module.exports = { publishLevels, pollIndicatorLevels, initLevels };
