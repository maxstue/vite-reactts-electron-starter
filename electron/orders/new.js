const alpaca = require(".././common/alpaca")
const quick = require("quick.db")

module.exports = function (params) {

    return new Promise (async (resolve, reject) => {

        const Order = (params.intent == "exit") ? await exitOrder(params) : entryOrder(params)
        
        if ( ! Order ) reject({error: "No position exists for " + params.symbol})
        alpaca.createOrder(Order)
        .then(data => resolve(
            {
                status: "success", 
                module: "orders",
                content: `Order placed for ${params.symbol}`,
                data: data
            }))
        .catch(errata => { 
            console.log(errata.response.data)
            reject({
                status: "error", 
                module: "orders",
                content: `Could not place the order sent for ${params.symbol}`,
                error: errata.response.data
            })
        })
    })   
}

const exitOrder = async function(params) {
    const portion = Math.abs(params.size)
    
    // 1. Check if a position exists for this asset, otherwise return false
    //Fetch current positions from database. 
    //TODO: If it is not in db, check with the brokerage. Tradeoff = slower order execution
    let positions = quick.get("positions")
    
    if ( ! positions || positions.length < 1) return false  
    const position = positions.find(position => position.symbol == params.symbol)
    if ( ! position ) return false  

    // 2. Build and return the order params
    let qty = 0
    const posQty = parseFloat(position.qty)
    if ( params.exitType && params.exitType == "abs" ) { // reduction is an absolute number of shares, not a percentage
        qty = portion > posQty ? posQty : portion
    } else {
        qty = Math.ceil(
                (! portion || parseFloat(portion) >= 1) 
                ? posQty 
                : portion * posQty
            )
    }

    return {
        symbol: params.symbol,
        qty: Math.abs(qty),
        side: position.side == "long" ? "sell": "buy",
        type: params.type,
        time_in_force: params.tif || "day", 
        limit_price: params.limitPrice,
        stop_price: params.stopPrice,
        trail_price: params.trailPrice,
        trail_percent: params.trailPercent,
        extended_hours: params.outsideRTH, 
        order_class: params.orderClass, 
        take_profit: params.takeProfit,
        stop_loss: params.stopLoss
    }
}

const entryOrder = function (params) {
    return {
        symbol: params.symbol,
        qty: Math.abs(params.size), 
        side: params.size > 0 ? "buy" : "sell",
        type: params.type, 
        time_in_force: params.tif || "day",
        limit_price: params.limitPrice,
        stop_price: params.stopPrice,
        trail_price: params.trailPrice,
        trail_percent: params.trailPercent,
        extended_hours: params.outsideRTH, 
        order_class: params.orderClass, 
        take_profit: params.takeProfit,
        stop_loss: params.stopLoss
    }
}

// alpaca.createOrder({
//     symbol: params.symbol, 
//     qty: Math.abs(params.size), 
//     side: params.size > 0 ? "buy" : "sell", //TODO: address edge case where size = 0
//     type: "market", 
//     time_in_force: "day",
//     limit_price: 0,
//     stop_price: 0,
//     client_order_id: string, // optional,
//     extended_hours: boolean, // optional,
//     order_class: string, // optional,
//     take_profit: object, // optional,
//     stop_loss: object, // optional,
//     trail_price: string, // optional,
//     trail_percent: string // optional,
// })
