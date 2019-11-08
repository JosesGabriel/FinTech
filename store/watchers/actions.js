export default {
  async setUserWatchedStocks({ commit }, data) {
    await commit("SET_USERWATCHEDSTOCKS", data);
  },
  async setRenderChartKey({ commit }, data) {
    await commit("SET_RENDERCHARTKEY", data);
  }
};
