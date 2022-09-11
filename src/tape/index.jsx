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
// import { Tape } from "../../electron/ib/wrapper";

// type HookType = Tape[] | string | null;

const rows = 8;                         // Number of rows to display

const TimeAndSales = (props) => {

    const [selectedAsset] = useGlobal("selectedAsset");

    const [prices, setData] = React.useState(null);

    const handleData = React.useCallback((data) => {
        console.log(data);
        if (data.symbol == selectedAsset) {
            // console.log("prices", prices);
            if (prices && (prices instanceof Array)) {
                const tape = data.content;
                // for (let i = prices.length - 1; i > 0; --i) {
                //     // console.log(i);
                //     prices[i].ingressTm = prices[i - 1].ingressTm;
                //     prices[i].price = prices[i - 1].price;
                //     prices[i].size = prices[i - 1].size;
                // }
                // prices[0].ingressTm = tape.ingressTm;
                // prices[0].price = tape.price;
                // prices[0].size = tape.size;

                prices?.push(tape);
                // if (prices?.length > rows) prices?.shift();
                // let newPrices = [];
                // newPrices.push(tape);
                // for (let i = 1; i < prices.length; i++) newPrices.push(prices[i]);
                setData(prices);
                // console.log("newPrices", prices);
            }
        } else if (data.error) {
            setData(data.error);
        } else {
            // TODO: clear prices array
        }
    }, [selectedAsset]);

    React.useEffect(() => {
        window.Main.on("stream", (data) => handleData(data));
    }, [handleData]);

    if (!prices) {
        console.log("init prices");
        let prices = [];
        // for (let i = 0; i < rows; i++) prices.push({ ingressTm: i });
        setData(prices);
    }
    if (typeof prices == "string") {
        return (<p>Error: shit just happened { prices }</p>);
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
                        prices?.reverse().map((row, index) => {
                            return (
                                <Tr key={ index }>
                                    <Td>{ row.ingressTm }</Td>
                                    <Td>{ row.price }</Td>
                                    <Td>{ row.size }</Td>
                                </Tr>
                            );
                        })
                    }
                </Tbody>
            </Table>
        );
    } else {
        return (<p>Time and Sales will be displayed here, select an asset to start.</p>);
    }
};

export default TimeAndSales;