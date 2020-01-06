<template>
  <v-container class="pt-6">
    <v-row>
      <ChartController />
    </v-row>
    <v-row>
      <BuyAndSell />
    </v-row>
  </v-container>
</template>
<style>
.numOfShares__textfield {
  transform: scale(0.7);
}
</style>
<script>
import BuyAndSell from "./BuyAndSell";
import ChartController from "./ChartController";
export default {
  components: {
    BuyAndSell,
    ChartController
  }
};
</script>
