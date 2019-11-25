<template>
  <v-card color="darkcard" dark :loading="loader" class="px-2">
    <v-card-title class="pl-2">
      <span
        class="subtitle-1 font-weight-black py-0 pl-2"
        style="color: #1DE9B6"
        >VAR CALCULATOR</span
      >
    </v-card-title>
    <v-card-text class="pa-1">
      <v-container class="py-0">
        <v-row v-if="!resultPage">
          <v-col cols="12" class="d-flex justify-space-between py-0">
            <span>Total Equity:</span>
            <span>100,000.00</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between py-1">
            <span>Available Funds:</span>
            <span>60,000.00</span>
          </v-col>
          <v-col cols="12 pt-4">
            <v-select
              v-model="stocksDropdownModel"
              label="Select Stock"
              :items="stockList"
              item-text="symbol"
              item-value="id_str"
              append-icon="mdi-chevron-down"
              class="pl-0"
              dark
              hide-details
              color="success"
              required
            ></v-select>
          </v-col>
          <v-col cols="12"
            ><v-text-field
              v-model="identifiedEntryPrice"
              type="number"
              label="Buy Price"
              prefix="₱"
              dense
              hide-details
              color="success"
            ></v-text-field
          ></v-col>
          <v-col cols="12"
            ><v-text-field
              v-model="riskTolerance"
              type="number"
              label="Risk Tolerance (%)"
              prefix="₱"
              dense
              hide-details
              color="success"
            ></v-text-field
          ></v-col>
          <v-col cols="12"
            ><v-text-field
              v-model="targetProfit"
              type="number"
              label="Target Profit (%)"
              prefix="₱"
              dense
              hide-details
              color="success"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row v-if="resultPage">
          <v-col cols="12">
            <span class="body-2 font-weight-light" style="color: #1DE9B6"
              >Your results</span
            >
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between">
            <span>No. of Shares to buy</span>
            <span>{{ sharesToBuy }}</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between">
            <span>Total cost:</span>
            <span>{{ totalCost }}</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between">
            <span>Entry Price:</span>
            <span>{{ identifiedEntryPrice }}</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between">
            <span>Take Profit:</span>
            <span>{{ takeProfitPrice }}</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between">
            <span>Stoploss:</span>
            <span>{{ stoplossPrice }}</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between">
            <span>Risk to reward ratio:</span>
            <span>{{ riskRewardRatio }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="pt-6 mt-6">
      <v-spacer></v-spacer>
      <!-- <v-btn
        class="addWatch__button"
        depressed
        color="transparent"
        @click="dialog = false"
        >Close</v-btn
      > -->
      <v-btn
        v-if="!resultPage"
        class="addWatch__button"
        color="#48FFD5"
        light
        depressed
        :disabled="nextButtonDisable"
        @click="calculate()"
        >Continue</v-btn
      >
      <v-btn
        v-else
        class="addWatch__button"
        color="#48FFD5"
        light
        depressed
        @click="addToWatchlist()"
        >Add to Watchlist</v-btn
      >
    </v-card-actions>
    <v-snackbar
      v-model="watchList__alert"
      :color="watchList__alertState ? 'success' : 'error'"
    >
      {{ post__responseMsg }}
      <v-btn color="white" text @click="watchList__alert = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>
<style>
.text--green {
  color: #48ffd5;
}
.text--red {
  color: #ff4848;
}
.text--gray {
  color: gray;
}
</style>
<script>
let numeral = require("numeral");
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      loader: false,
      post__responseMsg: null,
      watchList__alert: false,
      watchList__alertState: null,
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
      resultPage: false
    };
  },
  computed: {
    ...mapGetters({
      renderChartKey: "watchers/getRenderChartKey"
    })
  },
  watch: {
    stocksDropdownModel: function(e) {
      //   alert(e);
      const params = {
        exchange: "PSE",
        "symbol-id": e
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          this.currentPrice = result.data.last;
        }.bind(this)
      );
      this.fieldsCheck();
    },
    data: function(e) {
      this.resultPage = false;
    },
    identifiedEntryPrice: function(e) {
      this.fieldsCheck();
    },
    riskTolerance: function(e) {
      this.fieldsCheck();
    },
    targetProfit: function(e) {
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
    calculate() {
      /* PORTFOLIO PLANNING */

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
    addToWatchlist() {
      this.loader = "primary";
      let params = {
        user_id: this.$auth.loggedIn ? this.$auth.user.data.user.uuid : "000",
        stock_id: this.stocksDropdownModel,
        entry_price: this.identifiedEntryPrice,
        take_profit: this.takeProfitPrice,
        stop_loss: this.stoplossPrice
      };
      this.$axios
        .$post(process.env.DEV_API_URL + "/journal/watchlist", params)
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
    showAlert(state, message) {
      this.watchList__alert = true;
      this.post__responseMsg = message;
      this.watchList__alertState = state;
    },
    clearFields() {
      this.stocksDropdownModel = "";
      this.identifiedEntryPrice = "";
      this.riskTolerance = "";
      this.targetProfit = "";
    }
  }
};
</script>
