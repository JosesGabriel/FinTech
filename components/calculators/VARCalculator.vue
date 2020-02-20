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
              step=".1"
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
              :outlined="!(portfolioAllocationPercent === 10)"
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
              :outlined="!(portfolioAllocationPercent === 20)"
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
              :outlined="!(portfolioAllocationPercent === -1)"
              color="success"
              @click="percentageToggle(-1, true)"
              >Custom</v-btn
            >
          </v-col>
          <v-col v-if="customPortfolioAllocationToggle" cols="12">
            <v-text-field
              v-model="customPortfolioAllocationPercent"
              type="number"
              label="Custom Portfolio Allocation (%)"
              min="0"
              max="100"
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
              min="0"
              max="100"
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
              min="0"
              max="100"
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
            <span>Risk to Reward ratio:</span>
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
        @click="calculateResult()"
        >Continue</v-btn
      >
      <div v-else> 
        <v-btn
          class="addWatch__button no-transform black--text"
          color="success"
          light
          depressed
          @click="resultPage = false"
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
import { mapGetters, mapActions } from "vuex";
import { CalculateGCD } from "~/assets/js/helpers/math/ratio";
import { CalculateBoardLot } from "~/assets/js/helpers/orderbook";
import { BuyFees } from "~/assets/js/helpers/taxation";
let numeral = require("numeral");

export default {
  props: ["data"],
  data() {
    return {
      loader: false,
      nextButtonDisable: true,
      stocksDropdownModel: null,
      stockList: [],
      stoplossPrice: 0,
      takeProfitPrice: 0,
      targetProfit: 0,
      riskTolerance: 0,
      identifiedEntryPrice: 0,
      riskRewardRatio: 0,
      sharesToBuy: 0,
      boardLot: 0,
      portfolioAllocation: 0,
      currentPrice: 0,
      totalCost: 0,
      resultPage: false,
      availableFunds: 50000,
      customPortfolioAllocationPercent: 100,
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
      setAlert: "global/setAlert",
      setRenderChartKey: "watchers/setRenderChartKey"
    }),
    /**
     * Helpers
     */
    buyFees: BuyFees,
    calculateBoardLot: CalculateBoardLot,
    calculateGCD: CalculateGCD,
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
     * Calculate result from given inputs
     *
     * @return
     */
    calculateResult(){
      // calculate trade fund
      if (this.customPortfolioAllocationToggle){
        this.portfolioAllocationPercent = this.customPortfolioAllocationPercent
      }
      const tradeFund = Number(this.availableFunds) * (Number(this.portfolioAllocationPercent)/100);

      // calculate no. of shares to buy
      this.sharesToBuy = Math.ceil(tradeFund / Number(this.calculateBoardLot(this.identifiedEntryPrice)))

      // calculate total cost (w/ extra charges)
      this.totalCost = this.buyFees(this.sharesToBuy * Number(this.identifiedEntryPrice))

      // calculate risk tolerance price and take profit price
      this.stoplossPrice = Number(this.identifiedEntryPrice) - ((Number(this.riskTolerance)/100) * this.identifiedEntryPrice);
      this.takeProfitPrice = Number(this.identifiedEntryPrice) + ((Number(this.targetProfit)/100) * this.identifiedEntryPrice);

      // calculate Risk to Reward Ratio (RRR)
      const stoplossRRR = Math.round(100 - ((Number(this.riskTolerance)/100) * this.identifiedEntryPrice));
      const takeProfitRRR =  Math.round(100 + ((Number(this.targetProfit)/100) * this.identifiedEntryPrice))
      const gcd = this.calculateGCD( stoplossRRR, takeProfitRRR)
      this.riskRewardRatio = stoplossRRR/gcd + ":" + takeProfitRRR/gcd

      // go to result page
      this.resultPage = true;
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
            this.setAlert({
              model: true, 
              state: true,
              message: "Successfully added to watchlist." 
            });
            let keyCounter = this.renderChartKey;
            keyCounter++;
            this.setRenderChartKey(keyCounter);
            this.clearFields();
          }
          this.loader = false;
        })
        .catch(err => {
          this.setAlert({
            model: true, 
            state: false,
            message: "Stock already exist in watchlist." 
          });

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
