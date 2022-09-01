export const dev = true // True to enable logs inside the console

// Make requests to CryptoCompare API
export async function makeApiRequest(path) {
	try {
		const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
		return response.json();
	} catch (error) {
		throw new Error(`CryptoCompare request error: ${error.status}`);
	}
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}

export function getIBCompatibleTimeframe(timeframe) {
	const timeframes = {
		'1S' : '1 secs', '5S' : '5 secs', '10S':'10 secs', '15S': '15 secs', '30S' : '30 secs',
		'1' :'1 min', '2':'2 mins', '3':'3 mins', '5' : '5 mins', '10':	'10 mins', '15': '15 mins', '20': '20 mins', '30':	'30 mins',
		'60' : '1 hour', '120' : '2 hours', '180':	'3 hours', '240':	'4 hours', '480' : '8 hours',
		'1D' : '1 day',
		'1W': '1 week',
		'1M' : '1 month',
		}	

	return timeframes[timeframe];
}

// look back further according to the resolution when the data wasn't found or not enough to fill the countback in the given timeframe
export function newFrom(resolution, from) {
	if (resolution.endsWith('secs')){
		return from - 3600
	}
	else if(resolution.endsWith('min') || resolution.endsWith('mins')) {
		return from - 86400
	}
	else if(resolution.endsWith('hour') || resolution.endsWith('hours')) {
		return from - 432000
	}
	else {
		return from - 86393
	}
}

// Get History data from IB Wrapper over IPC
export async function getBarsTillCountback (symbolInfo, resolution, from, to, firstDataRequest, countBack, onHistoryCallback, bars = [], offset = 0) {
	try {
		var data = await window.Main.chartHistoryData(symbolInfo.ticker, getIBCompatibleTimeframe(resolution), from*1000, to*1000, firstDataRequest);
	console.log("[getBarsTillCountback]: bars:", data);
	if (data.length == 0) {
		if (offset > 5) {
			console.log("[getBarsTillCountback] exhausted")
			onHistoryCallback(bars, {
				noData: true,
			});
			return;
		}
		getBarsTillCountback(symbolInfo, resolution, newFrom(getIBCompatibleTimeframe(resolution), from), from, false, countBack, onHistoryCallback, bars, offset + 1)
		return
	}

	data.forEach(bar => {
		if (bar.time < to*1000) {
			bars = [...bars, {
				time: bar.time,
				open: bar.open,
				high: bar.high,
				low: bar.low,
				close: bar.close,
				volume: bar.volume,
			}];
		}
	});
	if (bars.length >= countBack) {
		onHistoryCallback(bars, 
			{
				noData: false,
			});
		return;
	}
	else
	{
		// old 'from' is now 'to', and we have a new 'from', firstDataRequest is false, countBack stays the same, the bars might have some data already
		getBarsTillCountback(symbolInfo, resolution, newFrom(from), from, false, countBack, onHistoryCallback, bars )
	}
	} catch (error) {
		onHistoryCallback(bars, 
			{
				noData: true,
			});
	}
	

}

export async function getBarsBetweenTimeframe (symbol, resolution, from, to, firstDataRequest, onHistoryCallback) {
	var data = await window.Main.chartHistoryData(symbolInfo.ticker, getIBCompatibleTimeframe(resolution), from*1000, to*1000, firstDataRequest);
			if (data.length < 1) {
				// "noData" should be set if there is no data in the requested period.
				if (dev)
				console.log("[getBars]: ::data.length < 1 returned noData: true for period::", from, to );
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			let bars = [];
			data.forEach(bar => {
				if (bar.time >= from*1000 && bar.time < to*1000) {
					bars = [...bars, {
						time: bar.time,
						open: bar.open,
						high: bar.high,
						low: bar.low,
						close: bar.close,
						volume: bar.volume,
					}];
				}
			});
		
			if (bars.length == 0) {
				// "noData" should be set if there is no data in the requested period.
				if (bars.length == 0) {
					if (dev)
				console.log("[getBars]: :: bars.length == 0 returned noData: true for period::", from, to );
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			}
			if (dev)
			console.log("[getBars]: countBack: ", countBack ," IB returned bars: ", data, "Date filtered bars: ", bars);
			onHistoryCallback(bars, {
				noData: false,
			});
}