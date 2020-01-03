<template>
  <v-content :style="{ background: cardbackground }">
    <v-card
      :loading="loading"
      style="height:220px"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      flat
      tile
    >
      <Headline />
      <Status />
      <Sentiment />
    </v-card>
    <v-divider></v-divider>
    <Tabs />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Headline from "../chart/sidebar/Headline";
import Status from "../chart/sidebar/Status";
import Sentiment from "../chart/sidebar/Sentiment";
import Tabs from "../chart/sidebar/Tabs";

export default {
  name: "Sidebar",
  components: {
    Headline,
    Status,
    Sentiment,
    Tabs
  },
  data() {
    return {
      counter: 0,
      sse: null,
      data: {},
      loading: "#03dac5",
      temp_trades: [],
      ctr_trades: 0
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      symbolid: "chart/symbolid",
      index: "chart/index",
      market_code: "chart/market_code",
      trades: "chart/trades",
      lightSwitch: "global/getLightSwitch",
      bidask: "chart/bidask"
    }),
    cardbackground: function() {
      //return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e"; e3e9ed
      return this.lightSwitch == 0 ? "#e3e9ed" : "#172431";
    }
  },
  methods: {
    ...mapActions({
      setStock: "chart/setStock",
      setSymbolID: "chart/setSymbolID",
      setIndex: "chart/setIndex",
      setMarketCode: "chart/setMarketCode",
      setTicker: "chart/setTicker",
      setTrades: "chart/setTrades",
      setBidask: "chart/setBidask"
    }),
    initStock: function(symid) {
      this.loading = "#03dac5";
      const params = {
        "symbol-id": symid
      };
      this.$api.chart.stocks.history(params).then(response => {
        this.data = response.data;
        this.setIndex(parseInt(this.data.value) > 0 ? false : true);
        this.setStock(this.data);
        this.setMarketCode(this.data.market_code);
        this.loading = null;
      });
    },
    initSSE: function(symid) {
      if (this.sse !== null) {
        this.sse.close();
        this.counter = 0;
      }

      this.sse = new EventSource(
        "https://stream-api.arbitrage.ph/sse/market-data/pse/" + symid
      );

      //   this.sse = new EventSource(
      //     "http://localhost:8021/sse/market-data/pse/" + symid
      //   );

      this.sse.onopen = function() {
        // console.log("open sse");
      };

      this.sse.onerror = function(err) {
        // console.log("open err");
        //console.log(err);
      };

      this.sse.addEventListener(
        "info",
        function(e) {
          const data = JSON.parse(e.data);
          this.counter++;
          this.$store.commit("chart/SET_STOCK_OBJ", {
            trades: parseInt(this.stock.trades) + parseInt(this.counter)
          });

          if (parseFloat(this.stock.weekyearlow) > parseFloat(data.l)) {
            //console.log(this.stock.weekyearlow + " > " + data.l);
            this.$store.commit("chart/SET_STOCK_OBJ", { weekyearlow: data.l });
          }

          if (parseFloat(this.stock.weekyearhigh) < parseFloat(data.l)) {
            this.$store.commit("chart/SET_STOCK_OBJ", { weekyearhigh: data.h });
          }

          //this.$store.commit("chart/SET_STOCK_OBJ", { marketcap: data.c });

          this.$store.commit("chart/SET_STOCK_OBJ", { last: data.c });
          this.$store.commit("chart/SET_STOCK_OBJ", { volume: data.vol });
          this.$store.commit("chart/SET_STOCK_OBJ", { value: data.val });
          this.$store.commit("chart/SET_STOCK_OBJ", { change: data.chg });
          this.$store.commit("chart/SET_STOCK_OBJ", {
            changepercentage: data.chgpc
          });
          this.$store.commit("chart/SET_STOCK_OBJ", { high: data.h });
          this.$store.commit("chart/SET_STOCK_OBJ", { low: data.l });
          this.$store.commit("chart/SET_STOCK_OBJ", { open: data.o });
          this.$store.commit("chart/SET_STOCK_OBJ", {
            average: data.val / data.vol
          });

          // create a tick sound for every update in sse
          const beepSound = new Audio("/audio/vk_notification.mp3");
          beepSound.play();
        }.bind(this)
      );

      this.sse.addEventListener(
        "bidask",
        function(event) {
          // console.log("bidask");
          if (
            this.bidask.asks !== undefined &&
            this.bidask.bids !== undefined
          ) {
            const data = JSON.parse(event.data);
            //console.log(this.bidask.bids);
            if (data.ov == "B") {
              // bid
              //   $scope.bids = $scope.updateBidAndAsks($scope.bids, data);
              //   $scope.bids = $filter("orderBy")($scope.bids, "-price");
            } else if (data.ov == "S") {
              // ask
              //console.log("asks");
              const asks = this.updateBidAndAsks(this.bidask.asks, data);
              //console.log(asks);
            }
          }
        }.bind(this)
      );

      this.temp_trades = this.trades;
      this.sse.addEventListener(
        "trade",
        function(event) {
          const trades = JSON.parse(event.data);
          this.temp_trades.unshift({
            id: `${trades.t}_${this.ctr_trades++}`,
            id_str: String(`${trades.t}_${this.ctr_trades++}`),
            timestamp: trades.t,
            date: null,
            datetime: null,
            executed_price: trades.exp,
            executed_volume: trades.exvol,
            buyer: trades.b,
            seller: trades.s
          });

          if (this.trades.length !== undefined && this.trades.length > 0) {
            if (this.temp_trades.length > 99) {
              this.temp_trades.pop();
            }
            this.setTrades(this.temp_trades);
          }
        }.bind(this)
      );
    },
    // For Bid and Asks
    updateBidAndAsks: function(list, data) {
      const index = list.findIndex(function(item) {
        return item.id == data.id;
      });
      return index;
    }
  },
  watch: {
    symbolid(symid, oldsymid) {
      this.initStock(symid);
      this.initSSE(symid);
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$api.chart.stocks
        .list({
          exchange: "PSE",
          symbol: this.$route.params.id.toUpperCase()
        })
        .then(response => {
          if (parseInt(response.data.id) > 0) {
            this.setSymbolID(response.data.id_str);
          }
        });
    } else {
      this.setSymbolID("29235364749115392"); // PSE
    }
  },
  mounted() {
    //console.log(this.$route);
    /*this.$api.watchlist.watchlists
      .index()
      .then(response => {
        console.log("watchlist");
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      */
  }
};
</script>

<style>
/* light / dark mode */
/* .theme--dark.v-data-table .v-data-table-header th.sortable {
  background: #00121e;
  font-size: 11px;
} */
/* .theme--light.v-data-table .v-data-table-header th.sortable {
  background: #f2f2f2;
  font-size: 11px;
} */

.theme--dark.v-data-table.v-data-table--fixed-header thead th {
  background: #00121e;
  font-size: 11px;
  color: #fff;
}

.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: #f2f2f2;
  font-size: 11px;
  color: #000;
}

.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expand-row) {
  /* background: #142a46; */
  background-color: rgb(182, 182, 182, 0.2) !important;
}

.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expand-row) {
  /* background: #b6b6b6; */
  background-color: rgb(182, 182, 182, 0.2) !important;
}

.theme--dark.v-data-table {
  color: #e5e5e5;
}

.theme--light.v-data-table {
  color: #494949;
}

/* remove border */
.theme--dark.v-data-table.v-data-table--fixed-header thead th {
  box-shadow: none !important;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none !important;
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  box-shadow: none !important;
}
.theme--light.v-data-table thead tr:last-child th,
.theme--light.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none !important;
}

/* remove arrow sort */
.data_table-container i.v-icon.v-data-table-header__icon.mdi.mdi-arrow-up {
  display: none;
}

.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}

.v-data-table--dense th {
  height: 20px;
}
.v-data-table--dense td {
  font-size: 11px;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
.neutral {
  /* color: #e5e5e5 !important; */
}
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #f44336 !important;
}
.sub__title {
  width: 100%;
  height: 20px;
  padding: 0;
  padding-left: 10px;
  font-weight: bold;
  font-size: 11px;
  margin-bottom: 5px;
  margin-top: 6px;
}
</style>
