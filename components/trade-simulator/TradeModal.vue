<template>
  <v-dialog
    v-model="show"
    max-width="320px"
    :dark="lightSwitch == true"
    :style="{ background: cardBackground }"
  >
    <v-card :dark="lightSwitch == true" :style="{ background: cardBackground }">
      <v-card-title
        class="text-left justify-left pa-5 pb-3 px-5 success--text"
        style="font-size:16px; font-weight: 700;"
      >TRADE</v-card-title>
      <v-stepper
        v-model="e1"
        :dark="lightSwitch == true"
        :style="{ background: cardBackground }"
        id="stepper_container"
      >
        <v-stepper-items>
          <v-stepper-content step="1" class="mt-0 pt-0">
            <!-- -----First View of Trade Modal----- -->
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters class="mb-5">
                <v-col md="6" class="ma-0 pa-0">
                  <div class="pa-0 ma-0">
                    <v-btn
                      class="text-capitalize"
                      :class="(buySelected ? 'selected' : '')"
                      depressed
                      text
                      tile
                      style="font-size: 1rem;"
                      width="100%"
                      @click="btnBuy"                   
                    >Buy</v-btn>
                  </div>
                </v-col>
                <v-col md="6" class="ma-0 pa-0">
                  <div class="pa-0 ma-0">
                    <v-btn
                      class="text-capitalize"
                      :class="(sellSelected ? 'selected' : '')"
                      depressed
                      text
                      tile
                      style="font-size: 1rem;"
                      width="100%"
                      @click="btnSell"
                    >Sell</v-btn>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-card-title class="pa-0 text-right justify-end">
                    <v-col sm="12" md="12" class="pa-0">
                      <v-select
                        :menu-props="{offsetY: true, dark: lightSwitch == true}"
                        item-color="success"
                        :dark="lightSwitch == true"
                        color="success"
                        class="pa-0 ma-0 select_stock"
                        append-icon="mdi-chevron-down"
                        :items="stock"
                        item-text="symbol"
                        :item-value="(this.sellSelected ? 'stockidstr' : 'id_str')"
                        v-model="GetSelectStock"
                        v-on:change="getDetails"
                        label="Select Stock"
                      >
                        <template slot="item" slot-scope="data">
                          <v-list-item-content
                            :dark="lightSwitch == true"
                            :style="{ background: cardBackground }"
                            style="padding: 21px 12px; margin: -16px;"
                          >
                            <v-list-item-title v-html="data.item.symbol"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-select>
                    </v-col>
                  </v-card-title>

                  <v-row no-gutters>
                    <v-card-title
                      class="pa-0"
                      style="font-size:12.5px !important;"
                      :style="{ color: toggleFontColor }"
                    >Current Price</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title :style="{ color: toggleFontColor }" class="pa-0">
                      <p
                        class="text-right ma-0 body-1"
                        style="font-size:12.5px !important;"
                        :style="{ color: toggleFontColor }"
                      >
                        {{ cprice }}
                        <span
                          :class="(change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral')"
                          class="caption"
                        >{{ change }}</span>
                        <span
                          :class="(cpercentage > 0 ? 'positive' : cpercentage < 0 ? 'negative' : 'neutral')"
                          class="caption"
                        >({{ cpercentage }}%)</span>
                      </p>
                    </v-card-title>
                  </v-row>

                  <v-row no-gutters class="mt-2">
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                      <v-simple-table
                        :dense="true"
                        :dark="lightSwitch == true"
                        :style="{ background: cardBackground }"
                        style="font-size: 12px;"
                        id="liveportfolio-table"
                      >
                        <template v-slot:default>
                          <tbody :style="{color: toggleFontColor}" >
                            <tr id="table_tr_snap-cont" >
                              <td class="item_position-prop py-1 px-1 stock_details"
                              
                              >Previous</td>
                              <td
                                class="item_position-prop text-right pa-0 px-1 stock_details"
                              >{{ prev }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">Low</td>
                              <td
                                class="text-right py-1 px-1 stock_details"
                                :class="valueStatusLow"
                              >{{ low }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">52WKLow</td>
                              <td class="text-right py-1 px-1 stock_details">{{ wklow }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">Volume</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ volm }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">Trades</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ trades }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                      <v-simple-table
                        :dense="true"
                        :dark="lightSwitch == true"
                        :style="{ background: cardBackground }"
                        id="liveportfolio-table"
                      >
                        <template v-slot:default>
                          <tbody :style="{color: toggleFontColor}">
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">Open</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ open }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">High</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ high }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">52WKHigh</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ wkhigh }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">Value</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ vole }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                              <td class="item_position-prop py-1 px-1 stock_details">Average</td>
                              <td
                                class="item_position-prop text-right py-1 px-1 stock_details"
                              >{{ ave }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                  <div class="px-3">
                    <v-card-title class="pa-0 justify-center mt-3">
                      <h1
                        style="font-size: 12px;"
                        :style="{ color: toggleFontColor }"
                      >Bid/ Ask Bar</h1>
                    </v-card-title>

                    <v-progress-linear
                      :value="bidask"
                      background-color="#F44336"
                      color="#03dac5"
                      height="5px"
                      class="mt-1"
                    ></v-progress-linear>
                    <v-card-title class="pa-0 justify-center mt-3">
                      <h1
                         style="font-size: 12px;"
                        :style="{ color: toggleFontColor }"
                      >Members Sentiments</h1>
                    </v-card-title>
                    <v-progress-linear
                      :value="sentiment"
                      background-color="#F44336"
                      color="#03dac5"
                      height="5px"
                      class="mt-1 mb-1"
                    ></v-progress-linear>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text @click.stop="show=false" class="text-capitalize">Close</v-btn>
              <v-btn
                color="success ml-1"
                @click="e1 = 2"
                class="text-capitalize black--text"
                light
                :disabled="(GetSelectStock != '' ? false : true)"
              >Continue</v-btn>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2" class="pt-2 pa-2">
            <!-- -----Second View of Trade Modal----- -->
            <v-container class="pt-0 px-0">
              <v-row no-gutters>
                <BuyTrade
                  :Position="dataVolume"
                  :BuyPrice="buyprice"
                  :toReset="quantity_reset"
                  :BoardLot="boardlot"
                  :Reset="onreset"
                  v-on:totalPosition="totalPosition"
                />
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text @click="e1 = 1" class="text-capitalize">Back</v-btn>
              <v-btn
                color="success"
                @click="nextStep"
                class="text-capitalize black--text ml-1"
                light
                :disabled="(this.totalposition > 0 || this.simulatorConfirmedBuySell == 'sell' ? false : true)"
              >{{ (this.simulatorConfirmedBuySell == 'sell' ? 'Confirm' : 'Continue') }}</v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3" class="pt-2 pa-2">
            <v-container class="pt-0">
              <v-row no-gutters class="mt-2 px-0 py-0">
                <v-col sm="12" md="12">
                  <div>
                    <v-select
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      class="mb-5 enter_strategy"
                      :items="strategy"
                      v-model="selectedstrategy"
                      label="Enter Strategy"
                      dense
                      flat
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-item-content
                          :dark="lightSwitch == true"
                          :style="{ background: cardBackground }"
                          style="padding: 21px 12px; margin: -16px;"
                        >
                          <v-list-item-title v-html="data.item"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                  </div>
                  <div>
                    <v-select
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      class="mb-5 enter_tplan"
                      :items="tradeplan"
                      v-model="selectedtradeplan"
                      label="Enter Trade Plan"
                      dense
                      flat
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-item-content
                          :dark="lightSwitch == true"
                          :style="{ background: cardBackground }"
                          style="padding: 21px 12px; margin: -16px;"
                        >
                          <v-list-item-title v-html="data.item"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                  </div>
                  <div>
                    <v-select
                      offset-y="true"
                      item-color="success"
                      append-icon="mdi-chevron-down"
                      class="mb-5 enter_emotion"
                      :items="emotions"
                      v-model="selectedemotions"
                      label="Enter Emotions"
                      dense
                      flat
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-item-content
                          :dark="lightSwitch == true"
                          :style="{ background: cardBackground }"
                          style="padding: 21px 12px; margin: -16px;"
                        >
                          <v-list-item-title v-html="data.item"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                  </div>
                </v-col>
                <v-col style="color: #03dac5; font-size: 12px;">
                  Enter Notes
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="pa-0 mt-3 justify-right d-flex align-center text-right"
                >
                  <v-textarea
                    dense
                    filled   
                    class="white--text trading_notes-textarea"
                    v-model="notes"
                    :dark="lightSwitch == true"
                    :style="{ background: cardBackground }"
                    :background-color="lightSwitch == 0 ? '#e3e9ed' : '#172431'"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text @click="e1 = 2" class="text-capitalize">Back</v-btn>
              <v-btn
                color="success"
                @click.stop="show=false"
                @click="confirm"
                class="text-capitalize black--text ml-1"
                light
              >Confirm</v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
<script>
import BuyTrade from "~/components/trade-simulator/buy";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  components: {
    BuyTrade
  },
  data() {
    return {
      e1: 1,
      cprice: 0,
      cpercentage: 0,
      change: 0,
      bidask: 50,
      sentiment: 50,
      dboard: 0,
      stock_id: 0,
      stock: [],
      stock2: [],
      prev: "0",
      low: 0,
      wklow: 0,
      volm: "0",
      trades: "0",
      open: "0",
      high: 0,
      wkhigh: "0",
      vole: "0",
      ave: "0",
      port: [],
      GetSelectStock: "",
      selectedTab: null,
      avprice: 0,

      selectedstrategy: "",
      selectedtradeplan: "",
      selectedemotions: "",
      strategy: [
        "Bottom Picking",
        "Breakout Play",
        "Trend Following",
        "1-2-3 Reversal"
      ],
      tradeplan: ["Day Trade", "Swing Trade", "Investments"],
      emotions: ["Neutral", "Greedy", "Fearful"],
      notes: "",

      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      disabled: false,
      sellSelected: false,
      buySelected: true,
      quantity_reset: false,
      onreset: false,
      dataVolume: 0,
      buyprice: 0,
      boardlot: 0,
      totalposition: 0
    };
  },
  props: ["visible", "OpenPosition", "Trade_Modal"],
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      simulatorPositions: "tradesimulator/getSimulatorPositions",
      simulatorOpenPosition: "tradesimulator/getSimulatorOpenPosition",
      simulatorConfirmedBuySell: "tradesimulator/getSimulatorConfirmedBuySell",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Toggle background color (Dark/light Theme)
     *
     * @return  {String}  hex code
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    /**
     * Toggle Font Color (Dark/Light Theme)
     *
     * @return  {String}  hex code
     */
    toggleFontColor() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; 
    },

    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    },
    valueStatusLow() {
      return {
        highnum: this.low > this.high,
        lownum: this.low < this.high,
        equalnum: this.low == this.high
      };
    }
  },
  watch: {
    /**
     * Initialized Trade MOdal when its closed
     *
     */
    Trade_Modal() {
      if (!this.Trade_Modal) {
        this.e1 = 1;
        this.buySelected = true;
        this.sellSelected = false;
        this.stock = this.stock2;
        this.GetSelectStock = "";
        this.quantity_reset = true;
        this.totalposition = 0;
        this.dataVolume = 0;
        this.setSimulatorConfirmedBuySell("buy");
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
        this.stock = result.data;
        this.stock2 = this.stock;
      }.bind(this)
    );
  },
  methods: {
    ...mapActions({
      setSimulatorPositions: "tradesimulator/setSimulatorPositions",
      setSimulatorOpenPosition: "tradesimulator/setSimulatorOpenPosition",
      setSimulatorConfirmedBuySell:
        "tradesimulator/setSimulatorConfirmedBuySell"
    }),
    /**
     * No Trade Details appear if Sell is Selected in Stepper
     *
     */
    nextStep() {
      if (this.sellSelected) {
        this.show = false;
        this.confirm();
      } else {
        this.e1 = 3;
      }
    },
    /**
     * Return Total Position
     *
     * @param   {float}  value  total position
     *
     * @return  {float}         total position
     */
    totalPosition(value) {
      this.totalposition = value;
    },
    
    /**
     * initialize data when you click Buy Button
     *
     */
    btnBuy() {     
      this.setSimulatorConfirmedBuySell("buy");
      this.totalposition = 0;
      this.buySelected = true;
      (this.onreset = true), (this.sellSelected = false);
      this.stock = [];
      this.GetSelectStock = "";
      this.stock = this.stock2;
    },
    /**
     * initialize data when you click Sell Button
     *
     */
    btnSell() {
      if (
        this.GetSelectStock != "" ? this.getDetails(this.GetSelectStock) : ""
      );
      this.setSimulatorConfirmedBuySell("sell");
      this.sellSelected = true;
      this.buySelected = false;
      (this.onreset = true), (this.stock = []);
      this.GetSelectStock = "";
      for (let i = 0; i < this.OpenPosition.length; i++) {
        const params = {
          "symbol-id": this.OpenPosition[i]
        };
        this.$api.chart.stocks.history(params).then(
          function(result) {
            this.stock.push(result.data);
          }.bind(this)
        );
      }
    },
  /**
 * Add comma separator
 *
 * @param   {float}  n        number
 * @param   {char}  sep       separator character
 * @param   {int}  decimals   number of decimal points
 * @return  {string}          number with comma separator
 */
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },

    /**
     * Confirm Buy/Sell Button
     *
     */
    confirm() {
      
      const stock_id = this.stock_id;
      let fund_id = this.simulatorPortfolioID;
      let d = new Date(),
        dformat =
          [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
          " " +
          [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"); ///"mm/dd/yyyy hh:mm:ss" // 24 hour format      
      // if Sell is selected
      if (this.sellSelected) {
        
        if (this.avprice != 0) {
          // if selected stock exist in Live Portfolio
          const sellparams = {
            position: this.simulatorPositions,
            stock_price: this.cprice,
            transaction_meta: {
              strategy: this.selectedstrategy,
              average_price: this.avprice.toFixed(2),
              plan: this.selectedtradeplan,
              emotion: this.selectedemotions,
              notes: this.notes,
              date: dformat
            }
          };
     
        this.$api.journal.portfolio
        .tradesell(fund_id, stock_id, sellparams)
        .then(response => {
              if (response.success) {         
                this.setSimulatorOpenPosition(this.OpenPosition);
                this.e1 = 1;
                this.onreset = false;
                this.buySelected = true;
                this.sellSelected = false;
                this.GetSelectStock = "";
              }
            });
        }
      } else {
        // if Buy is selected

        const buyparams = {
          position: this.simulatorPositions,
          stock_price: this.cprice,
          transaction_meta: {
            strategy: this.selectedstrategy,
            plan: this.selectedtradeplan,
            emotion: this.selectedemotions,
            notes: this.notes,
            date: dformat
          }
        };   

         this.$api.journal.portfolio
        .tradebuy(fund_id, stock_id, buyparams)
        .then(response => {
            if (response.success) {          
              this.setSimulatorOpenPosition(this.OpenPosition);
              this.e1 = 1;
              this.onreset = false;
              this.buySelected = true;
              this.sellSelected = false;
              this.GetSelectStock = "";
            }
          });
      }
     
    },

    /**
     * Get Stock Details 
     *
     * @param   {string}  selectObj  Stock ID
     *
     */
    getDetails(selectObj) {

      const params = {
        "symbol-id": selectObj
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
        
          if (this.sellSelected) {
            const sellparams = {
              fund: this.simulatorPortfolioID
            };
            this.$api.journal.portfolio.open(sellparams).then(
              function(results) {
                for (let i = 0; i < results.data.open.length; i++) {
                  if (selectObj == results.data.open[i].stock_id) {
                    this.volm = this.nFormatter(results.data.open[i].position);
                    this.dataVolume = results.data.open[i].position;
                    this.avprice = results.data.open[i].average_price;
                  }
                }
              }.bind(this)
            );
          } else {
            this.volm = this.nFormatter(result.data.volume);
          }
          this.buyprice = result.data.last;
          this.boardlot = this.dboard;
          this.stock_id = selectObj;
          this.cprice = result.data.last;
          this.cpercentage = result.data.changepercentage.toFixed(2);
          this.change = result.data.change.toFixed(2);
          this.prev = result.data.close.toFixed(2);
          this.open = result.data.open.toFixed(2);
          this.low = result.data.low.toFixed(2);
          this.high = result.data.high.toFixed(2);
          this.wklow = result.data.weekyearlow.toFixed(2);
          this.wkhigh = result.data.weekyearhigh.toFixed(2);
          this.vole = this.nFormatter(result.data.value);
          this.trades = result.data.trades;
          this.ave = result.data.average.toFixed(2);

            let market_code =  result.data.market_code;
            let stock_id = selectObj;

            this.$api.social.posts.getSentiment({
              stock_id,
              market_code
            }).then(
              function(response){
                  this.sentiment = parseFloat((response.data.sentiment.bull / response.data.sentiment.total_sentiment) * 100);
                  if(isNaN(this.sentiment)) {
                    this.sentiment = 50;
                  }
              }.bind(this)
            );
                       
        }.bind(this)
      );

      this.$api.chart.stocks.fulldepth(params).then(
        function(result) {
          this.bidask = parseFloat(result.data.bid_total_percent).toFixed(2);
        }.bind(this)
      );

    },

    /**
     * Format number from 1000 to 1K, 1000000 to 1M, 1000000000 to 1B
     *
     * @param   {int}  num  number
     *
     * @return  {string}   return formatted number
     */
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
    }
  }
};
</script>
<style scoped>
.select_stock
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > label
  .v-select__selections
  > .v-select__selection--comma {
  color: #b6b6b6;
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
.positive {
  color: #03dac5;
}
.selected {
  border-bottom: 1px solid;
  color: #03dac5 !important;
}
.nonselected {
  border-bottom: none;
}
.negative {
  color: #fe4949;
}
.stock_details {
  font-size: 12px !important;
}
</style>
<style>

.v-menu__content
  > .v-select-list
  > .v-list.v-sheet
  > .v-list-item
  > .v-list-item__content
  > .v-list-item__title {
  font-size: 13px;
}
.v-select__slot > .v-select__selections > .v-select__selection--comma {
  font-size: 13px;
}
.select_stock > .v-input__control > .v-input__slot > .v-select__slot > label,
.enter_strategy > .v-input__control > .v-input__slot > .v-select__slot > label,
.enter_tplan > .v-input__control > .v-input__slot > .v-select__slot > label,
.enter_emotion > .v-input__control > .v-input__slot > .v-select__slot > label {
  font-size: 16px;
}
</style>
