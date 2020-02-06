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
              <div class="text-center display-1 font-weight-bold pt-10">
                Welcome, Mate!
              </div>

              <v-carousel
                id="login_carousel"
                cycle
                height="350"
                interval="7500"
                :show-arrows="false"
                hide-delimiter
                hide-delimiter-background
              >
                <v-carousel-item v-for="slide in slides" :key="slide.image">
                  <v-sheet height="100%" :light="lightSwitch == 0">
                    <v-row class="fill-height" align="center" justify="center">
                      <v-img
                        :src="`/login/${slideTheme}_${slide.image}`"
                        height="250"
                        contain
                        class="py-0 my-0"
                      ></v-img>
                      <div class="slide__container">
                        <span class="font-weight-bold body-2">{{
                          slide.title
                        }}</span>
                        <br />
                        <div class="slide__subtitle caption">
                          {{ slide.subtitle }}
                        </div>
                      </div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>

              <div class="loginButtons--wrapper">
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    block
                    rounded
                    class="black--text font-weight-bold text-capitalize mb-2"
                    :color="!hover ? 'success' : 'successhover'"
                    elevation="1"
                    @click="stepper = 2"
                  >
                    Log In
                  </v-btn>
                </v-hover>
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    block
                    rounded
                    class="black--text font-weight-bold text-capitalize"
                    :color="!hover ? 'success' : 'successhover'"
                    elevation="1"
                    @click="stepper = 3"
                  >
                    Sign up for free
                  </v-btn>
                </v-hover>
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
            <Welcome @alert="showAlert" @stepper="changeStep" />
          </v-stepper-content>

          <v-stepper-content step="5" class="pa-0">
            <ForgotPassword @alert="showAlert" @stepper="changeStep" />
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
import Welcome from "~/components/login/Welcome";
import ForgotPassword from "~/components/login/ForgotPassword";

export default {
  components: {
    Login,
    Register,
    Welcome,
    ForgotPassword
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
      stepper: "",
      slides: [
        {
          image: "wolf.gif",
          title: "Be ahead of the pack",
          subtitle:
            "No need to read through the fine prints because at Lyduz, the meat is delivered to you bite-sized and hot."
        },
        {
          image: "computer.gif",
          title: "Participate with Ease",
          subtitle:
            "Everything you need is only a click away. Lyduz is designed with user experience in mind."
        }
        // {
        //   image: "atom.gif",
        //   title: "Learn within budget",
        //   subtitle:
        //     "High-quality learning modules at a cost that makes sense. Learning has never been this accessible."
        // }
      ]
    };
  },
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Show dialog toggle
     *
     * @return
     */
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    /**
     * toggle between light and dark mode for gif slider
     *
     * @return  {String}  dark/light
     */
    slideTheme() {
      return this.lightSwitch == 0 ? "light" : "dark";
    }
  },
  watch: {
    /**
     * Watches loginModaState, controls modal state whether showing or not.
     *
     * @return
     */
    loginModalState() {
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
    /**
     * Fires when login or register components emit a changeStep
     * Basically scrolls/switches to different tab of stepper
     *
     * @param   {integer}  step
     *
     * @return
     */
    changeStep(step) {
      this.stepper = step;
    },
    /**
     * Fires global snackbar alert
     *
     * @param   {string}  message
     * @param   {string}  state
     * @param   {string}  show
     *
     * @return
     */
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
#login_carousel .v-carousel__controls {
  display: none;
}
.slide__container {
  height: 100px;
  text-align: center;
  width: 95%;
}
.slide__title {
  margin-top: 15px;
  position: absolute;
  text-align: center;
  width: 95%;
  margin-top: -35px;
}
.slide__subtitle {
  padding-left: 50px;
  padding-right: 50px;
  line-height: 1.3 !important;
  margin-top: 20px;
}
.loginButtons--wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 40px;
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
  top: 15px;
}
.loginReg__social::before {
  background-color: transparent;
}
.loginReg__social:hover .v-btn__content i {
  color: #03dac5 !important;
}
.login__cardtext {
  position: relative;
  bottom: 18px;
}
</style>
