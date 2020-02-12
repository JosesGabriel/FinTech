<template>
  <v-row class="ma-0 mt-1 pa-0">
    <v-col class="col-3 pa-0 ma-0">
      <v-content class="pa-0 ma-0 pt-3 px-4">
        <v-select
          v-model="portvalue"
          :items="portfolio"
          item-text="name"
          item-value="id"
          class="select__trade ma-0 pa-0"
          append-icon="mdi-chevron-down"
          label="Portfolio"
          outlined
          dense
          color="success"
          item-color="success"
          :dark="lightSwitch == 1"
          :background-color="cardBackground"
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
        <v-icon
          v-show="false"
          small
          :disabled="portvalue ? true : false"
          class="quickSettings"
          style="float: right; padding-top: 6px;"
          >mdi-settings-outline</v-icon
        >
        <v-row style="font-size: 14px;">
          <v-col class="ml-3">
            <span>Board lot</span>
          </v-col>
          <v-col class="mr-3">
            <span style="float:right;">{{
              this.getBoardLot(this.stock_last)
            }}</span>
          </v-col>
        </v-row>
      </v-content>
    </v-col>

    <v-col class="col-3 pa-0 ma-0">
      <v-content class="pa-0 ma-0 pt-3 px-4">
        <v-row style="font-size: 14px;" class="mt-0 pt-0">
          <v-col class="mt-0 pt-0">
            Available Funds
            <span style="float:right;">{{ this.addcomma(this.balance) }}</span>
          </v-col>
        </v-row>
        <v-text-field
          dense
          readonly
          color="success"
          :value="stock_last"
          :dark="lightSwitch == true"
          label="Buy Price"
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
        <v-row style="font-size: 14px;" class="mt-0 pt-0">
          <v-col class="mt-0 pb-1 pt-0">
            Total Cost
            <span style="float:right;">{{
              this.addcomma(this.totalcost)
            }}</span>
          </v-col>
        </v-row>
      </v-content>
    </v-col>
    <v-col class="col-3 pa-0 ma-0">
      <v-content class="pa-0 ma-0 pt-3 px-4">
        <v-select
          v-model="strat"
          :items="strategy"
          class="select__trade ma-0 pa-0"
          append-icon="mdi-chevron-down"
          label="Select Strategy"
          dense
          outlined
          color="success"
          item-color="success"
          :dark="lightSwitch == 1"
          :background-color="cardBackground"
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
                >{{ data.item }}</span
              >
            </v-list-item-content>
          </template>
        </v-select>
        <v-select
          v-model="tplan"
          :items="tradeplan"
          class="select__trade ma-0 pa-0"
          append-icon="mdi-chevron-down"
          label="Select Trade Plan"
          dense
          outlined
          color="success"
          item-color="success"
          :dark="lightSwitch == 1"
          :background-color="cardBackground"
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
                >{{ data.item }}</span
              >
            </v-list-item-content>
          </template>
        </v-select>
        <v-select
          v-model="emot"
          :items="emotion"
          class="select__trade ma-0 pa-0"
          append-icon="mdi-chevron-down"
          label="Select Emotion"
          dense
          outlined
          color="success"
          item-color="success"
          :dark="lightSwitch == 1"
          :background-color="cardBackground"
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
                >{{ data.item }}</span
              >
            </v-list-item-content>
          </template>
        </v-select>
      </v-content>
    </v-col>

    <v-col class="col-3">
      <v-content
        ><v-textarea
          v-model="notes"
          outlined
          no-resize
          color="success"
          class="__tradenotes"
          :dark="lightSwitch == 1"
          full-width
          height="123px"
          label="Notes"
        ></v-textarea>
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

    <v-dialog v-model="errorMsg" max-width="400px">
      <v-card :dark="lightSwitch == true">
        <v-card-title
          class="text-center justify-left pa-4 subtitle-1 font-weight-bold"
          :class="[
            { 'white--text': lightSwitch == 1 },
            { 'black--text': lightSwitch == 0 }
          ]"
          >{{ this.errmsgbuy }}</v-card-title
        >
        <v-card-title
          class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
          >{{ this.errmsg }}</v-card-title
        >
        <v-container class="px-5">
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn
              text
              depressed
              class="font-weight-bold text-capitalize"
              :dark="lightSwitch == true"
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
              NOTE: Quick Trade automatically places buy and sell orders based
              on the <strong>best available price</strong> and your
              <strong>pre-set allocation</strong> per trade.
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
              @click.stop="modalQuickTrade = false"
              @click="quickConfirm"
              >Save</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Quick Trade -->
    <v-dialog v-model="showConfirm" max-width="350px">
      <v-card :dark="lightSwitch == true">
        <v-card-title class="font-weight-bold">{{
          quickTradeSelected ? "Quick Trade" : "Review Order"
        }}</v-card-title>

        <v-card-text>
          <v-content class="mb-6">
            <v-row v-show="quickTradeSelected" no-gutters class="mb-6 mt-2">
              <v-col>
                NOTE: Quick Trade automatically places buy and sell orders based
                on the <b>best available</b> price and your
                <b>selected allocation</b>.
              </v-col>
            </v-row>

            <v-row v-show="quickTradeSelected">
              <v-col cols="12" class="text-center">
                <v-btn-toggle
                  v-model="selectedButton"
                  mandatory
                  dense
                  active-class="activeClassButton"
                  :background-color="cardBackground"
                >
                  <v-btn
                    v-for="item in items"
                    :key="item.id"
                    :value="item.id"
                    :dark="lightSwitch == true"
                    :color="selectedButton != item.id ? 'success' : ''"
                    class="black--text font-weight-bold text-capitalize mx-2"
                    elevation="1"
                    width="80"
                    @click="getSelectedButton(item.id)"
                    >{{ item.text }}</v-btn
                  >
                </v-btn-toggle>
              </v-col>
              <v-col v-show="selectedButton == 3" cols="4" offset="3">
                <v-text-field
                  v-model="customPercentage"
                  color="success"
                  label="Percentage"
                  dense
                  type="number"
                  class="text-end"
                  append-icon="mdi-percent"
                  :required="selectedButton !== 3"
                  :disabled="selectedButton !== 3"
                ></v-text-field>
              </v-col>
              <v-col v-show="selectedButton == 3" cols="3">
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    :dark="lightSwitch == true"
                    class="black--text font-weight-bold text-capitalize mx-2"
                    :color="!hover ? 'success' : 'successhover'"
                    elevation="1"
                    :disabled="
                      parseInt(customPercentage) < 1 || customPercentage == ''
                    "
                    @click="quickConfirmV2"
                    >Save</v-btn
                  >
                </v-hover>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-content class="mx-6 mt-4">
              <v-row>
                <v-col class="pa-0" cols="6">
                  <span>Fill Type:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>Day</span>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <span>Allocation:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>{{ alloc }} %</span>
                </v-col>
              </v-row>

              <v-row class="my-6">
                <v-col class="pa-0" cols="6">
                  <span>Buy Price:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>{{ stock_last.toFixed(2) }}</span>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <span>Quantity:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>{{ quantity.toFixed(2) }}</span>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <span>Total Cost:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>{{ addcomma(totalcost) }}</span>
                </v-col>
              </v-row>

              <v-row v-show="!quickTradeSelected">
                <v-col class="pa-0" cols="6">
                  <span>Strategy:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>{{ quickTradeSelected ? "Quick Trade" : strat }}</span>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <span>Trade Plan:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span>{{ quickTradeSelected ? "Quick Trade" : tplan }}</span>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <span>Emotions:</span>
                </v-col>
                <v-col cols="6" class="pa-0 text-right font-weight-bold">
                  <span> {{ quickTradeSelected ? "Quick Trade" : emot }}</span>
                </v-col>
              </v-row>
            </v-content>
          </v-content>
        </v-card-text>

        <v-card-actions>
          <v-row no-gutters>
            <v-col class="text-right">
              <v-spacer></v-spacer>
              <v-btn
                text
                depressed
                class="font-weight-bold text-capitalize"
                :dark="lightSwitch == true"
                @click.stop="showConfirm = false"
                >Cancel</v-btn
              >

              <v-hover v-slot:default="{ hover }">
                <v-btn
                  :dark="lightSwitch == true"
                  class="black--text font-weight-bold text-capitalize"
                  :color="!hover ? 'success' : 'successhover'"
                  elevation="1"
                  @click.stop="showConfirm = false"
                  @click="confirmBuy"
                  >Confirm</v-btn
                >
              </v-hover>
            </v-col>
          </v-row>
        </v-card-actions>
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
    setting_val: 0,
    customVal: 0,
    portvalue: "",
    quickTradeSelected: false,
    quicksetting: false,
    showConfirm: false,
    modalQuickTrade: false,
    dboard: 0,
    setting: "10",
    notes: "",
    strat: "",
    tplan: "",
    emot: "",
    errorMsg: false,
    errmsgbuy: "",
    errmsg: "",
    capital: 0,
    shares: 0,
    unrealized: 0,
    alloc: 0,
    realized: 0,
    equity: 0,
    stobuy: 0,
    normalTrade: ["Normal Trade", "Quick Trade"],
    strategy: [
      "Bottom Picking",
      "Breakout Play",
      "Trend Following",
      "1-2-3 Reversal"
    ],
    tradeplan: ["Day Trade", "Swing Trade", "Investments"],
    emotion: ["Neutral", "Greedy", "Fearful"],
    totalcost: 0,
    quantity: 0,
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
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
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
    /**
     * Get Buy Date
     *
     * @return  {string}  date value
     */
    buyDate: {
      default() {
        return "";
      }
    }
  },
  watch: {
    /**
     *
     * if last price is changed
     * get latest Board Lot
     */
    stock_last() {
      this.getBoardLot(this.stock_last);
      this.quantity = 0;
    },
    selectedButton(value) {
      this.quickConfirmV2();
    }
  },
  mounted() {
    this.getPorfolio();
    this.getBoardLot(this.stock_last);
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
    getSelectedButton(id) {
      if (id == 3) {
        //this.saveCustom = !this.saveCustom;
      }
    },
    /**
     * Get list of Portfolios
     *
     * @return  {array}  list of portfolios
     */
    getPorfolio() {
      this.$api.journal.portfolio.portfolio().then(
        function(result) {
          let defaultPort = false;
          for (let i = 0; i < result.data.logs.length; i++) {
            if (result.data.logs[i].type == "virtual") {
              let portfolio_params = {
                name: result.data.logs[i].name,
                id: result.data.logs[i].id,
                balance: result.data.logs[i].balance,
                capital: result.data.logs[i].capital
              };
              this.portfolio.push(portfolio_params);
              this.getBalance.push(portfolio_params);
            }
          }
        }.bind(this)
      );
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
     * Get Available balance
     *
     * @param   {string}  selectObj  Portfolio ID
     *
     * @return  {Float}    balance
     */
    getFunds(selectObj) {
      this.quantity = 0;
      for (let index = 0; index < this.getBalance.length; index++) {
        if (selectObj == this.getBalance[index].id) {
          this.balance = parseFloat(this.getBalance[index].balance);
          this.capital = parseFloat(this.getBalance[index].capital);
        }
      }
      this.getUnrealized(selectObj);
      this.getRealized(selectObj);
    },
    /**
     * add comma function
     *
     */
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },
    /**
     * Change Total Cost if quantity is pressed
     *
     * @return  {int}  total cost
     */
    keypress() {
      let press = 0;
      let pressfees = 0;
      press = parseFloat(this.quantity) * parseFloat(this.stock_last);
      pressfees = this.fees(press);
      this.totalcost = pressfees;
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
      let dall = dcommission + dtax + dtransferfee + dsccp;
      return buyResult + dall;
    },
    getUnrealized(portID) {
      this.unrealized = 0;
      const openparams2 = {
        fund: portID
      };
      this.$api.journal.portfolio.open(openparams2).then(
        function(result) {
          for (let i = 0; i < result.data.open.length; i++) {
            this.unrealized =
              parseFloat(this.unrealized) +
              parseFloat(result.data.open[i].profit_loss);
          }
        }.bind(this)
      );
    },
    getRealized(portID) {
      this.realized = 0;
      const tradelogsparams = {
        fund: portID
      };
      this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
        function(result) {
          for (let i = 0; i < result.data.logs.length; i++) {
            let buyvalue =
              parseFloat(result.data.logs[i].amount) *
              parseFloat(result.data.logs[i].meta.average_price);
            let ploss = parseFloat(result.data.logs[i].total_value) - buyvalue;
            this.realized = this.realized + ploss;
          }
        }.bind(this)
      );
    },
    /**
     * Buy Confirmation
     *
     */
    confirmBuy() {
      const stock_id = this.symbolid;
      let fund_id = this.portvalue;
      let d = new Date();
      let bdate =
        this.BuyDate +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
      const buyparams = {
        position: this.quantity,
        stock_price: this.stock_last,
        transaction_meta: {
          strategy: this.strat,
          plan: this.tplan,
          emotion: this.emot,
          notes: this.notes,
          date: bdate
        }
      };

      this.$api.journal.portfolio
        .tradebuy(fund_id, stock_id, buyparams)
        .then(response => {
          if (response.success) {
            this.showAlert({
              message: "Trade was successfully made!",
              state: true
            });
            this.quantity = 0;
            this.portvalue = "";
            this.notes = "";
          }
        })
        .catch(error => {
          this.errmsg = error.response.data.message;
          //this.errmsg = 'Stock is currently closed';
          this.errmsgbuy = "Unable to buy";
          this.errorMsg = true;
        });
    },
    /**
     * Get total cost if Up arrow Button is pressed
     *
     * @return  {float} Total COst
     */
    addButton() {
      this.quantity = parseInt(this.quantity) + parseInt(this.dboard);
      let add = parseFloat(this.quantity) * parseFloat(this.stock_last);
      let addfees = this.fees(add);
      this.totalcost = addfees;
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
      let min = parseFloat(this.quantity) * parseFloat(this.stock_last);
      let minfees = this.fees(min);
      this.totalcost = minfees;
    },
    quickConfirmV2() {
      if (this.selectedButton == null) return;
      this.setting = this.selectedButton == 3 ? "custom" : "";
      this.setting_val = 0;
      if (this.setting == "custom") {
        this.setting_val = parseFloat(this.customPercentage);
      } else {
        // selected specific value
        let selected = 10;
        switch (this.selectedButton) {
          case 1:
            selected = 10;
            break;
          case 2:
            selected = 30;
            break;
        }
        this.setting_val = parseFloat(selected);
      }
      this.alloc = this.setting_val;
      let settingval = {
        id: this.portvalue,
        perc: this.setting_val
      };

      localStorage.setItem("QT_" + this.portvalue, JSON.stringify(settingval));

      this.quicksetting = true;
      this.equity = this.unrealized + this.realized + this.capital;
      let totalperc = (this.equity / 100) * this.setting_val;

      let bdlot = this.getBoardLot(this.stock_last);

      this.shares = totalperc / parseFloat(this.stock_last);
      let sbuy = this.shares % bdlot;
      this.stobuy = parseFloat(this.shares) - parseFloat(sbuy);

      this.quantity = this.stobuy;
      this.totalcost = this.stobuy * parseFloat(this.stock_last);
      this.totalcost = this.fees(this.totalcost);
      this.showConfirm = true;
    },
    // old
    quickConfirm() {
      this.setting_val = 0;
      if (this.setting == "custom") {
        this.setting_val = parseFloat(this.customVal);
      } else {
        this.setting_val = parseFloat(this.setting);
      }
      this.alloc = this.setting_val;
      let settingval = {
        id: this.portvalue,
        perc: this.setting_val
      };

      localStorage.setItem("QT_" + this.portvalue, JSON.stringify(settingval));

      this.quicksetting = true;
      this.equity = this.unrealized + this.realized + this.capital;
      let totalperc = (this.equity / 100) * this.setting_val;

      let bdlot = this.getBoardLot(this.stock_last);

      this.shares = totalperc / parseFloat(this.stock_last);
      let sbuy = this.shares % bdlot;
      this.stobuy = parseFloat(this.shares) - parseFloat(sbuy);

      this.quantity = this.stobuy;
      this.totalcost = this.stobuy * parseFloat(this.stock_last);
      this.totalcost = this.fees(this.totalcost);
      this.showConfirm = true;
    },
    quickTrade() {
      this.quickTradeSelected = true;

      let getlocal = localStorage.getItem("QT_" + this.portvalue);
      getlocal = JSON.parse(getlocal);

      if (getlocal != null) {
        this.alloc = getlocal.perc;
        this.equity = this.unrealized + this.realized + this.capital;
        let totalperc = (this.equity / 100) * parseFloat(this.alloc);
        let bdlot = this.getBoardLot(this.stock_last);

        this.shares = totalperc / parseFloat(this.stock_last);
        let sbuy = this.shares % bdlot;
        this.stobuy = parseFloat(this.shares) - parseFloat(sbuy);

        this.quantity = this.stobuy;
        this.totalcost = this.stobuy * parseFloat(this.stock_last);
        this.totalcost = this.fees(this.totalcost);
        this.showConfirm = true;
      } else {
        this.alloc = 10;
        this.equity = this.unrealized + this.realized + this.capital;
        let totalperc = (this.equity / 100) * 10;
        let bdlot = this.getBoardLot(this.stock_last);

        this.shares = totalperc / parseFloat(this.stock_last);
        let sbuy = this.shares % bdlot;
        this.stobuy = parseFloat(this.shares) - parseFloat(sbuy);

        this.quantity = this.stobuy;
        this.totalcost = this.stobuy * parseFloat(this.stock_last);
        this.totalcost = this.fees(this.totalcost);
        this.showConfirm = true;
      }
    }
  }
};
</script>

<style>
.normalTrade > .v-input__control > .v-input__slot {
  border-radius: unset;
}
.select__trade > .v-input__control > .v-input__slot {
  border: 1px solid;
  box-shadow: unset !important;
}
.__tradenotes > .v-input__control > .v-input__slot {
  border-radius: unset !important;
}

.quickSettings {
  cursor: pointer;
}
.customNum {
  position: absolute;
  width: 62px;
  top: 100px;
}
</style>
<style scoped>
.activeClassButton {
  background: #029889 !important;
}
</style>
