<template>
  <v-row class="ma-0 mt-1 pa-0">
    <v-col class="col-3 pa-0 ma-0">
      <v-content class="pa-0 ma-0 pt-6 px-4">
        <v-select
          v-model="portvalue"
          :items="portfolio"
          class="select__trade ma-0 pa-0"
          append-icon="mdi-chevron-down"
          item-value="id"
          item-text="name"
          label="Portfolio"
          dense
          outlined
          color="success"
          item-color="success"
          :dark="lightSwitch == 1"
          :background-color="cardBackground"
          @mousedown="getPorfolio"
          @change="getFunds"
        >
          <template slot="item" slot-scope="data">
            <v-list-item-content
              :dark="lightSwitch == true"
              :style="{ background: cardBackground }"
              class="custom_menu_popup"
            >
              <span
                class="caption pa-2"
                :class="[
                  { 'white--text': lightSwitch == 1 },
                  { 'black--text': lightSwitch == 0 }
                ]"
                >{{ data.item.name }}</span
              >
            </v-list-item-content>
          </template>
        </v-select>

        <v-hover v-slot:default="{ hover }">
          <v-btn
            :disabled="portvalue == '' ? true : false"
            :dark="lightSwitch == true"
            class="black--text font-weight-bold text-capitalize mr-0"
            :color="!hover ? 'success' : 'successhover'"
            elevation="1"
            block
            @click="quickTrade"
            >Quick Trade</v-btn
          >
        </v-hover>
      </v-content>
    </v-col>

    <v-col class="col-3 pa-0 ma-0">
      <v-content class="pa-0 ma-0 pt-6 px-4">
        <v-row style="font-size: 14px;">
          <v-col>
            <span>Board lot</span>
          </v-col>
          <v-col class="mr-3">
            <span style="float:right;">{{
              this.getBoardLot(this.stock_last)
            }}</span>
          </v-col>
        </v-row>
        <v-row style="font-size: 14px;" class="mt-0 pt-0">
          <v-col class="mr-3">
            <span> Available Funds </span>
            <span style="float:right;">{{ this.addcomma(this.balance) }}</span>
          </v-col>
        </v-row>
      </v-content>
    </v-col>
    <v-col class="col-3 pa-0 ma-0">
      <v-content class="pa-0 ma-0 pt-8 px-4">
        <v-text-field
          v-model="stock_last"
          :dark="lightSwitch == true"
          :value="stock_last"
          readonly
          dense
          color="success"
          label="Sell Price"
        ></v-text-field>
        <v-row class="my-0 py-0">
          <v-col cols="8" class="mb-0 pb-0">
            <v-text-field
              v-model="quantity"
              dense
              color="success"
              :dark="lightSwitch == true"
              label="Quantity"
              @keyup="keypress"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="mx-0 mb-0 px-0 pb-0">
            <v-btn text icon :dark="lightSwitch == true" @click="minusButton">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn text icon :dark="lightSwitch == true" @click="addButton">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-content>
    </v-col>

    <v-col class="col-3">
      <v-content class="pt-6">
        <v-row style="font-size: 14px;" class="mt-0 pt-0">
          <v-col class="mb-6 mr-8">
            Peso Value
            <span style="float:right;">{{ this.totalcost }}</span>
          </v-col>
        </v-row>
        <v-btn
          class="ml-11 text-capitalize"
          text
          depressed
          :dark="lightSwitch == true"
          dense
          @click="setShowBrokers(true)"
        >
          Cancel
        </v-btn>
        <v-hover v-slot:default="{ hover }">
          <v-btn
            :dark="lightSwitch == 1"
            class="black--text font-weight-bold text-capitalize mr-0"
            :color="!hover ? 'success' : 'successhover'"
            elevation="1"
            :disabled="portvalue && quantity > 0 ? false : true"
            @click="(showConfirm = true), (quickTradeSelected = false)"
            >Continue</v-btn
          >
        </v-hover>
      </v-content>
    </v-col>
    <v-dialog v-model="showConfirm" max-width="330px">
      <v-card :dark="lightSwitch == true">
        <v-card-title
          class="text-center justify-left pa-4 text-capitalize font-weight-bold"
          style="font-size: 16px;"
          >Review Order</v-card-title
        >
        <v-spacer></v-spacer>

        <v-container class="px-5" style="font-size: 14px; line-height:.5;">
          <v-row>
            <v-col class="pl-12 mb-6">
              Fill Type
            </v-col>
            <v-col class="mr-12 font-weight-bold" style="text-align: right;">
              Day
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col class="pl-12">
              Sell Price
            </v-col>
            <v-col class="mr-12 font-weight-bold" style="text-align: right;">
              {{ stock_last }}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pl-12">
              Quantity
            </v-col>
            <v-col class="mr-12 font-weight-bold" style="text-align: right;">
              {{ this.addcomma(this.quantity) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pl-12 mb-12">
              Peso Value
            </v-col>
            <v-col class="mr-12 font-weight-bold" style="text-align: right;">
              {{ this.totalcost }}
            </v-col>
          </v-row>
          <v-spacer></v-spacer>

          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize"
              text
              :dark="lightSwitch == true"
              depressed
              @click.stop="showConfirm = false"
              >Cancel</v-btn
            >

            <v-hover v-slot:default="{ hover }">
              <v-btn
                :dark="lightSwitch == 1"
                class="black--text font-weight-bold text-capitalize mr-0"
                :color="!hover ? 'success' : 'successhover'"
                elevation="1"
                @click="confirmSell"
                >Confirm</v-btn
              >
            </v-hover>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorMsg" max-width="400px">
      <v-card :dark="lightSwitch == true">
        <v-card-title
          class="text-center justify-left pa-4 success--text subtitle-1 font-weight-bold"
          >{{ this.errmsgsell }}</v-card-title
        >
        <v-card-title
          class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
          >{{ this.errmsg }}</v-card-title
        >
        <v-container class="px-5">
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              class="text-capitalize mt-2"
              text
              :dark="lightSwitch == true"
              light
              @click.stop="errorMsg = false"
              >Close</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalQuickTrade" max-width="400px">
      <v-card :dark="lightSwitch == true">
        <v-card-title
          class="text-center justify-left pa-4 subtitle-1 font-weight-bold"
          >Quick Trade Setting</v-card-title
        >
        <v-spacer></v-spacer>
        <v-container class="px-5">
          <v-row class="ml-3 pb-3">
            Portfolio Allocations (%)
          </v-row>
          <v-row class="ml-3 pb-0 mb-0">
            <v-col cols="9" class="mx-0 px-0 pb-0 mb-0">
              <v-radio-group
                v-model="setting"
                :dark="lightSwitch == true"
                dense
                class="mt-0 pt-0 px-0 mx-0"
                row
              >
                <v-radio
                  :dark="lightSwitch == true"
                  label="10%"
                  value="10"
                ></v-radio>
                <v-radio
                  :dark="lightSwitch == true"
                  label="30%"
                  value="30"
                ></v-radio>
                <v-radio
                  :dark="lightSwitch == true"
                  class="mr-0 pr-0"
                  label="Custom"
                  value="custom"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="3" class="mx-0 px-0">
              <v-text-field
                v-model="customVal"
                type="number"
                :disabled="this.setting == 'custom' ? false : true"
                flat
                class="customNum mx-0 px-0"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="font-size: 12px;">
              NOTE: Quick Trade automaticaly place buy and sell orders based on
              best available price.
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize mt-2"
              text
              :dark="lightSwitch == true"
              @click="modalQuickTrade = false"
              >Close</v-btn
            >
            <v-btn
              class="text-capitalize mt-2"
              :dark="lightSwitch == true"
              @click="modalQuickTrade = false"
              >Save</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    portfolio: [],
    getBalance: [],
    balance: 0,
    portvalue: "",
    dboard: 0,
    totalcost: 0,
    quantity: 0,
    position: 0,
    customVal: 0,
    avprice: 0,
    showConfirm: false,
    errorMsg: false,
    errmsgsell: "",
    errmsg: "",
    setting: "10",
    modalQuickTrade: false,
    quicksetting: false,
    unrealized: 0,
    realized: 0,
    capital: 0,
    setting_val: 0,
    equity: 0,
    selectedButton: null,
    items: [
      { id: 1, text: "10%" },
      { id: 2, text: "30%" },
      { id: 3, text: "Custom" }
    ],
    customPercentage: 0
  }),
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      symbolid: "chart/symbolid",
      stock_last: "chart/stock_last"
    }),
    /**
     * Toggle between dark/light
     *
     * @return
     */
    cardBackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  props: {
    sellDate: {
      default() {
        return "";
      }
    }
  },
  watch: {
    symbolid() {
      this.getPorfolio();
    },
  },
  methods: {
    ...mapActions({
      setShowBrokers: "chart/setShowBrokers",
      setAlert: "global/setAlert"
    }),
    /**
     * Fires global snackbar alert
     *
     * @param   {String}  message
     * @param   {Boolean}  true or false
     *
     * @return
     */
    showAlert({ message, state }) {
      let alert = {
        model: true,
        state: state,
        message: message
      };
      this.setAlert(alert);
    },
    /**
     * Get Board Lot value
     *
     * @param   {int}  lastprice  latest price
     *
     * @return  {int}  board lot value
     */
    getBoardLot(lastprice) {
      if (lastprice >= 0.0001 && lastprice <= 0.0099) {
        this.dboard = 1000000;
      } else if (lastprice >= 0.01 && lastprice <= 0.049) {
        this.dboard = 100000;
      } else if (lastprice >= 0.05 && lastprice <= 0.495) {
        this.dboard = 10000;
      } else if (lastprice >= 0.5 && lastprice <= 4.99) {
        this.dboard = 1000;
      } else if (lastprice >= 5 && lastprice <= 49.95) {
        this.dboard = 100;
      } else if (lastprice >= 50 && lastprice <= 999.5) {
        this.dboard = 10;
      } else if (lastprice >= 1000) {
        this.dboard = 5;
      }
      return this.dboard;
    },
    /**
     * Get total cost if Up arrow Button is pressed
     *
     * @return  {float} Total COst
     */
    addButton() {
      this.quantity =
        this.position <= this.quantity
          ? this.position
          : (this.quantity = parseInt(this.quantity) + parseInt(this.dboard));
      let add =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      let addfees = this.fees(add);
      this.totalcost = this.addcomma(addfees);
    },
    /**
     * Get total cost if Up down Button is pressed
     *
     * @return  {float} Total COst
     */
    minusButton() {
      this.quantity =
        this.quantity <= 0 || this.quantity < parseInt(this.dboard)
          ? 0
          : (this.quantity = parseInt(this.quantity) - parseInt(this.dboard));
      let min =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      let minfees = this.fees(min);
      this.totalcost = this.addcomma(minfees);
    },
    /**
     * Buy/Sell Fees
     *
     * @param   {float}  buyResult  buy result
     *
     * @return  {float}   total fees
     */
    fees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;

      let dsell = buyResult * 0.006;
      let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
      return buyResult - dall;
    },
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },
    keypress() {
      let press = 0;
      let pressfees = 0;
      if (this.quantity > this.position) {
        press = parseFloat(this.position) * parseFloat(this.stock_last);
        pressfees = this.fees(press);
        this.totalcost = this.addcomma(pressfees);
        return (this.quantity = this.position);
      }
      press =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      pressfees = this.fees(press);
      this.totalcost = this.addcomma(pressfees);
    },
    /**
     * Get Available balance
     *
     * @param   {string}  selectObj  Portfolio ID
     *
     * @return  {Float}    balance
     */
    getFunds(selectObj) {
      for (let index = 0; index < this.getBalance.length; index++) {
        if (selectObj == this.getBalance[index].id) {
          this.balance = parseFloat(this.getBalance[index].balance);
          this.position = parseFloat(this.getBalance[index].position);
          this.quantity = this.position;
          this.avprice = parseFloat(this.getBalance[index].avprice);
          this.capital = parseFloat(this.getBalance[index].capital);
        }
      }
    },
    /**
     * Get list of Portfolios
     *
     * @return  {array}  list of portfolios
     */
    getPorfolio() {
      this.portfolio = [];
      this.getBalance = [];

      this.$api.journal.portfolio.portfolio().then(
        function(result) {
          let defaultPort = false;
          for (let i = 0; i < result.data.logs.length; i++) {
            if (result.data.logs[i].type == "virtual") {
              let portfolio_params = {
                name: result.data.logs[i].name,
                id: result.data.logs[i].id,
                balance: result.data.logs[i].balance
              };
              //this.portfolio.push(portfolio_params);
              //this.getBalance.push(portfolio_params);
              const openparams = {
                fund: result.data.logs[i].id
              };
              this.$api.journal.portfolio.open(openparams).then(
                function(response) {
                  for (
                    let index = 0;
                    index < response.data.open.length;
                    index++
                  ) {
                    if (this.symbolid == response.data.open[index].stock_id) {
                      this.portfolio.push(portfolio_params);
                      let port = {
                        id: result.data.logs[i].id,
                        balance: result.data.logs[i].balance,
                        position: response.data.open[index].position,
                        avprice: response.data.open[index].average_price,
                        capital: result.data.logs[i].capital
                      };
                      this.avprice = response.data.open[index].average_price;
                      this.portvalue = result.data.logs[i].id;
                      this.getBalance.push(port);
                      this.quantity = response.data.open[index].position;
                      this.position = response.data.open[index].position;
                    }
                  }
                }.bind(this)
              );
            }
          }
        }.bind(this)
      );
    },
    /**
     * Sell Confirmation
     *
     */
    confirmSell() {
      this.showConfirm = false;
      const stock_id = this.symbolid;
      let fund_id = this.portvalue;
      let d = new Date();
      let sdate =
        this.SellDate +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
       
      let stockprice = this.stock_last;
     // let n = stockprice;
      if(typeof(stockprice) == 'object'){
        stockprice = stockprice[0];
      }
      const sellparams = {
        position: this.quantity,
        stock_price: stockprice,
        transaction_meta: {
          strategy: "",
          average_price: this.avprice.toFixed(2),
          plan: "",
          emotion: "",
          notes: "",
          date: sdate
        }
      };    
      this.$api.journal.portfolio
        .tradesell(fund_id, stock_id, sellparams)
        .then(response => {
          if (response.success) {
            this.showAlert({
              message: "Trade was successfully made!",
              state: true
            });
            this.quantity = 0;
            this.portvalue = "";
            this.totalcost = 0;
          }
        })
        .catch(error => {
          this.errmsg = error.response.data.message;
          //this.errmsg = 'Stock is currently closed';
          this.errmsgsell = "Unable to sell";
          this.errorMsg = true;
        });
    },

    quickTrade() {
      this.quantity = this.position;
      this.totalcost = this.position * parseFloat(this.stock_last);
      this.totalcost = this.addcomma(this.totalcost);
      this.showConfirm = true;
    }
  },
  mounted() {
    this.getPorfolio();
  }
};
</script>
<style>
.normalTrade > .v-input__control > .v-input__slot {
  border-radius: unset;
}
</style>
<style scoped>
.activeClassButton {
  background: #029889 !important;
}
</style>
