<template>
  <v-dialog v-model="show" max-width="360px">
    <v-card :loading="card__loader">
      <v-tabs
        v-model="tab"
        :dark="isLightMode == 1 ? false : true"
        :class="isLightMode == 1 ? 'lightcard' : 'darkcard'"
        background-color="transparent"
        grow
      >
        <v-tab>
          Login
        </v-tab>
        <v-tab>
          Sign Up
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card
            :dark="isLightMode == 1 ? false : true"
            :color="isLightMode == 1 ? 'lightcard' : 'darkcard'"
            :loading="registerLoading"
          >
            <v-card-text>
              <div class="title text-center pt-5">
                Welcome to Arbitrage
              </div>
              <div class="body-2 text-center">
                Don't have an account? <a>Sign Up</a>
              </div>
            </v-card-text>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="login__username"
                      label="Email"
                      color="primary"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="login__password"
                      label="Password"
                      color="primary"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small><a>Forgot your password?</a></small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="login()">Log In</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            :dark="isLightMode == 1 ? false : true"
            :color="isLightMode == 1 ? 'lightcard' : 'darkcard'"
            :loading="registerLoading"
          >
            <v-form
              ref="register__form"
              v-model="register__model"
              @submit.prevent="signUp()"
            >
              <v-card-text>
                <div class="title text-center pt-5">
                  Join Arbitrage. It's free!
                </div>
                <div class="body-2 text-center">
                  Already have an account? <a>Log in</a>
                </div>
              </v-card-text>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="firstName"
                        :rules="nameRules"
                        label="First name"
                        color="primary"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="lastName"
                        :rules="nameRules"
                        label="Last name"
                        color="primary"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="emailAddress"
                        :rules="emailRules"
                        type="email"
                        label="Email address"
                        color="primary"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userName"
                        :rules="usernameRules"
                        label="Username"
                        color="primary"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        color="primary"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="confirmPassword"
                        :rules="confirmPasswordRules"
                        label="Confirm Password"
                        color="primary"
                        required
                        type="password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small
                  >By signing up, you agree to the Terms and Conditions.</small
                >
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                  :disabled="!register__model"
                  >Sign Up</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      register__model: false,
      firstName: "",
      lastName: "",
      emailAddress: "",
      userName: "",
      password: "",
      confirmPassword: "",
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length >= 5) || "Username must be atleast 5 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be atleast 8 characters"
      ],
      confirmPasswordRules: [
        v => !!v || "Confirm Password is required",
        v => (v && v === this.confirmPassword) || "Passwords do not moatch"
      ],
      card__loader: false,
      login__username: "josesgabriellu@gmail.com",
      login__password: "123123123",
      registerLoading: false,
      alert: false,
      alertState: false,
      alertMessage: "",
      isLightMode: 0,
      tab: null
    };
  },
  computed: {
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
      this.registerLoading = "primary";
      let params = {
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.userName,
        email: this.emailAddress,
        password: this.password,
        password_confirmation: this.confirmPassword
      };
      this.$axios
        .$post("https://dev-api.arbitrage.ph/api/register", params)
        .then(response => {
          this.registerLoading = false;
          if (response.success) {
            this.showAlert(true, response.message);
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
