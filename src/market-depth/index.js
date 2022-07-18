import React from "react"
import { useGlobal } from "reactn"


const MarketDepth = function() {

    const [ selectedAsset ] = useGlobal("selectedAsset")

    const [ marketDepthTable, setMarketDepthTable ] = React.useState(null)

    const handleMarketDepth = React.useCallback((data) => {
        //1. Check if incoming data corresponds to the currently selected synbol
        // if ( data.symbol == selectedAsset) {
            //2. Populate state of market depth table
            // setMarketDepthTable(data.content) 
        // }
       
    }, [selectedAsset])

    React.useEffect( () => {
        window.Main.on("market-depth", data => handleMarketDepth(data))
    }, [handleMarketDepth])


    return (
        <>
            <table>
                <tr>
                    <th>MMID</th>
                    <th>Size</th>
                    <th>Bid</th>
                    <th>Ask</th>
                    <th>Size</th>
                    <th>MMID</th>
                </tr>
                {marketDepthTable.map( row => {
                    return (
                        <tr>
                            <td>{row.bidMMID}</td>
                            <td>{row.bidSize}</td>
                            <td>{row.bidPrice}</td>
                            <td>{row.askPrice}</td>
                            <td>{row.askSize}</td>
                            <td>{row.askMMID}</td>
                        </tr>
                    )
                })}   
            </table>
        
        </>
    )

}

export default MarketDepth