export default {
    getLightSwitch(state) {
        return state.lightSwitch;
    },
    //region stock data
    getStockList(state) {
        return state.stockList;
    },
    //end region stock data

    favicon: state => {
        return state.favicon;
    },

    getNotification(state) {
        return state.notification;
    },

    getNewPosts(state) {
        return state.newPosts;
    },

    getAlert(state) {
        return state.alert;
    },

    getAlertDialog(state) {
        return state.alertDialog;
    },

    getSettings(state) {
        return state.settings;
    },

    getMarkAll(state) {
        return state.markAll;
    },

    getSwipe(state) {
        return state.swipe;
    },
};