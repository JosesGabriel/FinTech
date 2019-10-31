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
    }
}