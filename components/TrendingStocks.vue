<template>
  <v-card
    class="mb-3 trendingStocks__card"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
    :loading="loader"
  >
    <div class="pa-0 pl-2">
      <div class="body-2 font-weight-black pb-2 pl-2">Trending Stocks</div>
      <v-divider></v-divider>
      <v-list v-if="hasValues" class="mt-1 transparent">
        <v-list-item class="px-0">
          <v-list-item-content class="pt-0">
            <div v-for="(item, index) in trendingStocks" :key="index" class="pb-3">
              <v-list-item-title class="caption d-flex justify-space-between">
                <span>{{ stockCode[index] }}</span>
                <span v-if="item.last != ''" :id="stockCode[index]">₱{{ item.last }}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="overline d-flex justify-space-between">
                <span v-if="typeof item.description != 'undefined'" class="tStocks--description">
                  {{
                  item.description
                  }}
                </span>
                <span
                  v-if="item.change != ''"
                  class="font-weight-black"
                  :class="
                    item.change > 0
                      ? 'success--text'
                      : 'error--text'
                  "
                >{{ item.change }}%</span>
              </v-list-item-subtitle>
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
        { last: "", change: "", stock_id: "", description: "" },
        { last: "", change: "", stock_id: "", description: "" },
        { last: "", change: "", stock_id: "", description: "" },
        { last: "", change: "", stock_id: "", description: "" },
        { last: "", change: "", stock_id: "", description: "" }
      ],
      stockCode: [],
      hasValues: false,
      loader: true
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      sseInfo: "social/sseInfo"
    })
  },
  watch: {
    /**
     * Watching sseInfo, fires when there are new trades or social stock trend
     * posted on the social wall
     *
     * @param   {object}  data  handles the new data incoming
     *
     * @return  {object}        returns new data object
     */
    sseInfo(data) {
      this.realTime(data);
    }
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
      this.$api.social.trendingStocks.index(params).then(response => {
        if (response.success) {
          this.tStocksObject = response;
          this.hasValues = true;
          this.getTrendingStocksValues();
        }
      });
    },
    /**
     * Execute function if there are sse data incoming from social stock trend or trades
     * Find the particular stock if it is the same stock with the incoming data
     * then update its values such as: current price & price percentage
     * Add update effect together with the array index
     *
     * @param   {object}  data  handles new data object
     *
     * @return  {number}        returns number values and stock id
     */
    realTime(data) {
      for (let index = 0; index < this.trendingStocks.length; index++) {
        if (this.trendingStocks[index].stock_id == data.sym_id) {
          this.trendingStocks[index].last = data.c;
          this.trendingStocks[index].change = data.chgpc.toFixed(2);
          this.updateEffect(this.stockCode[index]);
        }
      }
    },
    /**
     * Assigning background style to updated stock with duration of 800ms
     *
     * @return  {string}  returns background color code string
     */
    updateEffect: dom => {
      const item = document.getElementById(dom);
      if (item == null) return;
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(function() {
        item.style.background = "";
      }, 800);
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
        this.trendingStocks[i].description = this.tStocksObject.data.stocks[
          i
        ].description;
        this.stockCode[i] = x[1];
        const params = {
          "symbol-id": this.tStocksObject.data.stocks[i].stock_id
        };
        this.$api.chart.stocks.history(params).then(response => {
          if (response.success) {
            this.trendingStocks[i].last = response.data.last;
            this.trendingStocks[
              i
            ].change = response.data.changepercentage.toFixed(2);
            this.trendingStocks[i].stock_id = this.tStocksObject.data.stocks[
              i
            ].stock_id;
            this.loader = false;
          }
        });
      }
    }
  }
};
</script>
<style>
.tStocks__card {
  position: relative;
  bottom: 3px;
}
.tStocks--description {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 120px;
}
</style>
