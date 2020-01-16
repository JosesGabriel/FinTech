<template>
  <v-container>
    <v-row>
      <v-col>
        <v-icon @click="getUrl('facebook')">mdi-facebook</v-icon>
      </v-col>
    </v-row>
  </v-container>
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
