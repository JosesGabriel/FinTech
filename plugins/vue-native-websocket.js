import Vue from "vue";
import VueNativeSock from "vue-native-websocket";

export default ({ store }, inject) => {
  Vue.use(VueNativeSock, process.env.WEBSOCKET_SERVER, {
    format: "json",
    reconnection: process.env.WEBSOCKET_RECONNECT,
    reconnectionAttempts: process.env.WEBSOCKET_RECONNECT_ATTEMPTS,
    reconnectionDelay: process.env.WEBSOCKET_RECONNECT_DELAY
  });
};
