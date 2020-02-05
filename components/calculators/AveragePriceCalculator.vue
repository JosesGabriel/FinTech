<template>
  <v-card
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    :dark="lightSwitch == 0 ? false : true"
    v-model="show"
  >
    <v-card-title class="title--avprice">Average Price Calculator</v-card-title>
    <v-container class="pt-0 ma-0">
      <!--------------------------------------------->
    <v-container :class="positionKey >=1 ? 'display':'nodisplay'" class="ma-0 pa-0">
      <v-row style="font-size: 12px;padding-left: 12px;">
        <v-col cols="3">
          <span style="padding-left: 12px;">Tranch</span>
        </v-col>
        <v-col cols="3">
          <span>Position</span>
        </v-col>
        <v-col cols="3">
          <span>Price</span>
        </v-col>
        <v-col cols="3">
        </v-col>
      </v-row>
      <v-row v-for="n in positionKey" :key="n" style="font-size: 12px;padding-left: 12px;">
        <v-col cols="3" style="text-align: center;padding-bottom: 0px;padding-top: 4px;">
          <span style="font-size: 12px;">{{ n }} </span>
        </v-col>
        <v-col cols="3" class="input__textfield">
          <v-text-field
            v-model="position[n]"
            filled
            dense
            hide-details
            :value="position[n]"
            :disabled="toedit[n] == 0 ? true : false"
            color="success"
            background-color="transparent"
            style="font-size: 12px;"
            class="input--field"
          ></v-text-field>
         
        </v-col>
        <v-col cols="3" class="input__textfield">
          <v-text-field
            v-model="positionPrice[n]"
            filled
            dense
            :value="positionPrice[n]"
            hide-details
            color="success"
            background-color="transparent"
            style="font-size: 12px;"
            class="input--field"
          ></v-text-field>
        </v-col>
        <v-col cols="3" style="padding-top: 4px;">
            <span class="edit" @click="toEdit(n)">Edit</span>
        </v-col>
      </v-row>

    </v-container>

      <v-row>
        <v-col class="pb-1 mb-2">
          <span :class="calcu ? 'calc_nodisplay': 'calc_display'" style="font-size: 16px;padding-left: 12px;">
            {{ stringifyNumber(positionKey + 1) }} Tranch
          </span>
          <span :class="calcu ? 'calc_display': 'calc_nodisplay'" style="font-size: 16px;padding-left: 12px;">Your results</span>
        </v-col>
      </v-row>

    <div :class="calcu ? 'calc_nodisplay': 'calc_display'">
      <v-row>
        <v-col class="mx-3 py-0 my-0">
          <v-text-field 
            label="Position"
            flat
            v-model="pos"
            ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mx-3 py-0 my-0">
          <v-text-field 
          label="Price"
          flat
          v-model="price"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2" style="padding-left: 25px;" >
          <v-icon
            :style="{ color: toggleFontColor }"
            class="addButton"
            @click="
              positionKey++;
              position.push(pos);
              positionPrice.push(price);
              pos='';
              price='';
            "
            >mdi-plus-circle-outline</v-icon
          >
        </v-col>
        <v-col cols="6" style="text-align:right;">
          <v-btn
            text
            class="text-capitalize"
            dense
            :style="{ color: toggleFontColor }"
            @click="clear()"
            >Clear</v-btn
          >
        </v-col>
        <v-col cols="4" style="padding-left: 0px;">
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
  <div :class="calcu ? 'calc_display': 'calc_nodisplay'">  
  
      <v-row class="pl-6 pr-12">
            <v-col cols="6" class="mb-2 py-0">
              <span>Total Cost</span>
            </v-col>
            <v-col cols="6" class="mb-2 py-0" style="text-align: right;">
              <span >{{ totalCost }}</span>
            </v-col>
      </v-row>
      <v-row class="pl-6 pr-12">
            <v-col cols="6" class="mb-2 py-0">
              <span>Total Position</span>
            </v-col>
            <v-col cols="6" class="mb-2 py-0" style="text-align: right;">
              <span>{{ totalPosition }}</span>
            </v-col>
        </v-row>
      <v-row class="pl-6 pr-12">
            <v-col cols="6" class="mb-2 py-0">
              <span>Average Price</span>
            </v-col>
            <v-col cols="6" class="mb-2 py-0" style="text-align: right;">
              <span>{{ averagePrice }}</span>
            </v-col>
        </v-row>

      <v-row>
        <v-col cols="2" style="padding-left: 25px;" >
        </v-col>
        <v-col cols="6" style="text-align:right;">
          <v-btn
            text
            class="text-capitalize"
            dense
            :style="{ color: toggleFontColor }"
            @click="calcu=false"
            >Back</v-btn
          >
        </v-col>
        <v-col cols="4" style="padding-left: 0px;">
          <v-btn
            class="text-capitalize"
            dense
            color="success"
            @click="closeDialog"
          >
            <span style="color:black;">Close</span>
          </v-btn>
        </v-col>
      </v-row>
 
  </div>
      <!--------------------------------------------->
    <!--  <v-row>
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
      </v-row> -->
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
      pos: '',
      price: '',
      calcu: false,
      totalPosition: 0,
      averagePrice: 0,
      position: [0],
      positionPrice: [0],
      positionKey: 0,
      toedit: [0],
      show: false
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
      for (let i = 1; i <= this.positionKey; i++) {
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

      if(this.calcu){
        this.calcu = false;
      }else{
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
      this.pos = '',
      this.price = '',
      this.positionKey = 0;
      this.position = [0];
      this.positionPrice = [0];
      this.totalCost = 0;
      this.totalPosition = 0;
      this.averagePrice = 0;
    },
    toEdit(num){
      this.toedit[num] = 1;
    },
    closeDialog(){
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
.input__textfield{
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.input--field > .v-input__control > .v-input__slot > .v-text-field__slot > input {
  margin-top: 0px !important;
  text-align: center;
}
.display, .calc_display{
  display: block;
}
.nodisplay, .calc_nodisplay{
  display: none;
}
</style>
