import React from "react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
  } from "@chakra-ui/react"
import PositionsRow from "./row"

const PositionsTable = function(props) {

    return (
        <Table size="sm" colorScheme="gray">
            <Thead>
                <Tr>
                    <Th>Symbol</Th>
                    <Th>Entry($)</Th>
                    <Th>Now($)</Th>
                    <Th>uPnL</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.pos.map( (item, index) => {
                    return <PositionsRow key={item.symbol} item={item} id={index}  />
                })}
            </Tbody>
        </Table>
    )
}

export default PositionsTable