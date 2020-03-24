const baseURL = process.env.VYNDUE_CLIENT_API_URL + "/rooms";
//TODO Figure out why lyduz token is being appended to request even after exemption
//TODO Change method of setting bearer token to something else, not supposed to be set here.
const token = localStorage["vyndue.auth._token.local"];
export default $axios => ({
  messages(params, payload) {
    $axios.defaults.headers.common["Authorization"] = token;
    return $axios.$get(`${baseURL}/` + params.roomId + `/messages`);
  },
  history(roomId, params) {
    let query = buildParams(params);
    return $axios.$get(
      `${baseURL}/` +
        roomId +
        `/messages` +
        `${query.length > 0 ? "?" + query : ""}`
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
