<template>
  <v-container>
    <br />
    <br />
    <v-row>
      <v-col cols="12" class="text-center mt-12">
        <h1>Redirecting...</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "static",
  auth: false,
  mounted() {
    // if from mobile or not
    window.localStorage.setItem(
      "_verifiedFromMobile",
      this.$device.isMobileOrTablet
    );
    this.retrieveParams();
  },
  methods: {
    /**
     * Params parameters on URL and passes to endpoint to confirm verification
     *
     * @return  {[type]}  [return description]
     */
    async retrieveParams() {
      try {
        let param = this.$route.fullPath.indexOf("?");
        const response = await this.$axios.$get(
          process.env.API_URL + this.$route.fullPath.substr(param)
        );
        if (response.success) {
          this.$router.push("login?redirected=true");
        }
      } catch (error) {
        this.$router.push("login");
      }
    }
  }
};
</script>
