const db = require("quick.db")
const alpaca = require(".././common/alpaca")
const axios = require("axios")

const removeSymbol = symbol => new Promise ( async (resolve, reject) => {
    try {
        //1. Fetch the watchlist 
        const watchlist = db.get("watchlist")

        //2. Filter out the symbol 
        const newWatchlist = watchlist.filter(item => item.symbol !== symbol)
        // const newWatchlist = watchlist.filter(item => item.symbol)
        //console.log("new watchlist", newWatchlist)

        db.set("watchlist", newWatchlist)

                //4. Resolve le promise 
                resolve (
                    {
                        status: "success", 
                        module: "watchlists", 
                        content: `${symbol} has been removed from the watchlist`,
                        data: newWatchlist
                    }
                )

        //3c. Unsubscribe symbol from streaming
        //(i) Production stream 
        const removeFromProdStream = await axios.post(process.env.PRODUCTION + "/watchlist/remove-symbol", {symbol: symbol})
        //(ii) Local stream 

        //3a. Attempt to remove symbol from Alpaca watchlist
        const removeFromAlpacaList = await alpaca.deleteFromWatchlist(process.env.WATCHLIST, symbol)


    } catch (e) {
        console.log("watchlist/remove-symbol error: ", e)
        reject (
            {
                status: "error", 
                module: "watchlists", 
                content: `Could not remove ${symbol} from the watchlist`, 
                data: null, 
                error: e.response.data.message || e.response.data || e
            }
        )
    }
})

module.exports = removeSymbol