import React from "react"
import { useGlobal } from "reactn"

export default function useOrder(symbolProp) {
    const [updatePositions, setUpdatePositions] = useGlobal("updatePositions")
    const [selectedAsset] = useGlobal("selectedAsset")
    const [orders, setOrders] = useGlobal("orders")

    const symbol = symbolProp || selectedAsset
    
    const orderTypes = {"m":"market","l": "limit", "s":"stop", "sl":"stop_limit", "tr":"trailing_stop"}

    const exitOrder = (portion, typeKey="m", extraData) => {
        const data = {
            symbol: symbol, 
            intent: "exit", 
            size: portion,
            type: orderTypes[typeKey],
            ...extraData
        }
        sendOrder(data)
    }   

    const entryOrder = (size, typeKey="m", extraData) => {
        const data = {
            symbol: symbol,
            intent: "entry", 
            size: size,
            type: orderTypes[typeKey],
            ...extraData
        }
        sendOrder(data)
    }
    
    const sendOrder = async (data) => {
        data.time = new Date().toISOString()
        console.log(data)
        if (!symbol) console.log("Please select an asset before trying to place an order")
        const response = await window.Main.asyncData({
            route: "orders/new",
            content: data
        })
        if (response.data) {
            console.log(" *Instant order sent* \n ", "Request: ", data, "\n", "Response: ", response.data)
            const updatedOrders = orders.filter(order => order.id !== response.data.id)
            updatedOrders.push(response.data)
            setOrders(updatedOrders)
            setUpdatePositions(updatePositions => ! updatePositions)
        } else {
            console.log(response.error)
        }
    }

    return { entryOrder, exitOrder, sendOrder }
}