<template>
  <v-card
    :dark="isLightMode == 0 ? false : true"
    :loading="registerLoading"
    height="584px"
  >
    <v-form
      ref="register__form"
      v-model="registerForm"
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
      </v-card-text>
      <div class="loginButtons--wrapper">
        <v-btn
          block
          class="mb-2"
          outlined
          rounded
          color="success"
          type="submit"
          :disabled="!registerForm"
        >
          Sign Up
        </v-btn>
        <span class="text-center d-block  caption w-100"
          >Already have an account?
          <a class="text-center" @click="$emit('stepper', 2)">Sign In</a></span
        >
      </div>
    </v-form>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showPassword: false,
      registerForm: false,
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
      lightSwitch: "global/getLightSwitch",
      loginModalState: "login/getLoginModalState"
    }),
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
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
  methods: {
    clearFields() {
      (this.firstName = ""),
        (this.lastName = ""),
        (this.userName = ""),
        (this.emailAddress = ""),
        (this.password = ""),
        (this.confirmPassword = "");
    },
    signUp() {
      this.confirmPassword = this.password;
      this.registerLoading = "primary";
      let params = {
        first_name: this.firstName,
        last_name: this.lastName,
        name: this.fullName,
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
            this.$emit("alert", {
              message: response.message,
              state: "success"
            });
            setTimeout(
              function() {
                this.show = false;
              }.bind(this),
              3000
            );
          } else {
            this.$emit("alert", { message: response.message, state: "error" });
          }
          this.registerLoading = false;
        })
        .catch(error => {
          this.$emit("alert", {
            message: error.response.data.message,
            state: "error"
          });
          this.registerLoading = false;
        });
    }
  }
};
</script>
