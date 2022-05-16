import React from "react"
import * as ContextMenu from "@radix-ui/react-context-menu"
import { cx } from "@vechaiui/react"
import NewRule from "./new-rule"
import EntryOrder from "../../orders/entry-order"
import ExitOrder from "../../orders/exit-order"

const CMenu = (props) => {
    return (
        <ContextMenu.Root>
            { props.children }
        </ContextMenu.Root>
    )
}

const Trigger = (props) => {
    return (
        <ContextMenu.Trigger className="cursor-pointer block w-full">
            { props.children }
        </ContextMenu.Trigger>
    )
}

const MenuItem = (props) => {
    return (
        <ContextMenu.Item
            className={cx(
                "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-700 px-5",
                "focus:bg-neutral-100 dark:focus:bg-neutral-700"
            )}
        >
            {props.children}            
        </ContextMenu.Item>
    )
}

const MenuAction = (props) => {
    return (
        <ContextMenu.Item
            className={cx(
                "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-700 px-5",
                "focus:bg-neutral-100 dark:focus:bg-neutral-700"
            )}
        >
            <NewRule {...props} className="w-full">
                <span className="w-2 h-2 mr-4 bg-blue-500 rounded-full inline-block" />
                {props.children}
            </NewRule>
        </ContextMenu.Item>
    )
}

const Content = (props) => {
    return (
        <ContextMenu.Content  
                className={cx(
                    "z-40 min-w-max py-1 rounded-md shadow-sm outline-none bg-gray-800 text-gray-200",
                    "bg-white border border-gray-200",
                    "dark:bg-neutral-800 dark:border-gray-700"
                )}
                sideOffset={5}
                alignOffset={-5}
        >
            { props.children }
        </ContextMenu.Content>
    )
} 

const SubMenu = (props) => {
    return (
        <ContextMenu.Root>
            {props.children}
        </ContextMenu.Root>
    )
}

const SubTrigger = (props) => {
    return (
        <ContextMenu.TriggerItem
            className={cx(
                "flex items-center flex-justify w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-700",
                "focus:bg-neutral-100",
                "dark:focus:bg-neutral-700"
            )}
        >

            <div className="mr-4">{props.children}  </div>
            <div>&raquo;</div>
               
        </ContextMenu.TriggerItem>
    )
}

const EntrySubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger>{props.children || props.bias}</SubTrigger>
            <Content>
                { props.sizes.map (size => {
                    return <MenuAction {...props} key={size} numero="price" intent="entry" size={size}>{props.bias} {size}</MenuAction>
                })}
            </Content>
        </SubMenu>
    )
}

const ExitSubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger> {props.children || "Reduce"}</SubTrigger>
            <Content>
                { props.sizes.map (size => {
                    return <MenuAction {...props} key={size} numero="price" intent="exit" size={size}>Reduce {size * 100}%</MenuAction>
                })}
            </Content>
        </SubMenu>
    )
}

const VWAPSubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger>{props.menuTitle || "Indicator"}</SubTrigger>
            <Content>
                {props.showExit && (<ExitSubMenu {...props} bias={"Reduce"} sizes={[0.25, 0.5, 0.75, 1]}></ExitSubMenu>)}
                <EntrySubMenu {...props} bias={"Long"} sizes={[100, 200, 400]} ></EntrySubMenu>
                <EntrySubMenu {...props} bias={"Short"} sizes={[-100, -200, -400]}></EntrySubMenu>
            </Content>
        </SubMenu>
    )
}

const IndiSubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger>{props.menuTitle || "Indicator"}</SubTrigger>
            <Content>
                {props.showExit && (<ExitSubMenu {...props} bias={"Reduce"} sizes={[0.25, 0.5, 0.75, 1]}></ExitSubMenu>)}
                <EntrySubMenu {...props} bias={"Long"} sizes={[100, 200, 400]} ></EntrySubMenu>
                <EntrySubMenu {...props} bias={"Short"} sizes={[-100, -200, -400]}></EntrySubMenu>
            </Content>
        </SubMenu>
    )
}

const MenuEntryOrder = (props) => {
    return (
        <ContextMenu.Item
            className={cx(
                "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-700 px-5",
                "focus:bg-neutral-100 dark:focus:bg-neutral-700"
            )}
        >
            <EntryOrder {...props} className="w-full">
                <span className="w-2 h-2 mr-4 bg-blue-500 rounded-full inline-block" />
                {props.children}
            </EntryOrder>
        </ContextMenu.Item>
    )
}

const MenuExitOrder = (props) => {
    return (
        <ContextMenu.Item
            className={cx(
                "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-700 px-5",
                "focus:bg-neutral-100 dark:focus:bg-neutral-700"
            )}
        >
            <ExitOrder {...props} className="w-full">
                <span className="w-2 h-2 mr-4 bg-blue-500 rounded-full inline-block" />
                {props.children}
            </ExitOrder>
        </ContextMenu.Item>
    )
}

const EntryOrderSubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger>{props.children || props.bias}</SubTrigger>
            <Content>
                { props.sizes.map (size => {
                    return <MenuEntryOrder {...props} key={size} intent="entry" size={size}>{props.bias} {size}</MenuEntryOrder>
                })}
            </Content>
        </SubMenu>
    )
}

const ExitOrderSubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger>{props.children || props.bias}</SubTrigger>
            <Content>
                { props.sizes.map (size => {
                    return <MenuExitOrder {...props} key={size} intent="exit" size={size}>{props.bias} {size}</MenuExitOrder>
                })}
            </Content>
        </SubMenu>
    )
}

const OrderSubMenu = (props) => {
    return (
        <SubMenu>
            <SubTrigger>{props.menuTitle || "Instant Order"}</SubTrigger>
            <Content>
                {props.showExit && (<ExitOrderSubMenu {...props} bias="Reduce" sizes={[0.25, 0.5, 0.75, 1]}></ExitOrderSubMenu>)}
                <EntryOrderSubMenu {...props} bias="Long" sizes={[100, 200, 400]}></EntryOrderSubMenu>
                <EntryOrderSubMenu {...props} bias="Short" sizes={[-100, -200, -400]}></EntryOrderSubMenu>
                
            </Content>
        </SubMenu>
    )
}

export { CMenu, Trigger, Content, SubMenu, SubTrigger, MenuItem, VWAPSubMenu, IndiSubMenu, OrderSubMenu}


