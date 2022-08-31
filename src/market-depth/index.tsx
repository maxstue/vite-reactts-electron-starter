import React from "react";
import { useGlobal } from "reactn";


  import DetailedMarketDepth from "./detailed"

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
        window.Main.on("market-depth", data => handleMarketDepth(data));

    }, [handleMarketDepth]);

    //console.log("selected asset", selectedAsset)

    // console.log(typeof marketDepthTable);
    if (typeof marketDepthTable == "string") {
        return (<p>Error: {marketDepthTable}</p>);
    } else if (selectedAsset) {
        return <DetailedMarketDepth marketDepthTable={marketDepthTable} />
    } else {
        return (<p>Market depth will be displayed here, select an asset to start.</p>);
    }
}

export default MarketDepth;