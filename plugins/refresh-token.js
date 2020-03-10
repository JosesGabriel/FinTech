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
      return response.data.token;
    },

    setExpiresIn: (expiresIn = 0) => {
      const timestamp = $moment()
        .add(parseInt(expiresIn), "seconds")
        .format("x");
      //localStorage.setItem("_expiresInUnix", timestamp);
      if ($auth.$storage != undefined) {
        $auth.$storage.setCookie("_expiresInUnix", timestamp, false);
      }
    },

    isTokenExpired: () => {
      const expire_in =
        $auth.$storage != undefined
          ? $auth.$storage.getCookie("_expiresInUnix")
          : null;
      const current_datetime = $moment().format("x");
      const minutes = Math.ceil((expire_in - current_datetime) / 60000);
      console.log("expire_in", expire_in);
      console.log("current_datetime", current_datetime);
      console.log("remaining", minutes);
      return minutes <= 1 ? true : false;
    }
  };

  inject("refreshToken", refreshToken);
};
