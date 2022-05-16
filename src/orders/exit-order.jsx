import React from "react"
import useOrder from "./use-order"

const ExitOrder = function (props) {
    const { exitOrder } = useOrder(props.symbol)

    
    return (
        <span onClick={() => exitOrder(props.size)}>{props.bias} {Math.abs(props.size) * 100}%</span>
    )
}

export default ExitOrder