require("dotenv").config();

const baseURL = process.env.JOURNAL_API_URL + "/journal";

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
    }
});

function buildParams(args) {
    let bld = [];
    let params = "";
    let openparams = "";
    let tradelogsparams = "";
    if (args != undefined) {
      for (const [key, value] of Object.entries(args)) {
        bld.push(`${key}=${value}`);
      }
      params = bld.join("&");
      openparams = bld.join("&");
      tradelogsparams = bld.join("&");
    }
    return params;
  }