<template>
  <v-container class="ssoCard__container d-flex align-center justify-center">
    <v-card
      :dark="lightSwitch == 1"
      outlined
      min-width="300px"
      class="text-center pa-5"
      elevation="1"
    >
      <v-progress-circular indeterminate color="success" size="25" width="3"></v-progress-circular>
      <div class="body-2 pt-5">{{ state }}</div>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "main",
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  data() {
    return {
      state: "Loading...",
      gettingTicket: "Obtaining ticket...",
      redirecting: "Redirecting..."
    };
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
      this.state = this.gettingTicket;
      this.$axios
        .get(process.env.APP_URL + this.$route.fullpath)
        .then(response => {
          if (response.success) {
            this.state = this.redirecting;
            window.location.href = `${process.env.VYNDUE_CLIENT_API_URL}/login/sso/ticket?ticket=${response.data.ticket}`;
          }
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