export default ({ $axios, $auth, $moment, redirect }, inject) => {
  const refreshToken = {
    getRefreshToken: async () => {
      const response = await $axios.$post(
        `${process.env.API_URL}/auth/login/refresh`,
        {},
        { credentials: true }
      );

      $auth.setToken(
        "local",
        `${response.data.token.token_type} ${response.data.token.access_token}`
      );
      return response;
    },

    setExpiresIn: (expiresIn = 0) => {
      const timestamp = $moment()
        .add(parseInt(expiresIn), "seconds")
        .format("x");
      //localStorage[("_expiresIn", timestamp)];
      $auth.$storage.setCookie("__expires_in", timestamp, false);
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
