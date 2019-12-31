<template>
  <v-dialog v-model="show" max-width="360px">
    <v-card :loading="card__loader">
      <v-stepper
        v-model="stepper"
        :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
        :dark="lightSwitch == 0 ? false : true"
      >
        <v-stepper-items>
          <v-stepper-content step="1" class="pa-0">
            <v-card height="584px">
              <div
                class="text-center display-1 font-weight-bold loginCard--intro"
              >
                Welcome, Mate!
              </div>
              <div class="loginButtons--wrapper">
                <v-btn
                  block
                  outlined
                  rounded
                  color="success"
                  class="mb-2"
                  @click="stepper = 2"
                >
                  Log In
                </v-btn>
                <v-btn
                  block
                  outlined
                  rounded
                  color="success"
                  @click="stepper = 3"
                >
                  Sign up for free
                </v-btn>
              </div>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2" class="pa-0">
            <v-card
              height="584px"
              :dark="isLightMode == 0 ? false : true"
              :loading="registerLoading"
            >
              <div class="display-1 font-weight-bold loginCard--intro">
                Log In
              </div>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="login__username"
                        label="Email"
                        color="primary"
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="login__password"
                        label="Password"
                        color="primary"
                        type="password"
                        dense
                        hide-details
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
                  <a class="text-center" @click="stepper = 3">Sign Up</a></span
                >
                <!-- <v-btn block outlined rounded color="success">
                  Sign up for free
                </v-btn> -->
              </div>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3" class="pa-0">
            <v-card
              :dark="isLightMode == 0 ? false : true"
              :loading="registerLoading"
              height="584px"
            >
              <v-form
                ref="register__form"
                v-model="register__model"
                @submit.prevent="signUp()"
              >
                <div class="display-1 font-weight-bold loginCard--intro">
                  Sign Up
                </div>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="firstName"
                          :rules="nameRules"
                          label="First name"
                          color="primary"
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="lastName"
                          :rules="nameRules"
                          label="Last name"
                          color="primary"
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="emailAddress"
                          :rules="emailRules"
                          type="email"
                          label="Email address"
                          color="primary"
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="userName"
                          :rules="usernameRules"
                          label="Username"
                          color="primary"
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          :rules="passwordRules"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
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
                </v-card-text>
                <div class="loginButtons--wrapper">
                  <v-btn
                    block
                    class="mb-2"
                    outlined
                    rounded
                    color="success"
                    type="submit"
                    :disabled="!register__model"
                  >
                    Sign Up
                  </v-btn>
                  <span class="text-center d-block  caption w-100"
                    >Already have an account?
                    <a class="text-center" @click="stepper = 2"
                      >Sign In</a
                    ></span
                  >
                </div>
              </v-form>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn color="primary" @click="stepper = 1">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <v-snackbar v-model="alert" :color="alertState ? 'success' : 'error'">
      {{ alertMessage }}
      <v-btn color="white" text @click="alert = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      showPassword: false,
      register__model: false,
      firstName: "",
      lastName: "",
      emailAddress: "",
      userName: "",
      password: "",
      confirmPassword: "",
      nameRules: [v => !!v || "Name is required."],
      emailRules: [
        v => !!v || "E-mail is required.",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      usernameRules: [
        v => !!v || "Username is required.",
        v => (v && v.length >= 5) || "Username must be atleast 5 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required.",
        v => (v && v.length >= 8) || "Password must be atleast 8 characters"
      ],
      confirmPasswordRules: [
        v => !!v || "Confirm Password is required.",
        v => (v && v === this.confirmPassword) || "Passwords do not moatch"
      ],
      card__loader: false,
      login__username: "",
      login__password: "",
      registerLoading: false,
      alert: false,
      alertState: false,
      alertMessage: "",
      isLightMode: 0,
      tab: null,
      stepper: ""
    };
  },
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      lightSwitch: "global/getLightSwitch"
    }),
    show: {
      //show dialog toggle
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    clearFields() {
      (this.firstName = ""),
        (this.lastName = ""),
        (this.userName = ""),
        (this.emailAddress = ""),
        (this.password = ""),
        (this.confirmPassword = "");
    },
    showAlert(state, message) {
      this.alertState = state;
      this.alert = true;
      this.alertMessage = message;
    },
    signUp() {
      this.confirmPassword = this.password;
      this.registerLoading = "primary";
      let params = {
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.userName,
        email: this.emailAddress,
        password: this.password,
        password_confirmation: this.confirmPassword
      };
      this.$api.authentication.register
        .create(params)
        .then(response => {
          this.registerLoading = false;
          if (response.success) {
            this.showAlert(true, response.message);
            console.log(response);
            setTimeout(
              function() {
                this.show = false;
              }.bind(this),
              3000
            );
          } else {
            this.showAlert(false, response.message);
          }
          this.registerLoading = false;
        })
        .catch(error => {
          this.showAlert(false, error.response.data.message);
          this.registerLoading = false;
        });
    },
    async login() {
      this.card__loader = "primary";
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.login__username,
            password: this.login__password
          }
        });
        this.card__loader = false;
        this.showAlert(true, "Successfully Logged In");
      } catch (error) {
        this.card__loader = false;
        this.showAlert(false, "Invalid Credentials");
      }
    }
  }
};
</script>
<style>
.loginButtons--wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 50px;
}
.loginCard--intro {
  padding: 30px;
}
.w-100 {
  width: 100%;
}
.remember--checkbox label {
  font-size: 0.75rem;
}
</style>
