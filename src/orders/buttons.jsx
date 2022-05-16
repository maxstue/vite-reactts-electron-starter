import React from "react"
import { useGlobal } from "reactn"
import { HStack, VStack, Button, useToast, Center } from "@chakra-ui/react"
import useOrder from "./use-order"

const Buttons = function (props) {

    const [ selectedAsset ] = useGlobal("selectedAsset")

    const { entryOrder, exitOrder } = useOrder()

    return (
        <>
            <Center><div className="text-2xl font-semibold mb-2">{selectedAsset}</div></Center>
            { ! selectedAsset && (<p className="mb-2">Select an asset in the watchlist to activate buttons</p>)}
            <HStack>
                <VStack>
                    { [50, 100, 200, 400, 800].map( size => {
                        return <Button colorScheme="green" key={size} disabled={ ! selectedAsset } onClick={(e) => entryOrder(size)}>Long {size}</Button>
                    })}
                </VStack>
                <VStack>
                    { [-50, -100, -200, -400, -800].map( size => {
                        return <Button colorScheme="red" disabled={ ! selectedAsset } onClick={(e) => entryOrder(size)} key={size}>Short {Math.abs(size)}</Button>
                    })}
                </VStack>
                <VStack>
                    { [1, 0.75, 0.5, 0.25, 0.1].map( portion => {
                        return <Button colorScheme="purple" disabled={ ! selectedAsset } onClick={(e) => exitOrder(portion)} key={portion}>Close {portion*100}%</Button>
                    })}
                </VStack>
            </HStack> 
        </>
    )
}

export default Buttons