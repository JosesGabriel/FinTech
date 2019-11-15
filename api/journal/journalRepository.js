require("dotenv").config();

const baseURL = process.env.JOURNAL_API_URL + "/journal";

export default $axios => ({
    portfolio(params) {
      let query = buildParams(params);
      return $axios.$get(`${baseURL}/portfolio${query.length > 0 ? "?" + query : ""}`);
    }
});

function buildParams(args) {
    let bld = [];
    let params = "";
    if (args != undefined) {
      for (const [key, value] of Object.entries(args)) {
        bld.push(`${key}=${value}`);
      }
      params = bld.join("&");
    }
    return params;
  }