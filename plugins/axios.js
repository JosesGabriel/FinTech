import { IsInArray } from "~/helpers/arrays/urls";

export default function({ $axios, redirect }) {
  // list of exempted urls
  const urls = [process.env.CHART_API_URL, process.env.STREAM_API_URL];

  // region custom handlers
  $axios.interceptors.request.use(
    config => {
      const token = localStorage["auth._token.local"];

      //  assign if token is not null and the request url is not found in urls
      if (token != null && !IsInArray(urls, config.url)) {
        config.headers.Authorization = token;
      }

      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  // set global token
  $axios.setGlobalAuth = () => {
    $axios.defaults.headers.common["Authorization"] =
      localStorage["auth._token.local"];
  };
  // endregion custom handlers

  // region override
  // set on request
  $axios.onRequest(config => {});

  // set on error methods
  $axios.onError(error => {
    // TODO handle global errors
    //   const code = parseInt(error.response && error.response.status)
    //   if (code === 400) {
    //     redirect('/400')
    //   }
  });
  // endregion override
}
