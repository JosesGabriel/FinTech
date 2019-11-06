require("dotenv").config();

const baseURL = process.env.CHART_API_URL + "/charts";
const token = process.env.CHART_CLIENT_SECRET;

export default $axios => ({
  history(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/history${query.length > 0 ? "?" + query : ""}`
    );
  },

  intraday(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/history/intraday${query.length > 0 ? "?" + query : ""}`
    );
  },

  latest(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/history/latest${query.length > 0 ? "?" + query : ""}`
    );
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
