require("dotenv").config();

const url = process.env.CHART_API_URL;
const token = process.env.CHART_CLIENT_SECRET;
const stocks = "/stocks/";

export default $axios => ({
  index() {
    $axios.setToken(token, "Bearer");
    return $axios.$get(`${url}${stocks}`);
  }
});
