const alpaca = require(".././common/alpaca")

const getOrders = () => new Promise (async (resolve, reject) => {

    try {
        const orders = await alpaca.getOrders()
        resolve (
            {
                status: "success",
                module: "orders",
                content: "Orders have been loaded",
                data: orders
            }
        )
    } catch (error) {
        reject (
            {
                status: "error",
                module: "orders",
                content: "Orders could not be loaded", 
                data: null, 
                error: error
            }
        )
    }
    
})

module.exports = getOrders