require("dotenv").config();

const baseURL = process.env.API_URL + "/journal";
const baseChartURL = process.env.CHART_API_URL + "/stocks";
const token = process.env.CHART_CLIENT_SECRET;

export default $axios => ({
    portfolio(params) {
        let query = buildParams(params);
        return $axios.$get(`${baseURL}/portfolio${query.length > 0 ? "?" + query : ""}`);
    },
    open(openparams) {
        let query = buildParams(openparams);
        return $axios.$get(`${baseURL}/portfolio/open${query.length > 0 ? "?" + query : ""}`);
    },
    tradelogs(tradelogsparams) {
        let query = buildParams(tradelogsparams);
        return $axios.$get(`${baseURL}/portfolio/logs${query.length > 0 ? "?" + query : ""}`);
    },
    ledger(ledgerparams) {
        let query = buildParams(ledgerparams);
        return $axios.$get(`${baseURL}/portfolio/ledger${query.length > 0 ? "?" + query : ""}`);
    },
    createportfolio(createportfolioparams) {
        return $axios.$post(`${baseURL}/funds`, createportfolioparams);
    },
    history(historyparams) {
        let query = buildParams(historyparams);
        $axios.setToken(token, "Bearer");
        return $axios.$get(`${baseChartURL}/history/latest${query.length > 0 ? "?" + query : ""}`
        );
    },
    list(listparams) {
        let query = buildParams(listparams);
        $axios.setToken(token, "Bearer");
        return $axios.$get(`${baseChartURL}/list${query.length > 0 ? "?" + query : ""}`);
    },
    edittrade(edittradeparams) {
        return $axios.$post(`${baseURL}/funds/`, edittradeparams);
    },
    deposit(depositparams) {
        return $axios.$post(`${baseURL}/funds/`, depositparams);
    },
});

function buildParams(args) {
    let bld = [];
    let params = "";
    let openparams = "";
    let tradelogsparams = "";
    let ledgerparams = "";
    let createportfolioparams = "";
    let historyparams = "";
    let listparams = "";
    let depositparams = "";
    let edittrade = "";
    if (args != undefined) {
      for (const [key, value] of Object.entries(args)) {
        bld.push(`${key}=${value}`);
      }
      params = bld.join("&");
      openparams = bld.join("&");
      tradelogsparams = bld.join("&");
      createportfolioparams = bld.join("&");
      historyparams = bld.join("&");
      listparams = bld.join("&");
      depositparams = bld.join("&");
      ledgerparams = bld.join("&");
      edittrade = bld.join("&");
    }
    return params, openparams, tradelogsparams, ledgerparams, createportfolioparams, historyparams, depositparams, edittrade, listparams;
}