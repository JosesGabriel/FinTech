<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == 1 ? true : false">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold"
      >Record a Trade</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-col cols="12" xs="12" md="12">
            <v-stepper id="stepper_container" v-model="e1" :dark="lightSwitch == 1 ? true : false">
              <v-stepper-items>
                <!-- Buy Record -->
                <v-stepper-content step="1" class="pt-2 pa-1">
                  <v-menu
                    ref="buyMenu"
                    v-model="buyMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    :dark="lightSwitch == 1 ? true : false"
                    :menu-props="{ dark: lightSwitch == 0 ? true : false }"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="dateBuyFormatted"
                        label="Date"
                        color="success"
                        class="body-2"
                        readonly
                        v-on="on"
                        :dark="lightSwitch == 1 ? true : false"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="buyDate"
                      :dark="lightSwitch == 1 ? true : false"
                      @input="buyMenu = false"
                      no-title
                      color="success darken-1"
                    ></v-date-picker>
                  </v-menu>
                  <v-autocomplete
                    v-model="selectStockModel"
                    offset-y="true"
                    class="body-2 selectStock_v-select mt-4"
                    item-color="success"
                    append-icon="mdi-chevron-down"
                    :items="listDataArr"
                    :filter="customFilter"
                    item-text="symbol"
                    item-value="id_str"
                    label="Select a Stock"
                    color="success"
                    dense
                    :dark="lightSwitch == 1 ? true : false"
                    light
                    flat
                    :menu-props="{offsetY: true, dark: lightSwitch == 1 ? true : false}"
                  >
                    <template slot="item" slot-scope="data">
                      <v-list-item-content
                        :dark="lightSwitch == 1 ? true : false"
                        :style="{ background: cardbackground }"
                        style="padding: 12px 12px; margin: -16px;"
                      >
                        <v-list-item-title v-html="data.item.symbol" class="text-uppercase caption"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                  <v-text-field
                    label="Buy Price"
                    placeholder="Enter Buy Price"
                    color="success"
                    :dark="lightSwitch == 1 ? true : false"
                    light
                    v-model="buyPrice"
                    type="number"
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-text-field
                    label="Quantity"
                    placeholder="Enter Quantity"
                    color="success"
                    :dark="lightSwitch == 1 ? true : false"
                    light
                    type="number"
                    v-model="buyQuantity"
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-row
                    no-gutters
                    :class="lightSwitch == 1 ? 'secondary--text' : 'tertiary--text'"
                  >
                    <v-card-title class="caption pa-0">Total Cost:</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="caption pa-0">{{ buyResult }}</v-card-title>
                  </v-row>
                  <v-row class="mt-4" no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                      :color="lightSwitch == 1 ? 'secondary' : 'gray'"
                      class="text-capitalize ml-1"
                      :dark="lightSwitch == 1 ? true : false"
                      text
                      @click.stop="show = false"
                    >Cancel</v-btn>
                    <v-btn
                      color="success"
                      class="text-capitalize black--text ml-1"
                      :disabled="buyContinueBtn"
                      @click="e1 = 2"
                    >Continue</v-btn>
                  </v-row>
                </v-stepper-content>
                <!-- Sell Record -->
                <v-stepper-content step="2" class="pt-2 pa-1">
                  <v-menu
                    ref="sellMenu"
                    v-model="sellMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    :dark="lightSwitch == 1 ? true : false"
                    :menu-props="{ dark: lightSwitch == 0 ? true : false }"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="dateSellFormatted"
                        label="Date"
                        color="success"
                        class="body-2"
                        readonly
                        v-on="on"
                        :dark="lightSwitch == 1 ? true : false"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="sellDate"
                      :dark="lightSwitch == 1 ? true : false"
                      @input="sellMenu = false"
                      no-title
                      :min="buyDate"
                      color="success darken-1"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                    label="Sell Price"
                    placeholder="Enter Sell Price"
                    color="success"
                    :dark="lightSwitch == 1 ? true : false"
                    min="0"
                    type="number"
                    v-model="sellPrice"
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-text-field
                    label="Quantity"
                    placeholder="Enter Quantity"
                    color="success"
                    :dark="lightSwitch == 1 ? true : false"
                    type="number"
                    v-model="sellQuantity"
                    readonly
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-row
                    no-gutters
                    :class="lightSwitch == 1 ? 'secondary--text' : 'tertiary--text'"
                  >
                    <v-card-title class="caption pa-0">Total Cost:</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="caption pa-0">{{ sellResult }}</v-card-title>
                  </v-row>
                  <v-row
                    no-gutters
                    :class="lightSwitch == 1 ? 'secondary--text' : 'tertiary--text'"
                  >
                    <v-card-title class="caption pa-0">Profit/Loss:</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="caption pa-0">
                      <span
                        :class=" profitlossNumber > 0 ? 'positive' : profitlossNumber < 0 ? 'negative' : 'neutral' "
                      >₱{{ profitloss }}</span>
                    </v-card-title>
                  </v-row>
                  <v-row class="mt-4" no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                      :color="lightSwitch == 1 ? 'secondary' : 'gray'"
                      class="text-capitalize ml-1"
                      :dark="lightSwitch == 1 ? true : false"
                      text
                      @click="e1 = 1"
                    >Back</v-btn>
                    <v-btn
                      color="success"
                      class="text-capitalize black--text ml-1"
                      :disabled="sellContinueBtn"
                      @click="e1 = 3"
                    >Continue</v-btn>
                  </v-row>
                </v-stepper-content>
                <!-- Final Record -->
                <v-stepper-content step="3" class="pt-2 pa-1">
                  <v-col class="pa-0" cols="12" sm="12" md="12">
                    <div>
                      <v-select
                        v-model="strategyModel"
                        item-color="success"
                        color="success"
                        dense
                        append-icon="mdi-chevron-down"
                        class="py-2 body-2"
                        label="Select Strategy"
                        :items="strategy"
                        :dark="lightSwitch == 1 ? true : false"
                        :menu-props="{offsetY: true, dark: lightSwitch == 1 ? true : false}"
                      >
                        <template slot="item" slot-scope="data">
                          <v-list-item-content
                            :dark="lightSwitch == 1 ? true : false"
                            :style="{ background: cardbackground }"
                            style="padding: 12px 12px; margin: -16px;"
                          >
                            <v-list-item-title v-html="data.item" class="text-capitalize caption"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-select>
                    </div>
                    <div>
                      <v-select
                        v-model="tradeplanModel"
                        item-color="success"
                        color="success"
                        dense
                        append-icon="mdi-chevron-down"
                        class="py-2 body-2"
                        label="Select Trade Plan"
                        :items="tradeplan"
                        :dark="lightSwitch == 1 ? true : false"
                        :menu-props="{offsetY: true, dark: lightSwitch == 1 ? true : false}"
                      >
                        <template slot="item" slot-scope="data">
                          <v-list-item-content
                            :dark="lightSwitch == 1 ? true : false"
                            :style="{ background: cardbackground }"
                            style="padding: 12px 12px; margin: -16px;"
                          >
                            <v-list-item-title v-html="data.item" class="text-capitalize caption"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-select>
                    </div>
                    <div>
                      <v-select
                        v-model="emotionsModel"
                        item-color="success"
                        color="success"
                        dense
                        append-icon="mdi-chevron-down"
                        class="py-2 body-2"
                        label="Select Emotions"
                        :items="emotions"
                        :dark="lightSwitch == 1 ? true : false"
                        :menu-props="{offsetY: true, dark: lightSwitch == 1 ? true : false}"
                      >
                        <template slot="item" slot-scope="data">
                          <v-list-item-content
                            :dark="lightSwitch == 1 ? true : false"
                            :style="{ background: cardbackground }"
                            style="padding: 12px 12px; margin: -16px;"
                          >
                            <v-list-item-title v-html="data.item" class="text-capitalize caption"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-select>
                    </div>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      class="pa-0 mt-3 justify-right d-flex align-center text-right"
                    >
                      <v-textarea
                        v-model="notesModel"
                        filled
                        color="success"
                        class="trading_notes-textarea body-2"
                        placeholder="Enter Notes"
                        :dark="lightSwitch == 1 ? true : false"
                      ></v-textarea>
                    </v-col>
                    <v-row class="mt-4" no-gutters>
                      <v-spacer></v-spacer>
                      <v-btn
                        :color="lightSwitch == 1 ? 'secondary' : 'gray'"
                        class="text-capitalize ml-1"
                        :dark="lightSwitch == 1 ? true : false"
                        text
                        @click="e1 = 2"
                      >Back</v-btn>
                      <v-btn
                        color="success"
                        class="text-capitalize black--text ml-1"
                        :disabled="confirmFinalBtn"
                        @click.stop="show = false"
                        @click="recordNow()"
                      >Confirm</v-btn>
                    </v-row>
                  </v-col>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { BuyFees, SellFees } from "~/assets/js/helpers/taxation";
import { LocalFormat } from "~/assets/js/helpers/datetime";

export default {
  props: ["visible"],
  data() {
    return {
      e1: 1,
      buyDate: new Date().toISOString().substr(0, 10),
      buyMenu: false,
      buyPrice: 0.0,
      buyQuantity: 0,
      buyResult: 0,

      sellDate: new Date().toISOString().substr(0, 10),
      sellMenu: false,
      sellPrice: 0.0,
      sellQuantity: 0,
      sellResult: 0,

      profitlossNumber: 0,
      profitloss: 0,

      selectStockModel: null,
      resultStock: null,
      listData: [],
      listDataArr: [],

      buyContinueBtn: true,
      sellContinueBtn: true,
      confirmFinalBtn: true,

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
      notesModel: ""
    };
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderEditKey: "journal/getRenderEditKey",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      stockList: "global/getStockList",
      lightSwitch: "global/getLightSwitch"
    }),
    dateBuyFormatted() {
      return this.buyDate ? this.localFormat(this.buyDate, "fs") : "";
    },
    dateSellFormatted() {
      return this.sellDate ? this.localFormat(this.sellDate, "fs") : "";
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
    /**
     * returns hexcode for card color if current theme is dark or light
     *
     * @return  {string}  returns string
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  mounted() {
    this.listData = this.stockList;
    if (this.listData.length != 0) {
      this.listDataArr = this.listData.data;
    }
  },
  watch: {
    /**
     * watching strategyModel and run validation function
     *
     * @return  returns true or false once keyup on textfields
     */
    strategyModel() {
      this.confirmTradeBtn();
    },
    /**
     * watching tradeplanModel works for validation
     *
     * @return  returns true or false
     */
    tradeplanModel() {
      this.confirmTradeBtn();
    },
    /**
     * watching emotionsModel works for validation
     *
     * @return  returns true or false
     */
    emotionsModel() {
      this.confirmTradeBtn();
    },
    /**
     * watching notesModel works for validation
     *
     * @return  returns true or false
     */
    notesModel() {
      this.confirmTradeBtn();
    },
    /**
     * watching selectStockModel works for validation
     *
     * @return  returns true or false
     */
    selectStockModel() {
      this.getSelectStock();
      this.continueBuyBtn();
      this.confirmTradeBtn();
    },
    /**
     * watching buyPrice works for validation auto calculate with quantity once user inputted
     *
     * @param   {number}  value  value that user inputted
     *
     * @return  {number}         returns final number
     */
    buyPrice(value) {
      this.continueBuyBtn();
      this.confirmTradeBtn();
      let buyResult = parseFloat(value) * parseFloat(this.buyQuantity);

      let dall = BuyFees(buyResult);
      this.buyResult = dall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * watching buyQuantity works for validation auto calculate with price once user inputted
     *
     * @param   {number}  value  value that user inputted
     *
     * @return  {number}         returns final number
     */
    buyQuantity(value) {
      this.continueBuyBtn();
      this.confirmTradeBtn();
      this.sellQuantity = value;
      let buyResult = parseFloat(this.buyPrice) * parseFloat(value);

      let dall = BuyFees(buyResult);
      this.buyResult = dall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * watching sellPrice works for validation auto calculate with sell price once user inputted
     * displaying total profit and loss with percentage
     *
     * @param   {number}  value  value that user inputted
     *
     * @return  {number}         returns final number
     */
    sellPrice(value) {
      this.continueSellBtn();
      this.confirmTradeBtn();
      let sellResult = parseFloat(value) * parseFloat(this.sellQuantity);

      let dall = SellFees(sellResult);
      this.sellResult = dall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let profitloss =
        parseFloat(this.sellResult.replace(/,/g, "")) -
        parseFloat(this.buyResult.replace(/,/g, ""));
      this.profitlossNumber = profitloss;
      this.profitloss = profitloss
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * assign buyDate to sellDate for minimum date of dateTo datepicker
     *
     * @return  {string}  pass buyDate str to dateTo
     */
    buyDate() {
      this.sellDate = this.buyDate;
    }
  },
  methods: {
    ...mapActions({
      setRenderEditKey: "journal/setRenderEditKey",
      setRenderPortfolioKey: "journal/setRenderPortfolioKey"
    }),
    localFormat: LocalFormat,
    /**
     * Fires when users typed anything, and it only shows the index of what the users typed
     *
     * @param   {Array}  item       Item of all stocks
     * @param   {String}  queryText  query all the item of what users typed
     * @param   {String}  itemText   text of user typed
     *
     * @return  {Object}             returns query object
     */
    customFilter(item, queryText, itemText) {
      const textOne = item.symbol.toUpperCase();
      const searchText = queryText.toUpperCase();

      return textOne.indexOf(searchText) > -1;
    },
    /**
     * onchange function, once ID change it filter the stock list
     * get only the stock information
     *
     * @return  {[type]}  [return description]
     */
    getSelectStock() {
      let filteredStocks = null;
      if (this.listData.length != 0) {
        filteredStocks = this.stockList.data.filter(stock => {
          return stock.id_str == this.selectStockModel;
        });
        this.resultStock = filteredStocks[0];
      }
    },
    /**
     * function that enable/disable buycontinueBtn
     *
     * @return  returns true=disable or false=enable buy continue button
     */
    continueBuyBtn() {
      if (
        this.selectStockModel != null &&
        this.buyPrice != 0 &&
        this.buyQuantity != 0
      ) {
        this.buyContinueBtn = false;
      } else {
        this.buyContinueBtn = true;
      }
    },
    /**
     * function that enable/disable sellContinueBtn
     *
     * @return  it returns true=disable or false=enable sell continue button
     */
    continueSellBtn() {
      if (this.sellPrice != 0 && this.sellQuantity != 0) {
        this.sellContinueBtn = false;
      } else {
        this.sellContinueBtn = true;
      }
    },
    /**
     * confirm trade button function, final validation
     *
     * @return  returns true=disable or false=enable confirmFinalBtn
     */
    confirmTradeBtn() {
      if (
        this.defaultPortfolioId != null &&
        this.selectStockModel != null &&
        this.buyPrice != 0 &&
        this.buyQuantity != 0 &&
        this.sellPrice != 0 &&
        this.sellQuantity != 0
      ) {
        this.confirmFinalBtn = false;
      } else {
        this.confirmFinalBtn = true;
      }
    },
    /**
     * recordNow function, submit record trade
     *
     * @return  {object}    success object return
     */
    recordNow() {
      this.e1 = 1;
      let tim = new Date();
      let time =
        tim.getHours() + ":" + tim.getMinutes() + ":" + tim.getSeconds();

      let finalbuydate = new Date(this.buyDate),
        buymonth = "" + (finalbuydate.getMonth() + 1),
        buyday = "" + finalbuydate.getDate(),
        buyyear = finalbuydate.getFullYear();

      if (buymonth.length < 2) buymonth = "0" + buymonth;
      if (buyday.length < 2) buyday = "0" + buyday;

      let buydateformatted = [buyday, buymonth, buyyear].join("-") + " " + time;

      let finalselldate = new Date(this.sellDate),
        sellmonth = "" + (finalselldate.getMonth() + 1),
        sellday = "" + finalselldate.getDate(),
        sellyear = finalselldate.getFullYear();

      if (sellmonth.length < 2) sellmonth = "0" + sellmonth;
      if (sellday.length < 2) sellday = "0" + sellday;

      let selldateformatted =
        [sellday, sellmonth, sellyear].join("-") + " " + time;

      let portfolio_id = this.defaultPortfolioId;
      const payload = {
        stock_id: this.selectStockModel,
        buy_price: this.buyPrice,
        sell_price: this.sellPrice,
        position: this.buyQuantity,
        buy_date: buydateformatted,
        sell_date: selldateformatted,
        transaction_meta: {
          stock_nane: this.resultStock.symbol,
          strategy: this.strategyModel,
          plan: this.tradeplanModel,
          emotion: this.emotionsModel,
          notes: this.notesModel
        }
      };
      this.$api.journal.portfolio
        .record(portfolio_id, payload)
        .then(response => {
          this.el = 1
          this.buyDate = new Date().toISOString().substr(0, 10);
          this.buyMenu = false;
          this.buyPrice = 0.0;
          this.buyQuantity = 0;
          this.buyResult = 0;
          this.sellDate = new Date().toISOString().substr(0, 10);
          this.sellMenu = false;
          this.sellPrice = 0.0;
          this.sellQuantity = 0;
          this.sellResult = 0;
          this.selectStockModel = null;
          this.strategyModel = null;
          this.tradeplanModel = null;
          this.emotionsModel = null;
          this.notesModel = "";

          this.keyCreateCounter = this.renderEditKey;
          this.keyCreateCounter++;

          this.keyCreateCounter1 = this.renderPortfolioKey;
          this.keyCreateCounter1++;
          this.setRenderEditKey(this.keyCreateCounter);
          this.setRenderPortfolioKey(this.keyCreateCounter1);
        });
    }
  }
};
</script>
<style scoped>
.positive {
  color: #03dac5;
}
.negative {
  color: #f44336;
}
.neutral {
  color: #bdbdbd;
}
</style>
<style>
.v-date-picker-table.v-date-picker-table--date.theme--dark {
  background: #00121e;
}
.v-date-picker-header.theme--dark {
  background: #00121e;
}
.selectStock_v-select input {
  text-transform: uppercase;
}
</style>