export default {
  async setLightSwitch({ commit }, data) {
    await commit("SET_LIGHTSWITCH", data);
  },
  //region stock data
  async setStockList({ commit }, data) {
    await commit("SET_STOCKLIST", data);
  }
  //end region stock data
};