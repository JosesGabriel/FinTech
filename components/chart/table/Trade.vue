<template>
  <v-content>
    <!-- select broker -->
    <v-content v-show="show_brokers" class="mx-12 text-center">
      <span
        class="subtitle-1 font-weight-bold"
        :class="[
          { darkmode__text: lightSwitch == 1 },
          { lightmode__text: lightSwitch == 0 }
        ]"
        >Start Trading</span
      >
      <br />
      <span class="caption grey--text">Connect to your broker's account</span>
      <v-card
        class="card__container d-flex justify-space-around mb-6 mt-6 px-12"
        :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
        flat
        :dark="lightSwitch == 1"
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
        :dark="lightSwitch == 1"
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
            :dark="lightSwitch == 1"
          >
            <v-content class="text-right">
              <span
                id="span__close"
                class="mr-3 mt-1"
                @click="setTradeLogin(false)"
                >x</span
              >
            </v-content>
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
                <v-content class="text-center caption font-weight-bold"> Not yet ready </v-content>
                <v-col cols="12 pa-0 text-center">
                  <v-btn
                    class="mt-10"
                    color="#03DAC5"
                    outlined=""
                    text
                    rounded
                    block
                    disabled=""
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
    <v-content
      v-show="!show_brokers"
      class="pt-2"
      :class="[
        { darkmode__text: lightSwitch == 1 },
        { lightmode__text: lightSwitch == 0 }
      ]"
    >
      <span class="mx-3 mb-3 body-2">Available Funds 100,000,000.00</span>
      <v-row class="ma-0 mt-4 pa-0">
        <v-col class="col___left col-9 pa-0">
          <v-container class="d-flex flex-row pa-0">
            <v-card
              v-for="item in card_content"
              :key="item.id"
              class="ml-4 pa-0"
              tile
              outlined
              min-width="165"
              min-height="70"
              :style="{ background: cardbackground }"
              :dark="lightSwitch == 1"
            >
              <v-card-text class="pa-0">
                <v-row class="ma-0">
                  <v-col class="text-left pa-0 pl-2 pt-2">
                    <span
                      class="overline font-weight-bold"
                      :class="[
                        { 'black--text': lightSwitch == 0 },
                        { 'white--text': lightSwitch == 1 }
                      ]"
                      >{{ item.title }}</span
                    >
                  </v-col>
                </v-row>
                <v-row class="ma-0">
                  <v-col
                    class="text-right pa-0 pr-2 pt-2 body-1"
                    :class="[
                      { 'black--text': lightSwitch == 0 },
                      { 'white--text': lightSwitch == 1 }
                    ]"
                    ><span v-show="item.php" class="overline">PHP</span
                    >{{ item.amount }}</v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
        <v-col class="col___right col-3 pa-0">
          <v-container class="d-flex flex-row-reverse pa-0 pt-10 pr-3">
            <v-btn
              small
              :color="lightSwitch == 1 ? 'lightchart' : 'darkchart'"
              outlined
              :dark="lightSwitch == 1"
              class="caption ml-2"
              >BUY</v-btn
            >
            <v-btn
              small
              :color="lightSwitch == 1 ? 'lightchart' : 'darkchart'"
              outlined
              :dark="lightSwitch == 1"
              class="caption"
              >SELL</v-btn
            >
          </v-container>
        </v-col>
      </v-row>
      <v-row class="ma-0 mt-1 pa-0">
        <v-col class="col-3 pa-0 ma-0">
          <v-content class="pa-0 ma-0 pt-3 px-4">
            <v-select
              :items="items"
              class="select__trade ma-0 pa-0"
              item-color="success"
              append-icon="mdi-chevron-down"
              background-color="#03dac5"
              label="Select Strategy"
              color="success"
              dense
              solo
            ></v-select>
            <v-select
              :items="items"
              class="select__trade ma-0 pa-0"
              item-color="success"
              append-icon="mdi-chevron-down"
              background-color="#03dac5"
              label="Select Trade Plan"
              color="success"
              dense
              solo
            ></v-select>
            <v-select
              :items="items"
              class="select__trade ma-0 pa-0"
              item-color="success"
              append-icon="mdi-chevron-down"
              background-color="#03dac5"
              label="Select Emotion"
              color="success"
              dense
              solo
            ></v-select>
          </v-content>
        </v-col>
        <v-col class="col-7">
          <v-content
            ><v-textarea
              outlined
              no-resize
              color="success"
              :dark="lightSwitch == 1"
              full-width
              height="110px"
              label="Notes"
            ></v-textarea
          ></v-content>
        </v-col>
        <v-col class="col-2 text-left">
          <br />
          <br />
          <br />
          <v-btn
            small
            color="#03DAC5"
            :dark="lightSwitch == 1"
            class="caption mt-2"
            >ENTER</v-btn
          >
        </v-col>
      </v-row>
      <!-- <v-btn @click="showBrokers">Return</v-btn> -->
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
      card_content: [
        { id: 1, title: "Price", amount: "10,000.00", php: true },
        { id: 2, title: "Quantity", amount: "10,000", php: false },
        { id: 3, title: "Total", amount: "1,000,000.00", php: true }
      ],
      items: ["Test", "Test 1"],
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
<style>
.select__trade .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px;
}
.select__trade .v-text-field--filled > .v-input__control > .v-input__slot {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.select__trade .v-label {
  font-size: 14px;
  font-weight: 600;
}
.select__trade .v-select__selection--comma {
  color: black;
  font-size: 14px;
  font-weight: 600;
}
.select__trade .v-select__slot .v-label,
.select__trade .v-select__slot .v-icon {
  color: black !important;
}
.select__trade .v-input__slot {
  margin: 0;
}
.select__trade .v-input__control {
  min-height: auto !important;
  border-radius: unset;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: -7px;
}
/* .select__trade .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: -1px !important;
} */
</style>

<style scoped>
#span__close {
  cursor: pointer;
}
.col___left {
  /* background: red; */
}
.col___right {
  /* background: blue; */
}
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
