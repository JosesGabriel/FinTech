/**
 *	The tradinview API contains the list of 
	methods, including request to and from the server.

	By default, the base URL of the API is connected to
	the data-api /charts, and the tradingview configurations
	are injected and modelled with respect to the orignal UDF queries.

	//TODO: dependency injection for the constant API routes
 */

require("dotenv").config();

import axios from "axios";
import moment from "moment";

//BASE CONSTANTS
const BASE_URL = process.env.CHART_API_URL + "/charts";
const STREAM_BASE_URL = process.env.STREAM_API_URL;
const TOKEN = process.env.CHART_CLIENT_SECRET;

//URL LIST
const CONFIG_URL = `${BASE_URL}/tradingview/config`;
const HISTORY_URL = `${BASE_URL}/tradingview/history`;
const RESOLVE_URL = `${BASE_URL}/tradingview/symbols`;
const SEARCH_URL = `${BASE_URL}/tradingview/search`;
const SERVER_TIME_URL = `${BASE_URL}/tradingview/time`;
const TIMESCALE_MARKS_TIME_URL = `${BASE_URL}/tradingview/timescale-marks`;

//STREAM API
const SSE_URL = `${STREAM_BASE_URL}/sse?stream=market-data`;
const MARKET_INFO_PREFIX = "M-D.INFO";

var eventSource; //global event source variable
var symbolInfoObj = {
  exchange: ""
};

//INITIALIZE DEFAULTS
axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

function listenToEventSource(symbolId, resolution, onRealtimeCallback) {
  if (eventSource != null) {
    eventSource.close();
  }

  eventSource = new EventSource(SSE_URL);
  eventSource.onopen = function() {
    console.log("open sse");
  };
  eventSource.onerror = function(err) {
    console.log(err);
  };
  eventSource.addEventListener(`${MARKET_INFO_PREFIX}.${symbolId}`, function(
    event
  ) {
    // execute real-time callback
    // update bars
    const objData = JSON.parse(event.data);

    onRealtimeCallback({
      time: objData.t * 1000, // needs to be in milliseconds
      close: objData.c,
      open: objData.o,
      low: objData.l,
      high: objData.h,
      volume: objData.vol
    });
  });
}

export default {
  //onready is executed when the chart components are loaded and ready.
  onReady: cb => {
    setTimeout(() => {
      //get tradingview config
      axios.get(CONFIG_URL).then(({ data }) => {
        //write to callback
        cb(data.data);
      });
    }, 0);
  },
  //searchsymbols is fired when the user inputs to the tradingview search bar
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    //assign exchange to global symbol info
    symbolInfoObj.exchange = exchange;

    const params = {
      query: userInput,
      exchange: exchange,
      type: symbolType,
      limit: 30
    };

    //get tradingview search
    axios
      .get(SEARCH_URL, {
        params: params
      })
      .then(({ data }) => {
        onResultReadyCallback(data.data);
      })
      .catch(error => {
        onResultReadyCallback([]);
      });
  },
  //resolvesymbol is fired when the user clicks the symbol from search bar
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    let symbol, exchange;

    //check if reolveSymbol is triggered by "enter" key
    if (symbolName.indexOf(":") == -1) {
      symbol = symbolName;
      exchange = symbolInfoObj.exchange;

      //check if symbol is empty for all change, if yes, set default to PSE
      if (exchange.length == 0) {
        exchange = "PSE";
      }
    } else {
      const SPLIT_DATA = symbolName.split(/[:/]/);

      symbol = SPLIT_DATA[1];
      exchange = SPLIT_DATA[0];
    }

    //structure the get params
    const params = {
      symbol: symbol,
      exchange: exchange
    };

    setTimeout(function() {
      //get tradingview resolve
      axios
        .get(RESOLVE_URL, {
          params: params
        })
        .then(({ data }) => {
          onSymbolResolvedCallback(data.data);
        })
        .catch(error => {
          onResolveErrorCallback({});
        });
    }, 0);
  },
  //getbars is loaded when the resolvesymbol is executed
  getBars: function(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    const params = {
      symbol: symbolInfo.name,
      exchange: symbolInfo.exchange,
      from: moment.unix(from).format("YYYY-MM-DD"),
      to: moment.unix(to).format("YYYY-MM-DD"),
      resolution: "1D"
    };

    //check for 1m resolution
    if (resolution != "D") {
      params.resolution = "1m";
    }

    //get tradingview history
    axios
      .get(HISTORY_URL, {
        params: params
      })
      .then(response => {
        const data = response.data.data;
        const nodata = data.s === "no_data";

        if (data.s !== "ok" && !nodata) {
          onErrorCallback(data.s);
        }
        var bars = [];
        var barsCount = nodata ? 0 : data.t.length;
        var volumePresent = typeof data.v != "undefined";
        for (var i = 0; i < barsCount; i++) {
          var barValue = {
            time: data.t[i] * 1000,
            close: parseFloat(data.c[i]),
            open: parseFloat(data.o[i]),
            high: parseFloat(data.h[i]),
            low: parseFloat(data.l[i])
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
      })
      .catch(error => {
        onErrorCallback([]);
      });
  },
  //subscribebars connects to a stream for realtime update
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // listen to sse
    listenToEventSource(symbolInfo.id, resolution, onRealtimeCallback);
  },
  //unsubscribebars disconnects to a stream for realtime update
  unsubscribeBars: subscriberUID => {},
  //calculatehistorydepth is fired and related during resolvesymbol event
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    if (parseInt(resolution) > 0) {
      resolutionBack = "M";
      intervalBack = 1;
    }
    return {
      resolutionBack: resolutionBack,
      intervalBack: intervalBack
    };
  },
  //getmarks is executed as a request for custom plots in charting area
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    console.log("=====getMarks running");
  },
  //gettimescalemarks is executed as a request for events and displasyed in volume area
  getTimescaleMarks: (symbolInfo, from, to, onDataCallback, resolution) => {
    const params = {
      symbol: symbolInfo.name,
      exchange: symbolInfo.exchange,
      from: moment.unix(from).format("YYYY-MM-DD"),
      to: moment.unix(to).format("YYYY-MM-DD"),
      resolution: "1D"
    };

    //check for 1m resolution
    if (resolution != "D") {
      params.resolution = "1m";
    }

    //get tradingview history
    axios
      .get(TIMESCALE_MARKS_TIME_URL, {
        params: params
      })
      .then(({ data }) => {
        onDataCallback(data.data);
      })
      .catch(error => {
        onDataCallback([]);
      });
  },
  //getServerTime is executed with onready event and used for time synchornization
  getServerTime: cb => {
    //get tradingview config
    axios.get(SERVER_TIME_URL).then(({ data }) => {
      //write to callback
      cb(data.data.time);
    });
  }
};
