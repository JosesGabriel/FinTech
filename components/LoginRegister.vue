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
            <Login @alert="showAlert" @stepper="changeStep" />
          </v-stepper-content>

          <v-stepper-content step="3" class="pa-0">
            <Register @alert="showAlert" @stepper="changeStep" />
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

    <v-snackbar v-model="alert.model" :color="alert.state">
      {{ alert.message }}
      <v-btn color="white" text @click="alert.model = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import Login from "~/components/login/Login";
import Register from "~/components/login/Register";

export default {
  components: {
    Login,
    Register
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      alert: {
        message: "",
        model: false,
        state: "success"
      },
      card__loader: false,
      registerLoading: false,
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
    }
  },
  watch: {
    loginModalState: function() {
      if (this.loginModalState) {
        this.show = true;
        this.showAlert({ message: "Successfully Verified User" });
      } else if (!this.loginModalState) {
        this.show = false;
      }
    }
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    changeStep(step) {
      this.stepper = step;
    },
    showAlert({ message, state }) {
      this.alert.message = message;
      this.alert.model = true;
      this.alert.state = state;
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
