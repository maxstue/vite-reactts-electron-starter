import React from "react"
import { useGlobal } from "reactn"
import { Stack } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon, CloseIcon } from "@chakra-ui/icons"
import numeral from "numeral"
import useOrder from "../orders/use-order"
import PositionPanel from "./panel"

import { CMenu, Trigger, Content, MenuItem, VWAPSubMenu, OrderSubMenu } from ".././common/menu/context-menu"


const PositionsRow = function(props) {
    const position = props.item

    const [selectedAsset, setSelectedAsset] = useGlobal("selectedAsset")
    const handleSelectedAsset = function(e) {
        setSelectedAsset(props.item.symbol)
    }

    const currentPrice = numeral(position.market_value / position.qty).format("0.00")
    const [ latestPrice, setLatestPrice ] = React.useState(currentPrice)
    // const [ uPnl, setUPnl ] = React.useState(position.unrealized_intraday_pl)
    // const [ uPnlPt, setUPnlPt ] = React.useState(position.unrealized_intraday_plpc)

    const { exitOrder } = useOrder(props.item.symbol)

    
    const handleMinuteBars = React.useCallback((data) => {
        if (data.S === props.item.symbol) {
            setLatestPrice(data.p)
            // const pnl = (data.p - position.avg_entry_price) * position.qty
            // setUPnl(pnl)
            // setUPnlPt(pnl/(position.avg_entry_price * Math.abs(position.qty)))
        }
    }, [position])

    React.useEffect(() => {
        const eventTargetRef = window.Main.on("stream", data => handleMinuteBars(data))
    }, [handleMinuteBars])

    const [showPanel, setShowPanel] = React.useState(false)
    const togglePanel = function(e) {
        e.preventDefault()
        setShowPanel (! showPanel)
    }

    return (
            <>
                <div className={"flex flex-row w-full border-b " + (selectedAsset == position.symbol ? "bg-purple-50" : "hover:bg-yellow-50")} onClick={handleSelectedAsset}>
                    <div className={"w-1/4 " + (position.side == "long" ? "bg-blue-300" : "bg-pink-300")}>
                        <CMenu>
                            <Trigger >
                                <Stack direction={"row"} className="p-2" onDoubleClick={togglePanel}>
                                    <span>{props.item.symbol}</span>
                                    <span className="font-bold">*{Math.abs(props.item.qty)}</span>
                                </Stack>
                            </Trigger>
                            <Content>
                                <OrderSubMenu
                                    menuTitle = {"Instant Order"}
                                    symbol = {props.item.symbol}
                                    showExit = {true}
                                >
                                </OrderSubMenu>
                                <VWAPSubMenu 
                                    menuTitle = {"Touches VWAP"}
                                    symbol={props.item.symbol} 
                                    levelCode={"VWAP_D"} 
                                    category={"indicator"}
                                    action = {"touches"}
                                    numero = {"price"} 
                                    type={"vwap"}
                                    latestprice={latestPrice}
                                    showExit={true}
                                > 
                                </VWAPSubMenu>
                                <VWAPSubMenu 
                                    menuTitle = {"Close Below VWAP"}
                                    symbol={props.item.symbol} 
                                    levelCode={"VWAP_D"} 
                                    category={"indicator"}
                                    action = {"closes below"}
                                    numero = {"price"} 
                                    type={"vwap"}
                                    latestprice={latestPrice}
                                    showExit={true}
                                > 
                                </VWAPSubMenu>
                                <VWAPSubMenu 
                                    menuTitle = {"Closes Above VWAP"}
                                    symbol={props.item.symbol} 
                                    levelCode={"VWAP_D"} 
                                    category={"indicator"}
                                    action = {"closes above"}
                                    numero = {"price"} 
                                    type={"vwap"}
                                    latestprice={latestPrice}
                                    showExit={true}
                                > 
                                </VWAPSubMenu>
                            </Content>
                        </CMenu>
                    </div>
                    <div className="p-2 w-1/4">
                        {/* <Stack direction="column"> 
                            
                            <span>{numeral(position.cost_basis).format("0,0")}</span>
                        </Stack> */}
                        <span className="">{numeral(position.avg_entry_price).format("0.00")}</span>
                    </div>
                    <div className="p-2 w-1/4">
                        <Stack direction="column">
                            <span className="font-semibold">{numeral(latestPrice).format("0.00")}</span>
                            <span >{numeral(position.market_value).format("0,0")}</span>
                        </Stack>
                    </div>
                    <div className="p-2 w-1/4">
                        <div className="flex flex-row justify-between">
                            {/*
                                <span className={(uPnl > 0 ? "text-green-500" : "text-red-500") + " font-semibold"}>{numeral(uPnl).format("0,0")}</span>
                                <span className={uPnl > 0 ? "text-green-500" : "text-red-500"}>{numeral(uPnlPt *100).format("0,0")  + "%"}</span>
                            */}
                            { ! showPanel && <TriangleDownIcon onClick={togglePanel} className="cursor-pointer hover:text-blue-400" /> }
                            { showPanel && <TriangleUpIcon onClick={togglePanel} className="cursor-pointer hover:text-blue-400" /> }
                            <CloseIcon onClick={() => exitOrder(1)} className="cursor-pointer hover:text-red-400" />
                        </div>
                    </div>
                </div>
                {showPanel && <PositionPanel {...props} latestPrice={latestPrice} />}
            </>
    )
}

export default PositionsRow