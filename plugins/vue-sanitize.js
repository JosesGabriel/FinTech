import Vue from "vue";
import VueSanitize from "vue-sanitize";

Vue.use(VueSanitize, {
  allowedTags: ["a"],
  allowedAttributes: {
    a: ["href", "class", "data-url"]
  }
});
