<template>
  <v-content
    class="mx-0 px-0"
    :class="[
      { 'white--text': lightSwitch == 1 },
      { 'black--text': lightSwitch == 0 }
    ]"
  >
    <v-row>
      <v-col cols="12" class="text-center">
        <v-content class="mb-4">
          <span class="display-1 font-weight-bold">Lyduz's mobile</span><br />
          <span class="display-1 font-weight-bold">coming soon</span>
        </v-content>
        <v-content class="pb-0">
          <span class="body-2">Join the waitlist and get notified</span><br />
          <span class="body-2">once our apps are available</span>
        </v-content>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2" class="text-center">
        <v-content class="pb-0">
          <v-text-field
            v-model="email"
            required
            color="success"
            label="Enter Email Address"
          ></v-text-field>
          <v-hover v-slot:default="{ hover }">
            <v-btn
              block
              rounded
              disabled
              class="black--text font-weight-bold text-capitalize"
              :color="!hover ? 'success' : 'successhover'"
              elevation="1"
              @click="submitEmail"
            >
              Join Waitlist
            </v-btn>
          </v-hover>
        </v-content>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="mx-0 px-0 text-center">
        <v-img
          src="mobile_landing.png"
          class="mx-auto"
          height="300"
          width="400"
        />
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    email: "",
    favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
      Math.random() * 999
    )}`
  }),
  auth: false,
  layout: "mobile",
  head() {
    return {
      title: "Mobile Page",
      meta: [
        {
          hid: "mobile_page"
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    ...mapActions({
      setAlertDialog: "global/setAlertDialog"
    }),
    /**
     * validate and send email
     *
     * @return
     */
    async submitEmail() {
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

<style></style>
