import React from "react";
import { useGlobal } from "reactn";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
  } from "@chakra-ui/react"

const DetailedMarketDepth = function (props) {

    const { marketDepthTable } = props
    const [ selectedAsset ] = useGlobal("selectedAsset")

    // const rowColor = function (rowSize) {
    //     if (rowSize > 50 ) {
    //         return " p-1 bg-yellow-300 "
    //     } else if (rowSize > 20) {
    //         return " p-1 bg-purple-300 "
    //     } else if (rowSize > 10) {
    //         return " p-1 bg-blue-300 "
    //     }
    // }

    // let bidCount = 0
    // let askCount = 0 
    // let bidVolume = 0 
    // let askVolume = 0
    // let countDelta = 0
    // let volumeDelta = 0
    // let table = null

    // if ( marketDepthTable ) {
    //     //console.log(marketDepthTable[marketDepthTable.length - 1])
    //     const bidSizes = []
    //     const askSizes = []
    //     marketDepthTable.map((row, index) => {
    //         if ( ! isNaN(row.bidSize)) bidSizes.push(row.bidSize)
    //         if ( ! isNaN(row.askSize)) askSizes.push(row.askSize)
    //     })
    //     //console.log("Bid Sizes", bidSizes)
    //     bidCount = bidSizes.length
    //     bidVolume = bidSizes.reduce((acc, value) => {return acc + value}, 0)
    //     askCount = askSizes.length
    //     askVolume = askSizes.reduce((acc, value) => {return acc + value}, 0)
    //     countDelta = bidCount - askCount
    //     volumeDelta = (bidVolume - askVolume) * 100
    // }

    return (
        <>
            <div>Market Depth for {selectedAsset}</div>
            {/* <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="p-1 mb-1">Bid Count: {bidCount}</span>
                    <span className="p-1 ">Bid Volume: {bidVolume}</span>
                </div>
                <div className="flex flex-col">
                    <span className={ "p-1 mb-1 " + (countDelta < 0 ? "bg-red-200" : "bg-green-200")}>Count Delta: {countDelta}</span>
                    <span className={ "p-1 "+(volumeDelta < 0 ? "bg-red-200" : "bg-green-200")}>Volume Delta: {volumeDelta}</span>
                </div>
                <div className="flex flex-col">
                    <span className="p-1 mb-1">Ask Count: {askCount}</span>
                    <span className="p-1">Ask Volume: {askVolume}</span>
                </div>
            </div> */}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>MMID</th>
                        <th>Size</th>
                        <th>Bid</th>
                        <th>Ask</th>
                        <th>Size</th>
                        <th>MMID</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        marketDepthTable ? marketDepthTable.map((row, index) => {
                            return (
                                <tr key={row.bidMMID + row.bidPrice + row.askMMID + row.askPrice}>
                                    <td>{index+1}</td>
                                    <td>{row.bidMMID}</td>
                                    <td><span >{row.bidSize}</span></td>
                                    <td>{row.bidPrice}</td>
                                    <td>{row.askPrice}</td>
                                    <td><span >{row.askSize}</span></td>
                                    <td>{row.askMMID}</td>
                                    <td>{index+1}</td>
                                </tr>
                            )
                        }) : (<tr><td>marketDepthTable undefined.</td></tr>)
                    }
                </tbody>
            </table>
        </>
    );
}

export default DetailedMarketDepth