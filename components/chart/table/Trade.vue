<template>
  <v-content>
    <!-- select broker -->
    <v-content v-show="show_brokers" class="mx-12 text-center">
      <span
        class="subtitle-1 font-weight-bold"
        :class="[
          { darkmode__text: lightSwitch },
          { lightmode__text: !ligthSwitch }
        ]"
        >Start Trading</span
      >
      <br />
      <span class="caption grey--text">Connect to your broker's account</span>
      <v-card
        class="card__container d-flex justify-space-around mb-6 mt-6 px-12"
        :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
        flat
        :dark="lightSwitch == true"
      >
        <v-card
          v-for="item in items_top"
          :key="item.id"
          class="card__trades pa-2"
          outlined
          tile
          flat
          :style="{ background: cardbackground }"
          :class="[{ hide__card: item.show == false }]"
          @click="showModal(item)"
        >
          <v-card-actions>
            <v-img
              :class="[{ fix_image: item.modal == false }]"
              class="img__trades"
              :src="`/icon/chart/trades/${item.img}`"
            ></v-img>
          </v-card-actions>
        </v-card>
      </v-card>
      <v-card
        class="card__container d-flex justify-space-around mb-6 mt-6 px-12"
        :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
        flat
        :dark="lightSwitch == true"
      >
        <v-card
          v-for="item in items_bottom"
          :key="item.id"
          class="card__trades pa-2"
          outlined
          tile
          flat
          :style="{ background: cardbackground }"
          :class="{ hide__card: item.show == false }"
          @click="showModal(item)"
        >
          <v-card-actions>
            <v-img
              contain
              class="img__trades"
              :src="`/icon/chart/trades/${item.img}`"
            ></v-img>
          </v-card-actions>
        </v-card>
      </v-card>

      <!-- dialog -->
      <v-row justify="center">
        <v-dialog v-model="trade_login" persistent max-width="290">
          <v-card
            :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
            flat
            :dark="lightSwitch == true"
          >
            <v-content class="content__broker text-center">
              <v-card
                id="card__broker"
                flat
                :dark="lightSwitch == true"
                :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
                class="pa-2 mt-3 mb-2"
              >
                <v-img
                  contain
                  class="img__broker"
                  :src="`/icon/chart/trades/${broker.img}`"
                ></v-img>
              </v-card>
              <span class="caption font-weight-bold">{{ broker.title }}</span>
            </v-content>
            <v-card-text>
              <v-row class="ma-0 mt-4">
                <v-col cols="12 pa-0">
                  <v-text-field
                    v-show="broker.id != 3"
                    label="Email/Username"
                    color="#03DAC5"
                    required
                  ></v-text-field>

                  <v-row
                    v-show="broker.id == 3"
                    justify="space-around"
                    no-gutters
                    class="ma-0"
                  >
                    <v-col class="col-5 pa-0">
                      <v-text-field
                        label="User ID"
                        color="#03DAC5"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="col-2 pa-0 pt-3 text-center"
                      ><span id="span__dash"
                        ><v-icon color="#b6b6b6">mdi-color-helper</v-icon></span
                      ></v-col
                    >
                    <v-col class="col-5 pa-0">
                      <v-text-field color="#03DAC5" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12 pa-0">
                  <v-text-field
                    label="Password"
                    color="#03DAC5"
                    type="password"
                    required
                  ></v-text-field>
                  <v-content class="text-right">
                    <span id="forget_password" class="caption font-weight-bold">
                      Forget Password
                    </span>
                  </v-content>
                </v-col>
                <v-col cols="12 pa-0 text-center">
                  <v-btn
                    class="mt-10"
                    color="#03DAC5"
                    outlined=""
                    text
                    rounded
                    block
                    @click="setTradeLogin(false)"
                    >LOGIN</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-content>

    <!-- paper trade -->
    <v-content v-show="!show_brokers">
      <!-- <span class="mx-3 mb-3">Available Funds 100,000,000.00</span>

      <v-content>
        <v-row class="ml-1 mt-1 mb-3">
          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Price
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                1,000.00
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Quality
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>100,000
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Total
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>1,000,000.00
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-content>
      <v-btn @click="showBrokers">Return</v-btn> -->
    </v-content>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      show_brokers: true,
      broker: {},
      items_top: [
        {
          id: 1,
          title: "Paper Trade",
          img: "paper_trade.svg",
          show: true,
          modal: false
        },
        {
          id: 3,
          title: "Col Financial",
          img: "col_financial.svg",
          show: true,
          modal: true
        },
        {
          id: 4,
          title: "AAA Equities",
          img: "aaa_equities.svg",
          show: true,
          modal: true
        },
        {
          id: 6,
          title: "My Trade",
          img: "mytrade.svg",
          show: true,
          modal: true
        }
      ],
      items_bottom: [
        {
          id: 7,
          title: "Papa Securities",
          img: "papa_securities.svg",
          show: true
        },
        { id: 2, title: "AB Capital", img: "ab_capital.svg", show: true },
        {
          id: 5,
          title: "HDI Securities",
          img: "hdi_securities.svg",
          show: true
        },
        { id: 8, title: "", img: "", show: false }
      ]
    };
  },
  computed: {
    ...mapGetters({
      trade_login: "chart/trade_login",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setTradeLogin: "chart/setTradeLogin"
    }),
    showModal: function(item) {
      console.log(item);
      if (item.modal == false) {
        this.show_brokers = false;
        return;
      }
      this.broker = item;
      this.setTradeLogin(!this.trade_login);
    },
    showBrokers: function() {
      this.show_brokers = true;
    }
  }
};
</script>

<style scoped>
.hide__card {
  /* background: #00121e !important; */
  border: none !important;
  cursor: not-allowed !important;
  pointer-events: none;
}
.card__container {
}
.card__trades {
  cursor: pointer;
}
.img__trades {
  width: 30px;
  height: 30px;
}
.img__broker {
  width: 90px;
  height: 90px;
}
.content__broker {
  /* background: red; */
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
#span__dash {
}
.fix_image {
  height: 27px;
}
</style>
