<template>
  <v-card height="584px">
    <div class="headline font-weight-bold loginCard--intro"></div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="10" offset="1" class="text-left">
            <span
              class="font-weight-bold headline"
              :class="[
                { 'white--text': lightSwitch == 1 },
                { 'black--text': lightSwitch == 0 }
              ]"
              >Please verify email before logging in</span
            >
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="10" offset="1" class="text-center mb-12 mt-6">
            <v-icon size="90" color="success">mdi-email</v-icon>
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="10" offset="1" class="text-left mt-12">
            <span
              class="font-weight-bold body-2"
              :class="[
                { 'white--text': lightSwitch == 1 },
                { 'black--text': lightSwitch == 0 }
              ]"
              >Didn't receive an email? <br />
              Click resend</span
            >
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-text>
    <div class="loginButtons--wrapper">
      <v-hover v-slot:default="{ hover }">
        <v-btn
          block
          rounded
          class="black--text font-weight-bold text-capitalize mb-2"
          :color="!hover ? 'success' : 'successhover'"
          elevation="1"
          :disabled="disabled"
          @click="reSendEmail()"
        >
          Resend Email Verification
        </v-btn>
      </v-hover>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    disabled: false
  }),
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      email: "login/email"
    })
  },
  methods: {
    ...mapActions({
      setAlertDialog: "global/setAlertDialog",
      setEmail: "login/setEmail"
    }),
    async reSendEmail() {
      try {
        const payload = {
          email: this.email
        };
        const response = await this.$api.authentication.resendVerification.create(
          payload
        );
        if (response.status == 200) {
          const alert = {
            model: true,
            state: true,
            header: "Awesome!",
            body: "Your request has been successfully sent to your email.",
            subtext: this.email
          };
          this.setAlertDialog(alert);
          this.disabled = true;
        }
      } catch (error) {
        const alert = {
          model: true,
          state: false,
          header: "Ooopps!",
          body: error.response.data.message,
          subtext: this.email
        };
        this.setAlertDialog(alert);
      }
    }
  }
};
</script>
