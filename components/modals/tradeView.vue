<template>
  <v-dialog v-model="show" max-width="320px" class="gameGlobal">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-5 pb-0 px-5 success--text subtitle-1 font-weight-bold"
      >
        <span>TRADE</span>
        <v-spacer></v-spacer>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="px-1" color="success">
              <span class="text-capitalize">Date:</span>
              <v-card-text class="pa-0" v-html="date"></v-card-text>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-date-picker
            v-model="date"
            :dark="lightSwitch == true"
            :class="fontColorDate"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="success" @click="modal = false">Cancel</v-btn>
            <v-btn text color="success" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-card-title>
      <v-stepper id="stepper_container" v-model="e1" dark>
        <v-stepper-items>
          <!-- -----First View of Buy Modal----- -->
          <v-stepper-content step="1" class="pt-0">
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters>
                <v-tabs
                  color="success"
                  background-color="transparent"
                  :dark="lightSwitch == true"
                  grow
                >
                  <v-tab
                    :style="{ color: fontColor }"
                    class="tab_menu-top text-capitalize subtitle-1 px-0"
                    @click="toBuy"
                  >Buy</v-tab>
                  <v-tab
                    :style="{ color: fontColor }"
                    class="tab_menu-top text-capitalize subtitle-1 px-0"
                    @click="toSell"
                  >Sell</v-tab>
                </v-tabs>
                <v-col cols="12" sm="12" md="12" class="pt-3 mt-2">
                  <v-select
                    @change="getStockDetails"
                    :items="stocklist"
                    :menu-props="{offsetY: true, dark: lightSwitch == true}"
                    :dark="lightSwitch == true"
                    light
                    item-text="symbol"
                    item-value="id_str"
                    item-color="success"
                    v-model="GetSelectStock"
                    class="pa-0 ma-0"
                    append-icon="mdi-chevron-down"
                    label="Select Stock"
                    color="success"
                    dense
                  >
                    <template slot="item" slot-scope="data">
                      <v-list-item-content
                        :dark="lightSwitch == true"
                        :style="{ background: cardbackground }"
                        style="padding: 12px 12px; margin: -16px;"
                      >
                        <v-list-item-title v-html="data.item.symbol" class="text-uppercase"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-select>

                  <v-col cols="12" class="pa-0">
                    <v-row no-gutters>
                      <v-card-title class="subtitle-1 px-0 py-2">Current Price</v-card-title>
                      <v-spacer></v-spacer>
                      <v-card-title class="subtitle-1 px-0 py-2">
                        {{ cprice }}
                        <span
                          class="caption pl-1"
                          :class=" change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral' "
                        >{{ change }} ({{ cpercentage }}%)</span>
                      </v-card-title>
                    </v-row>
                  </v-col>
                  <v-row no-gutters class="mt-2">
                    <v-col class="pa-0" cols="12" sm="6" md="6">
                      <v-simple-table
                        id="liveportfolio-table"
                        :class="fontColorTable"
                        :dense="true"
                        :dark="lightSwitch == true"
                      >
                        <template v-slot:default>
                          <tbody>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Previous</td>
                              <td class="item_position-prop body-2 text-right pa-0 px-1">{{ prev }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Low</td>
                              <td
                                class="body-2 text-right py-1 px-1 item_position-prop"
                                :class=" low > open ? 'positive' : low < open ? 'negative' : 'neutral' "
                              >{{ low }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">52WKLow</td>
                              <td
                                class="body-2 text-right py-1 px-1 item_position-prop"
                                :class=" wklow > open ? 'positive' : wklow < open ? 'negative' : 'neutral'"
                              >{{ wklow }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Volume</td>
                              <td class="item_position-prop body-2 text-right py-1 px-1">{{ volm }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Trades</td>
                              <td
                                class="item_position-prop body-2 text-right py-1 px-1"
                              >{{ trades }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                    <v-col class="pa-0" cols="12" sm="6" md="6">
                      <v-simple-table
                        id="liveportfolio-table"
                        :class="fontColorTable"
                        :dense="true"
                        :dark="lightSwitch == true"
                      >
                        <template v-slot:default>
                          <tbody>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Open</td>
                              <td
                                class="body-2 text-right py-1 px-1 item_position-prop"
                                :class=" open > prev ? 'positive' : open < prev ? 'negative' : 'neutral' "
                              >{{ open }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">High</td>
                              <td
                                class="body-2 text-right py-1 px-1 item_position-prop"
                                :class=" high > open ? 'positive' : high < open ? 'negative' : 'neutral' "
                              >{{ high }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">52WKHigh</td>
                              <td
                                class="body-2 text-right py-1 px-1 item_position-prop"
                                :class=" wkhigh > open ? 'positive' : wkhigh < open ? 'negative' : 'neutral' "
                              >{{ wkhigh }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Value</td>
                              <td class="item_position-prop body-2 text-right py-1 px-1">{{ vole }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Average</td>
                              <td
                                class="body-2 text-right py-1 px-1 item_position-prop"
                                :class=" ave > open ? 'positive' : ave < open ? 'negative' : 'neutral' "
                              >{{ ave }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                  <div class="px-3">
                    <v-card-title
                      class="pa-0 justify-center mt-3 font-weight-thin caption"
                    >Bid/ Ask Bar</v-card-title>
                    <v-progress-linear
                      :value="bidask"
                      background-color="#F44336"
                      color="success"
                      height="5px"
                      class="mt-1"
                    ></v-progress-linear>
                    <v-card-title
                      class="pa-0 justify-center mt-3 font-weight-thin caption"
                    >Members Sentiments</v-card-title>
                    <v-progress-linear
                      value="50"
                      background-color="#F44336"
                      color="success"
                      height="5px"
                      class="mt-1 mb-1"
                    ></v-progress-linear>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="text-capitalize"
                :color="fontColor"
                @click.stop="show = false"
              >Close</v-btn>
              <v-btn
                color="success ml-1"
                class="text-capitalize black--text buy"
                :disabled="continueButtonDisable"
                v-show="continuebuyBtn"
                light
                @click="e1 = 2"
              >Continue</v-btn>
              <v-btn
                color="success ml-1"
                class="text-capitalize black--text sell"
                :disabled="continueButtonDisable"
                v-show="continuesellBtn"
                light
                @click="e1 = 4"
              >Continue</v-btn>
            </v-row>
          </v-stepper-content>

          <!-- -----Second View of Buy Modal----- -->
          <v-stepper-content step="2" class="pt-2">
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters class="px-0 py-0">
                <v-col sm="12" md="12" class="pa-0">
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Available Funds</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title
                      class="subtitle-1 px-0 py-2 secondary--text"
                    >{{ nFormatter(availableFundsModel) }}</v-card-title>
                  </v-row>
                  <v-select
                    :items="selectPortfolioModel"
                    v-model="portfolioDropdownModel"
                    item-text="name"
                    item-value="id"
                    append-icon="mdi-chevron-down"
                    @change="whereToSave"
                    label="Select Portfolio"
                    color="success"
                    item-color="success"
                    dense
                    :dark="lightSwitch == true"
                    :menu-props="{offsetY: true, dark: lightSwitch == true}"
                    light
                    class="enter_amount-deposit-select ma-0"
                  >
                    <template slot="item" slot-scope="data">
                      <v-list-item-content
                        :dark="lightSwitch == true"
                        :style="{ background: cardbackground }"
                        style="padding: 12px 12px; margin: -16px;"
                      >
                        <v-list-item-title v-html="data.item.name" class="text-uppercase"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="py-0 justify-right d-flex align-center text-right"
                >
                  <v-text-field
                    v-model="quantityModel"
                    label="Quantity"
                    placeholder="Enter Quantity"
                    type="number"
                    color="success"
                    :dark="lightSwitch == true"
                    light
                    class="body-2 buy_selector buy_price-input py-3"
                  ></v-text-field>
                  <v-btn
                    @click="quantityModel == 0 ? quantityModel = 0 : quantityModel -= boardLotModel"
                    text
                    icon
                    color="success"
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-btn @click="quantityModel += boardLotModel" text icon color="success">
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="py-0 justify-right d-flex align-center text-right"
                >
                  <v-text-field
                    v-model="priceModel"
                    label="Buy Price"
                    placeholder="Enter Buy Price"
                    color="success"
                    style="color: success"
                    :dark="lightSwitch == true"
                    light
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">Board lot</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">{{ boardLotModel }}</v-card-title>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pb-5">
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Total Cost</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="subtitle-1 px-0 py-2 secondary--text">{{ totalCostModel }}</v-card-title>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="text-capitalize"
                @click="e1 = 1"
                :dark="lightSwitch == true"
                light
              >Back</v-btn>
              <v-btn
                color="success"
                v-show="showBuybtn"
                class="text-capitalize black--text ml-1"
                :disabled="continueBuyButtonDisable"
                light
                @click="e1 = 3"
              >Continue</v-btn>
            </v-row>
          </v-stepper-content>

          <!-- -----Third View of Buy Modal----- -->
          <v-stepper-content step="3" class="pt-2">
            <v-container class="pt-0">
              <v-row no-gutters class="px-0 py-0">
                <v-col sm="12" md="12">
                  <div>
                    <v-select
                      v-model="strategyModel"
                      append-icon="mdi-chevron-down"
                      class="mb-1"
                      color="success"
                      :items="strategy"
                      item-color="success"
                      :menu-props="{offsetY: true, dark: lightSwitch == true}"
                      :dark="lightSwitch == true"
                      label="Select Strategy"
                      light
                      dense
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-item-content
                          :dark="lightSwitch == true"
                          :style="{ background: cardbackground }"
                          style="padding: 12px 12px; margin: -16px;"
                        >
                          <v-list-item-title v-html="data.item" class="text-uppercase"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                  </div>
                  <div>
                    <v-select
                      v-model="tradeplanModel"
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      class="mb-1"
                      color="success"
                      :dark="lightSwitch == true"
                      :menu-props="{offsetY: true, dark: lightSwitch == true}"
                      light
                      :items="tradeplan"
                      label="Select Trade Plan"
                      flat
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-item-content
                          :dark="lightSwitch == true"
                          :style="{ background: cardbackground }"
                          style="padding: 12px 12px; margin: -16px;"
                        >
                          <v-list-item-title v-html="data.item" class="text-uppercase"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                  </div>
                  <div>
                    <v-select
                      v-model="emotionsModel"
                      offset-y="true"
                      item-color="success"
                      color="success"
                      append-icon="mdi-chevron-down"
                      :items="emotions"
                      :dark="lightSwitch == true"
                      :menu-props="{offsetY: true, dark: lightSwitch == true}"
                      light
                      label="Select Emotions"
                      flat
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-item-content
                          :dark="lightSwitch == true"
                          :style="{ background: cardbackground }"
                          style="padding: 12px 12px; margin: -16px;"
                        >
                          <v-list-item-title v-html="data.item" class="text-uppercase"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="pa-0 mt-3 justify-right d-flex align-center text-right"
                >
                  <v-textarea
                    color="white"
                    class="white--text trading_notes-textarea body-2"
                    v-model="notesModel"
                    placeholder="Enter Notes"
                    :dark="lightSwitch == true"
                    :menu-props="{offsetY: true, dark: lightSwitch == true}"
                    light
                    filled
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="text-capitalize"
                @click="e1 = 2"
                :dark="lightSwitch == true"
                light
              >Back</v-btn>
              <v-btn
                color="success"
                class="text-capitalize black--text ml-1"
                @click="buyListArray"
                @click.stop="show = false"
              >Confirm</v-btn>
            </v-row>
          </v-stepper-content>

          <!-- -----First View of Sell Modal----- -->
          <v-stepper-content step="4" class="pt-2">
            <v-container class="pa-0">
              <v-row no-gutters class="pt-3 pa-0">
                <v-text-field
                  v-model="priceSellModel"
                  label="Sell Price"
                  placeholder="Enter Sell Price"
                  color="success"
                  type="number"
                  style="color: success"
                  :dark="lightSwitch == true"
                  light
                  class="body-2 buy_selector quantity-input py-3"
                ></v-text-field>
                <v-col sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                  <v-text-field
                    v-model="quantitySellModel"
                    label="Quantity"
                    placeholder="Enter Quantity"
                    type="number"
                    color="success"
                    style="color: success"
                    :dark="lightSwitch == true"
                    light
                    class="body-2 buy_selector buy_price-input py-3 quatity_number"
                  ></v-text-field>
                  <v-btn
                    @click="quantitySellModel == 0 ? quantitySellModel = 0 : quantitySellModel -= boardLotModel"
                    text
                    icon
                    color="success"
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-btn @click="quantitySellModel += boardLotModel" text icon color="success">
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">Board lot</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">{{ boardLotModel }}</v-card-title>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pb-5">
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Market Value</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title
                      class="subtitle-1 px-0 py-2 secondary--text"
                    >{{ totalCostSellModel }}</v-card-title>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click="e1 = 1">Back</v-btn>
              <v-btn
                color="success"
                class="text-capitalize black--text ml-1"
                light
                @click="sellListArray"
                @click.stop="show = false"
                :disabled="confirmSellButtonDisable"
              >Confirm</v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  data() {
    return {
      e1: 1,
      cprice: "0.00",
      change: "0.00",
      cpercentage: "0.00",
      bidask: 50,
      dboard: 0,
      stocklist: [],
      prev: 0,
      low: 0,
      wklow: 0,
      volm: 0,
      trades: 0,
      open: 0,
      high: 0,
      wkhigh: 0,
      vole: 0,
      ave: 0,
      GetSelectStock: null,
      strategy: [
        "Bottom Picking",
        "Breakout Play",
        "Trend Following",
        "1-2-3 Reversal"
      ],
      strategyModel: null,
      tradeplan: ["Day Trade", "Swing Trade", "Investments"],
      tradeplanModel: null,
      emotions: ["Neutral", "Greedy", "Fearful"],
      emotionsModel: null,
      notesModel: "",

      date: new Date().toISOString().substr(0, 10),
      dateModel: null,
      YMDModel: null,
      menu: false,
      modal: false,

      selectPortfolioModel: [],
      portfolioDropdownModel: null,
      portfolioDropdownModelId: null,

      availableFundsModel: "0.00",
      boardLotModel: 0,
      average_price: 0,
      priceModel: "0.00",
      priceSellModel: "0.00",
      quantityModel: 0.0,
      quantitySellModel: 0,
      totalCostModel: 0,
      totalCostSellModel: 0,
      AvailableBoardLot: 0,

      strategySellModel: null,
      tradeplanSellModel: null,
      emotionsSellModel: null,
      notesSellModel: null,
      dateSellModel: null,

      continueButtonDisable: true,
      continueBuyButtonDisable: true,
      confirmSellButtonDisable: true,

      continuesellBtn: false,
      continuebuyBtn: true,

      showBuybtn: true,
      showSellbtn: false,

      stocklistBuy: [],
      quantityModel: null,
      avepriceSell: null
    };
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      userPortfolio: "journal/getUserPortfolio",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      openPosition: "journal/getOpenPosition",
      stockList: "global/getStockList",
      lightSwitch: "global/getLightSwitch"
    }),
    fontcolor2: function() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    },
    fontColor: function() {
      return this.lightSwitch == 0 ? "#000000" : "#ffffff";
    },
    fontColorTable: function() {
      return this.lightSwitch == 0
        ? "data_table-container"
        : "data_table-container-dark";
    },
    fontColorDate: function() {
      return this.lightSwitch == 0
        ? "datepicker-container-light"
        : "datepicker-container";
    },
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
          this.priceModel = 0;
          this.quantityModel = null;
          this.quantitySellModel = null;
          this.strategyModel = "";
          this.tradeplanModel = "";
          this.emotionsModel = "";
          this.notesModel = "";
          this.dateModel = new Date().toISOString().substr(0, 10);
          this.e1 = 1;
          this.GetSelectStock = null;
          this.portfolioDropdownModel = null;
          this.availableFundsModel = 0;

          this.cprice = "0.00";
          this.change = "0.00";
          this.cpercentage = "0.00";
          this.bidask = 0;
          this.dboard = 0;
          this.prev = 0;
          this.low = 0;
          this.wklow = 0;
          this.volm = 0;
          this.trades = 0;
          this.open = 0;
          this.high = 0;
          this.wkhigh = 0;
          this.vole = 0;
          this.ave = 0;
        }
      }
    }
  },
  watch: {
    openPosition: function() {
      this.getSellItems();
    },
    stockList: function() {
      this.initPortfolio();

      this.stocklist = this.stockList.data;
      this.stocklistBuy = this.stockList.data;
    },
    GetSelectStock: function() {
      this.selectWatch();
    },
    priceModel: function(newValue) {
      this.buyWatch();

      const result = parseFloat(newValue);
      this.priceModel = result;
    },
    priceSellModel: function(newValue) {
      this.sellWatch();
      const result = parseFloat(newValue);
      this.priceSellModel = result;
    },
    quantityModel(value) {
      this.buyWatch();
      this.quantityModel = parseFloat(value);
    },
    quantitySellModel(value) {
      this.sellWatch();
      this.quantitySellModel = parseFloat(value);
    },
    date: function() {
      this.dateWatch();
    },
    userPortfolio() {
      this.getUserPortfolio();
    }
  },
  mounted() {
    this.stocklist = this.stockList.data;
    this.stocklistBuy = this.stockList.data;

    this.getUserPortfolio();
    this.initPortfolio();
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    initPortfolio() {
      var tim = new Date();
      var time =
        tim.getHours() + ":" + tim.getMinutes() + ":" + tim.getSeconds();

      var today = new Date(this.date),
        month = "" + (today.getMonth() + 1),
        day = "" + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      var dateTime = [day, month, year].join("-") + " " + time;
      this.dateModel = dateTime;
      this.YMDModel = [day, month, year].join("-");
    },
    buyListArray() {
      let portfolio_id = this.defaultPortfolioId;
      let stock = this.GetSelectStock;
      let totalCost =
        parseFloat(this.quantityModel) * parseFloat(this.priceModel);
      let payload = {
        position: parseFloat(this.quantityModel),
        stock_price: parseFloat(this.priceModel),
        transaction_meta: {
          strategy: this.strategyModel,
          plan: this.tradeplanModel,
          emotion: this.emotionsModel,
          notes: this.notesModel,
          date: this.dateModel
        }
      };
      this.$api.journal.portfolio
        .tradebuy(portfolio_id, stock, payload)
        .then(response => {
          if (response.success) {
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
            this.GetSelectStock = null;
            this.priceModel = 0;
            this.quantityModel = null;
            this.strategyModel = null;
            this.tradeplanModel = null;
            this.emotionsModel = null;
            this.notesModel = null;
            this.dateModel = new Date().toISOString().substr(0, 10);
            this.e1 = 1;
            this.portfolioDropdownModel = null;
            this.availableFundsModel = 0;

            this.cprice = "0.00";
            this.change = "0.00";
            this.cpercentage = "0.00";
            this.bidask = 0;
            this.dboard = 0;
            this.prev = 0;
            this.low = 0;
            this.wklow = 0;
            this.volm = 0;
            this.trades = 0;
            this.open = 0;
            this.high = 0;
            this.wkhigh = 0;
            this.vole = 0;
            this.ave = 0;
          }
        });
    },
    sellListArray: function() {
      let portfolio_id = this.defaultPortfolioId;
      let stock = this.GetSelectStock;
      let aveprice =
        parseFloat(this.quantitySellModel) /
        parseFloat(this.totalCostSellModel.replace(/,/g, ""));
      let payload = {
        position: parseFloat(this.quantitySellModel),
        stock_price: parseFloat(this.priceSellModel),
        transaction_meta: {
          strategy: this.strategySellModel,
          average_price: this.avepriceSell,
          plan: this.tradeplanSellModel,
          emotion: this.emotionsSellModel,
          notes: this.notesSellModel,
          date: this.dateModel
        }
      };
      this.$api.journal.portfolio
        .tradesell(portfolio_id, stock, payload)
        .then(response => {
          if (response.success) {
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
            this.GetSelectStock = null;
            this.priceSellModel = 0;
            this.quantitySellModel = null;
            this.dateModel = new Date().toISOString().substr(0, 10);
            this.e1 = 1;

            this.cprice = "0.00";
            this.change = "0.00";
            this.cpercentage = "0.00";
            this.bidask = 0;
            this.dboard = 0;
            this.prev = 0;
            this.low = 0;
            this.wklow = 0;
            this.volm = 0;
            this.trades = 0;
            this.open = 0;
            this.high = 0;
            this.wkhigh = 0;
            this.vole = 0;
            this.ave = 0;
          }
        });
    },
    toBuy() {
      this.stocklist = this.stocklistBuy;
      this.continuesellBtn = false;
      this.continuebuyBtn = true;
    },
    toSell() {
      this.stocklist = this.openPosition;
      this.continuebuyBtn = false;
      this.continuesellBtn = true;
    },
    getSellItems() {
      for (let i = 0; i < this.openPosition.length; i++) {
        this.openPosition[i] = {
          ...this.openPosition[i],
          id_str: this.openPosition[i].stock_id,
          symbol: this.openPosition[i].stock_symbol
        };
      }
    },
    getStockDetails(Obj) {
      const params = {
        "symbol-id": Obj
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          this.stockSymbolGet = result.data;
          console.log(this.stockSymbolGet);

          if (result.data.last >= 0.0001 && result.data.last <= 0.0099) {
            this.boardLotModel = 1000000;
          } else if (result.data.last >= 0.01 && result.data.last <= 0.049) {
            this.boardLotModel = 100000;
          } else if (result.data.last >= 0.05 && result.data.last <= 0.495) {
            this.boardLotModel = 10000;
          } else if (result.data.last >= 0.5 && result.data.last <= 4.99) {
            this.boardLotModel = 1000;
          } else if (result.data.last >= 5 && result.data.last <= 49.95) {
            this.boardLotModel = 100;
          } else if (result.data.last >= 50 && result.data.last <= 999.5) {
            this.boardLotModel = 10;
          } else if (result.data.last >= 1000) {
            this.boardLotModel = 5;
          }
          this.cprice = result.data.last;
          this.cpercentage = result.data.changepercentage.toFixed(2);
          this.change = result.data.change.toFixed(2);
          this.prev = result.data.close.toFixed(2);
          this.open = result.data.open.toFixed(2);
          this.low = result.data.low.toFixed(2);
          this.high = result.data.high.toFixed(2);
          this.wklow = result.data.weekyearlow.toFixed(2);
          this.wkhigh = result.data.weekyearhigh.toFixed(2);
          this.volm = this.nFormatter(result.data.volume);
          this.vole = this.nFormatter(result.data.value);
          this.trades = result.data.trades;
          this.ave = result.data.average.toFixed(2);
          this.priceModel = result.data.last;
          this.priceSellModel = parseFloat(result.data.last);
        }.bind(this)
      );

      if (this.openPosition != null) {
        for (let i = 0; i < this.openPosition.length; i++) {
          let stockDataList = this.openPosition[i];

          if (stockDataList.stock_id == Obj) {
            // this.priceSellModel = stockDataList.metas.buy_price;
            this.avepriceSell = stockDataList.average_price;
            this.quantitySellModel = stockDataList.position;
            this.AvailableBoardLot = stockDataList.position;
            if (
              stockDataList.metas.strategy ||
              stockDataList.metas.plan ||
              stockDataList.metas.emotion ||
              stockDataList.metas.notes
            ) {
              this.strategySellModel = stockDataList.metas.strategy;
              this.tradeplanSellModel = stockDataList.metas.plan;
              this.emotionsSellModel = stockDataList.metas.emotion;
              this.notesSellModel = stockDataList.metas.notes;
            }
          }
        }
      }
      this.$api.chart.stocks.fulldepth(params).then(
        function(result) {
          this.bidask = parseFloat(result.data.bid_total_percent).toFixed(2);
        }.bind(this)
      );
    },
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.0$/, "") + "K";
      }
      return num;
    },
    getUserPortfolio() {
      this.selectPortfolioModel = [];
      if (this.userPortfolio.length != 0) {
        const toFindReal = "real"; // what we want to count
        for (let i = 0; i < this.userPortfolio.length; i++) {
          let portfolioListPush1 = this.userPortfolio[i];
          if (portfolioListPush1.type === toFindReal) {
            this.selectPortfolioModel.push(portfolioListPush1);
          }
        }
      }
    },
    whereToSave(obj) {
      const portfoliofundsparams = {
        fund: obj
      };
      this.$api.journal.portfolio.portfoliofunds(portfoliofundsparams).then(
        function(result) {
          if (result.success) {
            this.availableFundsModel = parseFloat(result.data.funds.balance);
          }
        }.bind(this)
      );
    },
    selectWatch() {
      if (this.typePortfolioModel != null) {
        this.continueButtonDisable = true;
      } else {
        this.continueButtonDisable = false;
      }
    },
    buyWatch(newValue) {
      let buyResult =
        parseFloat(this.priceModel) * parseFloat(this.quantityModel);
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = buyResult + dcommission + dtax + dtransferfee + dsccp;
      this.totalCostModel = dall
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (
        parseFloat(this.totalCostModel) >= parseFloat(this.availableFundsModel)
      ) {
        this.continueBuyButtonDisable = true;
      } else {
        if (
          this.priceModel == "0.00" ||
          this.priceModel <= 0 ||
          this.quantityModel == "0.00" ||
          this.quantityModel <= 0 ||
          this.portfolioDropdownModel == null
        ) {
          this.continueBuyButtonDisable = true;
          this.totalCostModel = 0;
        } else {
          let compareNum =
            parseFloat(this.totalCostModel.replace(/,/g, "")) >=
            parseFloat(this.availableFundsModel);
          if (!compareNum) {
            this.continueBuyButtonDisable = false;
          } else {
            this.continueBuyButtonDisable = true;
          }
        }
      }
    },
    sellWatch(newValue) {
      let sellResult =
        parseFloat(this.quantitySellModel) * parseFloat(this.priceSellModel);
      let dpartcommission = sellResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = sellResult * 0.00005;
      // SCCP
      let dsccp = sellResult * 0.0001;
      let dsell = sellResult * 0.006;
      let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
      let result = sellResult - dall;
      this.totalCostSellModel = result
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (
        this.priceSellModel == "0.00" &&
        this.priceSellModel <= 0 &&
        this.quantitySellModel == "0.00" &&
        this.quantitySellModel <= 0
      ) {
        this.confirmSellButtonDisable = true;
      } else {
        if (
          parseFloat(this.quantitySellModel) >
          parseFloat(this.AvailableBoardLot)
        ) {
          this.confirmSellButtonDisable = true;
        } else {
          if (
            this.priceSellModel == NaN ||
            this.priceSellModel <= 0 ||
            this.quantitySellModel == NaN ||
            this.quantitySellModel <= 0
          ) {
            this.confirmSellButtonDisable = true;
          } else {
            this.confirmSellButtonDisable = false;
          }
        }
      }
    },
    dateWatch() {
      var tim = new Date();
      var time =
        tim.getHours() + ":" + tim.getMinutes() + ":" + tim.getSeconds();

      var today = new Date(this.date),
        month = "" + (today.getMonth() + 1),
        day = "" + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      var dateTime = [day, month, year].join("-") + " " + time;
      this.dateModel = dateTime;
      this.YMDModel = [day, month, year].join("-");
    }
  }
};
</script>
<style scoped>
.tab_menu-top.v-tab--active {
  color: #03dac5 !important;
}
/* .menuable__content__active {
  top: 180px !important;
} */
</style>
<style>
.data_table-container.v-data-table td,
.total_bottom {
  font-size: 12px !important;
}
.data_table-container-dark.v-data-table td,
.total_bottom {
  font-size: 12px !important;
}
.stock_selector .v-select__slot .v-label,
.stock_selector .v-select__slot .v-icon {
  color: #03dac5 !important;
}
.stock_selector .v-input__slot {
  margin: 0;
}
.stock_selector .v-select__selection--comma {
  color: #03dac5;
  font-size: 12px;
}
.stock_selector .v-input__control {
  min-height: auto !important;
}
.calendate-btn {
  margin-top: 6px;
  margin-right: 6px;
}
.current_price-field {
  border-bottom: 1px solid #b6b6b6;
}
#stepper_container {
  box-shadow: none;
  background-color: transparent;
}
.data_table-container tr td.positive,
.data_table-container-dark tr td.positive {
  color: #03dac5;
}
.data_table-container tr td.negative,
.data_table-container-dark tr td.negative {
  color: #f44336;
}
.data_table-container td.item_position-prop,
.data_table-container-dark td.item_position-prop {
  color: #000;
}
.data_table-container-dark td.item_position-prop {
  color: #b6b6b6;
}
.data_table-container td.item_position-prop {
  color: #535358;
}
.buy_selector .v-select__selection--comma {
  color: #03dac5;
  font-size: 14px;
}
.buy_selector .v-input__control {
  min-height: auto !important;
}
.buy_selector-font-size .v-label {
  font-size: 14px;
}
.separator {
  display: block;
  height: 1px;
  background: #000;
}
.confirmation_message-confirm input {
  text-align: right;
}
.v-textarea.trading_notes-textarea .v-text-field__slot textarea {
  margin: 0;
}
.buy_price-input input,
.quantity-input input {
  text-align: right;
}
.quatity_number div#spin {
  float: left !important;
  position: absolute;
  display: inline-block;
  height: 20px;
  opacity: 1;
  background: #123;
}
/* datepicker */
.datepicker-container.v-card,
.datepicker-container .v-picker__body {
  background: #00121e !important;
}
.datepicker-container-light.v-card,
.datepicker-container-light .v-picker__body {
  background: #f2f2f2 !important;
}
.theme--light.datepicker-container-light .v-picker__title {
  background: #f2f2f2 !important;
}
.datepicker-container .v-date-picker-title__date,
.theme--light.datepicker-container-light .v-date-picker-title__date {
  color: #03dac5 !important;
}
</style>