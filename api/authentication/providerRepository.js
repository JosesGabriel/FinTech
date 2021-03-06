const baseURL = process.env.API_URL + "/auth";

export default $axios => ({
  getLoginUrl(provider) {
    return $axios.get(`${baseURL}/login/${provider}`);
  },
  getRedirectCallback(provider, query) {
    const params = Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join("&");
    return $axios.get(`${baseURL}/login/${provider}/callback/?${params}`);
  }
});
