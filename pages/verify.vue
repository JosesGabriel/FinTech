<template>
  <v-container dark>
    <v-row class="mb-5" no-gutters>
      <v-snackbar v-model="alert" :color="alertState ? 'success' : 'error'">
        {{ alertContent }}
        <v-btn color="white" text @click="alert = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "main",
  components: {},
  auth: false,
  data() {
    return {
      alert: false,
      alertState: "",
      alertContent: ""
    };
  },
  mounted: function() {
    this.retrieveParams();
  },
  methods: {
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
