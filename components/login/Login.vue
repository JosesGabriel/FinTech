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
          <v-col cols="6" class="mt-0 py-0">
            <small
              ><a
                class="secondarytext--text font-weight-bold"
                @click="$emit('stepper', 5)"
                >Forgot your password?</a
              ></small
            >
            <small
              ><v-checkbox
                class="remember--checkbox"
                label="Remember me"
              ></v-checkbox
            ></small>
          </v-col>

          <v-col cols="6" class="text-right mt-0 py-0">
            <small
              ><a
                class="secondarytext--text font-weight-bold"
                @click="$emit('stepper', 7)"
                >Resend Verification?</a
              ></small
            >
          </v-col>
        </v-row>
      </v-container>
      <v-row align="center" justify="center" class="mb-5">
        <span v-show="false" class="caption">Sign in with</span>
      </v-row>
      <Providers />
    </v-card-text>

    <div class="loginButtons--wrapper">
      <v-hover v-slot:default="{ hover }">
        <v-btn
          block
          rounded
          class="black--text font-weight-bold text-capitalize mb-2"
          :color="!hover ? 'success' : 'successhover'"
          elevation="1"
          @click.prevent="login()"
        >
          Sign In
        </v-btn>
      </v-hover>

      <span class="text-center d-block caption w-100"
        >New to Lyduz?
        <a
          class="text-center secondarytext--text font-weight-bold"
          @click="$emit('stepper', 3)"
          >Sign Up</a
        ></span
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
    /**
     * fires when user logs in to the site
     *
     * @return
     */
    async login() {
      this.isLoading = "success";

      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.email,
            password: this.password
          }
        });
        // FIXME: temporary, request new token then store expiration cookie
        await this.$refreshToken.requestRefreshToken();

        this.$emit("alert", {
          state: "success",
          message: "Successfully Logged In"
        });

        // reload for proper component mounting
        setTimeout(() => {
          this.redirect();
        }, 800);
      } catch (error) {
        this.$emit("alert", {
          state: "error",
          message: error.response.data.message
        });
        this.isLoading = false;
      }
    },
    redirect() {
      const query = this.$route.query;
      if (query.redirectTo) {
        this.$router.push(query.redirectTo);
      } else {
        this.$router.push("/")
      }
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
