<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold"
      >Record a Trade</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-col cols="12" xs="12" md="12">
            <v-stepper id="stepper_container" v-model="e1" dark>
              <v-stepper-items>
                <!-- Buy Record -->
                <v-stepper-content step="1" class="pt-2 pa-1">
                  <v-menu
                    ref="buyMenu"
                    v-model="buyMenu"
                    :close-on-content-click="false"
                    :return-value.sync="buyDate"
                    transition="scale-transition"
                    min-width="290px"
                    :dark="lightSwitch == true"
                    light
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="buyDate"
                        label="Date"
                        readonly
                        v-on="on"
                        :dark="lightSwitch == true"
                        light
                        color="success"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="success"
                      :style="{ background: cardbackground }"
                      v-model="buyDate"
                      no-title
                      scrollable
                      :dark="lightSwitch == true"
                      light
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="secondary" @click="buyMenu = false">Cancel</v-btn>
                      <v-btn text color="success" @click="$refs.buyMenu.save(buyDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-select
                    v-model="selectStockModel"
                    offset-y="true"
                    item-color="success"
                    append-icon="mdi-chevron-down"
                    :items="listDataArr"
                    item-text="symbol"
                    item-value="id_str"
                    label="Select Stock"
                    color="success"
                    dense
                    :dark="lightSwitch == true"
                    light
                    flat
                    :menu-props="{offsetY: true, dark: lightSwitch == true}"
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
                  <v-text-field
                    label="Buy Price"
                    placeholder="Enter Buy Price"
                    color="success"
                    :dark="lightSwitch == true"
                    light
                    v-model="buyPrice"
                    type="number"
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-text-field
                    label="Quantity"
                    placeholder="Enter Quantity"
                    color="success"
                    :dark="lightSwitch == true"
                    light
                    type="number"
                    v-model="buyQuantity"
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">Total Cost:</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">{{ buyResult }}</v-card-title>
                  </v-row>
                  <v-row class="mt-4" no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="secondary"
                      class="text-capitalize black--text ml-1"
                      :dark="lightSwitch == true"
                      light
                      text
                      @click.stop="show = false"
                    >Cancel</v-btn>
                    <v-btn
                      color="success"
                      class="text-capitalize black--text ml-1"
                      light
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
                    :return-value.sync="sellDate"
                    transition="scale-transition"
                    :dark="lightSwitch == true"
                    light
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="sellDate"
                        label="Date"
                        readonly
                        v-on="on"
                        :dark="lightSwitch == true"
                        light
                        color="success"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="sellDate"
                      no-title
                      scrollable
                      :style="{ background: cardbackground }"
                      color="success"
                      :dark="lightSwitch == true"
                      light
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="secondary" @click="sellMenu = false">Cancel</v-btn>
                      <v-btn text color="success" @click="$refs.sellMenu.save(sellDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-text-field
                    label="Sell Price"
                    placeholder="Enter Sell Price"
                    color="success"
                    :dark="lightSwitch == true"
                    light
                    min="0"
                    type="number"
                    v-model="sellPrice"
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-text-field
                    label="Quantity"
                    placeholder="Enter Quantity"
                    color="success"
                    :dark="lightSwitch == true"
                    light
                    type="number"
                    v-model="sellQuantity"
                    readonly
                    class="body-2 buy_selector quantity-input py-3"
                  ></v-text-field>
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">Total Cost:</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">{{ sellResult }}</v-card-title>
                  </v-row>
                  <v-row no-gutters>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">Profit/Loss:</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="subtitle-1 pa-0 secondary--text">
                      <span
                        :class=" profitlossNumber > 0 ? 'positive' : profitlossNumber < 0 ? 'negative' : 'neutral' "
                      >₱{{ profitloss }}</span>
                    </v-card-title>
                  </v-row>
                  <v-row class="mt-4" no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="secondary"
                      class="text-capitalize black--text ml-1"
                      :dark="lightSwitch == true"
                      light
                      text
                      @click="e1 = 1"
                    >Back</v-btn>
                    <v-btn
                      color="success"
                      class="text-capitalize black--text ml-1"
                      light
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
                        append-icon="mdi-chevron-down"
                        class="mb-1"
                        :items="strategy"
                        label="Select Strategy"
                        :dark="lightSwitch == true"
                        light
                        flat
                      ></v-select>
                    </div>
                    <div>
                      <v-select
                        v-model="tradeplanModel"
                        item-color="success"
                        append-icon="mdi-chevron-down"
                        class="mb-1"
                        :items="tradeplan"
                        label="Select Trade Plan"
                        :dark="lightSwitch == true"
                        light
                        flat
                      ></v-select>
                    </div>
                    <div>
                      <v-select
                        v-model="emotionsModel"
                        item-color="success"
                        append-icon="mdi-chevron-down"
                        :items="emotions"
                        label="Select Emotions"
                        :dark="lightSwitch == true"
                        light
                        flat
                      ></v-select>
                    </div>
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
                        light
                        filled
                      ></v-textarea>
                    </v-col>
                    <v-row class="mt-4" no-gutters>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="secondary"
                        class="text-capitalize ml-1"
                        :dark="lightSwitch == true"
                        light
                        text
                        @click="e1 = 2"
                      >Back</v-btn>
                      <v-btn
                        color="success"
                        class="text-capitalize black--text ml-1"
                        light
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
export default {
  props: ["visible"],
  data() {
    return {
      e1: 1,
      buyDate: new Date().toISOString().substr(0, 10),
      buyMenu: false,
      buyPrice: "0.00",
      buyQuantity: 0,
      buyResult: 0,

      sellDate: new Date().toISOString().substr(0, 10),
      sellMenu: false,
      sellPrice: "0.00",
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
        }
      }
    }
  },
  watch: {
    strategyModel: function() {
      this.confirmTradeBtn();
    },
    tradeplanModel: function() {
      this.confirmTradeBtn();
    },
    emotionsModel: function() {
      this.confirmTradeBtn();
    },
    notesModel: function() {
      this.confirmTradeBtn();
    },
    selectStockModel: function() {
      this.getSelectStock();
      this.continueBuyBtn();
      this.confirmTradeBtn();
    },
    buyPrice: function(value) {
      this.continueBuyBtn();
      this.confirmTradeBtn();
      let buyResult = parseFloat(value) * parseFloat(this.buyQuantity);
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = parseFloat(
        buyResult + dcommission + dtax + dtransferfee + dsccp
      );
      this.buyResult = dall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    buyQuantity: function(value) {
      this.continueBuyBtn();
      this.confirmTradeBtn();
      this.sellQuantity = value;
      let buyResult = parseFloat(this.buyPrice) * parseFloat(value);
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = parseFloat(
        buyResult + dcommission + dtax + dtransferfee + dsccp
      );
      this.buyResult = dall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    sellPrice: function(value) {
      this.continueSellBtn();
      this.confirmTradeBtn();
      let sellResult = parseFloat(value) * parseFloat(this.sellQuantity);
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
      let result = parseFloat(sellResult - dall);
      this.sellResult = result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let profitloss =
        parseFloat(this.sellResult.replace(/,/g, "")) -
        parseFloat(this.buyResult.replace(/,/g, ""));
      this.profitlossNumber = profitloss;
      this.profitloss = profitloss
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    ...mapActions({
      setRenderEditKey: "journal/setRenderEditKey",
      setRenderPortfolioKey: "journal/setRenderPortfolioKey"
    }),
    getSelectStock() {
      let filteredStocks = null;
      if (this.listData.length != 0) {
        filteredStocks = this.stockList.data.filter(stock => {
          return stock.id_str == this.selectStockModel;
        });
        this.resultStock = filteredStocks[0];
      }
    },
    continueBuyBtn: function() {
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
    continueSellBtn: function() {
      if (this.sellPrice != 0 && this.sellQuantity != 0) {
        this.sellContinueBtn = false;
      } else {
        this.sellContinueBtn = true;
      }
    },
    confirmTradeBtn: function() {
      if (
        this.defaultPortfolioId != null &&
        this.selectStockModel != null &&
        this.buyPrice != 0 &&
        this.buyQuantity != 0 &&
        this.sellPrice != 0 &&
        this.sellQuantity != 0 &&
        this.strategyModel != null &&
        this.tradeplanModel != null &&
        this.emotionsModel != null &&
        this.notesModel != ""
      ) {
        this.confirmFinalBtn = false;
      } else {
        this.confirmFinalBtn = true;
      }
    },
    recordNow() {
      this.el = 1;
      var tim = new Date();
      var time =
        tim.getHours() + ":" + tim.getMinutes() + ":" + tim.getSeconds();

      var finalbuydate = new Date(this.buyDate),
        buymonth = "" + (finalbuydate.getMonth() + 1),
        buyday = "" + finalbuydate.getDate(),
        buyyear = finalbuydate.getFullYear();

      if (buymonth.length < 2) buymonth = "0" + buymonth;
      if (buyday.length < 2) buyday = "0" + buyday;

      let buydateformatted = [buyday, buymonth, buyyear].join("-") + " " + time;

      var finalselldate = new Date(this.sellDate),
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
          console.log(response);
          this.buyDate = new Date().toISOString().substr(0, 10);
          this.buyMenu = false;
          this.buyPrice = "0.00";
          this.buyQuantity = 0;
          this.buyResult = 0;
          this.sellDate = new Date().toISOString().substr(0, 10);
          this.sellMenu = false;
          this.sellPrice = "0.00";
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
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    this.listData = this.stockList;
    if (this.listData.length != 0) {
      this.listDataArr = this.listData.data;
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
</style>