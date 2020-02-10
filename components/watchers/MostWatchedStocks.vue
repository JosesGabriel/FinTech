<template>
  <v-card
    class="transparent__bg"
    :dark="lightSwitch == 0 ? false : true"
    :loading="loader"
    flat
  >
    <v-card-title class="body-2 font-weight-bold text-left pa-0"
      >Most Watched Stocks</v-card-title
    >
    <v-divider />
    <v-divider />
    <div
      v-for="n in mWatchedStocksObject.length"
      :key="n"
      class="d-flex justify-space-between pa-0 overline no-transform mt-1 mb-2"
    >
      <div>
        <span class="caption font-weight-bold">{{
          mWatchedStocksObject[n - 1].stock_symbol
        }}</span
        ><br />
        <div class="d-flex">
          <span class="mWatched--description">{{
            mWatchedStocksObject[n - 1].stock_name
          }}</span>
        </div>
      </div>
      <div>
        <span v-if="!loader"
          >{{ mWatchedStocksObject[n - 1].stock_count }} Following</span
        >
        <br />
        <v-btn
          :class="!mWatchedStocksObject[n - 1].user_follows ? '' : 'v-hidden'"
          x-small
          rounded
          color="success"
          class="no-transform black--text addToWatchlist__btn"
          @click="addToWatchlist(mWatchedStocksObject[n - 1].stock_id)"
          >+ Watchlist</v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loader: false,
      mWatchedStocksObject: [
        { stock_symbol: "", stock_name: "", stock_count: "" },
        { stock_symbol: "", stock_name: "", stock_count: "" },
        { stock_symbol: "", stock_name: "", stock_count: "" },
        { stock_symbol: "", stock_name: "", stock_count: "" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    this.getMostWatchedStocks();
  },
  methods: {
    /**
     * gets current most watched stocks
     *
     * @return
     */
    getMostWatchedStocks() {
      this.loader = "success";
      const params = {
        count: 4
      };
      this.$api.watchlist.mostwatched.index(params).then(
        function(result) {
          this.mWatchedStocksObject = result.data.stocks;
          this.loader = false;
        }.bind(this)
      );
    },
    addToWatchlist(id) {
      this.$emit("add-watchlist-data", id);
    }
  }
};
</script>

<style>
.mWatched--description {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 160px;
}
.addToWatchlist__btn {
  white-space: unset;
}
.v-hidden {
  visibility: hidden;
}
</style>
