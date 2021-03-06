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
    state.headlineLoading = data;
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

  SET_INDEX(state, data) {
    state.index = data;
  },

  SET_TABS_SIDEBAR(state, data) {
    state.tabsSidebar = data;
  },

  SET_TRADE_LOGIN(state, data) {
    state.tradeLogin = data;
  },

  SET_SHOW_BROKERS(state, data) {
    state.showBrokers = data;
  },

  SET_TRADE_BROKER(state, data) {
    state.tradeBroker = data;
  },

  SET_MARKET_CODE(state, data) {
    state.marketCode = data;
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
  },

  SET_LAST_PRICE(state, data) {
    state.lastPrice = data;
  },
  SET_MARKET_OPEN(state, data) {
    state.marketOpen = data;
  }
};
