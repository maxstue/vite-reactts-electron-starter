import React from "react"


const Submenu = function () {

    return (
        <ContextMenu.Root>
            <ContextMenu.TriggerItem
                className={cx(
                    "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-200",
                    "focus:bg-neutral-100",
                    "dark:focus:bg-neutral-700"
                )}
            >
                <span className="flex-1 mr-2">VWAP >></span>
                
            </ContextMenu.TriggerItem>
            <ContextMenu.Content
                className={cx(
                "z-40 w-48 min-w-max py-1 rounded-md shadow-sm outline-none",
                "bg-white border border-gray-200",
                "dark:bg-neutral-800 dark:border-gray-700"
                )}
                sideOffset={5}
                alignOffset={-5}
            >
                <ContextMenu.Item
                    className={cx(
                    "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-200",
                    "focus:bg-neutral-100 dark:focus:bg-neutral-700"
                    )}
                >
                    <span className="w-2 h-2 mr-4 bg-red-500 rounded-full" />
                    Buy 100 on Touch
                </ContextMenu.Item>
                <ContextMenu.Item
                    className={cx(
                    "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-200",
                    "focus:bg-neutral-100 dark:focus:bg-neutral-700"
                    )}
                >
                    <span className="w-2 h-2 mr-4 bg-purple-500 rounded-full" />
                    Reduce 50% on Touch
                </ContextMenu.Item>
                <ContextMenu.Item
                    className={cx(
                    "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none cursor-pointer hover:bg-gray-200",
                    "focus:bg-neutral-100 dark:focus:bg-neutral-700"
                    )}
                >
                    <span className="w-2 h-2 mr-4 bg-blue-500 rounded-full" />
                    Close Position on Touch
                </ContextMenu.Item>
            </ContextMenu.Content>

        </ContextMenu.Root>
    )
}

export default Submenu