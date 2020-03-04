import { IsInArray } from "~/assets/js/helpers/arrays/urls";

/**
 * Extends the nuxt-axios package
 *
 * @param {*} {}
 */
export default function({ $axios, $auth, redirect }) {
  // list of exempted urls
  const urls = [process.env.STREAM_API_URL, process.env.VYNDUE_API_URL];

  // list of exempted routes
  const routes = ["login"];

  // region custom handlers
  /**
   * Handles every axios request
   */
  $axios.interceptors.request.use(
    config => {
      const token = localStorage["auth._token.local"];

      //  assign if token is not null and the request url is not found in urls and current route
      if (
        token != null &&
        !IsInArray(urls, config.url) &&
        !IsInArray(routes, $auth.ctx.route.name)
      ) {
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
    $axios.defaults.headers.common["Authorization"] =
      localStorage["auth._token.local"];
  };

  // $axios.defaults.withCredentials = true;
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
    if ([401, 403].includes(code) && !IsInArray(routes, $auth.ctx.route.name)) {
      $auth.logout();
    }
    return Promise.reject(error);
  });
  // endregion override
}
