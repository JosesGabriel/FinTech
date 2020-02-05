<template>
  <v-content>
    <!-- dialog -->
    <v-row justify="center">
      <v-dialog v-model="tradeLogin" persistent max-width="290">
        <v-card
          :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
          flat
          :dark="lightSwitch == 1"
        >
          <v-content class="content__broker text-center">
            <v-card
              id="card__broker"
              flat
              :dark="lightSwitch == 1"
              :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
              class="pa-2 mt-3 mb-2"
            >
              <v-img
                contain
                class="img__broker"
                :src="`/icon/chart/trades/${tradeBroker.img}`"
              ></v-img>
            </v-card>
            <span class="caption font-weight-bold">{{
              tradeBroker.title
            }}</span>
          </v-content>
          <v-card-text>
            <v-row class="ma-0 mt-4">
              <v-col cols="12 pa-0">
                <v-text-field
                  v-show="tradeBroker.id != 3"
                  label="Email/Username"
                  class="login__textfield"
                  color="success"
                  required
                ></v-text-field>

                <v-row
                  v-show="tradeBroker.id == 3"
                  justify="space-around"
                  no-gutters
                  class="ma-0"
                >
                  <v-col class="col-5 pa-0">
                    <v-text-field
                      label="User ID"
                      class="login__textfield"
                      color="success"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-2 pa-0 pt-3 text-center"
                    ><span id="span__dash"
                      ><v-icon color="#b6b6b6">mdi-color-helper</v-icon></span
                    ></v-col
                  >
                  <v-col class="col-5 pa-0">
                    <v-text-field color="success" required></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12 pa-0 mb-2">
                <v-text-field
                  label="Password"
                  color="success"
                  required
                  class="login__textfield"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                ></v-text-field>
                <v-content class="text-right">
                  <span
                    v-show="false"
                    id="forget_password"
                    class="caption font-weight-bold"
                    @click="showForgotPassword"
                  >
                    Forget Password
                  </span>
                </v-content>
              </v-col>
              <v-content class="text-center caption font-weight-bold">
                Not yet ready
              </v-content>
              <v-col cols="12 pa-0 text-center">
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    class="mt-10 text-capitalize"
                    rounded
                    block
                    :color="!hover ? 'success' : 'successhover'"
                    @click="setTradeLogin(false)"
                  >
                    <span class="black--text font-weight-bold"
                      >Connect</span
                    ></v-btn
                  >
                </v-hover>
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    class="my-2 text-capitalize"
                    rounded
                    block
                    :color="!hover ? 'success' : 'successhover'"
                    @click="setTradeLogin(false)"
                  >
                    <span class="black--text font-weight-bold">Close</span>
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters({
      tradeLogin: "chart/tradeLogin",
      tradeBroker: "chart/tradeBroker",
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    ...mapActions({
      setTradeLogin: "chart/setTradeLogin"
    }),
    /**
     * show modal forgot password
     *
     * @return
     */
    showForgotPassword() {
      return;
    }
  }
};
</script>

<style scoped>
.img__broker {
  width: 90px;
  height: 90px;
}
#card__broker {
  /* background: blue; */
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}
#forget_password {
  cursor: pointer;
  margin-top: -47px;
  position: absolute;
  right: 0;
}
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
