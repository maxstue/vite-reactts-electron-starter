import React from "react"
import { useGlobal } from "reactn"
import AddCustomLevel from "./add-custom-level"
import LevelBars from "./level-bars"
import { Stack } from "@chakra-ui/react"



const Levels = function ( props ) {


    const [selectedAsset] = useGlobal("selectedAsset")
    const [levels, setLevels] = useGlobal("levels")

    // const handleLevels = React.useCallback((data)  => {
    //     const newLevels = levels
    //     newLevels[data.symbol] = data.levels
    //     setLevels(newLevels)
    // }, [])

    // React.useEffect( () => {
    //     socket.on("levels", handleLevels)

    //     return () => {
    //         socket.off("levels", handleLevels)

    //     }
    // }, [socket, handleLevels])

    //console.log(levels)

    if (selectedAsset) {
        return (
            <>
                <Stack>
                    <div className="mb-4"><LevelBars symbol={selectedAsset} /></div>
                </Stack>
                <AddCustomLevel />
            </>
            
        )
    } else {
        return <p>Bars will be displayed here</p>
    }

   

}

export default Levels

