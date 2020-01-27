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
  SET_ALERT(state, data) {
    state.alert = data;
  },
  SET_ALERTDIALOG(state, data) {
    state.alertDialog = data;
  }
};
