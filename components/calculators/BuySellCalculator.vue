<template>
  <v-card
    :color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-card-title class="headline">Buy/Sell Calculator</v-card-title>
    <v-container>
      <v-row class="caption">
        <v-col cols="12"
          ><v-text-field
            v-model="shares"
            type="number"
            label="Number of Shares"
            dense
            hide-details
            color="success"
          ></v-text-field
        ></v-col>
        <v-col cols="12">
          <v-text-field
            v-model="buyPrice"
            label="Buy Price"
            type="number"
            prefix="₱"
            dense
            hide-details
            color="success"
            class="pb-3"
          ></v-text-field>
          <div class="d-flex justify-space-between px-2">
            <span>Value:</span>
            <span>₱{{ buyValue }}</span>
          </div>
          <div class="d-flex justify-space-between px-2">
            <span>Fees:</span>
            <span>₱{{ buyFeesTotal }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Commission:</span>
            <span>₱{{ buyCommission }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Value Added Tax:</span>
            <span>₱{{ buyVAT }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Transfer Fee:</span>
            <span>₱{{ buyTransferFee }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">SCCP:</span>
            <span>₱{{ buySCCP }}</span>
          </div>
          <div class="d-flex justify-space-between px-2">
            <span>Buy Total:</span>
            <span>₱{{ buyTotal }}</span>
          </div>
        </v-col>
        <v-col cols="12"
          ><v-text-field
            v-model="sellPrice"
            label="Sell Price"
            type="number"
            prefix="₱"
            dense
            hide-details
            color="success"
            class="pb-3"
          ></v-text-field>
          <div class="d-flex justify-space-between px-2">
            <span>Value:</span>
            <span>₱{{ sellValue }}</span>
          </div>
          <div class="d-flex justify-space-between px-2">
            <span>Fees:</span>
            <span>₱{{ sellFeesTotal }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Commission:</span>
            <span>₱{{ sellCommission }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Value Added Tax:</span>
            <span>₱{{ sellVAT }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Transfer Fee:</span>
            <span>₱{{ sellTransferFee }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">SCCP:</span>
            <span>₱{{ sellSCCP }}</span>
          </div>
          <div class="d-flex justify-space-between pr-2 pl-4">
            <span class="overline">Sales Tax:</span>
            <span>₱{{ sellSalesTax }}</span>
          </div>
          <div class="d-flex justify-space-between px-2">
            <span>Sell Total:</span>
            <span>₱{{ sellTotal }}</span>
          </div>
          <v-divider class="my-3"></v-divider>
          <div class="d-flex justify-space-between px-2">
            <span>Net Profit:</span>
            <span
              :class="
                parseInt(netProfitPercentage) > 0
                  ? 'success--text'
                  : parseInt(netProfitPercentage) < 0
                  ? 'error--text'
                  : 'text--secondary'
              "
              >₱{{ netProfit }} ({{ netProfitPercentage }})</span
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
let numeral = require("numeral");
export default {
  data() {
    return {
      shares: 0,
      buyPrice: 0,
      sellPrice: 0,
      buyValue: 0,
      buyFeesTotal: 0,
      buyCommission: 0,
      buyVAT: 0,
      buyTransferFee: 0,
      buySCCP: 0,
      buyTotal: 0,
      sellValue: 0,
      sellCommission: 0,
      sellVAT: 0,
      sellTransferFee: 0,
      sellSCCP: 0,
      sellSalesTax: 0,
      sellFeesTotal: 0,
      sellTotal: 0,
      netProfitPercentage: "",
      netProfit: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    shares: function() {
      this.calculate();
    },
    buyPrice: function() {
      this.calculate();
    },
    sellPrice: function() {
      this.calculate();
    }
  },
  methods: {
    parseNumber(num) {
      if (Number.isInteger(num)) return num;
      else {
        num = num.replace(/[^0-9.]+/g, "");
        return parseFloat(num);
      }
    },
    calculate() {
      let buyValue = this.parseNumber(this.buyValue);
      let shares = this.parseNumber(this.shares);
      let buyPrice = this.parseNumber(this.buyPrice);
      let buyCommission = this.parseNumber(this.buyCommission);
      let buyVAT = this.parseNumber(this.buyVAT);
      let buyTransferFee = this.parseNumber(this.buyTransferFee);
      let buySCCP = this.parseNumber(this.buySCCP);

      buyValue = Math.round(shares * buyPrice);
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

      this.buyValue = numeral(buyValue).format("0,0.00");
      this.buyCommission = numeral(buyCommission).format("0,0.00");
      this.buyVAT = numeral(buyVAT).format("0,0.00");
      this.buyTransferFee = numeral(buyTransferFee).format("0,0.00");
      this.buySCCP = numeral(buySCCP).format("0,0.00");

      /* Buy Totals */
      let buyFeesTotal = buyCommission + buyVAT + buyTransferFee + buySCCP;
      let buyTotal = buyFeesTotal + buyValue;

      this.buyFeesTotal = numeral(buyFeesTotal).format("0,0.00");
      this.buyTotal = numeral(buyTotal).format("0,0.00");

      /* Sell */
      let sellValue = this.parseNumber(this.sellValue);
      let sellCommission = this.parseNumber(this.sellCommission);
      let sellVAT = this.parseNumber(this.sellVAT);
      let sellTransferFee = this.parseNumber(this.sellTransferFee);
      let sellSCCP = this.parseNumber(this.sellSCCP);
      let sellSalesTax = this.parseNumber(this.sellSalesTax);

      sellValue = Math.round(this.shares * this.sellPrice);

      /* Sell Fees */
      let sellCommissionCheck = this.sellValue * 0.0025;
      if (sellCommissionCheck <= 20) {
        sellCommission = 20;
      } else {
        sellCommission = sellValue * 0.0025;
      }
      sellVAT = sellCommission * 0.12;
      sellTransferFee = sellValue * 0.00005;
      sellSCCP = sellValue * 0.0001;
      sellSalesTax = sellValue * 0.006;

      this.sellValue = numeral(sellValue).format("0,0.00");
      this.sellCommission = numeral(sellCommission).format("0,0.00");
      this.sellVAT = numeral(sellVAT).format("0,0.00");
      this.sellTransferFee = numeral(sellTransferFee).format("0,0.00");
      this.sellSCCP = numeral(sellSCCP).format("0,0.00");
      this.sellSalesTax = numeral(sellSalesTax).format("0,0.00");

      let sellFeesTotal =
        sellCommission + sellVAT + sellTransferFee + sellSCCP + sellSalesTax;
      /* Sell Totals */
      let sellTotal = sellValue - sellFeesTotal;
      let netProfit = sellTotal - buyTotal;
      let netProfitPercentage = (netProfit / buyTotal) * 100;
      this.sellFeesTotal = numeral(sellFeesTotal).format("0,0.00");
      this.sellTotal = numeral(sellTotal).format("0,0.00");
      this.sellTotal = numeral(sellTotal).format("0,0.00");
      this.netProfit = numeral(netProfit).format("0,0.00");
      this.netProfitPercentage =
        numeral(netProfitPercentage).format("0,0.00") + "%";
    }
  }
};
</script>
