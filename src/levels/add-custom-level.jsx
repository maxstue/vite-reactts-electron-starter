import React from "react"
import { useGlobal } from "reactn"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    HStack,
    Input
  } from '@chakra-ui/react'
import { PlusSquareIcon } from "@chakra-ui/icons"
import { v4 as uuid } from "uuid"

const AddCustomLevel = function(props) {

    const levelRef = React.useRef()
    const [level, setLevel] = React.useState()
    const [isOpen, setIsOpen] = React.useState(false)
    const [inflections, setInflections] = useGlobal("inflections")
    const [selectedAsset] = useGlobal("selectedAsset")
    const [levelName, setLevelName] = React.useState()

    const [ levels, setLevels ] = useGlobal("levels")

    const addCustomLevel = async function(e) {

        const id = uuid()
        const data = {
            id: id,  
            symbol: selectedAsset,
            value: level,   
            type: "custom", // "daily", "ma"
            category: "level", // "indicator", "candle"
            code: "CUSTOM_" + id, // "PP", EMA_20", "TD_UP_6"
            name: levelName || "Level",
            bgcolor: "", 
            textcolor: "",
            status: "active",
            display: 1,
            created: Date.now(),
        }

        const response = window.Main.asyncData({
            route: "levels/new",
            content: data
        })
        
        if (response.data) {
            const newLevels = levels 
            if ( ! levels[selectedAsset]) { newLevels[selectedAsset] = [] }
            newLevels[selectedAsset].push(data)
            setLevels(newLevels)
        }
        
        
        // const levels = newInflections[selectedAsset].levels
        // console.log(newInflections[selectedAsset])
        // if ( ! levels || levels.length < 1) newInflections[selectedAsset].levels = []
        // newInflections[selectedAsset].levels.push(data)
        // setInflections(newInflections)

        // setIsOpen(false)

    }

    const handleLevelInput = function(e) {
        e.preventDefault()
        setLevel(e.target.value)
    }

    const handleNameInput = function(e) {
        e.preventDefault()
        setLevelName(e.target.value)
    }

    return (
        <>
            <Popover className="" initialFocusRef = {levelRef} placement={"right"}>
                <PopoverTrigger> 
                    <Button size="sm" colorScheme={"teal"}><PlusSquareIcon /><span className="pl-1">Add Level</span></Button> 
                </PopoverTrigger>
                <PopoverContent className="p-2">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <form onSubmit={addCustomLevel}>
                        <HStack>
                            <Input ref={levelRef} size="sm" placeholder="Numeric values only..." onChange={handleLevelInput} value={level || "0"} />
                            <Input onChange={handleNameInput} placeholder="Name" value={levelName || ""} />
                            <Button onClick={addCustomLevel} >Add</Button>
                        </HStack>
                    </form>
                </PopoverContent>
            </Popover>
        </>

    )
}

export default AddCustomLevel