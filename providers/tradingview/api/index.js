/**
 *	The tradinview API contains the list of 
	methods, including request to and from the server.

	By default, the base URL of the API is connected to
	the data-api /charts, and the tradingview configurations
	are injected and modelled with respect to the orignal UDF queries.
 */

import axios from "axios";
import moment from "moment";
import { nativeBus } from "~/assets/js/helpers/native-bus";
import { BuildQueryParams } from "~/assets/js/helpers/api";

// BASE CONSTANTS
const BASE_URL = process.env.API_URL + "/data/v2/charts";

// URL LIST
const CONFIG_URL = `${BASE_URL}/tradingview/config`;
const HISTORY_URL = `${BASE_URL}/tradingview/history`;
const RESOLVE_URL = `${BASE_URL}/tradingview/symbols`;
const SEARCH_URL = `${BASE_URL}/tradingview/search`;
const SERVER_TIME_URL = `${BASE_URL}/tradingview/time`;
const TIMESCALE_MARKS_TIME_URL = `${BASE_URL}/tradingview/timescale-marks`;

// holds symbol info object
let symbolInfoObj = {
  exchange: ""
};

// holds the last bar of any subscribed chart
let lastBarData = {};

if (process.client){
  axios.defaults.headers.common["Authorization"] = localStorage.getItem('auth._token.local');
}
/**
 * Listens to SSE INFO native bus event.
 *
 * @param   {Number}  symbolId            unique symbol id of stocks
 * @param   {String}  resolution          resolution supported by TV
 * @param   {Function}  onRealtimeCallback  realtime callback to publish in TV
 *
 * @return {Function} onRealtimeCallback function
 */
function sseInfoNativeBusListener(symbolId, resolution, onRealtimeCallback) {
  // calculate chart data based on resolution
  let open = 0;
  let high = 0;
  let low = 0;
  let last = 0;
  let lastKnownTime = "";
  let currentVolume = 0;
  let executedVolume = 0;
  let lastCumulativeVolume = 0;

  nativeBus.$on("b-tv-sse-all", data => {
    if (symbolId == data.sym_id) {
      // check resolution
      if (resolution != "D") {
        // region per piece bar
        last = data.c;

        // check if time is different
        if (
          lastKnownTime.length > 0 &&
          lastKnownTime != moment.unix(data.t).format("HHmm")
        ) {
          // re-initialize to initial state
          open = 0;
          high = 0;
          low = 0;
          last = 0;
          lastKnownTime = "";
          currentVolume = 0;
          executedVolume = 0;
          lastCumulativeVolume = 0;

          // get latest time
          lastKnownTime = moment.unix(data.t).format("HHmm");
        }

        // assign if set
        if (open == 0) {
          open = data.c;
          lastKnownTime = moment.unix(data.t).format("HHmm");
        }
        if (high == 0 || last > high) {
          high = data.c;
        }
        if (low == 0 || last < low) {
          low = data.c;
        }

        // TODO: real time volume transaction.
        // Currently, cannot get per 1m vplume because last known volume
        // that should be in D resolution cannot be accessed.
        // Other untried ideas include requesting for the last minute volume during time change
        // @author: kbaluyot
        // // check if volume is supported
        if (lastBarData.hasOwnProperty("volume")) {
          data.vol = 0;
          //   if (lastCumulativeVolume == 0) {
          //     // if first data
          //     currentVolume = lastBarData.volume;
          //   } else {
          //     currentVolume = lastCumulativeVolume;
          //   }

          //   // assign latest volume
          //   lastCumulativeVolume = data.vol

          //   // override data volume
          //   executedVolume = data.vol - currentVolume;
          //   data.vol = executedVolume;
        }
        // console.log(lastBarData.volume, executedVolume, data.vol)

        // override data ohlc
        data.c = last;
        data.o = open;
        data.l = low;
        data.h = high;
        // endregion per piece bar
      }

      // execute real-time callback
      onRealtimeCallback({
        time: data.t * 1000, // needs to be in milliseconds
        close: data.c,
        open: data.o,
        low: data.l,
        high: data.h,
        volume: data.vol
      });
    }
  });
}

export default {
  /**
   * Onready is executed when the chart components are loaded and ready.
   *
   * @return {Function} result callback
   */
  onReady: cb => {
    setTimeout(() => {
      // get tradingview config
      axios.post(CONFIG_URL).then(({ data }) => {
        // write to callback
        cb(data.data);
      });
    }, 0);
  },
  /**
   * Searchsymbols is fired when the user inputs to the tradingview search bar
   *
   * @param   {String}  userInput              user input queries
   * @param   {String}  exchange               selected exchange, '' for all
   * @param   {String}  symbolType             type of preferred stock to be searched
   * @param   {Function}  onResultReadyCallback  result callback
   *
   * @return  {Function}                         result callback, [] for errors
   */
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    // assign exchange to global symbol info
    symbolInfoObj.exchange = exchange;

    const params = {
      query: userInput,
      exchange: exchange,
      type: symbolType,
      limit: 30
    };

    // get tradingview search
    let query = BuildQueryParams(params);
    axios
      .post(`${SEARCH_URL}${query.length > 0 ? "?" + query : ""}`)
      .then(({ data }) => {
        onResultReadyCallback(data.data);
      })
      .catch(error => {
        onResultReadyCallback([]);
      });
  },
  /**
   * Resolvesymbol is fired when the user clicks the symbol from search bar
   *
   *
   * @param   {String}  symbolName                symbil name in Exchange:StockCode format
   * @param   {Function}  onSymbolResolvedCallback  on success resolve callback
   * @param   {Function}  onResolveErrorCallback    on error resolve callback
   *
   * @return  {Function}                            a callback response
   */
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    let symbol, exchange;

    // check if reolveSymbol is triggered by "enter" key
    if (symbolName.indexOf(":") == -1) {
      symbol = symbolName;
      exchange = symbolInfoObj.exchange;

      // check if symbol is empty for all change, if yes, set default to PSE
      if (exchange.length == 0) {
        exchange = "PSE";
      }
    } else {
      const SPLIT_DATA = symbolName.split(/[:/]/);

      symbol = SPLIT_DATA[1];
      exchange = SPLIT_DATA[0];
    }

    // structure the get params
    const params = {
      symbol: symbol,
      exchange: exchange
    };

    setTimeout(function() {
      const query = BuildQueryParams(params)
      // get tradingview resolve
      axios
        .post(`${RESOLVE_URL}${query.length > 0 ? "?" + query : ""}`)
        .then(({ data }) => {
          onSymbolResolvedCallback(data.data);
        })
        .catch(error => {
          onResolveErrorCallback({});
        });
    }, 0);
  },
  /**
   * Getbars is loaded when the resolvesymbol is executed
   *
   * @param   {Object}  symbolInfo         symbol info object
   * @param   {String}  resolution         resolution of timefrime selected
   * @param   {Date}  from                 from date
   * @param   {Date}  to                   to date
   * @param   {Function}  onHistoryCallback  on success callback
   * @param   {Function}  onErrorCallback    on error callback
   * @param   {Boolean}  firstDataRequest   on first data request
   *
   * @return  {Function}                     callback
   */
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

    // check for 1m resolution
    if (resolution != "D") {
      params.resolution = "1m";
    }

    // get tradingview history
    const query = BuildQueryParams(params);

    axios
      .post(`${HISTORY_URL}${query.length > 0 ? "?" + query : ""}`)
      .then(response => {
        const data = response.data.data;
        const nodata = data.s === "no_data";

        if (data.s !== "ok" && !nodata) {
          onErrorCallback(data.s);
        }
        let bars = [];
        let barsCount = nodata ? 0 : data.t.length;
        let volumePresent = typeof data.v != "undefined";
        for (let i = 0; i < barsCount; i++) {
          let barValue = {
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

        // get the last bar
        lastBarData = bars[barsCount - 1];

        let meta = { noData: nodata };
        if (nodata && data.nb) {
          meta.nextTime = data.nb;
        }

        onHistoryCallback(bars, meta);
      })
      .catch(error => {
        onErrorCallback([]);
      });
  },
  /**
   * Subscribebars connects to a stream for realtime update
   *
   * @param   {Object}  symbolInfo                  symbol info object
   * @param   {Stirng}  resolution                  resolution in timeframe selected
   * @param   {Function}  onRealtimeCallback          on success callback
   * @param   {String}  subscribeUID                unique identifier on subscribe
   * @param   {Function}  onResetCacheNeededCallback  on reset cache callback
   *
   * @return  {Function}                              callback result
   */
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // listen to sse
    sseInfoNativeBusListener(symbolInfo.id, resolution, onRealtimeCallback);
  },
  /**
   * Unsubscribebars disconnects to a stream for realtime update
   *
   * @return
   */
  unsubscribeBars: subscriberUID => {
    nativeBus.$off("b-tv-sse-all"); // stop listening to event
  },
  /**
   * Calculatehistorydepth is fired and related during resolvesymbol event
   *
   * @param   {String}  resolution      resolution timeframe selected
   * @param   {Any}  resolutionBack  response resolution to chart
   * @param   {Any}  intervalBack    response interval to chart
   *
   * @return  {Object}                  return resolution and interval specified
   */
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
  /**
   * Getmarks is executed as a request for custom plots in charting area
   *
   * @param   {String}  symbolInfo      symbol info object
   * @param   {Date}  startDate       start date
   * @param   {Date}  endDate         end date
   * @param   {Function}  onDataCallback  on success data callback
   * @param   {String}  resolution      resolution timeframe
   *
   * @return
   */
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    // TODO: add event for get marks for future works
    console.log("=====getMarks running");
  },
  /**
   * Gettimescalemarks is executed as a request for events and displasyed in volume area
   *
   * @param   {Object}  symbolInfo      symbol info object
   * @param   {Date}  from            from date
   * @param   {Date}  to              to date
   * @param   {Function}  onDataCallback  on success data callback
   * @param   {String}  resolution      resolution timeframe
   *
   * @return  {Function}                  callback response
   */
  getTimescaleMarks: (symbolInfo, from, to, onDataCallback, resolution) => {
    const params = {
      symbol: symbolInfo.name,
      exchange: symbolInfo.exchange,
      from: moment.unix(from).format("YYYY-MM-DD"),
      to: moment.unix(to).format("YYYY-MM-DD"),
      resolution: "1D"
    };

    // check for 1m resolution
    if (resolution != "D") {
      params.resolution = "1m";
    }

    // get tradingview history
    const query = BuildQueryParams(params)

    axios
      .post(`${TIMESCALE_MARKS_TIME_URL}${query.length > 0 ? "?" + query : ""}`)
      .then(({ data }) => {
        onDataCallback(data.data);
      })
      .catch(error => {
        onDataCallback([]);
      });
  },
  /**
   * GetServerTime is executed with onready event and used for time synchornization
   *
   * @return  {Function}  callback response with the server time
   */
  getServerTime: cb => {
    // get tradingview config
    axios.post(SERVER_TIME_URL).then(({ data }) => {
      // write to callback
      cb(data.data.time);
    });
  }
};
