import React from "react"

import {
    useMenuState,
    Menu,
    MenuItem,
    MenuButton,
    MenuSeparator,
  } from "reakit/Menu";

  import SizeMenu from "./size-menu";
  import PortionMenu from "./portion-menu"

  const TouchesMenu = React.forwardRef((props, ref) => {
    const menu = useMenuState()
    return (
        <>
            <MenuButton ref={ref} {...menu} {...props}>
                Price {props.action} {props.level.name}
            </MenuButton>
            <Menu {...menu} aria-label={"Main-Submenu-"+props.level.code} className="flex flex-col text-sm bg-white border border-gray-500 justify-start">
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start" as={SizeMenu} intent="entry" bias="Long">Long</MenuItem>
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start" as={SizeMenu} intent="entry" bias="Short">Short</MenuItem>
                <MenuItem {...menu} {...props} className="submenu hover:bg-purple-200 mb-1 p-2 justify-start" as={PortionMenu} intent="exit" bias="Reduce">Reduce</MenuItem>
                <MenuSeparator {...menu} />
                <MenuItem {...menu} {...props} disabled className="submenu hover:bg-purple-200 mb-1 p-2 justify-start"> Flip </MenuItem>
            </Menu>
        </>
    )
  })

  export default TouchesMenu
