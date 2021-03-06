export default {
    SET_LIGHTSWITCH(state, data) {
        state.lightSwitch = data;
    },
    //region stock data
    SET_STOCKLIST(state, data) {
        state.stockList = data;
    },
    //end region stock data
    SET_FAVICON(state, data) {
        state.favicon = data;
    },
    SET_NOTIFICATION(state, data) {
        state.notification = data;
    },
    SET_NEWPOSTS(state, data) {
        state.newPosts = data;
    },
    SET_ALERT(state, data) {
        state.alert = data;
    },
    SET_ALERTDIALOG(state, data) {
        state.alertDialog = data;
    },
    SET_SETTINGS(state, data) {
        state.settings = data;
    },
    SET_MARKALL(state, data) {
        state.markAll = data;
    },
    SET_SWIPE(state, data) {
        state.swipe = data;
    }
};