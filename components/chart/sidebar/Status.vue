<template>
  <v-content class="template row-content ml-4 mb-2">
    <v-row class="ma-0 row-1">
      <v-col :class="colLabel">PREVIOUS</v-col>
      <v-col :class="colValue">{{ stock.close }}</v-col>
      <v-col :class="colLabel">OPEN</v-col>
      <v-col :class="colValue" class="increase">{{ stock.open }}</v-col>
    </v-row>
    <v-row class="ma-0 row-2">
      <v-col :class="colLabel">LOW</v-col>
      <v-col :class="colValue" class="increase">{{ stock.low }}</v-col>
      <v-col :class="colLabel">HIGH</v-col>
      <v-col :class="colValue" class="increase">{{ stock.high }}</v-col>
    </v-row>
    <v-row class="ma-0 row-3">
      <v-col :class="colLabel">52WKLOW</v-col>
      <v-col :class="colValue" class="decrease">{{ stock.weekyearlow }}</v-col>
      <v-col :class="colLabel">52WKHIGH</v-col>
      <v-col :class="colValue" class="increase">{{ stock.weekyearhigh }}</v-col>
    </v-row>
    <v-row class="ma-0 row-4">
      <v-col :class="colLabel">VOLUME</v-col>
      <v-col :class="colValue">{{ stock.volume }}</v-col>
      <v-col :class="colLabel">VALUE</v-col>
      <v-col :class="colValue">{{ stock.value }}</v-col>
    </v-row>
    <v-row class="ma-0 row-5">
      <v-col :class="colLabel">TRADES</v-col>
      <v-col :class="colValue">{{ stock.trades }}</v-col>
      <v-col :class="colLabel">AVERAGE</v-col>
      <v-col :class="colValue" class="increase">{{ stock.average }}</v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Status",
  data() {
    return {
      colLabel: "col-3 pa-0 caption pl-3",
      colValue: "col-3 pa-0 caption white--text text-right"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock"
    })
  },
  methods:{
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
};
</script>

<style scoped>
.template {
  font-size: x-small;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
</style>
