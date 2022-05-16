import React from "react"

import {
    useMenuState,
    Menu,
    MenuItem,
    MenuButton,
    MenuSeparator,
  } from "reakit/Menu";


import MenuRow from "./menu-row"

const SizeMenu = React.forwardRef((props, ref) => {
    const menu = useMenuState(); 
    return (
        <>
            <MenuButton ref={ref} {...menu} {...props}>
                {props.bias}
            </MenuButton>
            <Menu {...menu} aria-label="Size" className="flex flex-col text-sm bg-white border border-gray-500 justify-start">
                <MenuRow menu={menu} {...props} size={5} />
                <MenuRow menu={menu} {...props} size={10} />
                <MenuRow menu={menu} {...props} size={20} />
                <MenuRow menu={menu} {...props} size={40} />
                <MenuRow menu={menu} {...props} size={80} />
                {/* <MenuItem {...menu} className="hover:bg-purple-200 mb-1 p-2 justify-start">{props.intent} 5</MenuItem>
                <MenuItem {...menu} className="hover:bg-purple-200 mb-1 p-2 justify-start">{props.intent} 10</MenuItem>
                <MenuItem {...menu} className="hover:bg-purple-200 mb-1 p-2 justify-start">{props.intent} 20</MenuItem>
                <MenuItem {...menu} className="hover:bg-purple-200 mb-1 p-2 justify-start">{props.intent} 40</MenuItem>
                <MenuItem {...menu} className="hover:bg-purple-200 mb-1 p-2 justify-start">{props.intent} 80</MenuItem> */}
                {/* <MenuItem {...menu} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">{props.type} 200</MenuItem>
                <MenuItem {...menu} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">{props.type} 400</MenuItem>
                <MenuItem {...menu} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">{props.type} 800</MenuItem> */}
            </Menu>
        </>
    )
})

export default SizeMenu