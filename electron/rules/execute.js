const quick = require("quick.db")
const editRule = require("./edit")
const getRules = require("./get-many")
const deleteRule = require("./delete")
const schedule = require("node-schedule")


module.exports = function (socket, data) {

    // socket.event.on("alpaca-T", data => {
    //     // console.log(data)
    //     executeTouches(data, socket)
    // })

    executeTouches(data, socket)


    // console.log("closes schedule has been started")
    // schedule.scheduleJob("closes", "*/15 * * * *", async (time) => {
    //     // console.log("Execute closes called at time: ", time)
    //     executeCloses(socket)
    // })

}

const executeCrosses = function() {
    //1. Hydrate Previous Levels candles 
    //2. Compare the values of previous candles with current candles for changes 
    //3. Trigger will be true if there are changes

    //TODO: Crosses above and crosses below? 
}

const executeCloses = function (socket) {
    setTimeout( async () => { // Delay for four seconds to allow for hydration of latest indicator levels
        console.log("about to execute closes at ", new Date().toISOString())
        const rules = await quick.get("rules")
        
        const validRules = rules.filter(rule => rule.status === "active" && rule.action.startsWith("closes"))

        validRules.map( async rule => {
            const symbolLevels = await quick.get(rule.symbol + ".levels")

            if ( ! symbolLevels || symbolLevels.length < 0) return 

            const denomoLevel = symbolLevels.find(level => level.code === rule.denomo)
            if ( ! denomoLevel ) return 
            const closingPrice = symbolLevels.find(level => level.code === "close")
            if ( ! closingPrice ) return 
            // console.log("valid execute closes rule", rule)
            // console.log(rule.symbol, "closing price:", closingPrice)

            let trigger = false
            switch(rule.action) {
                case "closes above":
                    if (denomoLevel.value < closingPrice.value) trigger = true
                break;
                case "closes below":
                    if (denomoLevel.value > closingPrice.value) trigger = true
                break;
            }
            // if (rule.action === "closes above") {
            //     if (denomoLevel.value < closingPrice.value) trigger = true
            // } else if (rule.action === "closes below") {
            //     if (denomoLevel.value > closingPrice.value) trigger = true
            // }

            if (trigger) {// Mark the rule as pending... a la "Pending Execution"
                markPending(rule, rules)
                // socket.io.emit("rule-triggered", rule)
                socket.send("toast", {type: success, content: `Rule triggered for ${rule.symbol}`, data: rule})
            }

        })
    }, 4 * 1000)
    
}

const executeTouches = async function (data, socket) {
    
    // console.log(data)

    const symbol = data.S
    const tradePrice = data.p
    // const symbol = data.s
    // const tradePrice = data.c
    // console.log("symbol:", symbol)

    

    /* Reasonable checks to save processing time */ 
    if (data.T !== "t") return 
    //if ( ! symbols.includes(symbol)) return 
    
    /* Execute the first rule for this symbol. TODO: Change this all rules with sequence 0 once sequence manager is implemented */
    const rules = await quick.get("rules")

    if ( ! rules || rules.length < 1 ) return 
    const symbolRules = rules.filter(rule => rule.symbol === symbol && rule.status === "active")
    if (symbolRules.length < 1) return 
    //let rule = symbolRules[0]
    // console.log("rule:", rule)
    symbolRules.map( rule => {

        if ( ! rule ) return
        //console.log("rule symbol:", rule.symbol, rule.id)
        if ( ! rule.symbol || (symbol !== rule.symbol)) return //TODO: this check is probably pointless 

        const { action, numero, numeroState, denomo, denomoState, category } = rule

        let trigger = false
        if (action === "touches" || action === "crosses") {
            if (numero == "price" && category == "level") {
                //Since levels don't change, no need to fetch the levels from db. We can just use the denomoState for comparison
                //TODO: but what if the level is edited? Or even deleted and it does not exist anymore? 
                //TODO: Should the rules associated with an edited/deleted level also be edited/deleted? 
                if (denomoState >= numeroState ) {
                    if (denomoState <= tradePrice) trigger = true
                } else if (denomoState < numeroState) {
                    if (denomoState >= tradePrice) trigger = true
                }
                rule.denomoActual = denomoState
            } else if (numero == "price" && category == "indicator") {
                //Fetch levels from db in order to get the current denomo value
                const levels = quick.get(symbol+".levels")
                const level = levels.find(level => level.code === denomo )
                //console.log(level)
                if ( ! level ) return 
                if (denomoState >= numeroState ) {
                    if (level.value <= tradePrice) trigger = true
                } else if (denomoState < numeroState) {
                    if (level.value >= tradePrice) trigger = true
                }

                if (trigger) console.log("indicator rule about to be executed for ", symbol)
                rule.denomoActual = level.value
            }
        }

        if (trigger) { // Mark the rule as pending... a la "Pending Execution"
            rule.numeroActual = tradePrice
            markPending(rule, rules)
            // socket.io.emit("rule-triggered", rule)
            socket.send("toast", {type: "success", content: `Rule triggered for ${symbol}`, data: rule})
        }
    })
}

const markPending = function(rule, rules) {
    console.log(new Date().toISOString()+":", "rule triggered", rule.symbol, rule.denomo, rule.intent, 
    rule.bias, rule.size, "| Numero State:", rule.numeroState, "| Denomo State", rule.denomoState,
     "| Numero Actual:", rule.numeroActual, "| Denomo Actual: ", rule.denomoActual)
    rule.status = "pending"
    const newRules = rules.map(item => {
        if (item.id === rule.id) {
            item.status = "pending"
            item.updated = Date.now()
        }

        return item 
    })
    quick.set("rules", newRules)
}