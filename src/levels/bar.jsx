import React from "react"
import { useGlobal } from "reactn"

import { CMenu, Trigger, Content, MenuItem, IndiSubMenu } from ".././common/menu/context-menu"

import { DeleteIcon, EditIcon, SunIcon } from "@chakra-ui/icons"
import numeral from "numeral"

const Bar = function(props) {


    const { level, latestprice } = props
    const [ levels, setLevels ] = useGlobal("levels")

    const handleDelete = (level) => {
        // socket.emit("delete-level", {symbol: level.symbol, id: level.id})

        // const symbolLevels = levels[level.symbol]
        // const newSymbolLevels = symbolLevels.filter(item => item.id !== level.id)
        // const newLevels = levels 
        // newLevels[level.symbol] = newSymbolLevels
        // setLevels(newLevels)

        const response = window.Main.asyncData( {
            route: "levels/delete",
            data: level
        })

        if (response) {
            const symbolLevels = levels[level.symbol]
            const newSymbolLevels = symbolLevels.filter(item => item.id !== level.id)
            const newLevels = levels 
            newLevels[level.symbol] = newSymbolLevels
            setLevels(newLevels)
        }
    }

    const turnOffDisplay = () => socket.emit("edit-level", {symbol: level.symbol, id: level.id, display: 0})

    const bgcolor = level.bgcolor ? level.bgcolor : "bg-gray-300"
    const textcolor = level.textcolor ? level.textcolor : ""

    const menuItemClass = "submenu hover:bg-purple-200 mb-1 p-2 px-4 justify-start"

    return (
        <div className={`${bgcolor} ${textcolor} flex flex-row justify-between p-2 cursor-pointer hover:bg-purple-200`}>
             

            <CMenu>
                <Trigger><div className="w-full focus:bg-purple-200">{level.name} - {numeral(level.value).format("0.00")}</div> </Trigger>
                { level.type !== "price" && (
                <Content>
                    <IndiSubMenu
                        menuTitle ={"Price Touches " + level.name}
                        symbol = {level.symbol}
                        level = {level}
                        category = {"indicator"}
                        action = {"touches"}
                        numero = {"price"}
                        type={level.type}
                        latestprice={latestprice}
                        showExit = {true}
                    ></IndiSubMenu>
                    <IndiSubMenu
                        menuTitle ={"Price Closes Above " + level.name}
                        symbol = {level.symbol}
                        level = {level}
                        category = {"indicator"}
                        action = {"closes above"}
                        numero = {"price"}
                        type={level.type}
                        latestprice={latestprice}
                        showExit = {true}
                    ></IndiSubMenu>
                    <IndiSubMenu
                        menuTitle ={"Price Closes Below " + level.name}
                        symbol = {level.symbol}
                        level = {level}
                        category = {"indicator"}
                        action = {"closes below"}
                        numero = {"price"}
                        type={level.type}
                        latestprice={latestprice}
                        showExit = {true}
                    ></IndiSubMenu>
                </Content>
                )}
            </CMenu>
            <div>
                {/* <MenuButton {...menu} className="w-full">
                    <div className="w-full">{level.name} - {numeral(level.value).format("0.00")}</div> 
                </MenuButton> */}
                {/* <Menu {...menu} aria-label="Main-Menu" className="flex flex-col z-50 text-sm bg-white border border-gray-500 justify-start">
                    <MenuItem as={TouchesMenu} className={menuItemClass} {...menu} {...props} numero="price" action="touches" />
                    <MenuItem as={TouchesMenu} className={menuItemClass} {...menu} {...props} numero="price" action="closes below" />
                    <MenuItem as={TouchesMenu} className={menuItemClass} {...menu} {...props} numero="price" action="closes above" />
                    { level.type == "indicator" && (
                        <>
                            <MenuSeparator {...menu} />
                            <MenuItem className={menuItemClass} {...menu} {...props} numero={"VWAP"}>VWAP Crosses {level.name} </MenuItem>
                            <MenuItem className={menuItemClass} {...menu} {...props} numero={"EMA_9"}>EMA_9 Crosses {level.name} </MenuItem>
                            <MenuItem className={menuItemClass} {...menu} {...props} numero={"EMA_20"}>EMA_20 Crosses {level.name} </MenuItem>
                            <MenuItem className={menuItemClass} {...menu} {...props} numero={"SMA_50"}>SMA_50 Crosses {level.name} </MenuItem>
                            <MenuItem className={menuItemClass} {...menu} {...props} numero={"SMA_200"}>SMA_200 Crosses {level.name} </MenuItem>
                        </>
                    )}
                </Menu> */}
            </div>
            <div className="flex flex-row text-xs">
                { (level.type == "custom") && <div className="mr-2 cursor-pointer hover:text-red-500" onClick={() => handleDelete(level)}><DeleteIcon /></div>}
            </div>
        </div>
    )
}

export default Bar