export const client = require("matrix-js-sdk").createClient(
  "https://im.arbitrage.ph"
);
export let myToken = "";
client
  .login("m.login.password", {
    user: "@lerroux:im.arbitrage.ph",
    password: "angelus69"
  })
  .then(response => {
    myToken = response.access_token;
  });
client.startClient();
