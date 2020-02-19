<template>
  <v-card
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-card-title class="subtitle-1 font-weight-black"
      >Buy/Sell Calculator</v-card-title
    >
    <v-container class="py-0">
      <v-row>
        <v-col class="pa-3 py-0" cols="6">
          <v-container class="py-0">
            <v-row class="caption">
              <v-col cols="12"
                ><v-text-field
                  v-model="shares"
                  type="number"
                  label="No. of Shares"
                  class="body-2"
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
                  class="pb-3 body-2"
                ></v-text-field>
                <div class="d-flex justify-space-between px-2">
                  <span>Value:</span>
                  <span>₱{{ buyValue }}</span>
                </div>
                <div class="d-flex justify-space-between px-2">
                  <span>Fees:</span>
                  <v-btn x-small icon @click="buyFeesToggle = !buyFeesToggle"
                    ><v-icon>mdi-information-outline</v-icon></v-btn
                  >
                  <span>₱{{ buyFeesTotal }}</span>
                </div>

                <div v-if="buyFeesToggle">
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Commission:</span>
                    <span>₱{{ buyCommission }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Value Added Tax:</span>
                    <span>₱{{ buyVAT }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Transfer Fee:</span>
                    <span>₱{{ buyTransferFee }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">SCCP:</span>
                    <span>₱{{ buySCCP }}</span>
                  </div>
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
                  class="pb-3 body-2"
                ></v-text-field>
                <div class="d-flex justify-space-between px-2">
                  <span>Value:</span>
                  <span>₱{{ sellValue }}</span>
                </div>
                <div class="d-flex justify-space-between px-2">
                  <span>Fees:</span>
                  <v-btn x-small icon @click="sellFeesToggle = !sellFeesToggle"
                    ><v-icon>mdi-information-outline</v-icon></v-btn
                  >
                  <span>₱{{ sellFeesTotal }}</span>
                </div>
                <div v-if="sellFeesToggle">
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Commission:</span>
                    <span>₱{{ sellCommission }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Value Added Tax:</span>
                    <span>₱{{ sellVAT }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Transfer Fee:</span>
                    <span>₱{{ sellTransferFee }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">SCCP:</span>
                    <span>₱{{ sellSCCP }}</span>
                  </div>
                  <div class="d-flex justify-space-between pr-2 pl-4">
                    <span class="overline no-transform">Sales Tax:</span>
                    <span>₱{{ sellSalesTax }}</span>
                  </div>
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
                        : ''
                    "
                    >₱{{ netProfit }} ({{ netProfitPercentage }})</span
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="6">
          <v-container class="py-0">
            <v-row class="caption">
              <v-col cols="12">
                <span class="pb-4">Break-Even Analysis</span>
                <div
                  v-for="n in 11"
                  :key="n"
                  class="d-flex justify-space-between beAnalysis__row my-1 px-2"
                  :style="
                    lightSwitch == 0
                      ? 'background-color: ' +
                        beAnalysisColorPaletteLight[n - 1]
                      : 'background-color: ' + beAnalysisColorPaletteDark[n - 1]
                  "
                >
                  <span
                    >₱ <span v-if="n > 6">-</span
                    >{{ breakEvenValue[n - 1] }}</span
                  >
                  <span>{{ beAnalysisPercentage[n - 1] }}%</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
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
      beAnalysisPercentage: [
        "20.00",
        "10.00",
        "7.50",
        "5.00",
        "2.50",
        "0.00",
        "-2.50",
        "-5.00",
        "-7.50",
        "-10.00",
        "-20.00"
      ],
      beAnalysisColorPaletteDark: [
        "#03DAC5",
        "#02B1A2",
        "#02887F",
        "#01605D",
        "#013A3F",
        "#172431",
        "#31191D",
        "#622323",
        "#922E2A",
        "#C33830",
        "#F44336"
      ],
      beAnalysisColorPaletteLight: [
        "#03DAC5",
        "#35E1D1",
        "#68E9DC",
        "#9AF0E8",
        "#CDF8F3",
        "#D3D4D5",
        "#FDD9D7",
        "#FBB4AF",
        "#F88E86",
        "#F6695E",
        "#F44336"
      ],
      breakEvenValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      buyFeesToggle: false,
      sellFeesToggle: false,
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
    /**
     * Watches for changes on Number of Shares field. Executes calculate function when change is detected
     *
     * @return
     */
    shares: function() {
      this.calculate();
    },
    /**
     * Watches for changes on Buy Price field. Executes calculate function when change is detected
     *
     * @return
     */
    buyPrice: function() {
      this.calculate();
    },
    /**
     * Watches for changes on Sell Price field. Executes calculate function when change is detected
     *
     * @return
     */
    sellPrice: function() {
      this.calculate();
    }
  },
  methods: {
    /**
     * Removes comma (when number is Numeral formatted) and parses to float
     *
     * @param   {integer}  num
     *
     * @return  {float}
     */
    parseNumber(num) {
      if (Number.isInteger(num)) return num;
      else {
        num = num.replace(/[^0-9.]+/g, "");
        return parseFloat(num);
      }
    },
    /**
     * Fires when user presses Calculate button
     *
     * @return
     */
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

      let breakEvenFlat1 = buyPrice * 0.011;
      let breakEvenFlat2 = Number(buyPrice) + Number(breakEvenFlat1);
      this.breakEvenValue[5] = numeral(breakEvenFlat2).format("0,0.00");

      let breakEven2001 = Number(breakEvenFlat2) * 0.2;
      let breakEven2002 = Number(breakEvenFlat2) + Number(breakEven2001);
      this.breakEvenValue[0] = numeral(breakEven2002).format("0,0.00");

      let breakEven1001 = Number(breakEvenFlat2) * 0.1;
      let breakEven1002 = Number(breakEvenFlat2) + Number(breakEven1001);
      this.breakEvenValue[1] = numeral(breakEven1002).format("0,0.00");

      let breakEven751 = Number(breakEvenFlat2) * 0.075;
      let breakEven752 = Number(breakEvenFlat2) + Number(breakEven751);
      this.breakEvenValue[2] = numeral(breakEven752).format("0,0.00");

      let breakEven501 = Number(breakEvenFlat2) * 0.05;
      let breakEven502 = Number(breakEvenFlat2) + Number(breakEven501);
      this.breakEvenValue[3] = numeral(breakEven502).format("0,0.00");

      let breakEven251 = Number(breakEvenFlat2) * 0.025;
      let breakEven252 = Number(breakEvenFlat2) + Number(breakEven251);
      this.breakEvenValue[4] = numeral(breakEven252).format("0,0.00");

      let breakEvenN251 = Number(breakEvenFlat2) * 0.025;
      let breakEvenN252 = Number(breakEvenFlat2) - Number(breakEvenN251);
      this.breakEvenValue[6] = numeral(breakEvenN252).format("0,0.00");

      let breakEvenN501 = Number(breakEvenFlat2) * 0.05;
      let breakEvenN502 = Number(breakEvenFlat2) - Number(breakEvenN501);
      this.breakEvenValue[7] = numeral(breakEvenN502).format("0,0.00");

      let breakEvenN751 = Number(breakEvenFlat2) * 0.075;
      let breakEvenN752 = Number(breakEvenFlat2) - Number(breakEvenN751);
      this.breakEvenValue[8] = numeral(breakEvenN752).format("0,0.00");

      let breakEvenN1001 = Number(breakEvenFlat2) * 0.1;
      let breakEvenN1002 = Number(breakEvenFlat2) - Number(breakEvenN1001);
      this.breakEvenValue[9] = numeral(breakEvenN1002).format("0,0.00");

      let breakEvenN2001 = Number(breakEvenFlat2) * 0.2;
      let breakEvenN2002 = Number(breakEvenFlat2) - Number(breakEvenN2001);
      this.breakEvenValue[10] = numeral(breakEvenN2002).format("0,0.00");
    }
  }
};
</script>

<style>
.beAnalysis__row {
  padding: 3px;
  border-radius: 5px;
}
</style>
