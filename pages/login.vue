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
export default {
  head() {
    return {
      title: "Lyduz",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          property: "description",
          name: "description",
          hid: "description",
          content:
            "Lyduz is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:title", name: "og:title", content: "Lyduz" },
        {
          property: "og:description",
          name: "og:description",
          content:
            "Lyduz is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:type", name: "og:type", content: "website" },
        {
          property: "og:url",
          name: "og:url",
          content: "https://lyduz.com/login"
        },
        {
          property: "og:image",
          name: "og:image",
          content: "https://lyduz.com/logo-dark.svg"
        },
        {
          property: "fb:app_id",
          name: "fb:app_id",
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
      isOpen: true
    };
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style>
.investagram_bulok {
  margin-top: 150px;
}
</style>
