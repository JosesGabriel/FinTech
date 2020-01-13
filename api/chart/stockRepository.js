const baseURL = process.env.CHART_API_URL + "/stocks";
const token = process.env.CHART_CLIENT_SECRET;

export default $axios => ({
  list(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(`${baseURL}/list${query.length > 0 ? "?" + query : ""}`);
  },

  history(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/history/latest${query.length > 0 ? "?" + query : ""}`
    );
  },

  trades(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/trades/latest${query.length > 0 ? "?" + query : ""}`
    );
  },

  bidask(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/market-depth/latest/bidask${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  fulldepth(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/market-depth/latest/full-depth${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  topdepth(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/market-depth/latest/top-depth${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  activedate(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/history/latest-active-date${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  brokersActivity(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/trades/brokers-activity/latest${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  transaction(params) {
    let query = buildParams(params);
    $axios.setToken(token, "Bearer");
    return $axios.$get(
      `${baseURL}/trades/latest/transaction-bar${
        query.length > 0 ? "?" + query : ""
      }`
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
