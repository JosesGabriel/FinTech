const baseURL = process.env.API_URL + "/data/v2/stocks";

export default $axios => ({
  list(params) {
    let query = buildParams(params);
    
    return $axios.$post(`${baseURL}/list${query.length > 0 ? "?" + query : ""}`);
  },

  history(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/history/latest${query.length > 0 ? "?" + query : ""}`
    );
  },

  trades(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/trades/latest${query.length > 0 ? "?" + query : ""}`
    );
  },

  bidask(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/market-depth/latest/bidask${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  fulldepth(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/market-depth/latest/full-depth${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  topdepth(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/market-depth/latest/top-depth${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  activedate(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/history/latest-active-date${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  brokersActivity(params) {
    let query = buildParams(params);
    
    return $axios.$post(
      `${baseURL}/trades/brokers-activity/latest${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },

  transaction(params) {
    let query = buildParams(params);
    
    return $axios.$post(
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
