<template>
  <v-card
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-card-title class="title--avprice">AVERAGE PRICE CALCULATOR</v-card-title>
    <v-container>
      <!--------------------------------------------->
      <v-row v-for="n in positionKey" :key="n">
        <v-col cols="4" style="text-align: left; align-self: flex-end;">
          <span style="font-size: 14px;">{{ stringifyNumber(n) }} Tranch</span>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="position[n - 1]"
            label="Position"
            filled
            dense
            hide-details
            color="success"
            background-color="transparent"
            class="input--field"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="positionPrice[n - 1]"
            label="Price"
            filled
            dense
            hide-details
            color="success"
            background-color="transparent"
            class="input--field"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" style="padding-left: 25px;">
          <v-icon
            :style="{ color: toggleFontColor }"
            class="addButton"
            @click="
              positionKey++;
              position.push(0);
              positionPrice.push(0);
            "
            >mdi-plus-circle-outline</v-icon
          >
        </v-col>
        <v-col cols="6" style="text-align:right;">
          <v-btn
            text
            small
            class="text-capitalize"
            dense
            :style="{ color: toggleFontColor }"
            @click="clear()"
            >Clear</v-btn
          >
        </v-col>
        <v-col cols="4" style="padding-left: 0px;">
          <v-btn
            rounded
            small
            class="text-capitalize"
            dense
            color="success"
            @click="calculate()"
          >
            <span style="color:black;">Calculate</span>
          </v-btn>
        </v-col>
      </v-row>
      <!--------------------------------------------->
      <v-row>
        <v-col cols="12"
          ><v-text-field
            v-model="totalCost"
            label="Total Cost"
            prefix="₱"
            hide-details
            readonly
            filled
            background-color="transparent"
          ></v-text-field
        ></v-col>
        <v-col cols="12"
          ><v-text-field
            v-model="totalPosition"
            label="Total Position"
            hide-details
            readonly
            filled
            background-color="transparent"
          ></v-text-field
        ></v-col>
        <v-col cols="12"
          ><v-text-field
            v-model="averagePrice"
            label="Average Price"
            prefix="₱"
            hide-details
            readonly
            filled
            background-color="transparent"
          ></v-text-field
        ></v-col>
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
      totalCost: 0,
      totalPosition: 0,
      averagePrice: 0,
      position: [0],
      positionPrice: [0],
      positionKey: 1
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6";
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
     * Convert number to string like 1 to First, 2 to Second
     *
     * @param   {int}  n  number
     *
     * @return  {string}   Converted number
     */
    stringifyNumber(n) {
      let special = [
        "zeroth",
        "First",
        "Second",
        "Third",
        "Fourth",
        "Fifth",
        "Sixth",
        "Seventh",
        "Eighth",
        "Ninth",
        "Tenth",
        "eleventh",
        "twelfth",
        "thirteenth",
        "fourteenth",
        "fifteenth",
        "sixteenth",
        "seventeenth",
        "eighteenth",
        "nineteenth"
      ];
      let deca = [
        "twent",
        "thirt",
        "fort",
        "fift",
        "sixt",
        "sevent",
        "eight",
        "ninet"
      ];
      if (n < 20) return special[n];
      if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
      return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
    },
    /**
     * Fires when user presses Calculate button
     *
     * @return
     */
    calculate() {
      let totalCost = 0;
      let totalPrice = 0;
      let totalVolume = 0;
      let costFee = 0;
      for (let i = 0; i < this.positionKey; i++) {
        let dposition = this.parseNumber(this.position[i]);
        let dprice = this.parseNumber(this.positionPrice[i]);
        if (dposition > 0 && dprice > 0) {
          totalVolume += parseFloat(dposition);
          totalPrice += parseFloat(dprice);
          let nscost = parseFloat(dprice) * parseFloat(dposition);
          totalCost += nscost;
          costFee += parseFloat(nscost) + parseFloat(this.getFee(nscost));
        }
      }
      let finalCost = costFee / totalVolume;
      this.totalCost = numeral(costFee).format("0,0.00");
      this.totalPosition = numeral(totalVolume).format("0,0");
      this.averagePrice = numeral(finalCost).format("0,0.00");
    },
    /**
     * returns total fee
     *
     * @param   {integer}  marketvalue
     *
     * @return  {integer}
     */
    getFee(marketvalue) {
      let totalfee = 0;
      let partcpms = marketvalue * 0.0025;
      let commission = partcpms >= 20 ? partcpms : 20;
      let tax = commission * 0.12;
      let transfer = marketvalue * 0.00005;
      let sccp = marketvalue * 0.0001;
      totalfee = commission + tax + transfer + sccp;
      return totalfee;
    },
    /**
     * Clears all inputs
     *
     * @return
     */
    clear() {
      this.positionKey = 1;
      this.position = [0];
      this.positionPrice = [0];
      this.totalCost = 0;
      this.totalPosition = 0;
      this.averagePrice = 0;
    }
  }
};
</script>
<style scoped>
.title--avprice {
  font-size: 16px !important;
  color: #03dac5;
  justify-content: center;
}
.addButton:hover {
  cursor: pointer;
}
</style>
<style>
.input--field > .v-input__control > .v-input__slot {
  padding: 0px !important;
}
</style>
