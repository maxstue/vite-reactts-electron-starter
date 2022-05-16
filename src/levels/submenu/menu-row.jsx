import React from "react"
import { useGlobal } from "reactn"
import { MenuItem, useMenuState } from "reakit/Menu";
import { SocketContext } from "../../../context/socket";
import { v4 as uuid } from "uuid"


const MenuRow = React.forwardRef((props, ref) => {
    const { type, size, code, category, intent, value, bias } = props
    const socket = React.useContext(SocketContext)
    const [levels] = useGlobal("levels")
    const [rules, setRules] = useGlobal("rules")
    const menu = useMenuState()

    const { level } = props    
    
    const handleRule = function() {

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
            intent: props.intent, // entry, exit, reduce 
            bias: bias.toLowerCase(), // long, short 
            size: bias == "Short" ? -1 * props.size : props.size, //amount 
            type: level.type, //custom level (custom), moving average (ma)
            symbol: level.symbol,
            status: "active", //active, pending, executed 
            category: level.category, //level, indicator
            sequence: 0, // execution sequence, useful if one rule needs to be triggered before the next 
            created: Date.now()

        }

        socket.emit("new-rule", data)
        const newRules = [...rules, data]
        setRules(newRules)
    }

    return (
        <MenuItem {...menu} className=" submenu hover:bg-purple-200 mb-1 p-2 justify-start" onClick={handleRule}>
            {bias} {bias == "Reduce" ? (size * 100) + "%" : size }
        </MenuItem>
    )
})

  export default MenuRow