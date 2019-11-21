require("dotenv").config();

import historyProvider from "./historyProvider"
import axios from 'axios';

//BASE CONSTANTS
const BASE_URL = process.env.CHART_API_URL + "/charts";
const TOKEN = process.env.CHART_CLIENT_SECRET;

//URL LIST
const CONFIG_URL = `${BASE_URL}/tradingview/config`;
const RESOLVE_URL = `${BASE_URL}/tradingview/symbols`;
const SEARCH_URL = `${BASE_URL}/tradingview/search`;

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
			})	
		}, 0)
	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		console.log('=====getBars running')
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			console.log({err})
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		console.log('=====subscribeBars runnning')
	},
	unsubscribeBars: subscriberUID => {
		console.log('=====unsubscribeBars running')
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		console.log('=====calculateHistoryDepth running')
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		console.log('=====getServerTime running')
	}
}