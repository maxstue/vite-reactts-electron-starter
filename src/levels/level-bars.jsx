import React from "react"
import { useGlobal } from "reactn"
import { Stack } from "@chakra-ui/react"
import Bar from "./bar"
import numeral from "numeral"

export default function LevelBars (props) {

    const [levels, setLevels] = useGlobal("levels")
    const [ latestPrice, setLatestPrice ] = React.useState(0) 
    const [ selectedAsset ] = useGlobal("selectedAsset")

    const handlePrice = React.useCallback((data) => {
        
        // if (data.S === props.symbol) {
        //     setLatestPrice(numeral(data.p).format("0.00"))
        // } 
        if (data.S == selectedAsset) {
            // console.log("Latest Price Before Setting", latestPrice)
            setLatestPrice(latestPrice => data.p)
            // console.log("selected asset", selectedAsset)
            // console.log("Data", data)
            // console.log("Data Symbol", data.S)
            // console.log("Data Closing Price", data.c)
            // console.log("Latest Price After Setting", latestPrice)
        }
    }, [selectedAsset])

    // // React.useEffect( () => {
    // //     socket.on("alpaca-T", handlePrice)

    // //     return () => {
    // //         socket.off("alpaca-T", handlePrice)
    // //     }
    // // }, [socket, handlePrice])

    React.useEffect( () => {
        window.Main.reset("stream")
        window.Main.on("stream", handlePrice)
        return () => {
            window.Main.reset("stream")
        }
    }, [selectedAsset])
    
    let items = [{
        id: "price",
        value: latestPrice, 
        name: props.symbol + " Price",
        bgcolor: "bg-gray-400",
        type: "price"
    }]
    if (levels && levels[props.symbol] && levels[props.symbol].length > 0 ) {
        items = [...items, ...levels[props.symbol]].sort((a,b) => b.value - a.value)
    }
    

    return (
        <>
            <div className="text-xl font-semibold mb-2"> {props.symbol}</div>
            <Stack>
                {
                    items.map((level) => {
                        return <Bar key={level.id} level={level} latestprice={latestPrice}  />
                    })
                }
            </Stack>
        </>
    )
}