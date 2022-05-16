import React from "react"

import {
    useMenuState,
    Menu,
    MenuItem,
    MenuButton,
    MenuSeparator,
  } from "reakit/Menu";

import MenuRow from "./menu-row"

const PortionMenu = React.forwardRef((props, ref) => {
    const menu = useMenuState(); 
    return (
        <>
            <MenuButton ref={ref} {...menu} {...props}>
                Reduce
            </MenuButton>
            <Menu {...menu} aria-label="Portion" className="flex flex-col text-sm bg-white border border-gray-500 justify-start">
                <MenuRow menu={menu} {...props} size={1} />
                <MenuRow menu={menu} {...props} size={0.75} />
                <MenuRow menu={menu} {...props} size={0.5} />
                <MenuRow menu={menu} {...props} size={0.25} />
                <MenuRow menu={menu} {...props} size={0.1} />
                {/* <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">Close 100%</MenuItem>
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">Reduce 75%</MenuItem>
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">Reduce 50%</MenuItem>
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">Reduce 25%</MenuItem>
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start">Reduce 10%</MenuItem> */}
            </Menu>
        </>
    )
})

export default PortionMenu