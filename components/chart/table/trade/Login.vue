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
                  type="password"
                  required
                ></v-text-field>
                <v-content class="text-right">
                  <span id="forget_password" class="caption font-weight-bold">
                    Forget Password
                  </span>
                </v-content>
              </v-col>
              <v-content class="text-center caption font-weight-bold">
                Not yet ready
              </v-content>
              <v-col cols="12 pa-0 text-center">
                <v-btn
                  class="mt-10"
                  color="success"
                  outlined=""
                  text
                  rounded
                  block
                  disabled
                  @click="setTradeLogin(false)"
                  >CONNECT</v-btn
                >
                <v-btn
                  class="my-2"
                  outlined
                  text
                  rounded
                  block
                  :dark="lightSwitch == 1"
                  @click="setTradeLogin(false)"
                  >CLOSE</v-btn
                >
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
  methods: {
    ...mapActions({
      setTradeLogin: "chart/setTradeLogin"
    })
  },
  watch: {
    tradeBroker(value) {
      //console.log(value);
    }
  },
  computed: {
    ...mapGetters({
      tradeLogin: "chart/tradeLogin",
      tradeBroker: "chart/tradeBroker",
      lightSwitch: "global/getLightSwitch"
    })
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
</style>
