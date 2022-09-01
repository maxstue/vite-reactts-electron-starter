const db = require("quick.db")
const alpaca = require(".././common/alpaca")
const axios = require("axios")
const { pollIndicatorLevels } = require("../levels/publish")

const addSymbol = (symbol, ipc) => new Promise ( async (resolve, reject ) => {

    // 1. Check if this is a valid symbol, 
    try {
        const assets = await db.get("watchlist")
        if (assets.find(asset => asset.symbol == symbol)) {
            resolve(
                {
                    status: "info",
                    content: `${symbol} already exists in the watchlist`,
                    data: assets
                }
            )
        } else {
            let asset = {}
            asset.symbol = symbol
            const saveToDb = await db.push("watchlist", asset)

            const symbols = await db.get("watchlist")

            resolve (
                {
                    status: "success",
                    content: `${symbol} has been added to the watchlist`,
                    data: symbols
                }
            )

        }
    } catch (e) {
        console.log(e)
        reject(e.message || e.response.data.message)
    }

})

// TEST
// AddSymbol("C")
// .then(response => console.log(1))
// .catch(error => console.log(error))

module.exports = addSymbol
