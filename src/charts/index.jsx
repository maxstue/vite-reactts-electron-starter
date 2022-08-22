import React from "react";
import * as TradingView from "../public/charting_library";
import Datafeed from './datafeed.js';
import { useEffect } from "react";


  

const Chart = function() {
useEffect(() => {
	var tvWidget = new TradingView.widget({
		symbol: 'Bitfinex:BTC/USD', // default symbol
		interval: '1D', // default interval
		fullscreen: false, // displays the chart in the fullscreen mode
		container: 'tv_chart_container',
		datafeed: Datafeed,
		library_path: '/charting_library/',
		autosize: true,
		});

}, [])
	
    return (
	<div id="tv_chart_container" className="w-full h-[90%]">
		hello
      </div>
	);


}

export default Chart;