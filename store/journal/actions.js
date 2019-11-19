export default {
  // Set Portfolio on load
  async setUserPortfolio({ commit }, data) {
    await commit("SET_USERPORTFOLIO", data);
  },
  async setRenderPortfolioKey({ commit }, data) {
    await commit("SET_RENDERPORTFOLIOKEY", data);
  },
  // Set Portfolio ID global on load
  async setDefaultPortfolioId({ commit }, data) {
    await commit("SET_DEFAULTPORTFOLIOID", data);
  }
};
