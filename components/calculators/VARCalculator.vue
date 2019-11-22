<template>
  <v-card color="darkcard" dark>
    <v-card-title class="title-2 pb-0"
      >Value At Risk (VAR) Calculator</v-card-title
    >
    <v-container class="pt-0">
      <v-row>
        <v-col cols="6">
          <div>Enter Stock Details</div>
          <v-select
            v-model="stocksDropdownModel"
            label="Stock Code"
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
          <v-text-field
            v-model="currentPrice"
            type="number"
            label="Current Price"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>

          <div class="pt-3">Portfolio Planning</div>
          <v-text-field
            v-model="portfolioSize"
            type="number"
            label="Portfolio Size"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="portfolioAllocation"
            type="number"
            label="Portfolio Allocation"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="positionSize"
            type="number"
            label="Position Size"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>

          <div class="pt-3">Position Sizing & RRR</div>
          <v-text-field
            v-model="boardLot"
            type="number"
            label="Board Lot"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="sharesToBuy"
            type="number"
            label="No of Shares to Buy"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="riskRewardRatio"
            type="number"
            label="Risk to Reward Ratio"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <div>Trade Planning</div>
          <v-text-field
            v-model="identifiedEntryPrice"
            type="number"
            label="Identified Entry Price"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="riskTolerance"
            type="number"
            label="Risk Tolerance"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="targetProfit"
            type="number"
            label="Target Profit"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="takeProfitPrice"
            type="number"
            label="Take Profit Price"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="stoplossPrice"
            type="number"
            label="Stoploss Price"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="valueAtRisk"
            type="number"
            label="Value at Risk"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="upside"
            type="number"
            label="Upside"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
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
      currentPrice: 0
    };
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
    },
    currentPrice: function() {
      this.calculate();
    },
    portfolioAllocation: function() {
      this.calculate();
    },
    identifiedEntryPrice: function() {
      this.calculate();
    },
    riskTolerance: function() {
      this.calculate();
    },
    targetProfit: function() {
      this.calculate();
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

      this.takeProfitPrice = takeProfitPriceTotal2.toFixed(2);

      let stoplossPriceTotal1 = Number(this.riskTolerance) / 100;

      let stoplossPricepricetot2 =
        Number(this.identifiedEntryPrice) - Number(stoplossPriceTotal1);

      this.stoplossPrice = stoplossPricepricetot2;

      let valueAtRisk1 = Number(this.riskTolerance) / 100;

      let valueAtRisk2 = Number(positionSizeMin) * Number(valueAtRisk1);

      this.valueAtRisk = valueAtRisk2;

      let upsideTotal = Number(positionSizeMin) * Number(takeProfitPriceTotal0);

      this.upside = upsideTotal;

      /* POSITION SIZING & RRR */
      this.identifiedEntryPrice = parseFloat(this.identifiedEntryPrice);

      let boardLotGetVal;

      if (
        this.identifiedEntryPrice >= 0.0001 &&
        this.identifiedEntryPrice <= 0.0099
      ) {
        boardLotGetVal = 1000000;
      } else if (
        this.identifiedEntryPrice >= 0.01 &&
        this.identifiedEntryPrice <= 0.049
      ) {
        boardLotGetVal = 100000;
      } else if (
        this.identifiedEntryPrice >= 0.05 &&
        this.identifiedEntryPrice <= 0.495
      ) {
        boardLotGetVal = 10000;
      } else if (
        this.identifiedEntryPrice >= 0.5 &&
        this.identifiedEntryPrice <= 4.99
      ) {
        boardLotGetVal = 1000;
      } else if (
        this.identifiedEntryPrice >= 5 &&
        this.identifiedEntryPrice <= 49.95
      ) {
        boardLotGetVal = 100;
      } else if (
        this.identifiedEntryPrice >= 50 &&
        this.identifiedEntryPrice <= 999.5
      ) {
        boardLotGetVal = 10;
      } else if (this.identifiedEntryPrice >= 1000) {
        boardLotGetVal = 5;
      }

      this.boardLot = boardLotGetVal;

      let sharesTotal1 = Number(positionSizeMin) / Number(boardLotGetVal);

      let sharesTotal2 = Math.round(
        Number(sharesTotal1) / Number(this.identifiedEntryPrice)
      );

      sharesTotal2 = Number.isNaN(sharesTotal2) ? 0 : sharesTotal2;

      var blots = parseFloat(boardLotGetVal);
      var sharestobuy = Math.floor(positionSizeMin / this.identifiedEntryPrice);

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
    }
  }
};
</script>
