export default {
  async setTicker({ commit }, data) {
    await commit("SET_TICKER", data);
  },
  async setTable({ commit }, data) {
    await commit("SET_TABLE", data);
  },
  async setTableMaximize({ commit }, data) {
    await commit("SET_TABLEMAXIMIZE", data);
  },
  async setTableFullscreen({ commit }, data) {
    await commit("SET_TABLEFULLSCREEN", data);
  },
  async setSidebar({ commit }, data) {
    await commit("SET_SIDEBAR", data);
  },

  async setHeadlineLoading({ commit }, data) {
    await commit("SET_HEADLINE_LOADING", data);
  },

  async setSymbolID({ commit }, data) {
    await commit("SET_SYMBOLID", data);
  },
  async setStock({ commit }, data) {
    await commit("SET_STOCK", data);
  },

  async setBidask({ commit }, data) {
    await commit("SET_BIDASK", data);
  },
  async setTrades({ commit }, data) {
    await commit("SET_TRADES", data);
  },

  async setIndex({ commit }, data) {
    await commit("SET_INDEX", data);
  },
  async setTabsSidebar({ commit }, data) {
    await commit("SET_TABS_SIDEBAR", data);
  },
  async setTradeLogin({ commit }, data) {
    await commit("SET_TRADE_LOGIN", data);
  },
  async setTradeBroker({ commit }, data) {
    await commit("SET_TRADE_BROKER", data);
  },

  async setMarketCode({ commit }, data) {
    await commit("SET_MARKET_CODE", data);
  },

  async setSSE({ commit }, data) {
    await commit("SET_SSE", data);
  },
  async setSSEInfo({ commit }, data) {
    await commit("SET_SSE_INFO", data);
  },
  async setSSETrade({ commit }, data) {
    await commit("SET_SSE_TRADE", data);
  },
  async setSSEBidask({ commit }, data) {
    await commit("SET_SSE_BIDASK", data);
  }
};
