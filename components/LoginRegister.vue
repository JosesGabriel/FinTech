<template>
  <v-card>
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
                    label="Username"
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
                    label="First name"
                    color="primary"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="lastName"
                    label="Last name"
                    color="primary"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="emailAddress"
                    label="Email address"
                    color="primary"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userName"
                    label="Username"
                    color="primary"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    color="primary"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    color="primary"
                    required
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>By signing up, you agree to the Terms and Conditions.</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="signUp()">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar v-model="alert" :color="alertState ? 'success' : 'error'">
      {{ alertMessage }}
      <v-btn color="white" text @click="alert = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      userName: "",
      password: "",
      confirmPassword: "",
      login__username: "stuser@mailinator.com",
      login__password: "1234567890",
      registerLoading: false,
      alert: false,
      alertState: false,
      alertMessage: "",
      isLightMode: 0,
      tab: null,
      items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
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
          } else {
            this.showAlert(false, response.message);
          }
          this.clearFields();
          this.registerLoading = false;
        })
        .catch(response => {
          this.clearFields();
          this.showAlert(false, response.message);
          this.registerLoading = false;
        });
    },
    login() {
      this.$auth.loginWith("local", {
        data: {
          username: this.login__username,
          password: this.login__password
        }
      });
    }
  }
};
</script>
