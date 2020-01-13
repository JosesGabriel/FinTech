export default {
  SET_TICKER(state, data) {
    state.ticker = data;
  },

  SET_TABLE(state, data) {
    state.table = data;
  },

  SET_TABLEMAXIMIZE(state, data) {
    state.tableMaximize = data;
  },

  SET_TABLEFULLSCREEN(state, data) {
    state.tableFullscreen = data;
  },

  SET_SIDEBAR(state, data) {
    state.sidebar = data;
  },

  SET_HEADLINE_LOADING(state, data) {
    state.headline_loading = data;
  },

  SET_SYMBOLID(state, data) {
    state.symbolid = data;
  },

  SET_STOCK(state, data) {
    state.stock = data;
  },

  /* stock update */
  SET_STOCK_OBJ(state, data) {
    state.stock[Object.keys(data)] = Object.values(data);
  },

  SET_BIDASK(state, data) {
    state.bidask = data;
  },

  SET_BIDASK_LIMIT(state, data) {
    state.bidask.limit = data;
  },

  SET_BIDS(state, data) {
    state.bidask.bids = data;
  },

  SET_ASKS(state, data) {
    state.bidask.asks = data;
  },

  SET_TRADES(state, data) {
    state.trades = data;
  },

  SET_ALLSTOCKS(state, data) {
    state.allstocks = data;
  },

  SET_INDEX(state, data) {
    state.index = data;
  },

  SET_TABS_SIDEBAR(state, data) {
    state.tabs_sidebar = data;
  },

  SET_TRADE_LOGIN(state, data) {
    state.trade_login = data;
  },

  SET_MARKET_CODE(state, data) {
    state.market_code = data;
  },

  SET_SSE(state, data) {
    state.sse = data;
  },
  SET_SSE_INFO(state, data) {
    state.sseInfo = data;
  },
  SET_SSE_TRADE(state, data) {
    state.sseTrade = data;
  },
  SET_SSE_BIDASK(state, data) {
    state.sseBidask = data;
  }
};
