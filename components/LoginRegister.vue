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

          <v-stepper-content step="4" class="pa-0">
            <v-card
              height="584px"
              :dark="isLightMode == 0 ? false : true"
              :loading="isLoading"
            >
              <div
                class="display-1 font-weight-bold loginCard--intro text-center py-2"
              >
                Welcome to the community!
              </div>
              <div class="body-2 text-center secondary--text">
                Check your email to verify your account
              </div>
              <v-card-text class="pa-0">
                <v-container class="pa-0">
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <v-img src="castle_register.svg"></v-img>
                    </v-col>
                  </v-row>
                  <div class="body-2 text-center secondary--text">
                    What's a humble brag between peers? <br />Let them know
                    you're in
                  </div>
                  <div class="body-2 text-center secondary--text">
                    <v-btn class="loginReg__social" icon>
                      <v-icon color="#B6B6B6" class="display-1 mr-5" flat
                        >mdi-facebook</v-icon
                      >
                    </v-btn>
                    <v-btn class="loginReg__social" icon>
                      <v-icon color="#B6B6B6" class="display-1 ml-5" flat
                        >mdi-twitter</v-icon
                      >
                    </v-btn>
                  </div>
                </v-container>
              </v-card-text>
              <a
                class="float-right no-transform success--text skip__btn overline"
                @click="stepper = 2"
                >Skip</a
              >
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    changeStep(step) {
      this.stepper = step;
    },
    showAlert({ message, state, show }) {
      if (this.alert.state && show != true) {
        this.show = false;
      }
      if (state == "error") state = false;
      let alert = {
        model: true,
        state: state,
        message: message
      };
      this.setAlert(alert);
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
.skip__btn {
  position: relative;
  right: 13px;
  bottom: 4px;
}
.loginReg__social::before {
  background-color: transparent;
}
</style>
