import React from "react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
  } from "@chakra-ui/react"
import WatchlistRow from "./row"
import { useGlobal } from "reactn"

const WatchlistTable = function(props) {

    // const [levels] = useGlobal("levels")

    // console.log(levels)

    return (
        <Table size="sm" colorScheme="gray">
            <Thead>
                <Tr>
                    <Th>Symbol</Th>
                    {/* <Th isNumeric>Price($)</Th> */}
                    <Th>ATR</Th>
                    <Th>Indicators</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.list.map( (item, index) => {
                    return <WatchlistRow key={index} item={item} id={index}  />
                })}
            </Tbody>
        </Table>
    )
}

export default WatchlistTable