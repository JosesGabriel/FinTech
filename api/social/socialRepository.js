const baseURL = process.env.API_URL + "/social";

export default $axios => ({
  get(params) {
    let query = buildParams(params);

    return $axios.$get(
      `${baseURL}/posts${query.length > 0 ? "?" + query : ""}`
    );
  },

  postComment(params, payload) {
    return $axios.$post(`${baseURL}/posts/` + params + `/comments`, payload);
  },

  bearish(params) {
    return $axios.$post(`${baseURL}/posts/` + params + `/bear`);
  },

  bullish(params) {
    return $axios.$post(`${baseURL}/posts/` + params + `/bull`);
  },
  unbearish(params) {
    return $axios.$post(`${baseURL}/posts/` + params + `/unbear`);
  },
  unbullish(params) {
    return $axios.$post(`${baseURL}/posts/` + params + `/unbull`);
  },
  getSentiment(params) {
    return $axios.$get(`${baseURL}/sentiments/`, { params });
  },

  postSentiment(params) {
    return $axios.$post(`${baseURL}/sentiments/`, params);
  },
  followAccount(params) {
    return $axios.$post(`${baseURL}/users/` + params + `/follow`);
  },
  notifications() {
    return $axios.$get(`${process.env.API_URL}/notifications`);
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
