import {
	generateSymbol,
	getIBCompatibleTimeframe,
} from './helpers.js';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js';

const lastBarsCache = new Map();
const headTimestampCache = new Map();

const configurationData = {
	supported_resolutions: ['1D', '1W', '1M'],
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
		console.log('[resolveSymbol]: Method call', symbolName);

		const symbolInfo = {
			ticker: 'NASDAQ:AAPL',
			name: 'NASDAQ:AAPL',
			description: "Apple Inc.",
			type: "stock",
			session: '0930-1600',
			session_holidays: '20220827,20220828',
			timezone: 'Etc/UTC',
			exchange: 'NASDAQ',
			minmov: 1,
			pricescale: 100,
			visible_plots_set: 'ohlcv',
			has_intraday: true,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 0,
			data_status: 'streaming',
		};

		setTimeout(()=>{
			onSymbolResolvedCallback(symbolInfo);},0)
	},

	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
		const { from, to, firstDataRequest, countBack } = periodParams;
		
		try {
			var data = await window.Main.chartHistoryData(symbolInfo.ticker, getIBCompatibleTimeframe(resolution), from*1000, to*1000, firstDataRequest);
			if (data.length < 1) {
				// "noData" should be set if there is no data in the requested period.
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
				data = await window.Main.chartHistoryData(symbolInfo.ticker, getIBCompatibleTimeframe(resolution), (from-604800)*1000, to*1000, false);
				data.forEach(bar => {
					if (bars.length < countBack && bar.time < to*1000) {
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
				// "noData" should be set if there is no data in the requested period.
				if (bars.length == 0) {
				console.log("[getBars]: :: bars.length == 0 returned noData: true for period::", from, to );
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			}
			console.log("[getBars]: countBack: ", countBack ," IB returned bars: ", data, "Date filtered bars: ", bars);
			onHistoryCallback(bars, {
				noData: false,
			});
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
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscribeUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
