import React from "react"
import { useGlobal } from "reactn"
import useOrder from "../orders/use-order"
import { LockIcon, UnlockIcon, RepeatIcon, EditIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons"
import LevelBars from "../levels/level-bars"

const PositionPanel = function(props) {

    const {entryOrder, exitOrder} = useOrder(props.item.symbol)
    const [orders] = useGlobal("orders")
    const [rules, setRules] = useGlobal("rules")
    
    const symbolOrders = orders.filter(order => order.symbol === props.item.symbol).reverse()
    const symbolRules = rules.filter(rule => rule.symbol === props.item.symbol).reverse().slice(0,5)

    const toggleRuleStatus = function(rule) {
        if ( rule.status != "active") {
            rule.numeroState = props.latestPrice //TODO: modify this to handle cases where numero is not price
            const latestDenomoLevel = levels[props.item.symbol].find(level => level.code == rule.denomo)
            if (latestDenomoLevel) rule.denomoState = latestDenomoLevel.value
        }
        rule.status = rule.status == "active" ? "disabled" : "active";
        updateRules(rule)
    }

    const toggleRuleBind = function(rule) {
        rule.bind = rule.bind ? 0 : 1; 
        updateRules(rule)
    }

    const editRule = function(rule) {

    }

    const updateRules = async function(rule) {
        console.log("about to edit rule")
        
        const response = await window.Main.asyncData({
            route: "rules/edit",
            content: rule
        })

        if (response.data) {
            console.log(response.data)
            const newRules = rules.map(rule => {
                if (rule.id == response.data.id) { return response.data }
                return rule
            })
            console.log("new rules", newRules)
            setRules(newRules)
        }
    }

    return (
        <div className="w-full bg-gray-700 p-1 text-gray-300 flex flex-row text-[0.6rem] h-24">
            {/* <div className="w-2/5">
                <div className="bg-gray-800 mr-1 p-1 pb-2 flex flex-col scrollbar-hide overflow-y-auto cursor-ns-resize h-16">
                    {
                        symbolRules.map(rule => {
                            return <div
                                        key={rule.id}
                                        title={new Date(rule.updated || rule.created).toLocaleString()}
                                        className={"flex flex-row justify-between hover:bg-gray-700 " + (rule.bias == "reduce" ? "text-purple-300" : "text-blue-300") + (rule.status == "active" ? "" : "text-gray-500")}
                                    >
                                        <div className="">
                                            {rule.numero}&nbsp;
                                            <span className="uppercase">{rule.action[0]}&nbsp;</span>
                                            <span className="lowercase">{rule.type == "custom"? rule.denomoState : rule.denomo}</span>&nbsp;
                                            <span className="uppercase font-semibold underline">{rule.bias[0]}{rule.size}</span>
                                        </div>
                                        <div >
                                            {rule.status == "active" && <span className="mr-1 cursor-pointer hover:text-yellow-200" title="Disable Rule" onClick={()=>toggleRuleStatus(rule)}><ViewOffIcon /></span>}
                                            {rule.status != "active" && <span className="mr-1 cursor-pointer text-gray-500 hover:text-yellow-200" title="Enable Rule" onClick={()=>toggleRuleStatus(rule)}><ViewIcon /></span>}
                                            <span className="mr-1 cursor-pointer text-gray-500 hover:text-yellow-200" title="Edit Rule"><EditIcon /></span>
                                            {rule.bind != 1 && (<span className="cursor-pointer text-gray-500 hover:text-yellow-200" title="Bind Rule to Position" onClick={() => toggleRuleBind(rule)}><UnlockIcon /></span>)}
                                            {rule.bind == 1 && (<span className="cursor-pointer hover:text-yellow-200" title="Unbind Rule" onClick={() => toggleRuleBind(rule)}><LockIcon /></span>)}                                          
                                        </div>
                                   </div>
                        })
                    }
                </div>
                <div className="flex flex-row mr-1 justify-between">
                    <span className="px-2 pb-1 bg-gray-800 font-semibold cursor-pointer">All</span>&nbsp; 
                    <span className="px-1 cursor-pointer hover:text-yellow-400">Active</span>&nbsp;
                    <span className="px-1 cursor-pointer hover:text-yellow-400">Inactive</span>&nbsp;
                </div>
            </div> */}
            <div className="">
                <div className="flex flex-row mr-1 justify-between">
                    <span className="px-2 bg-gray-800 font-semibold cursor-pointer">All</span>&nbsp; 
                    <span className="px-1 cursor-pointer hover:text-yellow-400">Filled</span>&nbsp;
                    <span className="px-1 cursor-pointer hover:text-yellow-400">UnF</span>&nbsp;
                </div>
                <div className="bg-gray-800 mr-1 p-1 pb-2 flex flex-col scrollbar-hide overflow-y-scroll h-16 cursor-ns-resize">
                    {
                        symbolOrders.map(order => {
                            return <span 
                                        key={order.id} 
                                        className={" " + (order.side == "buy" ? "text-green-300" : "text-red-300")}
                                        title={order.created_at}
                                    >
                                        {order.side[0]} 
                                        {order.qty}&nbsp; 
                                        {order.type[0]}&nbsp;
                                        {order.status}&nbsp;
                                        {parseInt(order.filled_qty)? order.filled_qty : null}
                                    </span>
                        })
                    }
                </div>

            </div>
            <div className="">
                <div className="bg-gray-800 mb-2 flex flex-row justify-between font-semibold">
                    <div className="flex flex-col m-1">
                        <span className="bg-green-700 hover:bg-green-800 cursor-pointer p-1 mb-1 " onClick={()=>entryOrder(100)}>L100</span>
                        <span className="bg-green-700 hover:bg-green-800 cursor-pointer p-1 mb-1" onClick={()=>entryOrder(200)}>L200</span>
                        <span className="bg-green-700 hover:bg-green-800 cursor-pointer p-1" onClick={()=>entryOrder(400)}>L400</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="bg-purple-700 hover:bg-purple-800 cursor-pointer p-1 mb-1" onClick={()=>exitOrder(0.25)}>R25%</span>
                        <span className="bg-purple-700 hover:bg-purple-800 cursor-pointer p-1 mb-1" onClick={()=>exitOrder(0.5)}>R50%</span>
                        <span className="bg-purple-700 hover:bg-purple-800 cursor-pointer p-1" onClick={()=>exitOrder(0.75)}>R75%</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="bg-red-700 hover:bg-red-800 cursor-pointer p-1 mb-1" onClick={()=>entryOrder(-100)}>S100</span>
                        <span className="bg-red-700 hover:bg-red-800 cursor-pointer p-1 mb-1" onClick={()=>entryOrder(-200)}>S200</span>
                        <span className="bg-red-700 hover:bg-red-800 cursor-pointer p-1" onClick={()=>entryOrder(-400)}>S400</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="bg-purple-700 hover:bg-purple-800 cursor-pointer p-1 mb-1" onClick={()=>exitOrder(1, "s", {stopPrice: props.item.avg_entry_price})}>stBE</span>
                        <span className="bg-purple-700 hover:bg-purple-800 cursor-pointer p-1 mb-1" onClick={()=>exitOrder(1, "s", {stopPrice: position.side == "long" ? props.item.latestPrice - 1 : props.item.latestPrice + 1})}>st$1</span>
                        <span className="bg-purple-700 hover:bg-purple-800 cursor-pointer p-1" onClick={()=>exitOrder(1, "s", {stopPrice: position.side == "long" ? props.item.latestPrice - 0.5 : props.item.latestPrice + 0.5})}>st50c</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="bg-yellow-700 hover:bg-yellow-800 cursor-pointer p-1 mb-1" onClick={()=>exitOrder(1, "tr", {trailPrice: Math.abs(props.item.latestPrice - props.item.avg_entry_price)})}>trBE</span>
                        <span className="bg-yellow-700 hover:bg-yellow-800 cursor-pointer p-1 mb-1" onClick={()=>exitOrder(1, "tr", {trailPrice: 1})}>tr$1</span>
                        <span className="bg-yellow-700 hover:bg-yellow-800 cursor-pointer p-1" onClick={()=>exitOrder(1, "tr", {trailPrice: 0.5})}>tr50c</span>
                    </div>
                </div>
                <div className="bg-gray-800"></div>
            </div>
        </div>
    )
}

export default PositionPanel