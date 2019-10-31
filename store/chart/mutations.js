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
}