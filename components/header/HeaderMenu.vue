<template>
  <div>
    <v-card elevation="4">
      <v-list class="pa-0 header__menu" dense>
        <v-list-item-group>
          <v-list-item
            @click.stop="showBuySellCalculator = !showBuySellCalculator"
          >
            <v-list-item-content>
              <v-list-item-title class="body-2"
                >Buy/Sell Calculator</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="showVARCalculator = !showVARCalculator">
            <v-list-item-content>
              <v-list-item-title class="body-2"
                >VAR Calculator</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click.stop="
              showAveragePriceCalculator = !showAveragePriceCalculator
            "
          >
            <v-list-item-content>
              <v-list-item-title class="body-2"
                >Average Price Calculator</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-dialog v-model="showBuySellCalculator" width="500">
      <BuySellCalculator
    /></v-dialog>
    <v-dialog v-model="showAveragePriceCalculator" width="320">
      <AveragePriceCalculator
    /></v-dialog>
    <v-dialog v-model="showVARCalculator" width="320">
      <VARCalculator
    /></v-dialog>
  </div>
</template>
<script>
import BuySellCalculator from "~/components/calculators/BuySellCalculator";
import AveragePriceCalculator from "~/components/calculators/AveragePriceCalculator";
import VARCalculator from "~/components/calculators/VARCalculator";
export default {
  components: {
    BuySellCalculator,
    AveragePriceCalculator,
    VARCalculator
  },
  data() {
    return {
      showBuySellCalculator: false,
      showAveragePriceCalculator: false,
      showVARCalculator: false
    };
  },
  methods: {}
};
</script>
<style>
.header__menu.theme--dark:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-bottom: 10px solid #1f2f39;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.header__menu.theme--light:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-bottom: 10px solid rgba(0, 0, 0, 0.12);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.header__menu.theme--light:after {
  content: "";
  position: absolute;
  top: -10.5px;
  right: 11px;
  border-bottom: 10px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.header__menu.theme--dark:after {
  content: "";
  position: absolute;
  top: -10.5px;
  right: 11px;
  border-bottom: 10px solid #00121e;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
</style>
