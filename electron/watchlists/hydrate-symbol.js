const db = require("quick.db")
const alpaca = require(".././common/alpaca")
const axios = require("axios")
const { pollIndicatorLevels } = require("../levels/publish")

const hydrateSymbol = (symbol, ipc) => new Promise ( async (resolve, reject ) => {

    // 1. Check if this is a valid symbol, 
    try {
            const asset = await alpaca.getAsset(symbol)
            console.log("watchlists/hydrate-symbol", asset)
            
            //2. Fetch and hydrate additional details for this symbol. 
            //TODO: This is a temporary fix that will be replaced by ATR calculated from IBKR historical daily data
            const end = Math.ceil(Date.now()/1000)
            const start = end - (25 * 24 * 60 * 60) // 25 days ago
            const response = await axios.get(`https://finnhub.io/api/v1/indicator?symbol=${symbol}&resolution=D&from=${start}&to=${end}&indicator=atr&timeperiod=14&token=${process.env.FINNHUB}`)
            
            const ATRs = response.data.atr
            const prices = response.data.c 
            asset.atr = ATRs[ATRs.length - 1]
            asset.lastDailyClose = prices[prices.length - 1]
            //resolve(asset)

            // 3a. Save the symbol and its details to the watchlist in the database 
            // Todo: check if the asset already exists in the watchlist
            const assets = await db.get("watchlist")
            const newWatchlist = assets.filter(asset => asset.symbol != symbol)
            newWatchlist.push(asset)
            const saveToDb = await db.set("watchlist", newWatchlist)
            

            // 3b. Update watchlist symbol on Alpaca 
            const addToWatchlist = await alpaca.addToWatchlist(process.env.WATCHLIST, symbol)

            // 3c. Subscribe to socket data for the added symbol 
            // (i) Add to Prod Steam 
            const addToProdStream = await axios.post(process.env.PRODUCTION + "/watchlist/add-symbol", {symbol: symbol})

            // (ii) Add to Local Stream 

            // 4. Fetch and return all the symbols in the watchlist
            const symbols = await db.get("watchlist")
            //console.log("This is the watchlist", symbols)

            // 5. Restart levels and candles polling with the new symbols
            pollIndicatorLevels(ipc)

            resolve (
                {
                    status: "success",
                    module: "watchlists",
                    content: `${symbol} has been added to the watchlist`,
                    data: symbols
                }
            )
    } catch (e) {
        console.log(e)
        reject(e.response.data.message || e.message)
    }

})

// TEST
// AddSymbol("C")
// .then(response => console.log(1))
// .catch(error => console.log(error))

module.exports = hydrateSymbol
