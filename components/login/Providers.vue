<template>
  <v-content>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <v-btn text icon color="pink">
          <v-icon @click="getUrl('facebook')">mdi-facebook</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-content>
</template>
<script>
export default {
  methods: {
    getUrl(provider) {
      this.$api.authentication.providers
        .getLoginUrl(provider)
        .then(({ data }) => {
          if (data.success) {
            this.redirect(data.data.redirect);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally();
    },
    redirect(url) {
      window.open(url, "_blank").focus();
    }
  }
};
</script>
