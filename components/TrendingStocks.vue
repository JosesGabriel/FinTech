<template>
  <v-card
    class="mb-3"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
    :loading="loader"
  >
    <div class="pa-0 pl-2">
      <div class="body-2 font-weight-black">Trending Stocks</div>
      <v-divider></v-divider>
      <v-list class="mt-1 transparent">
        <v-list-item class="px-0">
          <v-list-item-content class="pt-0">
            <div v-for="n in trendingStocks.length" :key="n" class="pb-3">
              <v-list-item-title class="caption d-flex justify-space-between"
                ><span>{{ stockCode[n - 1] }}</span
                ><span v-if="tStocksObject"
                  >₱{{ trendingStocks[n - 1].last }}</span
                ></v-list-item-title
              >
              <v-list-item-subtitle
                class="overline d-flex justify-space-between"
                ><span class="tStocks--description">{{
                  tStocksObject
                    ? tStocksObject.data.stocks[n - 1].description
                    : ""
                }}</span
                ><span
                  v-if="tStocksObject"
                  class="font-weight-black"
                  :class="
                    trendingStocks[n - 1].change > 0
                      ? 'success--text'
                      : 'error--text'
                  "
                  >{{ trendingStocks[n - 1].change }}%</span
                ></v-list-item-subtitle
              >
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      tStocksObject: "",
      trendingStocks: [
        { last: "", change: "" },
        { last: "", change: "" },
        { last: "", change: "" },
        { last: "", change: "" },
        { last: "", change: "" }
      ],
      stockCode: ["", "", "", "", ""],
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    this.getTrendingStocks();
  },
  methods: {
    /**
     * gets current trending stocks
     *
     * @return
     */
    getTrendingStocks() {
      this.loader = "success";
      const params = {
        count: 5
      };
      this.$api.social.trendingStocks.index(params).then(
        function(result) {
          this.tStocksObject = result;
          this.getTrendingStocksValues();
        }.bind(this)
      );
    },
    /**
     * gets last price and change percentage of those stocks
     *
     * @return
     */
    getTrendingStocksValues() {
      for (let i = 0; i < this.tStocksObject.data.stocks.length; i++) {
        //removes index from string because it returns PSE:ABA
        let x = this.tStocksObject.data.stocks[i].market_code.split(":");
        this.stockCode[i] = x[1];

        const params = {
          "symbol-id": this.tStocksObject.data.stocks[i].stock_id
        };
        this.$api.chart.stocks.history(params).then(
          function(result) {
            this.trendingStocks[i].last = result.data.last;
            this.trendingStocks[
              i
            ].change = result.data.changepercentage.toFixed(2);
            this.loader = false;
          }.bind(this)
        );
      }
    }
  }
};
</script>
<style>
.tStocks--description {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 120px;
}
</style>
