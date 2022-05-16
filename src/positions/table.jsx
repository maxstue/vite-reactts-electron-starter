import React from "react"
import PositionsRow from "./row"

const PositionsTable = function(props) {

    return (
        <div className="text-xs mr-1">
            <div className="border-b pb-2 uppercase font-bold flex flex-row w-full ">
                <div className="w-1/4">Symbol</div>
                <div className="w-1/4">Entry($)</div>
                <div className="w-1/4">Now($)</div>
                <div className="w-1/4">Actions</div>
            </div>
            <div>
                {props.pos.map( (item, index) => {
                    return <PositionsRow key={item.symbol} item={item} id={index}  />
                })}
            </div>
        </div>
    )
}

export default PositionsTable