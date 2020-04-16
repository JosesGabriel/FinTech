export const client = require("matrix-js-sdk").createClient({
  baseUrl: "https://im.lyduz.com",
  timelineSupport: true
});
//Temporary only, waiting until backend integration with actual Lyduz user is finished.
//TODO remove manual login
export const access_token = client
  .login("m.login.password", {
    user: "sess",
    password: "123123123"
  })
  .then(response => {
    client.startClient({
      accessToken: response.access_token
    });
    localStorage.setItem(
      "vyndue.auth._token.local",
      "Bearer " + response.access_token
    );
  })
  .catch(error => {
    console.log(error.response);
  });
