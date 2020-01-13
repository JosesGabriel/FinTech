require("dotenv").config();

export default () => ({
  //region configs
  lightSwitch: 0,
  //endregion configs

  //region stock data
  stockList: [],
  //endregion stock data
  favicon: `${process.env.APP_URL}/lyduz.ico`
});
