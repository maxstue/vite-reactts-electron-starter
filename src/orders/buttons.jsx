import React from "react"
import { useGlobal } from "reactn"
import { HStack, VStack, Button, useToast, Center } from "@chakra-ui/react"
import useOrder from "./use-order"

const Buttons = function (props) {

    const [ selectedAsset ] = useGlobal("selectedAsset")
    const [ positions ] = useGlobal("positions")
    const [ assetPosition, setAssetPosition ] = React.useState(null)

    React.useEffect( () => {
        const newAssetPosition = positions.find(position => position.symbol == selectedAsset)
        setAssetPosition(newAssetPosition)
    }, [selectedAsset, positions])

    const { entryOrder, exitOrder } = useOrder()

    const customOrder = function(e, tactic) {
        e.preventDefault()
        if (tactic === 1) {
            const firstProfitTarget = 0.2
            const secondProfitTarget = 0.5 
            if (assetPosition.side == "long") {
                exitOrder(0.25, "s", {stopPrice: assetPosition.avg_entry_price + firstProfitTarget})
                exitOrder(0.5, "s", {stopPrice: assetPosition.avg_entry_price + secondProfitTarget})
            } else {
                exitOrder(0.25, "s", {stopPrice: assetPosition.avg_entry_price - firstProfitTarget})
                exitOrder(0.5, "s", {stopPrice: assetPosition.avg_entry_price - secondProfitTarget})
            }
        }
    }

    return (
        <>
            <Center><div className="text-2xl font-semibold mb-2">{selectedAsset}</div></Center>
            { ! selectedAsset && (<p className="mb-2">Select an asset in the watchlist to activate buttons</p>)}
            <HStack>
                <VStack>
                    { [100, 200, 400, 800].map( size => {
                        return <Button colorScheme="green" key={size} disabled={ ! selectedAsset } onClick={(e) => entryOrder(size)}>Long {size}</Button>
                    })}
                </VStack>
                <VStack>
                    { [-100, -200, -400, -800].map( size => {
                        return <Button colorScheme="red" disabled={ ! selectedAsset } onClick={(e) => entryOrder(size)} key={size}>Short {Math.abs(size)}</Button>
                    })}
                </VStack>
                <VStack>
                    { [0.75, 0.5, 0.25, 0.1].map( portion => {
                        return <Button colorScheme="purple" disabled={ ! selectedAsset } onClick={(e) => exitOrder(portion)} key={portion}>Close {portion*100}%</Button>
                    })}
                </VStack>
                <VStack>
                    <Button colorScheme="yellow" disabled={ ! selectedAsset && assetPosition } onClick={(e) => customOrder(e, 1)}>20c50c</Button>
                </VStack>
            </HStack> 
        </>
    )
}

export default Buttons