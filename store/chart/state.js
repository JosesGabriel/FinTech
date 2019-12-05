export default () => ({
  ticker: true,
  table: true,
  tableMaximize: false,
  tableFullscreen: false,
  sidebar: true,

  symbolid: 0,
  market_code: null,
  index: true,
  stock: {},
  bidask: {},
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
  trade_login: false
});
