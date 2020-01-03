<template>
  <v-container
    class="page__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-row class="mb-5" no-gutters>
      <v-col class="hidden-xs-only px-3" sm="2" md="2" lg="3"> </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <Newsfeed :postid="$route.query.id" />
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3"> </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Newsfeed from "~/components/social/Newsfeed";
export default {
  head() {
    return {
      title: "Test Title share",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          property: "description",
          hid: "description",
          content:
            "Arbitrage is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:title", name: "og:title", content: "Lyduz" },
        {
          property: "og:description",
          content:
            "Arbitrage is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:type", name: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://lyduz.com/login"
        },
        {
          property: "og:image",
          content: "https://lyduz.com/lyduz_png.png"
        },
        {
          property: "fb:app_id",
          content: "407039123333666"
        }
      ]
    };
  },
  auth: false,
  layout: "main",
  components: {
    Newsfeed
  },
  data() {
    return {
      post: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
<style scoped>
.page__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
