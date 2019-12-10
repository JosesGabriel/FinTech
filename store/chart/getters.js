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
  }
};
