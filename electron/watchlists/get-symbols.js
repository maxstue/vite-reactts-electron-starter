const db = require("quick.db")

const getSymbols = () => new Promise (async (resolve, reject) => {

    try {
        const symbols = await db.get("watchlist")
        resolve (
            {
                status: "success", 
                module: "watchlists",
                content: "Watchlist(s) symbols have been loaded",
                data: symbols
            }
        )
    } catch (e) {
        reject (
           {
               status: "error", 
               module: "watchlists", 
               content: "Watchlist(s) symbols could not be loaded",
               data: null,
               error: e
           }
        )
    }
    
})

module.exports = getSymbols