<template>
  <v-container class="ssoCard__container d-flex align-center justify-center">
    <v-card
      :dark="lightSwitch == 1"
      outlined
      min-width="300px"
      class="text-center pa-5"
      elevation="1"
    >
      <v-progress-circular
        indeterminate
        color="success"
        size="25"
        width="3"
      ></v-progress-circular>
      <div class="body-2 pt-5">{{ state }}</div>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "main",
  data() {
    return {
      state: "Loading...",
      gettingTicket: "Obtaining ticket...",
      redirecting: "Redirecting..."
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    this.getTicket();
  },
  methods: {
    /**
     * fires on mounted if user is authenticated, then get the ticket from the response and redirect
     * it back to vyndue
     *
     * @return  {object}  returns response object
     */
    getTicket() {
      const query = this.$route.query;

      // TODO: Set error message or redirect
      // check if route has query strings
      if (!query || !Object.keys(query).length) {
        return;
      }

      const queryString = Object.keys(query)
        .map(key => key + "=" + query[key])
        .join("&");

      this.state = this.gettingTicket;
      this.$axios
        .get(`${process.env.APP_URL}/sso?${queryString}`)
        .then(response => {
          if (response.success) {
            this.state = this.redirecting;
            window.location.href = `${process.env.VYNDUE_CLIENT_API_URL}/login/sso/ticket?ticket=${response.data.ticket}`;
          }
        })
        .catch(err => {
          // TODO: Add error catching logic
        });
    }
  }
};
</script>

<style scoped>
.ssoCard__container {
  height: 100%;
}
</style>
