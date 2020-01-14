<template>
  <v-card
    class="mb-3"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
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
                ><span
                  >₱{{ trendingStocks[n - 1].last }}</span
                ></v-list-item-title
              >
              <v-list-item-subtitle
                class="overline d-flex justify-space-between"
                ><span class="tStocks--description">{{
                  tStocksObject.data.stocks[n - 1].description
                }}</span
                ><span
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
      tStocksObject: JSON.parse(
        '{"data":{"stocks":[{"stock_id":"29235363339829248","market_code":"PSE:2GO","hits":"123","description":"2GO Group Inc"},{"stock_id":"29235363583098880","market_code":"PSE:ABA","hits":"123","description":"AbaCore Capital Holdings, Inc."},{"stock_id":"29235363113336832","market_code":"PSE:AC","hits":"123","description":"Atok-Big Wedge Co. Inc."},{"stock_id":"29235363679567872","market_code":"PSE:BDO","hits":"123","description":"BDO Unibank Inc."},{"stock_id":"29235363432103936","market_code":"PSE:BLOOM","hits":"123","description":"Bloomberry Resorts Corp."}]},"headers":[],"message":"Successfully fetched trending stocks.","meta":[],"status":200,"success":true}'
      ),
      trendingStocks: [
        { last: "", change: "" },
        { last: "", change: "" },
        { last: "", change: "" },
        { last: "", change: "" },
        { last: "", change: "" }
      ],
      stockCode: ["", "", "", "", ""]
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
     * gets current trending stocks and then finds the last price and change percentage of those stocks
     *
     * @return
     */
    getTrendingStocks() {
      for (let i = 0; i < this.tStocksObject.data.stocks.length; i++) {
        //removes index from string because it returns PSE:ABA
        let x = this.tStocksObject.data.stocks[i].market_code.split(":");
        this.stockCode[i] = x[1];
        //

        const params = {
          "symbol-id": this.tStocksObject.data.stocks[i].stock_id
        };
        this.$api.chart.stocks.history(params).then(
          function(result) {
            this.trendingStocks[i].last = result.data.last;
            this.trendingStocks[
              i
            ].change = result.data.changepercentage.toFixed(2);
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
