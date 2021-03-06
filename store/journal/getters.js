export default {
    getUserPortfolio(state) {
        return state.userPortfolio;
    },
    getRenderPortfolioKey(state) {
        return state.renderPortfolioKey;
    },
    getPortfolioKey(state) {
        return state.portfolioKey;
    },
    getRenderEditKey(state) {
        return state.renderEditKey;
    },
    getDefaultPortfolioId(state) {
        return state.defaultPortfolioId;
    },
    getSelectedPortfolio(state) {
        return state.selectedPortfolio;
    },
    getOpenPosition(state) {
        return state.openPosition;
    },
    getJournalCharts(state) {
        return state.journalCharts;
    },
};