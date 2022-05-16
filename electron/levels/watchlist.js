const schedule = require("node-schedule")
const pythonPromise = require(".././common/python-promise")
const quick = require("quick.db")
const uuid = require("uuid").v4

// One-time hydrate levels for provided symbols
const hydrateLevels = async function (data) {
    // const indicatorLevels = await getIndicatorLevels(data)
    // const priorDayLevels = await getPriorDayLevels(data)
    // const preMarketLevels = await getPreMarketLevels(data)

    // const levels = [ ...indicatorLevels, ...priorDayLevels, ...preMarketLevels ]
    // Save to DB 
    //levels.map



}

const publishLevels = function (symbols, pipe) {
        // Get levels from DB
        const levels = {}
        symbols.map(symbol => {
            const channel = `${symbol}.levels`
            const data = quick.get(channel)
            if (data) {
                levels[symbol] = data
                pipe.emit(channel, data)
                //console.log(data)
            }
            pipe.emit("levels", levels)
        })   
}

const hydrateCandlesAndIndicators = async function(symbols, socket) {
    const candles = await IB_fetchIndicatorCandles(symbols, "15 mins") //Array of objects containing symbols and associated candle data
    quick.set("candles", candles)
    socket.io.emit("candles", candles)
    socket.event.emit("candles", candles)
    candles.map(item => {
        if ( item ) {
            hydrateIndicatorLevels(item.symbol, JSON.parse(item.data))
        }
    })

    publishLevels(symbols, socket.io)
    
}

const hydrateIndicatorLevels = async function(symbol, candles) {

    const levels = candles[candles.length - 1]

    const indicators = ["close", "EMA_9", "EMA_20", "SMA_50", "SMA_200", "VWAP_D"]
    const keys = Object.keys(levels)
    const values = Object.values(levels)

    keys.map( (key, index) => {

        if (indicators.includes(key)) {
            const data = {
                id: uuid(),  
                symbol: symbol,
                value: values[index],   
                type: "ma", // "daily", "ma"
                category: "indicator", // "indicator", "candle"
                code: key, // "PP", EMA_20", "TD_UP_6"
                name: key,
                bgcolor: "", 
                textcolor: "",
                status: "active",
                display: 1,
                created: Date.now(),
                updated: Date.now()
            }
    
            quick.push(symbol + ".levels", data)
        }  
    })
}




//Perioidcally hydrate indicator levels for provided symbols
const pollIndicatorLevels = async function(data, socket) {
    await schedule.gracefulShutdown() // close all previously scheduled jobs to prevent double booking
    schedule.scheduleJob("*/1 * * * *", async (time) => {
        console.log("fetching levels at time: ", time)
        hydrateCandlesAndIndicators(data, socket)
    })
}

// TODO 
const getPriorDayLevels = async function (data) {
    return []
}

// TODO 
const getPreMarketLevels = async function (data) {
    return []
}

const IB_fetchIndicatorCandles = async function(symbols, timeframe) {

    if (symbols.length > 0) {
        let clientId = 15
        let candles = symbols.map( async symbol => {
            clientId++
            try {
                const results = await pythonPromise("fetch/main.py", symbol, timeframe, clientId)
                return {symbol: symbol, data: results}
            } catch (error) {
                console.log("could not fetch levels: ", error)
            }
        })

        return candles
    }
}

const IB_fetchPreviousDayLevels = async function (item, type) {

}


module.exports = { publishLevels, pollIndicatorLevels }

