<template>
  <v-container dark>
    <v-row class="mb-5" no-gutters> </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "main",
  auth: false,
  mounted() {
    this.retrieveParams();
  },
  methods: {
    /**
     * Params parameters on URL and passes to endpoint to confirm verification
     *
     * @return  {[type]}  [return description]
     */
    retrieveParams() {
      let param = this.$route.fullPath.indexOf("?");
      this.$axios
        .$get(process.env.API_URL + this.$route.fullPath.substr(param))
        .then(response => {
          if (response.success) {
            this.$router.push("login?redirected=true");
          }
        });
    }
  }
};
</script>
