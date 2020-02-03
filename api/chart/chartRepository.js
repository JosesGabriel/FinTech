const baseURL = process.env.API_URL + "/data/v2/charts";

export default $axios => ({
  history(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/history${query.length > 0 ? "?" + query : ""}`
    );
  },

  intraday(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/history/intraday${query.length > 0 ? "?" + query : ""}`
    );
  },

  latest(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/history/latest${query.length > 0 ? "?" + query : ""}`
    );
  },

  search(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/tradingview/search${query.length > 0 ? "?" + query : ""}`
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
