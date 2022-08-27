import React from "react";
import * as TradingView from "../public/charting_library";
import Datafeed from './datafeed.js';
import { useEffect } from "react";


const overrides = {
	'symbolWatermarkProperties.visibility' : false,
}

const Chart = function() {
useEffect(() => {
	var tvWidget = new TradingView.widget({
		symbol: 'NASDAQ:AAPL', // default symbol
		interval: '1D', // default interval
		fullscreen: false, // displays the chart in the fullscreen mode
		container: 'tv_chart_container',
		datafeed: Datafeed,
		library_path: '/charting_library/',
		autosize: true,
		// disabled_features: ["header_widget", "main_series_scale_menu", "display_market_status", "timeframes_toolbar", "control_bar"],
		// enabled_features:["hide_left_toolbar_by_default", "hide_resolution_in_legend"],
		overrides:overrides,
		});

}, [])
	
    return (
	<div id="tv_chart_container" className="w-full h-[88%]">
		hello
      </div>
	);


}

export default Chart;