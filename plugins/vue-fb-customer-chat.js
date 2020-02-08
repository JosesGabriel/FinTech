import Vue from "vue";
import VueFbCustomerChat from "vue-fb-customer-chat";

Vue.use(VueFbCustomerChat, {
  page_id: 102524821282907, //  change 'null' to your Facebook Page ID,
  theme_color: "#03DAC5", // theme color in HEX
  locale: "en_US" // default 'en_US'
});
