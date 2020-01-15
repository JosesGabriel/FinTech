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
              label="Email"
              color="primary"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              color="primary"
              dense
              hide-details
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small
        ><v-checkbox
          class="ml-3 remember--checkbox"
          label="Remember me"
          value="John"
        ></v-checkbox
      ></small>
      <small class="ml-3"><a>Forgot your password?</a></small>
    </v-card-text>
    <Providers />
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
        <a class="text-center" @click="$emit('stepper', 3)">Sign Up</a></span
      >
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import Providers from "./Providers";

export default {
  components: {
    Providers
  },
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
