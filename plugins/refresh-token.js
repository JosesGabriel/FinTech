export default ({ $axios, redirect, app }, inject) => {
  const refreshToken = {
    getRefreshToken: async () => {
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

    setExpiresIn: (expiresIn = 0) => {
      const timestamp = app
        .$moment()
        .add(parseInt(expiresIn), "seconds")
        .format("x");
      app.$auth.$storage.setCookie("__expires_in", timestamp, false);
    },

    isTokenExpired: () => {
      const expire_in = app.$auth.$storage.getCookie("__expires_in");
      const current_datetime = app.$moment().format("x");
      const minutes = Math.ceil((expire_in - current_datetime) / 60000);
      console.log("expire_in", expire_in);
      console.log("current_datetime", current_datetime);
      console.log("remaining", minutes);
      return minutes <= 0 ? true : false;
    }
  };

  inject("refreshToken", refreshToken);
};
