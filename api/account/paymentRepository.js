const baseURL = process.env.API_URL + "/payments";

export default $axios => ({
    payments() {
        return $axios.$get(`${baseURL}/donations/alpha`);
    },
    capture(params) {
        // let query = buildParams(params);

        return $axios.$get(`${baseURL}/${params}/capture`);
    }
})

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