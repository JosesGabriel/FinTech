<template>
  <v-card
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    :dark="lightSwitch == 0 ? false : true"
    v-model="show"
  >
    <v-card-title class="title--avprice">Average Price Calculator</v-card-title>
    <v-container class="pt-0 ma-0">
      <v-container :class="positionKey >=1 ? 'd-block':'d-none'" class="ma-0 pa-0">
        <v-row style="font-size: 12px;padding-left: 12px;">
          <v-col cols="3">
            <span style="padding-left: 3px;">Tranche</span>
          </v-col>
          <v-col cols="3">
            <span>Position</span>
          </v-col>
          <v-col cols="3">
            <span>Price</span>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-row v-for="n in positionKey" :key="n" style="font-size: 12px;padding-left: 12px;">
          <v-col cols="3" style="text-align: center;padding-bottom: 0px;padding-top: 4px;">
            <span style="font-size: 12px;">{{ n }}</span>
          </v-col>
          <v-col cols="3" class="input__textfield">
            <v-text-field
              v-model="position[n].data"
              filled
              dense
              hide-details
              type="number"
              :value="position[n].data"
              :disabled="position[n].edit ? true : false"
              color="success"
              background-color="transparent"
              style="font-size: 12px;"
              class="input--field"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="input__textfield">
            <v-text-field
              v-model="positionPrice[n].data"
              filled
              dense
              type="number"
              :value="positionPrice[n].data"
              :disabled="positionPrice[n].edit ? true : false"
              hide-details
              color="success"
              background-color="transparent"
              style="font-size: 12px;"
              class="input--field"
            ></v-text-field>
          </v-col>
          <v-col cols="3" style="padding-top: 4px;">
            <span
              class="edit"
              v-on:click="
                position[n].edit=false;
                positionPrice[n].edit=false;
                "
            >Edit</span>
          </v-col>
        </v-row>
      </v-container>

      <v-row>
        <v-col class="pb-1 mb-2">
          <span
            :class="calcu ? 'd-none': 'd-block'"
            style="font-size: 16px;padding-left: 12px;"
          >{{ stringifyNumber(positionKey + 1) }} Tranche</span>
          <span
            :class="calcu ? 'd-block': 'd-none'"
            style="font-size: 16px;padding-left: 12px;"
            class="pb-3"
          >Your results</span>
        </v-col>
      </v-row>

      <div :class="calcu ? 'd-none': 'd-block'">
        <v-row>
          <v-col class="mx-3 py-0 my-0">
            <v-text-field
              label="Position"
              type="number"
              color="success"
              item-color="success"
              flat
              v-model="pos"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-3 py-0 my-0">
            <v-text-field
              label="Price"
              class="pb-0 mb-0 avprice"
              color="success"
              item-color="success"
              type="number"
              flat
              v-model="price"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-0 py-0">
          <v-col cols="12" class="my-0 pt-1 pb-3" style="padding-left: 25px;">
            <v-btn
              x-small
              :style="{ color: toggleFontColor }"
              class="addButton"
              color="success"
              :disabled="price == '' || pos == '' ? true : false"
              @click="
                  pos_edit = {
                    'data': pos,
                    'edit': true
                  };
                  price_edit = {
                    'data': price,
                    'edit': true
                  };
                  positionKey++;
                  position.push(pos_edit);
                  positionPrice.push(price_edit);
                  pos='';
                  price='';
                  toedit=true;
                "
            >
              <span style="color:black;">Enter</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="mx-5"></v-divider>
        <v-row>
          <v-col cols="12" style="text-align: end;">
            <v-btn
              text
              class="text-capitalize"
              dense
              :style="{ color: toggleFontColor }"
              @click="clear()"
            >Clear</v-btn>
            <v-btn
              class="text-capitalize"
              dense
              color="success"
              :disabled="positionKey >=1 ? false : true "
              @click="calculate()"
            >
              <span style="color:black;">Calculate</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div :class="calcu ? 'd-block': 'd-none'">
        <v-row class="pl-3 pr-6" style="font-size: 14px;">
          <v-col cols="6" class="mb-2 py-0">
            <span>Total Cost</span>
          </v-col>
          <v-col cols="6" class="mb-2 py-0 pr-0" style="text-align: right;">
            <span>{{ totalCost }}</span>
          </v-col>
        </v-row>
        <v-row class="pl-3 pr-6" style="font-size: 14px;">
          <v-col cols="6" class="mb-2 py-0">
            <span>Total Position</span>
          </v-col>
          <v-col cols="6" class="mb-2 py-0 pr-0" style="text-align: right;">
            <span>{{ totalPosition }}</span>
          </v-col>
        </v-row>
        <v-row class="pl-3 pr-6" style="font-size: 14px;">
          <v-col cols="6" class="mb-2 py-0">
            <span>Average Price</span>
          </v-col>
          <v-col cols="6" class="mb-2 py-0 pr-0" style="text-align: right;">
            <span>{{ averagePrice }}</span>
          </v-col>
        </v-row>

        <v-row class="pt-3">
          <v-col cols="2" style="padding-left: 25px;"></v-col>
          <v-col cols="6" style="text-align:right;">
            <v-btn
              text
              class="text-capitalize"
              dense
              :style="{ color: toggleFontColor }"
              @click="calcu=false"
            >Back</v-btn>
          </v-col>
          <v-col cols="4" style="padding-left: 10px;">
            <v-btn class="text-capitalize" dense color="success" @click="closeDialog">
              <span style="color:black;">Close</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
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
      pos: "",
      price: "",
      calcu: false,
      totalPosition: 0,
      averagePrice: 0,
      position: [0],
      positionPrice: [0],
      positionKey: 0,
      toedit: true,
      show: false,
      pos_edit: [],
      price_edit: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Toggle font secondary color base on current theme mode
     *
     * @return  {string}  returns color hex code
     */
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
      for (let i = 1; i <= this.positionKey; i++) {
        let dposition = this.parseNumber(this.position[i].data);
        let dprice = this.parseNumber(this.positionPrice[i].data);
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

      if (this.calcu) {
        this.calcu = false;
      } else {
        this.calcu = true;
      }
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
      (this.pos = ""), (this.price = ""), (this.positionKey = 0);
      this.position = [0];
      this.positionPrice = [0];
      this.totalCost = 0;
      this.totalPosition = 0;
      this.averagePrice = 0;
    },
    /**
     * Enable textfields on row entries
     *
     * @param   {number}  num  carry the index number of a particular row item
     *
     * @return  {number}       assign number index to a particular item
     */
    toEdit(num) {
      this.toedit[num] = 1;
    },
    /**
     * Emit close back to parent component when outside document is clicked
     *
     * @return  {boolean}  returns false boolean
     */
    closeDialog() {
      this.$emit("showDialog", false);
    }
  }
};
</script>

<style scoped>
.title--avprice {
  font-size: 16px !important;
  font-weight: 600 !important;
  justify-content: left;
}
.addButton:hover,
.edit:hover {
  cursor: pointer;
}
</style>

<style>
.input--field > .v-input__control > .v-input__slot {
  padding: 0px !important;
  min-height: 10px !important;
}
.input--field > .v-input__control > .v-input__slot:before {
  border-style: unset !important;
}
.input__textfield {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.input--field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input {
  margin-top: 0px !important;
  text-align: center;
}
.avprice > .v-input__control > .v-text-field__details {
  display: none;
}
</style>