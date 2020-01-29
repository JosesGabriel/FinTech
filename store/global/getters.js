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

    getAlert(state) {
        return state.alert;
    },

    getAlertDialog(state) {
        return state.alertDialog;
    }
};