import React from "react"
import { useGlobal } from "reactn"
import useOrder from "./use-order"
import { useHotkeys } from "react-hotkeys-hook"


export default function useHotkeyOrders () {

    const [selectedAsset] = useGlobal("selectedAsset")
    const { entryOrder, exitOrder } = useOrder(selectedAsset)
   

    
        useHotkeys("ctrl+q", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for long 100 - CTRL+Q")
            entryOrder(100)
        }, [selectedAsset])
    
        useHotkeys("ctrl+a", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for long 200 - CTRL+A")
            entryOrder(200)
        }, [selectedAsset])
    
        useHotkeys("ctrl+z", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for long 400 - CTRL+Z")
            entryOrder(400)
        }, [selectedAsset])
    
        useHotkeys("ctrl+p", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for short 100 - CTRL+P")
            entryOrder(-100)
        }, [selectedAsset])
    
        useHotkeys("ctrl+l", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for short 200 - CTRL+L")
            entryOrder(-200)
        }, [selectedAsset])
    
        useHotkeys("ctrl+,", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for short 400 - CTRL+,")
            entryOrder(-400)
        }, [selectedAsset])
    
        useHotkeys("ctrl+space", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for reduce 25% - CTRL+SPACE")
            exitOrder(0.25)
        }, [selectedAsset])
    
        useHotkeys("ctrl+v", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for reduce 50% - CTRL+V")
            exitOrder(0.5)
        }, [selectedAsset])
    
        useHotkeys("ctrl+b", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for reduce 76% - CTRL+B")
            exitOrder(0.75)
        }, [selectedAsset])
    
        useHotkeys("ctrl+n", (e) => {
            e.preventDefault()
            console.log("hotkey pressed for reduce 100% - CTRL+N")
            exitOrder(1)
        }, [selectedAsset])

    
    

    // useHotkeys("ctrl+z", (e) => {
    //     e.preventDefault()
    //     console.log("hotkey pressed for long 400 - CTRL+A")
    // })

    return null
}