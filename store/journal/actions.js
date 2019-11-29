export default {
  // Set Portfolio on load
  async setUserPortfolio({ commit }, data) {
    await commit("SET_USERPORTFOLIO", data);
  },
  async setRenderPortfolioKey({ commit }, data) {
    await commit("SET_RENDERPORTFOLIOKEY", data);
  },
  async setRenderEditKey({ commit }, data) {
    await commit("SET_RENDEREDITKEY", data);
  },
  // Set Portfolio ID global on load
  async setDefaultPortfolioId({ commit }, data) {
    await commit("SET_DEFAULTPORTFOLIOID", data);
  },
  // Set Selected Portfolio global on change
  async setSelectedPortfolio({ commit }, data) {
    await commit("SET_SELECTEDPORTFOLIO", data);
  },
  // Set Open Position
  async setOpenPosition({ commit }, data) {
    await commit("SET_OPENPOSITION", data);
  },
  // Set Journal Charts
  async setJournalCharts({ commit }, data) {
    await commit("SET_JOURNALCHARTS", data);
  },
};
