import React from "react"
import { useGlobal } from "reactn"

const TimeAndSales = function (props) {

    const [selectedAsset, setSelectedAsset] = useGlobal("selectedAsset")
    const prices = []

    const handlePrice = function (data) {
        prices.push(data)
    }

    React.useEffect( () => {
        window.Main.reset("stream")
        window.Main.on("stream", handlePrice)
        return () => {
            window.Main.reset("stream")
        }
    }, [selectedAsset])

    return (
        <>
            <p>Selected Asset</p>
            <div>
                {/* {prices.map(price => console.log(price))} */}
            </div>
        </>
    )
}

export default TimeAndSales