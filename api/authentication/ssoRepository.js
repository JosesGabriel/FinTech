const baseURL = process.env.API_GEN_URL;

export default ({ $axios }) => ({
  getRedirectUrl(queryString) {
    return $axios.get(`${baseURL}/sso?${queryString}`);
  }
});
