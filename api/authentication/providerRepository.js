const baseURL = process.env.API_URL + "/auth";

export default $axios => ({
  getLoginUrl(provider) {
    return $axios.get(`${baseURL}/login/${provider}`);
  }
});
