<template>
  <v-card class="investagram_bulok text-center" color="transparent" dark flat>
    <span class="display-4 text-center d-inline-block">
      <span class="font-weight-thin">
        <img
          class="pl-2 pt-1"
          src="lyduz_loader.gif"
          alt=""
          width="285"
          height="285"
        />
      </span>
    </span>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  head() {
    return {
      title: "Lyduz",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          property: "description",
          hid: "description",
          content:
            "Lyduz is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:title", content: "Lyduz" },
        {
          property: "og:description",
          content:
            "Lyduz is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://lyduz.com/login"
        },
        {
          property: "og:image",
          content: this.postImage
        },
        {
          property: "fb:app_id",
          content: "407039123333666"
        }
      ]
    };
  },
  layout: "main",
  middleware: ["auth"],
  components: {},
  data() {
    return {
      isOpen: true,
      postImage: "https://lyduz.com/png_logo.png"
    };
  },
  mounted: function() {
    this.retrieveParams();
  },
  methods: {
    ...mapActions({
      setLoginModalState: "login/setLoginModalState"
    }),
    retrieveParams() {
      let param = this.$route.fullPath;
      if (param.includes("redirected=true")) {
        this.setLoginModalState(true);
      }
    }
  }
};
</script>
<style>
.investagram_bulok {
  margin-top: 150px;
}
</style>
