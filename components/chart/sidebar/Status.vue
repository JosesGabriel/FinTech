<template>
  <v-content class="template row-content ml-4 mb-2">
    <v-row class="ma-0 row-1">
      <v-col class="col-3 pa-0 pl-3">{{ $vssWidth }}</v-col>
      <v-col class="col-3 pa-0 white--text text-right">{{
        stock.close | numeral("0,0.00")
      }}</v-col>
      <v-col class="col-3 pa-0 pl-3">OPEN</v-col>
      <v-col
        class="col-3 pa-0 white--text text-right"
        :class="{
          increase: stock.open > stock.close,
          decrease: stock.open < stock.close
        }"
      >
        {{ stock.open | numeral("0,0.00") }}</v-col
      >
    </v-row>
    <v-row class="ma-0 row-2">
      <v-col class="col-3 pa-0 pl-3">LOW</v-col>
      <v-col
        class="col-3 pa-0 white--text text-right"
        :class="{
          increase: stock.low > stock.close,
          decrease: stock.low < stock.close
        }"
        >{{ stock.low | numeral("0,0.00") }}</v-col
      >
      <v-col class="col-3 pa-0 pl-3">HIGH</v-col>
      <v-col
        class="col-3 pa-0 white--text text-right"
        :class="{
          increase: stock.high > stock.close,
          decrease: stock.high < stock.close
        }"
        >{{ stock.high | numeral("0,0.00") }}</v-col
      >
    </v-row>
    <v-row class="ma-0 row-3">
      <v-col class="col-3 pa-0 pl-3">52WKLOW</v-col>
      <v-col
        class="col-3 pa-0 white--text text-right"
        :class="{
          increase: stock.weekyearlow > stock.last,
          decrease: stock.weekyearlow < stock.last
        }"
        >{{ stock.weekyearlow | numeral("0,0.00") }}</v-col
      >
      <v-col class="col-3 pa-0 pl-3">52WKHIGH</v-col>
      <v-col
        class="col-3 pa-0 white--text text-right"
        :class="{
          increase: stock.weekyearhigh > stock.last,
          decrease: stock.weekyearhigh < stock.last
        }"
        >{{ stock.weekyearhigh | numeral("0,0.00") }}</v-col
      >
    </v-row>
    <v-row class="ma-0 row-4">
      <v-col class="col-3 pa-0 pl-3">VOLUME</v-col>
      <v-col class="col-3 pa-0 white--text text-right text-uppercase">{{
        stock.volume | numeral("0.000a")
      }}</v-col>
      <v-col class="col-3 pa-0 pl-3">VALUE</v-col>
      <v-col class="col-3 pa-0 white--text text-right text-uppercase">{{
        stock.value | numeral("0.000a")
      }}</v-col>
    </v-row>
    <v-row class="ma-0 row-5">
      <v-col class="col-3 pa-0 pl-3">TRADES</v-col>
      <v-col class="col-3 pa-0 white--text text-right">{{
        stock.trades | numeral("0,0")
      }}</v-col>
      <v-col class="col-3 pa-0 pl-3">AVERAGE</v-col>
      <v-col
        class="col-3 pa-0 white--text text-right"
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
      textcolor: "blue"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock"
    }),
    textSize() {
      return this.$vssWidth > 1530 ? "caption" : "overline";
    }
  }
};
</script>

<style scoped>
.template {
  font-size: xx-small !important;
}
.row {
  line-height: 1.6 !important;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
@media (max-width: 1800px) {
  .template {
    font-size: calc(9px + 0.1vw) !important;
  }
}
@media (max-width: 1280px) {
  .template {
    font-size: calc(10px - 0.1vw) !important;
  }
}
</style>
