<template>
  <v-card
    class="mb-3"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
    :loading="watchCardLoading"
  >
    <div class="pa-0 pl-2">
      <div class="body-2 font-weight-black pb-2 pl-2">Watchlist</div>
      <v-divider></v-divider>
      <v-list class="transparent mt-1">
        <v-list-item v-for="(item, index) in stockData" :key="index" class="px-0">
          <v-list-item-content class="pt-0">
            <v-list-item-title class="caption d-flex justify-space-between">
              <span>{{ item ? item.stockSym : "" }}</span>
              <span>₱{{ item ? item.currentPrice : "" }}</span>
            </v-list-item-title>
            <v-list-item-subtitle class="overline d-flex justify-space-between">
              <span
                :id="item.stockSym"
                class="stockSymbol__span tStocks--description"
              >
                {{
                item ? item.description : ""
                }}
              </span>
              <span>
                <span>
                  <v-icon
                    v-show="item.change > 0.0"
                    class="increase__value--number caption"
                  >mdi-chevron-up</v-icon>
                  <v-icon
                    v-show="item.change < 0.0"
                    class="decrease__value--number caption"
                  >mdi-chevron-down</v-icon>
                </span>
                <span
                  class="font-weight-black"
                  :class="
                    item.change > 0
                      ? 'success--text'
                      : item.change < 0
                      ? 'error--text'
                      : 'watchlistCard__text--gray'
                  "
                >{{ item ? item.percentage : "" }} ({{ item ? item.change : "" }}%)</span>
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <router-link
          v-if="watchListObject.length == 0"
          class="d-block mWatchlist__text--noData px-5 success--text overline no-transform"
          to="/watchlist"
        >Add symbols to your watchlist.</router-link>
        <router-link
          v-if="watchListObject.length != 0"
          to="/watchlist"
          class="caption no-transform"
          style="color: #546E74"
        >Show more</router-link>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      stockData: [],
      watchCardLoading: "success",
      watchListObject: "",
      isLightMode: 0
    };
  },
  computed: {
    ...mapGetters({
      renderChartKey: "watchers/getRenderChartKey",
      lightSwitch: "global/getLightSwitch",
      sseInfo: "social/sseInfo"
    })
  },
  watch: {
    /**
     * Watches vuex value. When this value updates, that means a user has added, edited or deleted a watched stock.
     * Execute GET again to update user watchlist with new values.
     *
     * @return
     */
    renderChartKey() {
      this.watchCardMount();
    }
  },
  mounted() {
    this.watchCardMount();
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    /**
     * Gets current users watched stocks
     *
     * @return
     */
    watchCardMount() {
      this.$api.watchlist.watchlists
        .index()
        .then(response => {
          this.watchListObject = response.data.watchlist;
          //If watchlist is more than 5, pop excess data from array
          if (this.watchListObject.length == 0) {
            this.watchCardLoading = false;
          }
          if (this.watchListObject.length > 5) {
            let popAmount = this.watchListObject.length - 5;
            for (let i = 0; i < popAmount; i++) this.watchListObject.pop();
          }
          for (let i = 0; i < this.watchListObject.length; i++) {
            this.stockData.push({
              stockSym: "",
              data: [],
              currentPrice: "",
              change: "",
              percentage: "",
              description: ""
            });
            this.stockData[i].description = this.watchListObject[i].description
            this.stockData[i].stockSym = this.watchListObject[i].symbol

            // GET Current Price + Current Change from Stock History API
            const params3 = {
              "symbol-id": this.watchListObject[i].stock_id
            };
            this.$api.chart.stocks.history(params3).then(
              function(result) {
                this.stockData[i].currentPrice = result.data.last;
                this.stockData[i].change = result.data.changepercentage.toFixed(
                  2
                );
                this.stockData[i].percentage = result.data.change.toFixed(2);
              }.bind(this)
            );
            this.watchCardLoading = false;
          }
        })
        .catch(error => {
          if (error.response.status == 404) {
            this.watchCardLoading = false;
          }
        });
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
    }
  }
};
</script>

<style scoped>
.mWatchlist__text--noData {
  padding-top: 45px;
  padding-bottom: 45px;
}
.stockSymbol__span {
  white-space: nowrap;
}
.increase__value--number {
  color: #03dac5 !important;
}
.decrease__value--number {
  color: #f44336 !important;
}
</style>
