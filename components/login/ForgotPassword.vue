<template>
  <v-card height="584px">
    <div class="headline font-weight-bold loginCard--intro">
      Forgot Password
    </div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="10">
            <span
              >Enter the email address you use to sign in to Lyduz and we’ll
              send you a link to reset your password</span
            >
          </v-col>
        </v-row>
        <v-row class="pt-4">
          <v-col cols="12">
            <v-text-field v-model="email" label="Email Address"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <div class="loginButtons--wrapper">
      <v-btn
        class="mb-2 no-transform"
        block
        outlined
        rounded
        color="success"
        @click="submitEmail()"
      >
        Submit
      </v-btn>
      <v-btn
        class="mb-2 no-transform"
        block
        outlined
        rounded
        color="success"
        @click="$emit('stepper', 2)"
      >
        Back to Sign In
      </v-btn>
      <span class="text-center d-block caption w-100"
        >New to Lyduz?
        <a class="text-center success--text" @click="$emit('stepper', 3)"
          >Sign Up</a
        ></span
      >
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    ...mapActions({
      setAlertDialog: "global/setAlertDialog"
    }),
    submitEmail() {
      const payload = {
        email: this.email
      };
      this.$api.authentication.forgotPassword.create(payload).then(
        function(result) {
          if (result.success) {
            const alert = {
              model: true,
              state: true,
              header: "Awesome!",
              body: "Your request has been successfully sent to your email.",
              subtext: this.email
            };
            this.setAlertDialog(alert);
            const hideAlert = {
              modal: false
            };
            setTimeout(
              function() {
                this.setAlertDialog(hideAlert);
                this.$emit("stepper", 2);
              }.bind(this),
              3000
            );
          }
        }.bind(this)
      );
    }
  }
};
</script>
