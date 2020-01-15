export default () => ({
  //region configs
  lightSwitch: 0,
  //endregion configs

  //region stock data
  stockList: [],
  //endregion stock data
  favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=2`,

  //Global snackbar
  alert: {
    model: false,
    state: "",
    message: ""
  }
  //end global snackbar
});
