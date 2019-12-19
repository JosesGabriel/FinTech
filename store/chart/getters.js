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

  symbolid: state => {
    return state.symbolid;
  },

  stock: state => {
    return state.stock;
  },

  bidask: state => {
    return state.bidask;
  },

  index: state => {
    return state.index;
  },
  tabs_sidebar: state => {
    return state.tabs_sidebar;
  },
  trade_login: state => {
    return state.trade_login;
  },
  market_code: state => {
    return state.market_code;
  },
  responsive_height: state => {
    return state.responsive_height;
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
  }
};
