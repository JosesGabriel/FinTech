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

  updateComment(post_id, parent_id, payload) {
    return $axios.$put(
      `${baseURL}/posts/` + post_id + `/comments/` + parent_id,
      payload
    );
  },

  deleteComment(post_id, parent_id) {
    return $axios.$delete(
      `${baseURL}/posts/` + post_id + `/comments/` + parent_id
    );
  },

  bearish(params) {
    return $axios.$post(`${baseURL}/posts/` + params + `/bear`);
  },

  bullish(params) {
    return $axios.$post(`${baseURL}/posts/` + params + `/bull`);
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
  },
  count(params) {
    let query = buildParams(params);

    return $axios.$get(
      `${process.env.API_URL}/notifications${
        query.length > 0 ? "?" + query : ""
      }`
    );
  },
  read(params) {
    return $axios.$put(`${process.env.API_URL}/notifications/` + params);
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
