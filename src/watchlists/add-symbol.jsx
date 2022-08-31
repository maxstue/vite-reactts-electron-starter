import React from "react"
import { Button } from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { useGlobal } from "reactn"
import Axios from "axios"
import { useToast } from "@chakra-ui/react"

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
    const toast = useToast()


    const [symbol, setSymbol] = React.useState(""); 
    const [symbolHighlight, setSymbolHighlight] = useGlobal("symbolHighlight")
    const popSymbol = function() {}


    const addSymboltoWatchlist = async function(e) {
        e.preventDefault(); 
      
        symbolRef.current && symbolRef.current.select()

        //Check for symbol uniqueness
        setSymbolHighlight("")
        if (watchlist.find(asset => asset.symbol == symbol)) {
            toast({
                title: "Duplicate Symbol", 
                description: "This symbol already exists in the watchlist",
                status: "error",
                duration: 2000
            })
            setSymbolHighlight(symbol)
            return 
        }

        const response = await window.Main.asyncData({
            route: "watchlists/add-symbol", 
            content: symbol
        })

        if (response.data) { 
            setWatchlist(response.data) 
            const hydrateResponse = await window.Main.asyncData({
                route: "watchlists/hydrate-symbol", 
                content: symbol
            })
            if (hydrateResponse.data) {
                setWatchlist(hydrateResponse.data)
            }
            toast({
                    status: hydrateResponse.status,
                    description: hydrateResponse.content,
                    duration: 2000
            })
        }
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