const BASE_URL = process.env.VYNDUE_CLIENT_API_URL;
//TODO Figure out why lyduz token is being appended to request even after exemption
//TODO Change method of setting bearer token to something else, not supposed to be set here.
const TOKEN = localStorage["vyndue.auth._token.local"];
export default $axios => ({
    messages(params, payload) {
        $axios.defaults.headers.common["Authorization"] = TOKEN;
        return $axios.$get(`${BASE_URL}/rooms/` + params.roomId + `/messages`);
    },
    history(roomId, params) {
        let query = buildParams(params);
        return $axios.$get(
            `${BASE_URL}/rooms/` +
            roomId +
            `/messages` +
            `${query.length > 0 ? "?" + query : ""}`
        );
    },
    search(payload) {
        return $axios.$post(`${BASE_URL}/` + `user_directory/search`, payload);
    }
});

/**
 * Used for concatenating specified parameters to the URL of the request
 *
 * @param   {object}  args
 *
 * @return  {string}
 */
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