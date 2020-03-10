import { IsInArray } from "~/assets/js/helpers/arrays/urls";

/**
 * Extends the nuxt-axios package
 *
 * @param {*} {}
 */
export default function({ $axios, $auth, redirect, app }) {
  // list of exempted urls
  const urls = [process.env.STREAM_API_URL, process.env.VYNDUE_API_URL];

  // list of exempted routes
  const routes = ["login"];

  // region custom handlers
  /**
   * Handles every axios request
   */
  //        !IsInArray(routes, $auth.ctx.route.name)

  /*
$axios
          .$post(
            `${process.env.API_URL}/auth/login/refresh`,
            {},
            { credentials: true }
          )
          .then(response => {
            console.log("refresh_token", response);
            $auth.setToken("local", response.data.token.access_token);
          });
  */
  $axios.interceptors.request.use(
    config => {
      //const token = localStorage["auth._token.local"];
      const token = $auth.getToken("local");
      //  assign if token is not null and the request url is not found in urls
      console.log(config);
      if (token != null && !IsInArray(urls, config.url)) {
        console.log("expires_in", $auth.$storage.getCookie("__expires_in"));
        console.log("config header", token);
        config.headers.Authorization = token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  /**
   * Set global authorization token
   */
  $axios.setGlobalAuth = () => {
    $axios.defaults.headers.common["Authorization"] = $auth.getToken("local");
  };

  // endregion custom handlers

  // region override
  /**
   * Set on request callback
   */
  $axios.onRequest(config => {});

  /**
   * Set error callback
   */
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);

    if ([401, 403].includes(code) && !routes.includes($auth.ctx.route.name)) {
      if (error.response.data.message == "Token has expired.") {
        $auth.logout();
      }
    }
    return Promise.reject(error);
  });
  // endregion override
}
