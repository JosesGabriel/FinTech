<template>
  <v-content>
    <v-row align="center" justify="center">
      <v-hover v-slot:default="{ hover }">
        <v-btn v-show="false" icon x-large>
          <v-icon
            size="50"
            :color="!hover ? '' : 'success'"
            @click="getUrl('facebook')"
            >mdi-facebook</v-icon
          >
        </v-btn>
      </v-hover>
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
