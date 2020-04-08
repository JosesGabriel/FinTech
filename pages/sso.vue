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
      checkingUser: "Checking user authentication...",
      gettingTicket: "Obtaining ticket...",
      redirecting: "Redirecting..."
    };
  },
  mounted() {
    this.checkUserAuth();
  },
  methods: {
    checkUserAuth() {
      this.state = this.checkingUser;
      if (this.$auth.loggedIn) {
        this.getTicket();
      } else {
        window.location.href = '/login'
      }
    },
    getTicket() {
      this.state = this.gettingTicket;
    }
  }
};
</script>

<style scoped>
.ssoCard__container {
  height: 100%;
}
</style>