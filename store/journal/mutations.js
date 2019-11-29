export default {
  SET_USERPORTFOLIO(state, data) {
    state.userPortfolio = data;
  },
  SET_RENDERPORTFOLIOKEY(state, data) {
    state.renderPortfolioKey = data;
  },
  SET_RENDEREDITKEY(state, data) {
    state.renderEditKey = data;
  },
  SET_DEFAULTPORTFOLIOID(state, data) {
    state.defaultPortfolioId = data;
  },
  SET_SELECTEDPORTFOLIO(state, data) {
    state.selectedPortfolio = data;
  },
  SET_OPENPOSITION(state, data) {
    state.openPosition = data;
  },
  SET_JOURNALCHARTS(state, data) {
    state.journalCharts = data;
  },
};
