const alpaca = require(".././common/alpaca")
const quick = require("quick.db")


const getPositions = (ipc) => new Promise (async (resolve, reject) => {

    try {
        const positions = await alpaca.getPositions()

        //Check if any existing position has been closed, and update binded rules
        const newPosSymbols = positions.map(pos => pos.symbol)
            //console.log("new position symbols", newPosSymbols)
        const savedPositions = await quick.get("positions")
        const savedPosSymbols = savedPositions.map(pos => pos.symbol)
            //console.log("saved position symbols", savedPosSymbols)
        const closedPosSymbols = savedPosSymbols.filter(symbol => ! newPosSymbols.includes(symbol))
            //console.log("closed position symbols", closedPosSymbols)
        if (closedPosSymbols.length > 0) {
            const rules = await quick.get("rules")
            let newRules
            closedPosSymbols.map( symbol => {
                newRules = rules.map(rule => {
                    if (rule.symbol == symbol && rule.bind == 1 && rule.status == "active") {
                        rule.status = "disabled"
                            //console.log(rule)
                    }
                    return rule
                })
            })
            quick.set("rules", newRules)
            ipc.send("data", {type: "rules", content: newRules})
        }
        
        //update db with new positions from the broker
        quick.set("positions", positions)
    
        resolve (
            {
                status: "success", 
                module: "positions",
                content: "Positions have been loaded",
                data: positions
            }
        )
    } catch (error) {
        reject (
            {
                status: "error", 
                module: "positions", 
                content: "Positions could not be loaded",
                data: null,
                error: error
            }
         )
    }
})

module.exports = getPositions