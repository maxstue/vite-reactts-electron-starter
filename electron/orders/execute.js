const editRule = require("../rules/edit")
const placeOrder = require("./new")
const getRules = require("../rules/get-many")
const { SocketAddress } = require("net")
const quick = require("quick.db")

const executeOrders = async function(socket) {
    
    const response = await getRules()
    const rules = response.data
    if ( ! rules || rules.length < 1 ) return 
    //console.log(rules)
    const pendingRules = rules.filter(rule => rule.status === "pending")
    
    if (pendingRules && pendingRules.length > 0) {
        //console.log(pendingRules)
        pendingRules.map( async rule => {
            const { symbol, intent, size} = rule
            console.log(new Date().toISOString()+":", "about to place a rule order for " + symbol)
            try {
                //console.log(order)
                
                rule.status = "executed"
                rule.updated = Date.now()
                await editRule(rule)
                
                socket.send("data", {
                    type: "rule", 
                    content: rule
                })

                const type = "market"
                const order = await placeOrder({ symbol, intent, size, type}) 
                socket.send("data", {
                    type: "order", 
                    content: order
                })

                rule.brokerstatus = order.status
                rule.brokerid = order.id 
                quick.push("executed-rules", rule)

            } catch (error) {
                console.log(error)
                rule.status = "executed"
                await editRule(rule)
            }
        })
    }

    setTimeout(function() {
        executeOrders(socket)
    }, 1000)
    
}

module.exports = executeOrders