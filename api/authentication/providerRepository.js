const baseURL = process.env.API_URL + "/auth";

export default $axios => ({
  getLoginUrl(provider) {
    return $axios.get(`${baseURL}/login/${provider}`);
  },
  getRedirectCallback(provider) {
    return $axios.get(`${baseURL}/login/${provider}/callback`);
  }
});
