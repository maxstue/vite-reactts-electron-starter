import React from "react"
import { useGlobal } from "reactn"
import { v4 as uuid } from "uuid"


const NewRule = (props) => {

    const [levels] = useGlobal("levels")
    const [rules, setRules] = useGlobal("rules")

    const level = props.level || levels[props.symbol].find(level => level.code == props.levelCode)   

    //  console.log("level", level)
    
    const handleRule = async function() {

        //const candles = inflections[selectedAsset].candles
        
        //const latestCandle = candles[candles.length - 1]
        //console.log(latestCandle)

        //Get the value of the numeroState
        let numeroState
        if (props.numero !== "price") {
            const numero = levels[level.symbol].find(level => level.code == props.numero)
            numeroState = numero.value
        } else {
            //TODO. Fetch price from API if latestPrice is 0 or does not exist
            numeroState = props.latestprice
        }
        
        const data = {
            id: uuid(), 
            action: props.action, // touches, crosses below, crosses above
            numero: props.numero, // numero => most likely price
            numeroState: numeroState, // current price 
            denomo: level.code, // indicator or level representation in the db. e.g. VWAP_D
            denomoState: level.value, // the current value of the indicator or level e.g. current VWAP value
            intent: props.intent, // entry, exit 
            bias: props.bias.toLowerCase(), // long, short, reduce
            size: props.bias == "Short" ? -1 * props.size : props.size, //amount 
            type: level.type, //custom level (custom), moving average (ma)
            symbol: level.symbol,
            status: "active", //active, pending, executed 
            category: level.category, //level, indicator
            sequence: 0, // execution sequence, useful if one rule needs to be triggered before the next 
            created: Date.now()

        }

        // socket.emit("new-rule", data)
        const response = await window.Main.asyncData({
            route: "rules/new", 
            content: data
        })
        console.log(response.data)
        const newRules = [...rules, data]
        setRules(newRules)
    }

    return (
        <span onClick={handleRule} className="w-full block">{props.children}</span>
    )
}

export default NewRule