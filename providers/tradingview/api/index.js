require("dotenv").config();

import axios from 'axios';
import moment from 'moment';

//BASE CONSTANTS
const BASE_URL = process.env.CHART_API_URL + "/charts";
const TOKEN = process.env.CHART_CLIENT_SECRET;

//URL LIST
const CONFIG_URL = `${BASE_URL}/tradingview/config`;
const HISTORY_URL = `${BASE_URL}/tradingview/history`;
const RESOLVE_URL = `${BASE_URL}/tradingview/symbols`;
const SEARCH_URL = `${BASE_URL}/tradingview/search`;
const SERVER_TIME_URL = `${BASE_URL}/tradingview/time`;
const TIMESCALE_MARKS_TIME_URL = `${BASE_URL}/tradingview/timescale-marks`;

axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

export default {
	onReady: cb => {
		setTimeout(() => {
			//get tradingview config			
			axios.get(
				CONFIG_URL,
			).then(({data}) => {
				//write to callback
				cb(data.data)
			});
		}, 0)
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		const params = {
			query: userInput,
			exchange: exchange,
			type: symbolType,
			limit: 30,
		};

		//get tradingview search
		axios.get(
			SEARCH_URL,
			{
				params: params
			}
		).then(({data}) => {
			onResultReadyCallback(data.data)
		}).catch(error => {
			onResultReadyCallback([])
		  });
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		const SPLIT_DATA = symbolName.split(/[:/]/)
		const params = {
			symbol: SPLIT_DATA[1],
			exchange: SPLIT_DATA[0]
		}

		setTimeout(function() {
			//get tradingview resolve
			axios.get(
				RESOLVE_URL,
				{
					params: params
				}
			).then(({data}) => {
				onSymbolResolvedCallback(data.data)
			}).catch(error => {
				onResolveErrorCallback({})
			  });
		}, 0)
	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		const params = {
			symbol: symbolInfo.name,
			exchange: symbolInfo.exchange,
			from: moment.unix(from).format('YYYY-MM-DD'),
			to: moment.unix(to).format('YYYY-MM-DD'),
			resolution: '1D',
		};

		//check for 1m resolution
		if (resolution != 'D') {
			params.resolution = '1m'
		}

		//get tradingview history
		axios.get(
			HISTORY_URL,
			{
				params: params
			}
		).then(response => {
			const data = response.data.data;
			const nodata = data.s === 'no_data';

			if (data.s !== 'ok' && ! nodata) {
				onErrorCallback(data.s);
			}
			var bars = [];
			var barsCount = nodata ? 0 : data.t.length;
			var volumePresent = typeof data.v != 'undefined';
			for (var i = 0; i < barsCount; i++) {
				var barValue = {
					time: 	data.t[i] * 1000,
					close: 	parseFloat(data.c[i]),
					open: 	parseFloat(data.o[i]),
					high: 	parseFloat(data.h[i]),
					low: 	parseFloat(data.l[i]),
				};
				if (volumePresent) {
					barValue.volume = parseFloat(data.v[i]);
					barValue.foreign = parseFloat(data.v[i]);
				}
				bars.push(barValue);
			}
			var meta = { noData: nodata };
			if (nodata && data.nb) {
				meta.nextTime = data.nb;
			}
			onHistoryCallback(bars, meta);
		}).catch(error => {
			onErrorCallback([])
		  });
	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		console.log('=====subscribeBars runnning')
	},
	unsubscribeBars: subscriberUID => {
		console.log('=====unsubscribeBars running')
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		if (parseInt(resolution) > 0) {
			resolutionBack = 'M';
			intervalBack = 1;
		}
		return {
			resolutionBack: resolutionBack,
			intervalBack: intervalBack,
		};
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getMarks running')
	},
	getTimescaleMarks: (symbolInfo, from, to, onDataCallback, resolution) => {
		const params = {
			symbol: symbolInfo.name,
			exchange: symbolInfo.exchange,
			from: moment.unix(from).format('YYYY-MM-DD'),
			to: moment.unix(to).format('YYYY-MM-DD'),
			resolution: '1D',
		};

		//check for 1m resolution
		if (resolution != 'D') {
			params.resolution = '1m'
		}

		//get tradingview history
		axios.get(
			TIMESCALE_MARKS_TIME_URL,
			{
				params: params
			}
		).then(({data}) => {
			onDataCallback(data.data)
		}).catch(error => {
			onDataCallback([])
		  });
	},
	getServerTime: cb => {
		setTimeout(() => {
			//get tradingview config			
			axios.get(
				SERVER_TIME_URL,
			).then(({data}) => {
				//write to callback
				cb(data.data.time)
			});
		}, 0)
	}
}