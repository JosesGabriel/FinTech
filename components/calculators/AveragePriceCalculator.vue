<template>
  <v-card color="darkcard" dark>
    <v-card-title class="title-2">Average Price Calculator</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12"
          ><v-text-field
            v-model="totalCost"
            label="Total Cost"
            prefix="₱"
            hide-details
            disabled
            filled
          ></v-text-field
        ></v-col>
        <v-col cols="12"
          ><v-text-field
            v-model="totalPosition"
            label="Total Position"
            hide-details
            disabled
            filled
          ></v-text-field
        ></v-col>
        <v-col cols="12"
          ><v-text-field
            v-model="averagePrice"
            label="Average Price"
            prefix="₱"
            hide-details
            disabled
            filled
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-btn
            rounded
            outlined
            small
            dense
            color="primary"
            @click="
              positionKey++;
              position.push(0);
              positionPrice.push(0);
            "
            >Add Item</v-btn
          >
          <v-btn
            rounded
            outlined
            small
            dense
            color="success"
            @click="calculate()"
            >Calculate</v-btn
          >
          <v-btn rounded outlined small dense color="error" @click="clear()"
            >Clear</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-for="n in positionKey" :key="n">
        <v-col cols="6">
          <v-text-field
            v-model="position[n - 1]"
            label="Position"
            filled
            hide-details
            color="success"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="positionPrice[n - 1]"
            label="Price"
            filled
            hide-details
            color="success"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
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
  methods: {
    parseNumber(num) {
      if (Number.isInteger(num)) return num;
      else {
        num = num.replace(/[^0-9.]+/g, "");
        return parseFloat(num);
      }
    },
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
