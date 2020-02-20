<template>
  <v-card
    :color="lightSwitch == 0 ? 'lightcard' : 'darkchart'"
    :dark="lightSwitch == 0 ? false : true"
    :loading="loader"
    class="px-2"
  >
    <v-card-title class="pl-2">
      <span class="subtitle-1 font-weight-black py-0 pl-2">VAR Calculator</span>
    </v-card-title>
    <div class="pa-1">
      <v-container class="py-0">
        <v-row v-if="!resultPage">
          <v-col cols="12">
            <v-text-field
              v-model="availableFunds"
              type="number"
              label="Available Funds"
              dense
              hide-details
              color="success"
            ></v-text-field>
           </v-col>
          <v-col cols="12 pt-4 px-2">
            <v-select
              v-model="stocksDropdownModel"
              :dark="lightSwitch == true"
              :menu-props="{ offsetY: true, dark: lightSwitch == true }"
              :items="stockList"
              label="Select a Stock"
              outlined
              item-text="symbol"
              item-value="id_str"
              item-color="success"
              append-icon="mdi-chevron-down"
              class="pl-0"
              light
              color="success"
              required
            >
              <template slot="item" slot-scope="data">
                <v-list-item-content
                  :dark="lightSwitch == true"
                  :style="{ background: cardbackground }"
                  style="padding: 12px 12px; margin: -16px;"
                >
                  <v-list-item-title
                    class="text-uppercase"
                    v-html="data.item.symbol"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="identifiedEntryPrice"
              type="number"
              label="Buy Price"
              dense
              hide-details
              color="success"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0">
            <span class="body-2">Portfolio Allocation</span>
          </v-col>
          <v-col  class="pt-0" cols="4">
            <v-btn
              class="my-1"
              small
              block
              :outlined="(portfolioAllocationPercent === 10) ? false : true"
              color="success"
               @click="percentageToggle(10)"
              >10%</v-btn
            >
          </v-col>
          <v-col  class="pt-0" cols="4">
            <v-btn
              class="my-1"
              small
              block
              :outlined="(portfolioAllocationPercent === 20) ? false : true"
              color="success"
              @click="percentageToggle(20)"
              >20%</v-btn
            >
          </v-col>
          <v-col  class="pt-0" cols="4">
            <v-btn  
              class="my-1 no-transform"
              small
              block
              :outlined="(portfolioAllocationPercent === -1) ? false: true"
              color="success"
              @click="percentageToggle(-1, true)"
              >Custom</v-btn
            >
          </v-col>
          <v-col v-if="customPortfolioAllocationToggle" cols="12">
            <v-text-field
              v-model="portfolioAllocation"
              type="number"
              label="Custom Portfolio Allocation (%)"
              dense
              hide-details
              color="success"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="riskTolerance"
              type="number"
              label="Risk Tolerance (%)"
              dense
              hide-details
              color="success"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="targetProfit"
              type="number"
              label="Target Profit (%)"
              dense
              hide-details
              color="success"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="resultPage">
          <v-col class="pb-5" cols="12">
            <span class="body-1 font-weight-light">Your results</span>
          </v-col>
          <v-col cols="12" class="d-flex py-1 justify-space-between">
            <span>No. Of Shares to buy</span>
            <span>{{ sharesToBuy }}</span>
          </v-col>
          <v-col cols="12" class="d-flex py-1 justify-space-between">
            <span>Total cost:</span>
            <span>{{ totalCost }}</span>
          </v-col>
          <v-col cols="12" class="d-flex py-1 justify-space-between">
            <span>Entry Price:</span>
            <span>{{ identifiedEntryPrice }}</span>
          </v-col>
          <v-col cols="12" class="d-flex py-1 justify-space-between">
            <span>Take Profit:</span>
            <span>{{ takeProfitPrice }}</span>
          </v-col>
          <v-col cols="12" class="d-flex py-1 justify-space-between">
            <span>Stoploss:</span>
            <span>{{ stoplossPrice }}</span>
          </v-col>
          <v-col cols="12" class="d-flex py-1 justify-space-between">
            <span>Risk to reward ratio:</span>
            <span>{{ riskRewardRatio }}</span>
          </v-col>
          <v-col class="pt-5 mt-5">
            <v-divider />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-card-actions class="pt-6 mt-6">
      <v-spacer></v-spacer>
      <v-btn
        v-if="!resultPage"
        class="addWatch__button no-transform black--text px-5"
        color="success"
        light
        depressed
        :disabled="nextButtonDisable"
        @click="calculate()"
        >Continue</v-btn
      >
      <div v-else> 
        <v-btn
          class="addWatch__button no-transform black--text"
          color="success"
          light
          depressed
          @click="addToWatchlist()"
          >Back</v-btn
        >
        <v-btn
          class="addWatch__button no-transform black--text"
          color="success"
          light
          depressed
          @click="addToWatchlist()"
          >Add to Watchlist</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
let numeral = require("numeral");
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      loader: false,
      nextButtonDisable: true,
      stocksDropdownModel: null,
      stockList: [],
      upside: 0,
      valueAtRisk: 0,
      stoplossPrice: 0,
      takeProfitPrice: 0,
      targetProfit: 0,
      riskTolerance: 0,
      identifiedEntryPrice: 0,
      riskRewardRatio: 0,
      sharesToBuy: 0,
      boardLot: 0,
      positionSize: 0,
      portfolioAllocation: 0,
      portfolioSize: 0,
      currentPrice: 0,
      totalCost: 0,
      resultPage: false,
      availableFunds: 50000,
      customPortfolioAllocationToggle: false,
      portfolioAllocationPercent: 10, //default value
    };
  },
  computed: {
    ...mapGetters({
      renderChartKey: "watchers/getRenderChartKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Decides v-list-item background
     *
     * @return
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    /**
     * Triggers when user has selected a stock from the dropdown.
     * Gets currentprice of selected stock
     *
     * @param   {string}  e
     *
     * @return  {[type]}
     */
    stocksDropdownModel(e) {
      const params = {
        exchange: "PSE",
        "symbol-id": e
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          this.currentPrice = result.data.last;
          this.identifiedEntryPrice = this.currentPrice;
        }.bind(this)
      );
      this.fieldsCheck();
    },
    /**
     * Controls whether the modal should switch to the results page tab
     *
     * @param   {string}  e
     *
     * @return
     */
    data(e) {
      this.resultPage = false;
    },
    /**
     * Watches for changes on identifiedEntryPrice field. Controls whether next button is clickable or disabled
     *
     * @return
     */
    identifiedEntryPrice(e) {
      this.fieldsCheck();
    },
    /**
     * Watches for changes on riskTolerance field. Controls whether next button is clickable or disabled
     *
     * @return
     */
    riskTolerance(e) {
      this.fieldsCheck();
    },
    /**
     * Watches for changes on targetProfit field. Controls whether next button is clickable or disabled
     *
     * @return
     */
    targetProfit(e) {
      this.fieldsCheck();
    }
  },
  mounted() {
    const params = {
      exchange: "PSE",
      status: "active"
    };
    this.$api.chart.stocks.list(params).then(
      function(result) {
        this.stockList = result.data;
      }.bind(this)
    );
  },
  methods: {
    ...mapActions({
      setRenderChartKey: "watchers/setRenderChartKey"
    }),
    /**
     * Disables 'next' button if user has incomplete inputs
     *
     * @return
     */
    fieldsCheck() {
      if (
        this.identifiedEntryPrice != "" &&
        this.riskTolerance != "" &&
        this.targetProfit != "" &&
        this.stocksDropdownModel != null
      ) {
        this.nextButtonDisable = false;
      } else {
        this.nextButtonDisable = true;
      }
    },
    /**
     * Fires when user clicks Calculate button
     *
     * @return
     */
    calculate() {
      let portfolioAllocationDec = Number(this.portfolioAllocation) / 100;

      let positionSizeMin = Math.round(
        Number(portfolioAllocationDec) * Number(this.portfolioSize)
      );
      this.positionSize = positionSizeMin;

      let takeProfitPriceTotal0 = Number(this.targetProfit) / 100;

      let takeProfitPriceTotal1 =
        Number(this.identifiedEntryPrice) * Number(takeProfitPriceTotal0);

      let takeProfitPriceTotal2 =
        Number(this.identifiedEntryPrice) + Number(takeProfitPriceTotal1);

      let takeProfitPrice = takeProfitPriceTotal2;
      this.takeProfitPrice = numeral(takeProfitPriceTotal2).format("0,0.00");

      let stoplossPriceTotal1 = Number(this.riskTolerance) / 100;

      let stoplossPricepricetot2 =
        Number(this.identifiedEntryPrice) - Number(stoplossPriceTotal1);

      this.stoplossPrice = numeral(stoplossPricepricetot2).format("0,0.00");

      let valueAtRisk1 = Number(this.riskTolerance) / 100;

      let valueAtRisk2 = Number(positionSizeMin) * Number(valueAtRisk1);

      this.valueAtRisk = valueAtRisk2;

      let upsideTotal = Number(positionSizeMin) * Number(takeProfitPriceTotal0);

      this.upside = upsideTotal;

      /* POSITION SIZING & RRR */
      let identifiedEntryPrice = parseFloat(this.identifiedEntryPrice);
      this.identifiedEntryPrice = numeral(identifiedEntryPrice).format(
        "0,0.00"
      );

      let boardLotGetVal;

      if (identifiedEntryPrice >= 0.0001 && identifiedEntryPrice <= 0.0099) {
        boardLotGetVal = 1000000;
      } else if (
        identifiedEntryPrice >= 0.01 &&
        identifiedEntryPrice <= 0.049
      ) {
        boardLotGetVal = 100000;
      } else if (
        identifiedEntryPrice >= 0.05 &&
        identifiedEntryPrice <= 0.495
      ) {
        boardLotGetVal = 10000;
      } else if (identifiedEntryPrice >= 0.5 && identifiedEntryPrice <= 4.99) {
        boardLotGetVal = 1000;
      } else if (identifiedEntryPrice >= 5 && identifiedEntryPrice <= 49.95) {
        boardLotGetVal = 100;
      } else if (identifiedEntryPrice >= 50 && identifiedEntryPrice <= 999.5) {
        boardLotGetVal = 10;
      } else if (identifiedEntryPrice >= 1000) {
        boardLotGetVal = 5;
      }

      this.boardLot = boardLotGetVal;

      let sharesTotal1 = Number(positionSizeMin) / Number(boardLotGetVal);

      let sharesTotal2 = Math.round(
        Number(sharesTotal1) / Number(identifiedEntryPrice)
      );

      sharesTotal2 = Number.isNaN(sharesTotal2) ? 0 : sharesTotal2;

      var blots = parseFloat(boardLotGetVal);
      var sharestobuy = Math.floor(positionSizeMin / identifiedEntryPrice);

      var slotmultiplier = Math.floor(sharestobuy / blots);
      var finalstocks = blots * slotmultiplier;

      this.sharesToBuy = finalstocks;

      var riskToRewardTotal1 = Number(valueAtRisk2) / Number(valueAtRisk2);

      var riskToRewardTotal2 = Number(upsideTotal) / Number(valueAtRisk2);

      var riskToRewardFormat = riskToRewardTotal1 + ":" + riskToRewardTotal2;

      riskToRewardFormat =
        Number.isNaN(riskToRewardTotal1) || Number.isNaN(riskToRewardTotal2)
          ? 0
          : riskToRewardFormat;
      this.riskRewardRatio = riskToRewardFormat;

      this.resultPage = true;

      ///////JOSES
      let buyValue = Math.round(this.sharesToBuy * identifiedEntryPrice);
      let buyCommission, buyVAT, buyTransferFee, buySCCP, buyFeesTotal;
      /* Buy Fees */
      let buyCommissionCheck = buyValue * 0.0025;
      if (buyCommissionCheck <= 20) {
        buyCommission = 20;
      } else {
        buyCommission = buyValue * 0.0025;
      }
      buyVAT = buyCommission * 0.12;
      buyTransferFee = buyValue * 0.00005;
      buySCCP = buyValue * 0.0001;

      /* Buy Totals */
      buyFeesTotal = buyCommission + buyVAT + buyTransferFee + buySCCP;

      this.totalCost = identifiedEntryPrice * this.sharesToBuy + buyFeesTotal;
    },
    /**
     * Executes POST request, adds to Watchlist
     *
     * @return
     */
    addToWatchlist() {
      this.loader = "primary";
      let params = {
        stock_id: this.stocksDropdownModel,
        entry_price: this.identifiedEntryPrice,
        take_profit: this.takeProfitPrice,
        stop_loss: this.stoplossPrice
      };
      this.$api.watchlist.watchlists
        .create(params)
        .then(response => {
          this.watchCardModalLoading = false;
          if (response.success) {
            this.showAlert(true, response.message);
            let keyCounter = this.renderChartKey;
            keyCounter++;
            this.setRenderChartKey(keyCounter);
            this.clearFields();
          }
          this.loader = false;
        })
        .catch(err => {
          this.showAlert(false, "Watchlist already exists.");
          this.loader = false;
          this.clearFields();
        });
    },
    /**
     * clears all input fields
     *
     * @return
     */
    clearFields() {
      this.stocksDropdownModel = "";
      this.identifiedEntryPrice = "";
      this.riskTolerance = "";
      this.targetProfit = "";
    },
    percentageToggle(percent, customPercentageFlag=false){
      this.customPortfolioAllocationToggle = customPercentageFlag;
      this.portfolioAllocationPercent = percent;
    }
  }
};
</script>

<style>
.v-menu__content
  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  /* color: #03dac5 !important; */
}
.v-menu__content > .v-select-list > .v-list.theme--dark {
  padding: unset;
  border-radius: unset !important;
}
.v-menu__content > .v-select-list > .v-list.theme--light {
  padding: unset;
  border-radius: unset !important;
}

.v-menu__content.theme--dark::-webkit-scrollbar {
  width: 5px !important;
}
.v-menu__content.theme--dark::-webkit-scrollbar-track {
  background: #172431 !important;
  border-radius: 10px !important;
}
.v-menu__content.theme--dark::-webkit-scrollbar-thumb {
  background: #03dac5 !important;
  border-radius: 20px !important;
}
.v-menu__content.theme--dark::-webkit-scrollbar-thumb:hover {
  background: #03dac5 !important;
}
.v-menu__content.theme--light::-webkit-scrollbar {
  width: 5px !important;
}
.v-menu__content.theme--light::-webkit-scrollbar-track {
  background: #c1c1c1 !important;
  border-radius: 0 !important;
}
.v-menu__content.theme--light::-webkit-scrollbar-thumb {
  background: #03dac5 !important;
  border-radius: 20px !important;
}
.v-menu__content.theme--light::-webkit-scrollbar-thumb:hover {
  background: #03dac5 !important;
}
</style>
