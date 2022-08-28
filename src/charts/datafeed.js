import {
	generateSymbol,
	getIBCompatibleTimeframe,
	getBarsTillCountback,
	getBarsBetweenTimeframe,
	dev,
} from './helpers.js';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js';

const lastBarsCache = new Map();
const headTimestampCache = new Map();

const configurationData = {
	supported_resolutions: ['1S', '1', '5', '15', '30', '60', '480', '1D', '1W', '1M'],
	exchanges: [{
		value: 'Bitfinex',
		name: 'Bitfinex',
		desc: 'Bitfinex',
	},
	{
		// `exchange` argument for the `searchSymbols` method, if a user selects this exchange
		value: 'Kraken',

		// filter name
		name: 'Kraken',

		// full exchange name displayed in the filter popup
		desc: 'Kraken bitcoin exchange',
	},
	],
	symbols_types: [{
		name: 'crypto',

		// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
		value: 'crypto',
	},
		// ...
	],
};

async function getAllSymbols() {
	const data = await makeApiRequest('data/v3/all/exchanges');
	let allSymbols = [];

	for (const exchange of configurationData.exchanges) {
		const pairs = data.Data[exchange.value].pairs;

		for (const leftPairPart of Object.keys(pairs)) {
			const symbols = pairs[leftPairPart].map(rightPairPart => {
				const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
				return {
					symbol: symbol.short,
					full_name: symbol.full,
					description: symbol.short,
					exchange: exchange.value,
					type: 'crypto',
				};
			});
			allSymbols = [...allSymbols, ...symbols];
		}
	}
	return allSymbols;
}

export default {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
	) => {
		if (dev)
		console.log('[resolveSymbol]: Method call', symbolName);
		var symbolInfo = await window.Main.chartSymbolInfo(symbolName)
		if (dev)
		console.log("[resolveSymbol]: Symbolinfo: ",symbolInfo);

		const symbolInfoResolved = {
			ticker: symbolInfo.ticker,
			name: symbolInfo.symbol,
			description: symbolInfo.description,
			type: symbolInfo.type,
			session: symbolInfo.session.replace(':','-'),
			session_holidays: symbolInfo.session_holidays.join(','),
			timezone: 'America/New_York',
			exchange: symbolInfo.exchange,
			minmov: 1,
			pricescale: 100,
			visible_plots_set: 'ohlcv',
			has_intraday: symbolInfo.has_intraday,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: symbolInfo.volume_precision,
			data_status: 'streaming',
		};
		if (dev)
		console.log("[resolveSymbol]: Resolved symbolInfo: ", symbolInfoResolved)
		setTimeout(()=>{
			onSymbolResolvedCallback(symbolInfoResolved);},0)
	},

	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
		const { from, to, firstDataRequest, countBack } = periodParams;
		try {
			if (!!countBack) {
				getBarsTillCountback(symbolInfo, resolution, from, to, firstDataRequest, countBack, onHistoryCallback )
				return
			}
			else {
				getBarsBetweenTimeframe(symbolInfo, resolution, from, to, firstDataRequest, onHistoryCallback)
				return
			}
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		if (dev)
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
	},

	unsubscribeBars: (subscriberUID) => {
		if (dev)
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
	},
};
