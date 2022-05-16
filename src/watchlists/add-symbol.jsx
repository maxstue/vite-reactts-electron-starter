import React from "react"
import { Button } from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { useGlobal } from "reactn"
import Axios from "axios"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Input,
    HStack
  } from "@chakra-ui/react"

const AddSymbol = function() {

    const [watchlist, setWatchlist] = useGlobal("watchlist")
    const symbolRef = React.useRef()


    const [symbol, setSymbol] = React.useState(""); 
    const popSymbol = function() {}


    const addSymboltoWatchlist = async function(e) {
        e.preventDefault(); 
      
        // setWatchlist([...watchlist, symbol])
        symbolRef.current && symbolRef.current.select()

        // const result = window.Main.sendData({
        //     type: "add-watchlist-symbol", 
        //     content: symbol
        // })

        // console.log("result", result)

        const response = await window.Main.asyncData({
            route: "watchlists/add-symbol", 
            content: symbol
        })

        console.log("response", response)
        if (response.data) { setWatchlist(response.data) }
        
    }

    const handleSymbolInput = function(e) {
        e.preventDefault();
        setSymbol(e.target.value.toUpperCase())
    }
    
    return (
        <Popover initialFocusRef = {symbolRef} placement="right" >
            <PopoverTrigger> 
                <Button colorScheme="blue" size="sm" onClick={popSymbol}><PlusSquareIcon /><span className="pl-1">Add Symbol</span></Button> 
            </PopoverTrigger>
            <PopoverContent className="p-2">
                <PopoverArrow />
                <PopoverCloseButton />
                <form onSubmit={addSymboltoWatchlist}>
                    <HStack>
                        <Input ref={symbolRef} placeholder="Type Symbol Here..." onChange={handleSymbolInput} value={symbol} />
                        <Button onClick={addSymboltoWatchlist} >Add</Button>
                    </HStack>
                </form>
            </PopoverContent>
        </Popover>
    )
}
export default AddSymbol