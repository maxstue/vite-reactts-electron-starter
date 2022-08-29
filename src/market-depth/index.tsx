import React from "react";
import { useGlobal } from "reactn";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import { MarketDephRow } from "../../electron/ib/wrapper";

const MarketDepth = (props: any) => {

    const [selectedAsset] = useGlobal("selectedAsset" as never);

    const [marketDepthTable, setMarketDepthTable] = React.useState(null as any);

    const handleMarketDepth = React.useCallback((data) => {
        // console.log(data);
        // console.log(data.symbol);
        // console.log(data.content);
        if (data.symbol == selectedAsset) {
            setMarketDepthTable(data.content);
        } else if (data.error) {
            setMarketDepthTable(data.error);
        } else {
            setMarketDepthTable(null);
        }
    }, [selectedAsset]);

    React.useEffect(() => {
        window.Main.on("market-depth", (data) => handleMarketDepth(data));
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
                        marketDepthTable ? marketDepthTable.map((row: MarketDephRow, index: number) => {
                            return (
                                <Tr key={index}>
                                    <Td>{row.bidMMID}</Td>
                                    <Td>{row.bidSize}</Td>
                                    <Td>{row.bidPrice}</Td>
                                    <Td>{row.askPrice}</Td>
                                    <Td>{row.askSize}</Td>
                                    <Td>{row.askMMID}</Td>
                                </Tr>
                            );
                        }) : (<Tr><Td>marketDepthTable undefined.</Td></Tr>)
                    }
                </Tbody>
            </Table>
        );
    } else {
        return (<p>Market depth will be displayed here, select an asset to start.</p>);
    }

};

export default MarketDepth;