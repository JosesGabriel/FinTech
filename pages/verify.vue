<template>
  <v-container dark>
    <v-row class="mb-5" no-gutters>
      hahaha
    </v-row>
  </v-container>
</template>
<script>
require("dotenv").config();
export default {
  layout: "main",
  components: {},
  auth: false,
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
  }
};
</script>
<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
