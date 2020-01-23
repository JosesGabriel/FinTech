export default {
  getTicker(state) {
    return state.ticker;
  },
  getTable(state) {
    return state.table;
  },
  getTableMaximize(state) {
    return state.tableMaximize;
  },
  getTableFullscreen(state) {
    return state.tableFullscreen;
  },

  getSidebar(state) {
    return state.sidebar;
  },

  headlineLoading: state => {
    return state.headlineLoading;
  },

  symbolid: state => {
    return state.symbolid;
  },

  stock: state => {
    return state.stock;
  },

  bidask: state => {
    return state.bidask;
  },

  trades: state => {
    return state.trades;
  },

  index: state => {
    return state.index;
  },

  tabsSidebar: state => {
    return state.tabsSidebar;
  },
  tradeLogin: state => {
    return state.tradeLogin;
  },
  showBrokers: state => {
    return state.showBrokers;
  },
  tradeBroker: state => {
    return state.tradeBroker;
  },

  marketCode: state => {
    return state.marketCode;
  },
  responsiveHeight: state => {
    return state.responsiveHeight;
  },

  /* status stock */
  stock_last: state => {
    return state.stock.last;
  },
  stock_marketcap: state => {
    return state.stock.marketcap;
  },
  stock_close: state => {
    return state.stock.close;
  },
  stock_open: state => {
    return state.stock.open;
  },
  stock_low: state => {
    return state.stock.low;
  },
  stock_high: state => {
    return state.stock.high;
  },
  stock_volume: state => {
    return state.stock.volume;
  },
  stock_value: state => {
    return state.stock.value;
  },
  stock_average: state => {
    return state.stock.average;
  },
  stock_trades: state => {
    return state.stock.trades;
  },
  stock_weekyearlow: state => {
    return state.stock.weekyearlow;
  },
  stock_weekyearhigh: state => {
    return state.stock.weekyearhigh;
  },
  stock_change: state => {
    return state.stock.change;
  },
  stock_changepercentage: state => {
    return state.stock.changepercentage;
  },

  sse: state => {
    return state.sse;
  },
  sseInfo: state => {
    return state.sseInfo;
  },
  sseTrade: state => {
    return state.sseTrade;
  },
  sseBidask: state => {
    return state.sseBidask;
  },

  blink: state => {
    return state.blink;
  }
};
