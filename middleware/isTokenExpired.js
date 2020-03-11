//import refreshToken from "~/plugins/refresh-token.js";

export default function(context) {
  const urls = ["login"];
  if (!urls.includes(context.route.name)) {
    //console.log("is token expired", refreshToken);
  }
}
