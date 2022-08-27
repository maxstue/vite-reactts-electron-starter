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
