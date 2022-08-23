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
import { Tape } from "../../electron/ib/wrapper";

type HookType = Tape[] | string;

const TimeAndSales = (props: any) => {

    const [selectedAsset] = useGlobal("selectedAsset" as never);

    let [prices, setPrices] = React.useState([] as HookType);

    const handlePrice = React.useCallback((data) => {
        console.log(data);
        console.log(prices.length);
        if (data.symbol == selectedAsset) {
            if (prices) {
                setPrices([...prices, data.content]);
            } else {
                setPrices([data.content]);
            }
        } else if (data.error) {
            setPrices(data.error);
        } else {
            setPrices([]);
        }
        console.log(prices.length);
        console.log(prices);
    }, [selectedAsset]);

    // React.useEffect(() => {
    //     window.Main.reset("stream");
    //     window.Main.on("stream", handlePrice);
    //     return () => {
    //         window.Main.reset("stream");
    //     };
    // }, [ selectedAsset ]);
    React.useEffect(() => {
        window.Main.on("stream", data => handlePrice(data));
    }, [handlePrice]);

    if (typeof prices == "string") {
        return (<p>Error: {prices}</p>);
    } else if (selectedAsset) {
        return (
            <Table size="sm" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Time</Th>
                        <Th>Price</Th>
                        <Th>Size</Th>
                    </Tr>
                </Thead><Tbody>
                    {
                        prices ? prices.reverse().map((row, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{row.ingressTm}</Td>
                                    <Td>{row.price}</Td>
                                    <Td>{row.size}</Td>
                                </Tr>
                            );
                        }) : (<Tr><Td>prices table undefined.</Td></Tr>)
                    }
                </Tbody>
            </Table>
        );
    } else {
        return (<p>Time and Sales will be displayed here, select an asset to start.</p>);
    }
};

export default TimeAndSales;