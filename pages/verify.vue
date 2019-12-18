<template>
  <v-container dark>
    <v-row class="mb-5" no-gutters>
      hahaha
    </v-row>
  </v-container>
</template>
<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
<script>
require("dotenv").config();
export default {
  layout: "main",
  components: {},
  data() {
    return {};
  },
  mounted: function() {
    this.retrieveParams();
  },
  methods: {
    retrieveParams() {
      let param = this.$route.fullPath.indexOf("?");
      this.$axios
        .$get(process.env.DEV_API_URL + this.$route.fullPath.substr(param))
        .then(response => {
          console.log(response);
        });
    }
  },
  head() {
    return {
      title: "Arbitrage",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>
