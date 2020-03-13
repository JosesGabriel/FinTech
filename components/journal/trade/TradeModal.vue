<template>
  <v-dialog v-model="show" max-width="330px">
    <v-card :dark="lightSwitch == true">
      <v-card-title>Trade</v-card-title>

      <v-container>
        <v-tabs v-model="tab" background-color="transparent" color="success" grow>
          <v-tab v-for="item in items" :key="item" class="text-capitalize">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <Buy :stocklist="stockList.data" :portfolioList="userPortfolioReal" @clicked="show = false" />
          </v-tab-item>
          <v-tab-item>
            <Sell :stocklist="openPosition" @clicked="show = false" />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Buy from "~/components/journal/trade/child/Buy";
import Sell from "~/components/journal/trade/child/Sell";

export default {
  components: {
    Buy,
    Sell
  },
  props: ["visible"],
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      stockList: "global/getStockList",
      userPortfolio: "journal/getUserPortfolio",
      openPosition: "journal/getOpenPosition"
    }),
    /**
     * filter array by portfolio type real
     *
     * @return  {Array}  returns filtered array by type real
     */
    userPortfolioReal() {
      let portfolio = this.userPortfolio.filter(x => {
        return x.type == "real";
      });
      return portfolio;
    },
    show: {
      /**
       * get data from props this.visible
       */
      get() {
        return this.visible;
      },
      /**
       * once close set data back to props
       */
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      tab: null,
      items: ["Buy", "Sell"]
    };
  }
};
</script>