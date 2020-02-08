const baseURL = process.env.API_URL + "/social";

export default $axios => ({
    users(params) {
        return $axios.$get(`${process.env.API_URL}/users/` + params + `/profile`);
    },
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

    unbearish(params) {
        return $axios.$post(`${baseURL}/posts/` + params + `/unbear`);
    },
    unbullish(params) {
        return $axios.$post(`${baseURL}/posts/` + params + `/unbull`);
    },

    bearishComment(params) {
        return $axios.$post(
            `${baseURL}/posts/` +
            params.postID +
            `/comments/` +
            params.commentID +
            `/bear`
        );
    },

    bullishComment(params) {
        return $axios.$post(
            `${baseURL}/posts/` +
            params.postID +
            `/comments/` +
            params.commentID +
            `/bull`
        );
    },

    unbearishComment(params) {
        return $axios.$delete(
            `${baseURL}/posts/` +
            params.postID +
            `/comments/` +
            params.commentID +
            `/unbear`
        );
    },
    unbullishComment(params) {
        return $axios.$delete(
            `${baseURL}/posts/` +
            params.postID +
            `/comments/` +
            params.commentID +
            `/unbull`
        );
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
    follow(params) {
        return $axios.$get(`${baseURL}/users/` + params);
    },
    notifications() {
        return $axios.$get(`${process.env.API_URL}/notifications`);
    },
    read(params) {
        return $axios.$put(`${process.env.API_URL}/notifications/` + params);
    },
    markall() {
        return $axios.$put(`${process.env.API_URL}/notifications/`);
    },
    putprofile(payload) {
        return $axios.$put(`${process.env.API_URL}/users/profile`, payload);
    },
    count(params) {
        let query = buildParams(params);

        return $axios.$get(
            `${process.env.API_URL}/notifications${
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