<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card color="#00121E">
      <v-card-title
        class="text-left justify-left pa-5 pb-0 px-5 success--text subtitle-1 font-weight-bold"
        ><span>TRADE</span>
        <v-spacer></v-spacer>
            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
            >
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" text class="px-1" color="#00FFC3">
                    <span class="text-capitalize">Date: </span>
                    <v-card-text class="pa-0" v-html="date"></v-card-text>
                </v-btn>
            </template>
            <v-date-picker v-model="date" color="#00121e" dark scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
            </v-dialog>
        </v-card-title>
      <v-stepper id="stepper_container" v-model="e1" dark>
        <v-stepper-items>
          <!-- -----First View of Trade Modal----- -->
          <v-stepper-content step="1" class="pt-0">
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters>
                
                <v-tabs color="#48FFD5" background-color="#00121E" dark grow>
                  <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" @click="toBuy">Buy</v-tab>
                  <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" @click="toSell">Sell</v-tab>
                </v-tabs>
                <v-col cols="12" sm="12" md="12" class="pt-3">
                  <v-select v-model="GetSelectStock" offset-y="true" item-color="success" color="success" class="pa-0 ma-0" append-icon="mdi-chevron-down" :items="stocklist" item-text="symbol" item-value="id_str" label="Select Stock" @change="getStockDetails" ></v-select>
                  <p class="text-left ma-0 caption" style="color:#b6b6b6">Current Price</p>
                  <v-spacer></v-spacer>
                  <p class="text-right ma-0 body-1 current_price-field" style="color:#b6b6b6">{{ cprice }} <span class="caption" :class=" change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral' " >{{ change }}</span>
                  <span class="caption" :class=" cpercentage > 0 ? 'positive' : cpercentage < 0 ? 'negative' : 'neutral' ">({{ cpercentage }}%)</span >
                  </p>
                  <v-row no-gutters class="mt-2">
                    <v-col class="pa-0" cols="12" sm="6" md="6">
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
                    <v-col class="pa-0" cols="12" sm="6" md="6">
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
                    <v-card-title class="pa-0 justify-center mt-3 font-weight-thin caption white--text">Bid/ Ask Bar</v-card-title>
                    <v-progress-linear :value="bidask" background-color="#F44336" color="#00FFC3" height="5px" class="mt-1" ></v-progress-linear>
                    <v-card-title class="pa-0 justify-center mt-3 font-weight-thin caption white--text">Members Sentiments</v-card-title>
                    <v-progress-linear value="50" background-color="#F44336" color="#00FFC3" height="5px" class="mt-1 mb-1" ></v-progress-linear>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click.stop="show = false">Close</v-btn>
              <v-btn color="success ml-1" class="text-capitalize black--text buy" :disabled="continueButtonDisable" v-show="continuebuyBtn" light @click="e1 = 2">
                Continue
              </v-btn>
              <v-btn color="success ml-1" class="text-capitalize black--text sell" :disabled="continueButtonDisable" v-show="continuesellBtn" light @click="e1 = 4">
                Continue
              </v-btn>
            </v-row>
          </v-stepper-content>
          
          <v-stepper-content step="2" class="pt-2">
            <!-- -----Second View of Trade Modal----- -->
            <v-container class="pa-5 pt-0 px-0">
              <v-row no-gutters class="px-0 py-0">
                <v-col sm="12" md="12" class="pa-0">
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Available Funds</v-card-title><v-spacer></v-spacer><v-card-title class="subtitle-1 px-0 py-2 secondary--text">{{ nFormatter(availableFundsModel) }}</v-card-title>
                  </v-row>
                  <v-select
                  :items="selectPortfolioModel"
                  v-model="portfolioDropdownModel"
                  item-text="name"
                  item-value="id"
                  @change="whereToSave"
                  label="Select Portfolio"
                  color="#00FFC3"
                  item-color="success"
                  dense
                  dark
                  class="enter_amount-deposit-select ma-0"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right" >
                  <v-text-field v-model="priceModel" label="Buy Price" placeholder="Enter Buy Price" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right" >
                  <v-text-field v-model="quantityModel" label="Quantity" placeholder="Enter Quantity" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector buy_price-input py-3" ></v-text-field>
                  <v-btn 
                      @click="quantityModel == 0 ? quantityModel = 0 : quantityModel -= 100"
                      text 
                      icon 
                      color="success"
                  ><v-icon>mdi-chevron-down</v-icon></v-btn>
                  <v-btn 
                      @click="quantityModel += 100"
                      text 
                      icon 
                      color="success"
                  ><v-icon>mdi-chevron-up</v-icon></v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="justify-end d-flex">
                <v-card-title class="caption pa-0 secondary--text">Board lot: {{ boardLotModel }}</v-card-title>
                </v-col>
                <v-text-field v-model="totalCostModel" label="Total Cost" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" readonly disabled></v-text-field>
                <!-- <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">Insufficient funds<v-btn color="blue" text @click="snackbar = false">Close</v-btn></v-snackbar> -->
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click="e1 = 1">Back</v-btn>
              <v-btn color="success" v-show="showBuybtn" class="text-capitalize black--text ml-1" :disabled="continueBuyButtonDisable" light @click="e1 = 3">
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
                      label="Select Strategy"
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
                      label="Select Trade Plan"
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
                      label="Select Emotions"
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
                    placeholder="Enter Notes"
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
          <v-stepper-content step="4" class="pt-2">
            <v-container class="pa-0">
              <v-row no-gutters class="pa-3 pb-0">
                <v-text-field v-model="priceSellModel" label="Sell Price" placeholder="Enter Sell Price" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" ></v-text-field>
                <v-col sm="12" md="12"  class="py-0 justify-right d-flex align-center text-right" >
                  <v-text-field v-model="quantitySellModel" label="Quantity" placeholder="Enter Quantity" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector buy_price-input py-3 quatity_number"></v-text-field>
                  <v-btn 
                    @click="quantitySellModel == 0 ? quantitySellModel = 0 : quantitySellModel -= 100"
                    text 
                    icon 
                    color="success"
                  ><v-icon>mdi-chevron-down</v-icon></v-btn>
                  <v-btn 
                    @click="quantitySellModel += 100"
                    text 
                    icon 
                    color="success"
                  ><v-icon>mdi-chevron-up</v-icon></v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="justify-end d-flex">
                <v-card-title class="caption pa-0 secondary--text">Board lot: {{ boardLotModel }}</v-card-title>
                </v-col>
                <v-text-field v-model="totalCostSellModel" label="Total Cost" color="#00FFC3" style="color: #00FFC3" dark class="body-2 buy_selector quantity-input py-3" readonly disabled></v-text-field>
                <!-- <v-snackbar v-model="snackbarSell" :timeout="snackbarTimeout">Insufficient Board Lot<v-btn color="blue" text @click="snackbarSell = false">Close</v-btn></v-snackbar> -->
              </v-row>
            </v-container>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click="e1 = 1">Back</v-btn>
              <v-btn
                color="success"
                class="text-capitalize black--text ml-1"
                light
                @click.stop="show = false"
                @click="sellListArray"
              >
                Confirm
              </v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <v-snackbar v-model="snackbarGo" :timeout="snackbarTimeout">Trade Successfully!<v-btn color="blue" text @click="snackbarGo = false">Close</v-btn></v-snackbar>
    <v-snackbar v-model="snackbarNotGo" :timeout="snackbarTimeout">Please enter a valid value!<v-btn color="blue" text @click="snackbarNotGo = false">Close</v-btn></v-snackbar>
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
      strategy: [ "Bottom Picking", "Breakout Play", "Trend Following", "1-2-3 Reversal" ],
      strategyModel: null,
      tradeplan: ["Day Trade", "Swing Trade", "Investments"],
      tradeplanModel: null,
      emotions: ["Neutral", "Greedy", "Fearful"],
      emotionsModel: null,
      notesModel: "",

      date: new Date().toISOString().substr(0, 10),
      dateModel: null,
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
      quantityModel: 0.00,
      quantitySellModel: 0,
      totalCostModel: 0,
      totalCostSellModel: 0,

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

      snackbar: false,
      snackbarSell: false,
      snackbarGo: false,
      snackbarNotGo: false,
      snackbarTimeout: 2000,
      stocklistBuy: [],
      quantityModel: null,
    };
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      userPortfolio: "journal/getUserPortfolio",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      openPosition: "journal/getOpenPosition"
    }),
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
  },
  watch: {
    renderPortfolioKey: function() {
      this.getUserPortfolio();
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
    quantityModel: function() {
      this.buyWatch();
    },
    quantitySellModel: function() {
      this.sellWatch();
    },
    date: function() {
      this.dateWatch();
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
        this.stocklistBuy = result.data;
      }.bind(this)
    );
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date+' '+time;
    this.dateModel = dateTime

    this.getUserPortfolio();
    
    // if(this.openPosition != null) {
    //   console.log(this.openPosition)
    //   this.showSellTab = false
    // } else {
    //   this.showSellTab = true
    // }
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    buyListArray: function() {
      let params = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        position: parseInt(this.quantityModel),
        stock_price: parseInt(this.priceModel),
        transaction_meta : {
          strategy: this.strategyModel,
          plan: this.tradeplanModel,
          emotion: this.emotionsModel,
          notes: this.notesModel,
          date: this.dateModel
        }
      };
      this.$axios
        .$post("https://dev-api.arbitrage.ph/api/journal/funds/"+this.portfolioDropdownModel+"/buy/"+this.GetSelectStock,params)
        .then(response => {
          if (response.success) {
            
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
            this.setDefaultPortfolioId(this.portfolioDropdownModel);
            this.GetSelectStock = "";
            this.priceModel = "0.00";
            this.quantityModel = "0";
            this.strategyModel = "";
            this.tradeplanModel = "";
            this.emotionsModel = "";
            this.notesModel = "";
            this.dateModel = new Date();
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
    sellListArray: function() {
      let params = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        position: parseInt(this.quantitySellModel),
        stock_price: parseInt(this.priceSellModel),
        transaction_meta : {
          strategy : this.strategySellModel,
          average_price : parseInt(this.average_price),
          plan : this.tradeplanSellModel,
          emotion : this.emotionsSellModel,
          notes: this.notesSellModel,
          date : this.dateSellModel
        }
      };
      this.$axios
        .$post("https://dev-api.arbitrage.ph/api/journal/funds/"+this.defaultPortfolioId+"/sell/"+this.GetSelectStock,params)
        .then(response => {
          if (response.success) {
            this.snackbarGo = true
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
            this.setDefaultPortfolioId(this.portfolioDropdownModel);
            this.GetSelectStock = "";
            this.priceSellModel = "0.00";
            this.quantitySellModel = "0";
            this.dateModel = new Date();
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
      this.stocklist = this.stocklistBuy
      this.continuesellBtn = false
      this.continuebuyBtn = true
    },
    toSell() {
      this.stocklist = this.openPosition
      this.continuebuyBtn = false
      this.continuesellBtn = true
    },
    getStockDetails(Obj) {
      const params = {
        "symbol-id": Obj
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          this.stockSymbolGet = result.data;
          
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
          this.priceModel = result.data.last;

          if(this.openPosition != null){
            for (let i = 0; i < this.openPosition.length; i++) {
              let findOpenPosition = this.openPosition[i]
              if(parseInt(findOpenPosition.stockid) == this.stockSymbolGet.stockid){
                console.log(findOpenPosition)
                this.quantityModel = findOpenPosition.position
                this.priceSellModel = findOpenPosition.last
                this.quantitySellModel = findOpenPosition.position
                this.boardLotModel = findOpenPosition.position
              }
            }
          } else {
            this.quantitySellModel = 0
            this.quantityModel = 0
          }
        }.bind(this)
      );
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
      const params = {
          user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
      };
      this.$api.journal.portfolio.portfolio(params).then(
          function(result) {
              this.portfolioList = result.meta.logs;
              this.portfolioList = this.portfolioList.reverse();
              this.selectPortfolioModel = []
              if(this.portfolioList.length != 0) {
                this.selectPortfolioModel.push({header: 'Real Portfolio'});
                const toFindReal = "real" // what we want to count
                for (let i = 0; i < this.portfolioList.length; i++ ) {
                    let portfolioListPush1 = this.portfolioList[i]
                    if (portfolioListPush1.type === toFindReal) {
                      this.selectPortfolioModel.push(portfolioListPush1);
                    }
                }
              }
          }.bind(this)
      );
      this.componentKey++;
    },
    whereToSave() {
      for (let i = 0; i < this.userPortfolio.length; i++ ) {
          let portfolioListPush1 = this.userPortfolio[i]
          if (portfolioListPush1.id === this.portfolioDropdownModel) {
            console.log(portfolioListPush1);
            this.availableFundsModel = parseInt(portfolioListPush1.balance)
            this.portfolioDropdownModel = portfolioListPush1.id
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
            
            this.setDefaultPortfolioId(portfolioListPush1.id)
          }
      }
    },
    selectWatch() {
      this.GetSelectStock
      if (this.typePortfolioModel != null) {
        this.continueButtonDisable = true;
      } else {
        this.continueButtonDisable = false;
      }
    },
    buyWatch(newValue) {
      let buyResult = parseFloat(this.priceModel) * parseFloat(this.quantityModel)
      let dpartcommission = buyResult * 0.0025;
      let dcommission = (dpartcommission > 20 ? dpartcommission : 20);
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = buyResult + dcommission + dtax + dtransferfee + dsccp;
      this.totalCostModel = dall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if(parseInt(this.totalCostModel) >= parseInt(this.availableFundsModel)){
        this.continueBuyButtonDisable = true;
        this.snackbar = true;
      } else {
        if (this.priceModel == "0.00" || this.priceModel <= 0 || this.quantityModel == "0.00" || this.quantityModel <= 0 || this.portfolioDropdownModel == null) {
          this.continueBuyButtonDisable = true;
          this.totalCostModel = 0
        } else {
          this.continueBuyButtonDisable = false;
        }
      }
    },
    sellWatch(newValue) {
      let sellResult = parseInt(this.quantitySellModel) * parseInt(this.priceSellModel)
      this.totalCostSellModel = sellResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      if(parseInt(this.quantitySellModel) > parseInt(this.boardLotModel)){
        this.confirmSellButtonDisable = true;
        this.snackbarSell = true;
      } else {
        if(this.priceSellModel == "0.00" || this.priceSellModel <= 0 || this.quantitySellModel == "0.00" || this.quantitySellModel <= 0 || this.portfolioDropdownModel == null){
          this.confirmSellButtonDisable = true;
          this.totalCostSellModel = 0
        }else {
          this.confirmSellButtonDisable = false;
        }
      }
    },
    dateWatch() {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      var dateTime = date+' '+time;
      this.dateModel = dateTime
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
  color: #bdbdbd;
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
.quatity_number div#spin {
  float: left !important;
  position: absolute;
  display: inline-block;
  height: 20px;
  opacity: 1;
  background: #123;
}
</style>