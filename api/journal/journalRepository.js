require("dotenv").config();

const baseURL = process.env.API_URL + "/journal";
const baseChartURL = process.env.CHART_API_URL + "/stocks";

export default $axios => ({
    portfolio(params) {
        let query = buildParams(params);

        return $axios.$get(`${baseURL}/portfolio${query.length > 0 ? "?" + query : ""}`);
    },
    open(openparams) {
        let query = buildParams(openparams);

        return $axios.$get(`${baseURL}/portfolio/open${query.length > 0 ? "?" + query : ""}`);
    },
    portfoliofunds(portfoliofundsparams) {
        let query = buildParams(portfoliofundsparams);

        return $axios.$get(`${baseURL}/portfolio/funds/${query.length > 0 ? "?" + query : ""}`);
    },
    tradelogs(tradelogsparams) {
        let query = buildParams(tradelogsparams);

        return $axios.$get(`${baseURL}/portfolio/logs${query.length > 0 ? "?" + query : ""}`);
    },
    ledger(ledgerparams) {
        let query = buildParams(ledgerparams);

        return $axios.$get(`${baseURL}/portfolio/ledger${query.length > 0 ? "?" + query : ""}`);
    },
    snapshot(snapshotparams) {
        let query = buildParams(snapshotparams);

        return $axios.$get(`${baseURL}/portfolio/snapshot${query.length > 0 ? "?" + query : ""}`);
    },
    journalcharts(params) {
        let query = buildParams(params);

        return $axios.$get(`${baseURL}/portfolio/charts${query.length > 0 ? "?" + query : ""}`);
    },
    equitycurve(equitycurveparams) {
        let query = buildParams(equitycurveparams);

        return $axios.$get(`${baseURL}/portfolio/equitycurve${query.length > 0 ? "?" + query : ""}`);
    },
    createportfolio(createportfolioparams) {

        return $axios.$post(`${baseURL}/funds`, createportfolioparams);
    },
    history(historyparams) {
        let query = buildParams(historyparams);
        
        return $axios.$get(`${baseChartURL}/history/latest${query.length > 0 ? "?" + query : ""}`
        );
    },
    list(listparams) {
        let query = buildParams(listparams);
        
        return $axios.$get(`${baseChartURL}/list${query.length > 0 ? "?" + query : ""}`);
    },
    edittrade(edittradeparams) {
        return $axios.$post(`${baseURL}/funds/`, edittradeparams);
    },
    deposit(portfolio_id, params) {
        let query = buildParams(params);
       
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/transactions/deposit${
            query.length > 0 ? "?" + query : ""
            }`
        );
    },
    withdraw(portfolio_id, params) {
        let query = buildParams(params);
       
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/transactions/withdraw${
            query.length > 0 ? "?" + query : ""
            }`
        );
    },
    record(portfolio_id, payload) {
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/register`, payload);
    },
    reset(portfolio_id) {
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/reset`);
    },
    selldelete(transaction_id) {
        return $axios.$post(
            `${baseURL}/funds/tradelog/delete/${transaction_id}`);
    },
    buydelete(fund_id, stock_id) {
        return $axios.$post(
            `${baseURL}/funds/${fund_id}/delete/${stock_id}`);
    },
    tradesell(portfolio_id, stock, payload) {
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/sell/${stock}`, payload);
    },
    tradebuy(portfolio_id, stock, payload) {
        return $axios.$post(
            `${baseURL}/funds/${portfolio_id}/buy/${stock}`, payload);
    },
    tradeedit(fund_id, stock_id, params) {
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
