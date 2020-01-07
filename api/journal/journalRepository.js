require("dotenv").config();

const baseURL = process.env.API_URL + "/journal";
const baseChartURL = process.env.CHART_API_URL + "/stocks";
let token = localStorage["auth._token.local"];

export default $axios => ({
    portfolio(params) {
        let query = buildParams(params);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio${query.length > 0 ? "?" + query : ""}`);
    },
    open(openparams) {
        let query = buildParams(openparams);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/open${query.length > 0 ? "?" + query : ""}`);
    },
    portfoliofunds(portfoliofundsparams) {
        let query = buildParams(portfoliofundsparams);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/funds/${query.length > 0 ? "?" + query : ""}`);
    },
    tradelogs(tradelogsparams) {
        let query = buildParams(tradelogsparams);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/logs${query.length > 0 ? "?" + query : ""}`);
    },
    ledger(ledgerparams) {
        let query = buildParams(ledgerparams);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/ledger${query.length > 0 ? "?" + query : ""}`);
    },
    snapshot(snapshotparams) {
        let query = buildParams(snapshotparams);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/snapshot${query.length > 0 ? "?" + query : ""}`);
    },
    journalcharts(params) {
        let query = buildParams(params);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/charts${query.length > 0 ? "?" + query : ""}`);
    },
    equitycurve(equitycurveparams) {
        let query = buildParams(equitycurveparams);
        $axios.setToken(token);
        return $axios.$get(`${baseURL}/portfolio/equitycurve${query.length > 0 ? "?" + query : ""}`);
    },
    createportfolio(createportfolioparams) {
        $axios.setToken(token);
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
    deposit(portfolio_id, params) {
        let query = buildParams(params);
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/transactions/deposit${
            query.length > 0 ? "?" + query : ""
            }`
        );
    },
    withdraw(portfolio_id, params) {
        let query = buildParams(params);
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/transactions/withdraw${
            query.length > 0 ? "?" + query : ""
            }`
        );
    },
    record(portfolio_id, payload) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/register`, payload);
    },
    reset(portfolio_id) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/reset`);
    },
    selldelete(transaction_id) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/tradelog/delete/${transaction_id}`);
    },
    buydelete(fund_id, stock_id) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${fund_id}/delete/${stock_id}`);
    },
    tradesell(portfolio_id, stock, payload) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/sell/${stock}`, payload);
    },
    tradebuy(portfolio_id, stock, payload) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/buy/${stock}`, payload);
    },
    tradeedit(fund_id, stock_id, params) {
        $axios.setToken(token.substr(7), "Bearer");
        return $axios.$post(
            `${baseURL}/funds/${fund_id}/update/${stock_id}`, params);
    },
});

function buildParams(args) {
    let bld = [];
    let params = "";
    let openparams = "";
    let tradelogsparams = "";
    let ledgerparams = "";
    let snapshotparams = "";
    let equitycurveparams = "";
    let createportfolioparams = "";
    let historyparams = "";
    let listparams = "";
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
        equitycurveparams = bld.join("&");
        createportfolioparams = bld.join("&");
        historyparams = bld.join("&");
        listparams = bld.join("&");
        ledgerparams = bld.join("&");
        edittradeparams = bld.join("&");
        portfoliofundsparams = bld.join("&");
    }
    return params, openparams, tradelogsparams, snapshotparams, equitycurveparams, ledgerparams, createportfolioparams, historyparams, edittradeparams, portfoliofundsparams, listparams;
}
