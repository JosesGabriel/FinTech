require("dotenv").config();

const baseURL = process.env.API_URL + "/journal";
const baseChartURL = process.env.CHART_API_URL + "/stocks";
const token = process.env.CHART_CLIENT_SECRET;

export default $axios => ({
  portfolio(params) {
    let query = buildParams(params);
    return $axios.$get(
      `${baseURL}/portfolio${query.length > 0 ? "?" + query : ""}`
    );
  },
  open(openparams) {
    let query = buildParams(openparams);
    return $axios.$get(
      `${baseURL}/portfolio/open${query.length > 0 ? "?" + query : ""}`
    );
  },
  portfoliofunds(portfoliofundsparams) {
    let query = buildParams(portfoliofundsparams);
    return $axios.$get(
      `${baseURL}/portfolio/funds/${query.length > 0 ? "?" + query : ""}`
    );
  },
  tradelogs(tradelogsparams) {
    let query = buildParams(tradelogsparams);
    return $axios.$get(
      `${baseURL}/portfolio/logs${query.length > 0 ? "?" + query : ""}`
    );
  },
  ledger(ledgerparams) {
    let query = buildParams(ledgerparams);
    return $axios.$get(
      `${baseURL}/portfolio/ledger${query.length > 0 ? "?" + query : ""}`
    );
  },
  snapshot(snapshotparams) {
    let query = buildParams(snapshotparams);
    return $axios.$get(
      `${baseURL}/portfolio/snapshot${query.length > 0 ? "?" + query : ""}`
    );
  },
  journalcharts(journalchartsparams) {
    let query = buildParams(journalchartsparams);
    return $axios.$get(
      `${baseURL}/portfolio/charts${query.length > 0 ? "?" + query : ""}`
    );
  },
  equitycurve(equitycurveparams) {
    let query = buildParams(equitycurveparams);
    return $axios.$get(
      `${baseURL}/portfolio/equitycurve${query.length > 0 ? "?" + query : ""}`
    );
  },
  createportfolio(createportfolioparams) {
    return $axios.$post(`${baseURL}/funds`, createportfolioparams);
  },
  recordtrade(recordtradeparams) {
    return $axios.$post(`${baseURL}/funds/` + recordtradeparams);
  },
  history(historyparams) {
    let query = buildParams(historyparams);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseChartURL}/history/latest${query.length > 0 ? "?" + query : ""}`
    );
  },
  list(listparams) {
    let query = buildParams(listparams);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseChartURL}/list${query.length > 0 ? "?" + query : ""}`
    );
  },
  edittrade(edittradeparams) {
    return $axios.$post(`${baseURL}/funds/`, edittradeparams);
  },
  deposit(depositparams) {
    return $axios.$post(`${baseURL}/funds/`, depositparams);
  }
});

function buildParams(args) {
  let bld = [];
  let params = "";
  let openparams = "";
  let tradelogsparams = "";
  let ledgerparams = "";
  let snapshotparams = "";
  let journalchartsparams = "";
  let equitycurveparams = "";
  let createportfolioparams = "";
  let recordtradeparams = "";
  let historyparams = "";
  let listparams = "";
  let depositparams = "";
  let edittradeparams = "";
  let portfoliofundsparams = "";
  if (args != undefined) {
    for (const [key, value] of Object.entries(args)) {
      bld.push(`${key}=${value}`);
    }
    params = bld.join("&");
    openparams = bld.join("&");
    tradelogsparams = bld.join("&");
    snapshotparams = bld.join("&");
    journalchartsparams = bld.join("&");
    equitycurveparams = bld.join("&");
    createportfolioparams = bld.join("&");
    recordtradeparams = bld.join("&");
    historyparams = bld.join("&");
    listparams = bld.join("&");
    depositparams = bld.join("&");
    ledgerparams = bld.join("&");
    edittradeparams = bld.join("&");
    portfoliofundsparams = bld.join("&");
  }
  return (
    params,
    openparams,
    tradelogsparams,
    snapshotparams,
    journalchartsparams,
    equitycurveparams,
    ledgerparams,
    createportfolioparams,
    historyparams,
    depositparams,
    edittradeparams,
    portfoliofundsparams,
    listparams,
    recordtradeparams
  );
}
