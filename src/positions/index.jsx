import React from "react"
import { useGlobal } from "reactn"
import PositionsTable from "./table"

const Positions = function () {

    const [ positions, setPositions ] = useGlobal("positions")
    const [ updatePositions ] = useGlobal("updatePositions")

    // const handlePositions = React.useCallback(data => {
    //     setPositions(data)
    // }, [])

    // React.useEffect(() => {
    //     socket.on("positions", handlePositions)

    //     return () => {
    //         socket.off("positions", handlePositions)
    //     }
    // })

    React.useEffect( async () => {
        const response = await window.Main.asyncData(
            {
                route: "positions/get-many"
            }
        )
        if (response.data) setPositions(response.data)
    }, [ updatePositions ])

    if (positions && positions.length > 0) {
        return <PositionsTable pos={positions} />
    } else {
        return <div className="mt-2 p-2">No positions created yet</div>
    }
}



export default Positions 