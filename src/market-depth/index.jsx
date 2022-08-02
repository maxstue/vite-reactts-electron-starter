import React from "react";
import { useGlobal } from "reactn";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
  } from "@chakra-ui/react"

const MarketDepth = function() {

    const [ selectedAsset ] = useGlobal("selectedAsset");

    const [ marketDepthTable, setMarketDepthTable ] = React.useState(null);

    const handleMarketDepth = React.useCallback((data) => {
        console.log(data);
        console.log(data.symbol);
        console.log(data.content);
        //1. Check if incoming data corresponds to the currently selected synbol
        // if ( data.symbol == selectedAsset) {
            //2. Populate state of market depth table
            // setMarketDepthTable(data.content) 
        // }
        if (data.symbol == selectedAsset) {
            setMarketDepthTable(data.content);
        } else if (data.error) {
            setMarketDepthTable(data.error);
        } else {
            setMarketDepthTable(null);
        }
    }, [selectedAsset]);

    React.useEffect( () => {
        window.Main.on("market-depth", data => handleMarketDepth(data));
    }, [handleMarketDepth]);

    // console.log(typeof marketDepthTable);
    if (typeof marketDepthTable == "string") {
        return (<p>Error: {marketDepthTable}</p>);
    } else if (selectedAsset) {
        return (
            <Table size="sm" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>MMID</Th>
                        <Th>Size</Th>
                        <Th>Bid</Th>
                        <Th>Ask</Th>
                        <Th>Size</Th>
                        <Th>MMID</Th>
                    </Tr>
                </Thead><Tbody>
                    {
                        marketDepthTable ? marketDepthTable.map((row, index) => {
                            return (
                                <Tr key={index}>
                                    <td>{row.bidMMID}</td>
                                    <td>{row.bidSize}</td>
                                    <td>{row.bidPrice}</td>
                                    <td>{row.askPrice}</td>
                                    <td>{row.askSize}</td>
                                    <td>{row.askMMID}</td>
                                </Tr>
                            )
                        }) : (<Tr><td>marketDepthTable undefined.</td></Tr>)
                    }
                </Tbody>
            </Table>
        );
    } else {
        return (<p>Market depth will be displayed here, select an asset to start.</p>);
    }

}

export default MarketDepth;