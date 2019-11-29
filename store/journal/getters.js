export default {
    getUserPortfolio(state) {
        return state.userPortfolio;
    },
    getRenderPortfolioKey(state) {
        return state.renderPortfolioKey;
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
};
