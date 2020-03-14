export default ({ $axios, app }, inject) => {
  const refreshToken = {
    /**
     * request refresh token then set auth bearer
     *
     * @return
     */
    requestRefreshToken: async () => {
      const response = await $axios.$post(
        `${process.env.API_URL}/auth/login/refresh`,
        {},
        { credentials: true }
      );

      refreshToken.setExpiresIn(response.data.token.expires_in);

      app.$auth.setToken(
        "local",
        `${response.data.token.token_type} ${response.data.token.access_token}`
      );
    },

    /**
     * convert seconds value to timestamp the save in cookie
     *
     * @param   {Int}  expiresIn  integer
     *
     * @return
     */
    setExpiresIn: (expiresIn = 0) => {
      const timestamp = app
        .$moment()
        .add(parseInt(expiresIn), "seconds")
        .format("x");
      app.$auth.$storage.setCookie("_expires_in", timestamp, false);
    },

    /**
     * check if set token is nearly to expire
     *
     * @return  {Boolean}  true/false
     */
    isTokenExpired: () => {
      const expire_in = app.$auth.$storage.getCookie("_expires_in");
      const current_datetime = app.$moment().format("x");
      const minutes = Math.floor((expire_in - current_datetime) / 60000);
      return minutes <= process.env.REFRESH_TIME_MINUTES ? true : false;
    }
  };

  inject("refreshToken", refreshToken);
};
