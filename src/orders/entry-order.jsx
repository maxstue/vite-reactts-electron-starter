import React from "react"
import useOrder from "./use-order"

const EntryOrder = function (props) {

    const { entryOrder } = useOrder(props.symbol)

    return (
        <span onClick={() => entryOrder(props.size)}>{props.bias} {Math.abs(props.size)}</span>
    )

}

export default EntryOrder