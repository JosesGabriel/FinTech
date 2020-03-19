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
            <div v-for="n in 5" :key="n" class="pb-3">
              <v-list-item-title class="caption d-flex justify-space-between"
                ><span>{{ stockCode[n - 1] }}</span
                ><span v-if="trendingStocks" :id="stockCode[n - 1]"
                  >₱{{ trendingStocks[n - 1].last }}</span
                ></v-list-item-title
              >
              <v-list-item-subtitle
                class="overline d-flex justify-space-between"
                ><span v-if="tStocksObject.data" class="tStocks--description">{{
                  typeof tStocksObject.data.stocks.description != "undefined"
                    ? tStocksObject.data.stocks[n - 1].description
                    : ""
                }}</span
                ><span
                  v-if="trendingStocks"
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
        { last: "", change: "", stock_id: "" },
        { last: "", change: "", stock_id: "" },
        { last: "", change: "", stock_id: "" },
        { last: "", change: "", stock_id: "" },
        { last: "", change: "", stock_id: "" }
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
    sseInfo: function(data) {
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
      this.$api.social.trendingStocks.index(params).then(
        function(result) {
          if (result.success) {
            this.tStocksObject = result;
            this.hasValues = true;
            this.getTrendingStocksValues();
          }
        }.bind(this)
      );
    },
    realTime(data) {
      for (let index = 0; index < this.trendingStocks.length; index++) {
        if (this.trendingStocks[index].stock_id == data.sym_id) {
          this.trendingStocks[index].last = data.c;
          this.trendingStocks[index].change = data.chgpc.toFixed(2);
          this.updateEffect(this.stockCode[index]);
        }
      }
    },
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
            this.trendingStocks[i].stock_id = this.tStocksObject.data.stocks[
              i
            ].stock_id;
            this.loader = false;
          }.bind(this)
        );
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
