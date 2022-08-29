import React, {useState} from "react";
import * as TradingView from "../public/charting_library";
import Datafeed from './datafeed.js';
import { useEffect } from "react";
import { useGlobal } from "reactn";
import {dev} from "./helpers";



const overrides = {
	'symbolWatermarkProperties.visibility' : false,
}

const Chart = function() {
	const [tvWidget, setTvWIdget] = useState();
	const [selectedAsset] = useGlobal("selectedAsset");
	useEffect(() => {
		console.log("[Chart] selectedAsset: ", selectedAsset);
		 setTvWIdget( new TradingView.widget({
			symbol: !selectedAsset  ? 'NASDAQ:AAPL' : `NASDAQ:	${selectedAsset}`, // default symbol
			interval: '1D', // default interval
			fullscreen: false, // displays the chart in the fullscreen mode
			container: 'tv_chart_container',
			datafeed: Datafeed,
			library_path: '/charting_library/',
			autosize: true,
			disabled_features: ["header_symbol_search", "header_compare", "symbol_search_hot_key", "header_screenshot", "main_series_scale_menu", "display_market_status", "timeframes_toolbar", "control_bar"],
			enabled_features:["hide_left_toolbar_by_default", "hide_resolution_in_legend"],
			overrides:overrides,
			}));
		
	}, [])
	
		useEffect(() => {
			tvWidget?.onChartReady?.(()=>{
				tvWidget?.activeChart?.().setSymbol?.(`NASDAQ:${selectedAsset}`);
				if(dev) console.log("[onChartReady].[useEffect] selectedAsset changed to: ", selectedAsset);
			});
		}, [selectedAsset])

	
    return (
	<div id="tv_chart_container" className="w-full h-[88%]">
		hello
      </div>
	);


}

export default Chart;