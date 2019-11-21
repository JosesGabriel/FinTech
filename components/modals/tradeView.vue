<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card color="#00121E">
      <v-card-title
        class="text-left justify-left pa-5 pb-0 px-5 success--text subtitle-1 font-weight-bold"
        >TRADE</v-card-title
      >
      <v-stepper id="stepper_container" v-model="e1" dark>
        <v-stepper-items>
          <v-stepper-content step="1">
            <!-- -----First View of Trade Modal----- -->
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-card-title class="pa-0 text-right justify-end">
                    <v-col sm="12" md="12" class="pa-0">
                      <v-select v-model="GetSelectStock" offset-y="true" item-color="success" color="success" class="pa-0 ma-0" append-icon="mdi-chevron-down" :items="stocklist" item-text="symbol" item-value="id_str" label="Select Stock" @change="getStockDetails" ></v-select>
                    </v-col>
                  </v-card-title>
                  <p class="text-left ma-0 caption" style="color:#b6b6b6">Current Price</p>
                  <v-spacer></v-spacer>
                  <p class="text-right ma-0 body-1 current_price-field" style="color:#b6b6b6">{{ cprice }} <span class="caption" :class=" change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral' " >{{ change }}</span>
                  <span class="caption" :class=" cpercentage > 0 ? 'positive' : cpercentage < 0 ? 'negative' : 'neutral' ">({{ cpercentage }}%)</span >
                  </p>
                  <v-row no-gutters class="mt-2">
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                      <v-simple-table
                        id="liveportfolio-table"
                        :dense="true"
                        dark
                      >
                        <template v-slot:default>
                          <tbody>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Previous</td>
                              <td class="item_position-prop body-2 text-right pa-0 px-1" >
                                {{ prev }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Low</td>
                              <td class="body-2 text-right py-1 px-1" :class=" low > open ? 'positive' : low < open ? 'negative' : 'neutral' ">
                                {{ low }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">52WKLow</td>
                              <td class="body-2 text-right py-1 px-1" :class=" wklow > open ? 'positive' : wklow < open ? 'negative' : 'neutral'">
                                {{ wklow }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Volume</td>
                              <td class="item_position-prop body-2 text-right py-1 px-1">
                                {{ volm }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Trades</td>
                              <td class="item_position-prop body-2 text-right py-1 px-1">
                                {{ trades }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                      <v-simple-table id="liveportfolio-table" :dense="true" dark>
                        <template v-slot:default>
                          <tbody>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Open</td>
                              <td class="body-2 text-right py-1 px-1" :class=" open > prev ? 'positive' : open < prev ? 'negative' : 'neutral' ">
                                {{ open }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">High</td>
                              <td class="body-2 text-right py-1 px-1" :class=" high > open ? 'positive' : high < open ? 'negative' : 'neutral' ">
                                {{ high }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">52WKHigh</td>
                              <td
                                class="body-2 text-right py-1 px-1" :class=" wkhigh > open ? 'positive' : wkhigh < open ? 'negative' : 'neutral' " >
                                {{ wkhigh }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Value</td>
                              <td class="item_position-prop body-2 text-right py-1 px-1">
                                {{ vole }}
                              </td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop body-2 py-1 px-1">Average</td>
                              <td class="body-2 text-right py-1 px-1" :class=" ave > open ? 'positive' : ave < open ? 'negative' : 'neutral' " >
                                {{ ave }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                  <div class="px-3">
                    <v-card-title class="pa-0 justify-center mt-3">
                      <h1 class="font-weight-thin caption" style="color:#fff;">
                        Bid/ Ask Bar
                      </h1>
                    </v-card-title>

                    <v-progress-linear :value="bidask" background-color="#F44336" color="#00FFC3" height="5px" class="mt-1" ></v-progress-linear>
                    <v-card-title class="pa-0 justify-center mt-3">
                      <h1 class="font-weight-thin caption" style="color:#fff;">
                        Members Sentiments
                      </h1>
                    </v-card-title>
                    <v-progress-linear value="50" background-color="#F44336" color="#00FFC3" height="5px" class="mt-1 mb-1" ></v-progress-linear>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click.stop="show = false">Close</v-btn>
              <v-btn color="success ml-1" class="text-capitalize black--text" light @click="e1 = 2">
                Continue
              </v-btn>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2" class="pt-2">
            <!-- -----Second View of Trade Modal----- -->
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters>
                <v-tabs color="#48FFD5" background-color="#00121E" dark grow>
                  <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" width="100" :href="`#funds-1`">Buy</v-tab>
                  <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" :href="`#funds-2`" @click="choosePostApi = 'sell'">Sell</v-tab>
                  <!--
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text class="calendate-btn" color="#00FFC3">
                            <span class="text-capitalize">Date: </span>
                            <v-card-text class="pa-0" v-html="date"></v-card-text>
                        </v-btn>
                    </template>
                    <v-date-picker v-model="date" color="#00121e" dark scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                    </v-dialog> -->

                  <v-tab-item dark color="#48FFD5" class="active-class" background-color="#0c1f33" :value="'funds-' + 1">
                    <v-container class="pa-0">
                      <div class="separator"></div>
                      <v-row no-gutters class="pa-3 pb-0">
                        <v-col cols="12" sm="12" md="12">
                          <v-row no-gutters class="px-0 py-0">
                            <v-col sm="12" md="12" class="pa-0">
                              <v-select v-model="portfolioModel" offset-y="true" item-color="success" append-icon="mdi-chevron-down" color="success" class="mt-0 py-3 pb-0" :items="portfolio" label="Portfolio" dense flat dark ></v-select>
                              <v-text-field v-model="availableFundsModel" label="Available Funds" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" readonly ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right" >
                              <v-text-field v-model="priceModel" label="Buy Price" placeholder="Enter Buy Price" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right" >
                              <v-text-field v-model="quantityModel" label="Quantity" placeholder="Enter Quantity" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector buy_price-input py-3" ></v-text-field>
                            </v-col>
                            <v-text-field v-model="buyTotalCostModel" label="Total Cost" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" readonly ></v-text-field>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 2">
                    <v-container class="pa-0">
                      <div class="separator"></div>
                      <v-row no-gutters class="pa-3 pb-0">
                          <v-col cols="12" sm="12" md="12">
                              <v-row no-gutters class="px-0 py-0">
                                  <v-col sm="12" md="12" class="pa-0">
                                      <v-select v-model="portfolioModel" offset-y="true" item-color="success" append-icon="mdi-chevron-down" color="success" class="mt-0 py-3" :items="portfolio" label="Portfolio" dense flat dark></v-select>
                                  </v-col>
                                  <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                                      <v-text-field label="Buy Price" placeholder="Enter Buy Price" color="#00FFC3" style="color: #00FFC3" dark class="caption buy_selector quantity-input py-3" v-model="priceModel"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                                    <v-text-field label="Quantity" placeholder="Enter Quantity" color="#00FFC3" style="color: #00FFC3" dark class="caption buy_selector buy_price-input py-3" v-model="quantityModel"></v-text-field>
                                  </v-col>
                              </v-row>
                              <v-card-title class="pa-0 py-2">
                                  <p class="text-right ma-0 caption" style="color:#b6b6b6">Available Funds: <span style="color:#b6b6b6">320.30M</span></p>
                                  <v-spacer></v-spacer>
                                  <p class="text-right ma-0 caption" style="color:#b6b6b6">Total Cost: <span style="color:#b6b6b6">0.00</span></p>
                              </v-card-title>
                          </v-col>
                      </v-row>
                  </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click="e1 = 1">Back</v-btn>
              <v-btn color="success" class="text-capitalize black--text ml-1" light @click="e1 = 3">
                Continue
              </v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3" class="pt-2">
            <v-container class="pt-0">
              <v-row no-gutters class="px-0 py-0">
                <v-col sm="12" md="12">
                  <div>
                    <v-select
                      v-model="strategyModel"
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      class="mb-1"
                      :items="strategy"
                      label="Strategy"
                      dense
                      flat
                    ></v-select>
                  </div>
                  <div>
                    <v-select
                      v-model="tradeplanModel"
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      class="mb-1"
                      :items="tradeplan"
                      label="Trade Plan"
                      dense
                      flat
                    ></v-select>
                  </div>
                  <div>
                    <v-select
                      v-model="emotionsModel"
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      :items="emotions"
                      label="Emotions"
                      dense
                      flat
                    ></v-select>
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
                    placeholder="Trading Notes"
                    filled
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click="e1 = 2">Back</v-btn>
              <v-btn
                color="success"
                class="text-capitalize black--text ml-1"
                light
                @click.stop="show = false"
                @click="buyListArray"
              >
                Confirm
              </v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
<script>
import SellTrade from "~/components/modals/sell";
// import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SellTrade
  },
  props: ["visible"],
  data() {
    return {
      e1: 1,
      cprice: "0.00",
      change: "0.00",
      cpercentage: "0.00",
      bidask: 0,
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

      hideElement: true,
      GetSelectStock: "",

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
      menu: false,
      modal: false,

      portfolio: ["Real Portfolio", "Virtual Portfolio"],
      portfolioModel: "",
      availableFundsModel: "320,000,000.00",
      priceModel: 0,
      quantityModel: 0,
      buyTotalCostModel: 0,

      sellPriceModel: 0,
      sellQuantityModel: 0,
      sellTotalCostModel: 0,

      choosePostApi: "buy",
      buyTransactionArray: []
    };
  },
  computed: {
    // ...mapGetters({
    //   userWatchedStocks: "watchers/getUserWatchedStocks",
    //   renderChartKey: "watchers/getRenderChartKey"
    // }),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  mounted() {
    const params = {
      exchange: "PSE",
      status: "active"
    };
    this.$api.chart.stocks.list(params).then(
      function(result) {
        this.stocklist = result.data;
      }.bind(this)
    );
  },
  methods: {
    buyListArray: function() {
      let choosePostApi1 = this.choosePostApi;
      let portfolioModel1 = this.portfolioModel;
      let priceModel1 = this.priceModel;
      let quantityModel1 = this.quantityModel;
      let strategyModel1 = this.strategyModel;
      let tradeplanModel1 = this.tradeplanModel;
      let emotionsModel1 = this.emotionsModel;
      let notesModel1 = this.notesModel;
      this.buyTransactionArray.push({
        choosePostApi1,
        portfolioModel1,
        priceModel1,
        quantityModel1,
        strategyModel1,
        tradeplanModel1,
        emotionsModel1,
        notesModel1,
      });
      console.log(this.buyTransactionArray[0].choosePostApi1);
      if(this.buyTransactionArray[0].choosePostApi1 == "buy") {
      console.log(this.buyTransactionArray);
      } else if(this.buyTransactionArray[0].choosePostApi1 == "sell") {
      console.log(this.buyTransactionArray);
      }
    },
    getStockDetails(Obj) {
      const params = {
        "symbol-id": Obj
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          if (result.data.last >= 0.0001 && result.data.last <= 0.0099) {
            this.dboard = 1000000;
          } else if (result.data.last >= 0.01 && result.data.last <= 0.049) {
            this.dboard = 100000;
          } else if (result.data.last >= 0.05 && result.data.last <= 0.495) {
            this.dboard = 10000;
          } else if (result.data.last >= 0.5 && result.data.last <= 4.99) {
            this.dboard = 1000;
          } else if (result.data.last >= 5 && result.data.last <= 49.95) {
            this.dboard = 100;
          } else if (result.data.last >= 50 && result.data.last <= 999.5) {
            this.dboard = 10;
          } else if (result.data.last >= 1000) {
            this.dboard = 5;
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
        }.bind(this)
      );

      this.$api.chart.stocks.fulldepth(params).then(
        function(result) {
          //console.log(result.data);
          this.bidask = parseFloat(result.data.bid_total_percent).toFixed(2);
        }.bind(this)
      );
    },
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(0).replace(/\.0$/, "") + "G";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(0).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(0).replace(/\.0$/, "") + "K";
      }
      return num;
    }
  }
};
</script>
<style>
.stock_selector .v-select__slot .v-label,
.stock_selector .v-select__slot .v-icon {
  color: #00ffc3 !important;
}
.stock_selector .v-input__slot {
  margin: 0;
}
.stock_selector .v-select__selection--comma {
  color: #00ffc3;
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
.positive {
  color: #00ffc3;
}
.negative {
  color: #fe4949;
}
.neutral {
  color: #f3d005;
}
.buy_selector .v-select__selection--comma {
  color: #00ffc3;
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
</style>