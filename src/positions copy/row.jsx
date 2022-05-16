import React from "react"
import { useGlobal } from "reactn"
import { Tr, Td, Checkbox, Stack, VStack, Center, Box } from "@chakra-ui/react"
import numeral from "numeral"

import { CMenu, Trigger, Content, MenuItem, VWAPSubMenu, OrderSubMenu } from ".././common/menu/context-menu"


const PositionsRow = function(props) {
    const position = props.item

    const [selectedAsset, setSelectedAsset] = useGlobal("selectedAsset")
    const handleSelectedAsset = function(e) {
        setSelectedAsset(props.item.symbol)
    }

    const currentPrice = numeral(position.market_value / position.qty).format("0.00")
    const [ latestPrice, setLatestPrice ] = React.useState(currentPrice)
    const [ uPnl, setUPnl ] = React.useState(position.unrealized_intraday_pl)
    const [ uPnlPt, setUPnlPt ] = React.useState(position.unrealized_intraday_plpc)

    
    const handleMinuteBars = React.useCallback((data) => {
        if (data.S === props.item.symbol) {
            setLatestPrice(data.p)
            const pnl = (data.p - position.avg_entry_price) * position.qty
            setUPnl(pnl)
            setUPnlPt(pnl/(position.avg_entry_price * Math.abs(position.qty)))
        }
    }, [position])

    React.useEffect(() => {
        const eventTargetRef = window.Main.on("stream", data => handleMinuteBars(data))

        // return () => {
        //     eventTargetRef.off("stream", handleMinuteBars)
        // }
    }, [handleMinuteBars])

    return (
            <>
                <Tr className={selectedAsset == position.symbol ? "bg-purple-50" : "hover:bg-yellow-50"} onClick={handleSelectedAsset}>
                    <Td className={position.side == "long" ? "bg-blue-300" : "bg-pink-300" }>
                        <CMenu>
                            <Trigger>
                                <Stack direction={"column"}>
                                    <span>{props.item.symbol}</span>
                                    <span>{props.item.qty}</span>
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
                    </Td>
                    <Td>
                        <Stack direction="column"> 
                            <span className="font-semibold">{numeral(position.avg_entry_price).format("0.00")}</span>
                            <span>{numeral(position.cost_basis).format("0,0")}</span>
                        </Stack>
                    </Td>
                    <Td>
                        <Stack direction="column">
                            <span className="font-semibold">{numeral(latestPrice).format("0.00")}</span>
                            <span >{numeral(position.market_value).format("0,0")}</span>
                        </Stack>
                    </Td>
                    <Td>
                        <Stack direction="column">
                            <span className={(uPnl > 0 ? "text-green-500" : "text-red-500") + " font-semibold"}>{numeral(uPnl).format("0,0")}</span>
                            <span className={uPnl > 0 ? "text-green-500" : "text-red-500"}>{numeral(uPnlPt *100).format("0,0")  + "%"}</span>
                        </Stack>
                    </Td>
                </Tr>
                <div className="w-full bg-blue-900">Just tryna see something here</div>
            </>
    )
}

export default PositionsRow