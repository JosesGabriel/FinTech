<template>
  <v-content
    class="mx-0 px-0"
    :class="[
      { 'white--text': lightSwitch == 1 },
      { 'black--text': lightSwitch == 0 }
    ]"
  >
    <v-form ref="form">
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
              :rules="emailRules"
              label="Enter Email Address"
            ></v-text-field>
          </v-content>
        </v-col>
      </v-row>

      <v-row no-gutters="">
        <v-col cols="12" class="text-center">
          <v-content v-show="!notRobot">
            <v-content id="recaptcha__container">
              <recaptcha
                @error="onError"
                @success="onSuccess"
                @expired="onExpired"
              />
            </v-content>
          </v-content>
        </v-col>

        <v-col
          cols="8"
          offset="2"
          class="text-center"
          :class="[{ 'mb-12': notRobot }]"
        >
          <v-content v-show="notRobot">
            <v-hover v-slot:default="{ hover }">
              <v-btn
                block
                rounded
                class="black--text font-weight-bold text-capitalize"
                :color="!hover ? 'success' : 'successhover'"
                elevation="1"
                @click.prevent="submitEmail"
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
            src="mobile_landing.gif"
            class="mx-auto"
            height="300"
            width="400"
            contain
          />
        </v-col>
      </v-row>
    </v-form>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    email: "",
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+/.test(v) || "Email must be valid"
    ],
    notRobot: false,
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
    onSuccess() {
      this.notRobot = true;
    },
    onError() {},
    onExpired() {
      window.location.reload();
    },
    /**
     * validate and send email
     *
     * @return
     */
    async submitEmail() {
      const validate = await this.$refs.form.validate();
      if (validate === false) {
        return;
      }
      try {
        await this.$recaptcha.getResponse();

        const payload = {
          email: this.email
        };
        const response = await this.$axios.post(
          process.env.APP_URL + "/api/mailing/mobile",
          payload
        );
        if (response.status == 200) {
          const alert = {
            model: true,
            state: true,
            header: "Awesome!",
            body: "Your email has been successfully added to our waitlist.",
            subtext: this.email
          };
          await this.$recaptcha.reset();
          this.setAlertDialog(alert);
          this.notRobot = false;
          this.$refs.form.reset();
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

<style>
#recaptcha__container {
  display: inline-block;
  text-align: center;
}
</style>
