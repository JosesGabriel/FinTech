export default {
    async setLightSwitch({ commit }, data) {
        await commit("SET_LIGHTSWITCH", data);
    },
    //region stock data
    async setStockList({ commit }, data) {
        await commit("SET_STOCKLIST", data);
    },
    //end region stock data
    async setFavicon({ commit }, data) {
        await commit("SET_FAVICON", data);
    },
    async setNotification({ commit }, data) {
        await commit("SET_NOTIFICATION", data);
    },
    async setNewPosts({ commit }, data) {
        await commit("SET_NEWPOSTS", data);
    },
    async setAlert({ commit }, data) {
        await commit("SET_ALERT", data);
    },
    async setAlertDialog({ commit }, data) {
        await commit("SET_ALERTDIALOG", data);
    },
    async setSettings({ commit }, data) {
        await commit("SET_SETTINGS", data);
    },
    async setMarkAll({ commit }, data) {
        await commit("SET_MARKALL", data);
    }
};