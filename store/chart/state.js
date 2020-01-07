export default () => ({
  ticker: true,
  table: true,
  tableMaximize: false,
  tableFullscreen: false,
  sidebar: true,

  symbolid: 0,
  market_code: null,
  index: true,

  stock: {
    average: 0,
    change: 0,
    changepercentage: 0,
    changepercentagestring: 0,
    changestring: 0,
    close: 0,
    date: 0,
    dateshortstring: 0,
    datetimestring: 0,
    description: 0,
    exchange: 0,
    high: 0,
    last: 0,
    laststring: 0,
    lastupdatetime: 0,
    lastupdatetimestring: 0,
    low: 0,
    market_code: 0,
    market_status: 0,
    marketcap: 0,
    netforeign: 0,
    open: 0,
    stockid: 0,
    stockidstr: 0,
    symbol: 0,
    trades: 0,
    value: 0,
    volume: 0,
    weekyearhigh: 0,
    weekyearhighstring: 0,
    weekyearlow: 0,
    weekyearlowstring: 0
  },
  bidask: {
    bids: [],
    asks: []
  },
  trades: [],
  tabs_sidebar: [
    {
      id: 1,
      icon: "mdi-cash-usd-outline",
      component: "BidAsk",
      disabled: true
    },
    {
      id: 2,
      icon: "mdi-format-list-bulleted-square",
      component: "AllStock",
      disabled: false
    },
    {
      id: 3,
      icon: "mdi-card-search-outline",
      component: "Watchlist",
      disabled: false
    }
  ],
  trade_login: false,
  responsive_height: 510
});
