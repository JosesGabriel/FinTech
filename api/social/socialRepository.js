require("dotenv").config();

const baseURL = process.env.API_URL + "/social";
const token = localStorage["auth._token.local"];

export default $axios => ({
  get(params) {
    let query = buildParams(params);
    $axios.setToken(token);
    return $axios.$get(
      `${baseURL}/posts${query.length > 0 ? "?" + query : ""}`
    );
  },
  postComment(params, payload) {
    $axios.setToken(token);
    return $axios.$post(`${baseURL}/posts/` + params + `/comments`, payload);
  },
  bearish(params) {
    $axios.setToken(token);
    return $axios.$post(`${baseURL}/posts/` + params + `/bear`);
  },
  bullish(params) {
    $axios.setToken(token);
    return $axios.$post(`${baseURL}/posts/` + params + `/bull`);
  }

  //   intraday(params) {
  //     let query = buildParams(params);
  //     $axios.setToken(token, "Bearer");
  //     return $axios.$get(
  //       `${baseURL}/history/intraday${query.length > 0 ? "?" + query : ""}`
  //     );
  //   },

  //   latest(params) {
  //     let query = buildParams(params);
  //     $axios.setToken(token, "Bearer");
  //     return $axios.$get(
  //       `${baseURL}/history/latest${query.length > 0 ? "?" + query : ""}`
  //     );
  //   }
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
