<template>
  <v-content class="template row-content ml-4 mb-2">
    <v-row class="ma-0 row-1">
      <v-col :class="colLabel">PREVIOUS</v-col>
      <v-col :class="colValue">{{ stock.close | numeral("0,0.00") }}</v-col>
      <v-col :class="colLabel">OPEN</v-col>
      <v-col
        class="col-3 pa-0 caption white--text text-right"
        :class="{
          increase: stock.open > stock.close,
          decrease: stock.open < stock.close
        }"
      >
        {{ stock.open | numeral("0,0.00") }}</v-col
      >
    </v-row>
    <v-row class="ma-0 row-2">
      <v-col :class="colLabel">LOW</v-col>
      <v-col
        class="col-3 pa-0 caption white--text text-right"
        :class="{
          increase: stock.low > stock.close,
          decrease: stock.low < stock.close
        }"
        >{{ stock.low | numeral("0,0.00") }}</v-col
      >
      <v-col :class="colLabel">HIGH</v-col>
      <v-col
        class="col-3 pa-0 caption white--text text-right"
        :class="{
          increase: stock.high > stock.close,
          decrease: stock.high < stock.close
        }"
        >{{ stock.high | numeral("0,0.00") }}</v-col
      >
    </v-row>
    <v-row class="ma-0 row-3">
      <v-col :class="colLabel">52WKLOW</v-col>
      <v-col
        class="col-3 pa-0 caption white--text text-right"
        :class="{
          increase: stock.weekyearlow > stock.last,
          decrease: stock.weekyearlow < stock.last
        }"
        >{{ stock.weekyearlow | numeral("0,0.00") }}</v-col
      >
      <v-col :class="colLabel">52WKHIGH</v-col>
      <v-col
        class="col-3 pa-0 caption white--text text-right"
        :class="{
          increase: stock.weekyearhigh > stock.last,
          decrease: stock.weekyearhigh < stock.last
        }"
        >{{ stock.weekyearhigh | numeral("0,0.00") }}</v-col
      >
    </v-row>
    <v-row class="ma-0 row-4">
      <v-col :class="colLabel">VOLUME</v-col>
      <v-col :class="colValue" class="text-uppercase">{{
        stock.volume | numeral("0.000a")
      }}</v-col>
      <v-col :class="colLabel">VALUE</v-col>
      <v-col :class="colValue" class="text-uppercase">{{
        stock.value | numeral("0.000a")
      }}</v-col>
    </v-row>
    <v-row class="ma-0 row-5">
      <v-col :class="colLabel">TRADES</v-col>
      <v-col :class="colValue">{{ stock.trades | numeral("0,0") }}</v-col>
      <v-col :class="colLabel">AVERAGE</v-col>
      <v-col
        class="col-3 pa-0 caption white--text text-right"
        :class="{
          increase: stock.average > stock.last,
          decrease: stock.average < stock.last
        }"
        >{{ stock.average | numeral("0,0.00") }}</v-col
      >
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
