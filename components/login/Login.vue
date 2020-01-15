<template>
  <v-card
    height="584px"
    :dark="isLightMode == 0 ? false : true"
    :loading="isLoading"
  >
    <div class="display-1 font-weight-bold loginCard--intro">
      Log In
    </div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              class="login__textfield"
              label="Email"
              color="success"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              class="login__textfield"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              color="success"
              dense
              hide-details
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small class="ml-3"
        ><a class="success--text">Forgot your password?</a></small
      >
      <small
        ><v-checkbox
          class="ml-3 remember--checkbox"
          label="Remember me"
        ></v-checkbox
      ></small>
    </v-card-text>
    <div class="loginButtons--wrapper">
      <v-btn
        class="mb-2"
        block
        outlined
        rounded
        color="success"
        @click="login()"
      >
        Sign In
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      isLightMode: 0,
      isLoading: false,
      password: "",
      showPassword: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      loginModalState: "login/getLoginModalState"
    })
  },
  methods: {
    /**
     * fires when user logs in to the site
     *
     * @return
     */
    async login() {
      this.isLoading = true;
      this.$auth
        .loginWith("local", {
          data: {
            username: this.email,
            password: this.password
          }
        })
        .then(() => {
          this.$emit("alert", {
            state: "success",
            message: "Successfully Logged In"
          });
        })
        .catch(() => {
          this.$emit("alert", {
            state: "error",
            message: "Invalid Credentials"
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
<style>
.login__textfield
  .v-input__control
  .v-input__slot
  .v-input__append-inner
  .v-input__icon
  i {
  font-size: 20px;
}
.login__textfield .v-input__control .v-input__slot .v-text-field__slot label {
  font-size: 14px;
}
</style>
