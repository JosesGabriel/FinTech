<!-- must paste in pages {{ file }}.vue -->
<template>
  <v-content>
    <br />
    <Banner :imageurl="imageurl">
      <v-content
        class="mt-10 font-weight-bold body-2 banner__content"
        align="justify"
      >
      </v-content>
    </Banner>
    <v-row no-gutters>
      <v-col cols="7" offset="3">
        <v-content
          align="justify"
          :class="[
            { light_mode: lightSwitch == 0 },
            { dark_mode: lightSwitch == 1 }
          ]"
          class="body-2 pr-12"
        >
          <!-- Start Content -->

          <!-- End Content -->
        </v-content>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import Banner from "~/components/static/Banner";

export default {
  auth: false,
  layout: "static",
  head() {
    return {
      title: "About Us",
      meta: [
        {
          hid: "about_us"
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  },
  components: {
    Banner
  },
  data() {
    return {
      imageurl: "about_us.svg",
      favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
        Math.random() * 999
      )}`
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
.banner__content {
  color: #455a64 !important;
}
.light_mode {
  color: #455a64 !important;
}
.dark_mode {
  color: #eeeeee !important;
}
</style>
