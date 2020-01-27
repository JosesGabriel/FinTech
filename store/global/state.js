export default () => ({
  //region configs
  lightSwitch: 0,
  //endregion configs

  //region stock data
  stockList: [],
  //endregion stock data
  favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
    Math.random() * 999
  )}`,

  //Global snackbar
  alert: {
    model: false,
    state: "",
    message: ""
  },
  //end global snackbar

  //Global dialog alert
  alertDialog: {
    model: false,
    header: "",
    state: "",
    body: "",
    subtext: ""
  }
  //end global dialog alert
});
