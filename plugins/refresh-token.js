export default ({ $axios, $moment, redirect, app }, inject) => {
  const refreshToken = {
    getRefreshToken: async () => {
      console.log(app.$auth);
      const response = await $axios.$post(
        `${process.env.API_URL}/auth/login/refresh`,
        {},
        { credentials: true }
      );
      console.log("getRefreshToken", response);
      app.$auth.setToken(
        "local",
        `${response.data.token.token_type} ${response.data.token.access_token}`
      );
      console.log("lagpas");
      this.setExpiresIn(response.data.token.expires_in);
    },

    setExpiresIn: (expiresIn = 0) => {
      console.log("dito oh");
      const timestamp = app
        .$moment()
        .add(parseInt(expiresIn), "seconds")
        .format("x");
      console.log("timestamp", timestamp);
      //localStorage[("_expiresIn", timestamp)];
      app.$auth.$storage.setCookie("__expires_in", timestamp, false);
    },

    isTokenExpired: () => {
      // const expire_in = $auth.$storage.getCookie("__expires_in");
      const expire_in = isNaN(localStorage["auth.__expires_in"])
        ? 0
        : localStorage["auth.__expires_in"];
      const current_datetime = $moment().format("x");
      const minutes = Math.ceil((expire_in - current_datetime) / 60000);
      //   console.log("expire_in", expire_in);
      //   console.log("current_datetime", current_datetime);
      //   console.log("remaining", minutes);
      return minutes <= 0 ? true : false;
    }
  };

  inject("refreshToken", refreshToken);
};
