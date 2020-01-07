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
      bidask: "chart/bidask",
      favicon: "global/favicon"
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
    tickSoundFavicon: function(change) {
      //console.log("tickSoundFavicon");
      //console.log(change);

      const beepSound = new Audio("/audio/vk_notification.mp3");

      //   if (change > 0) {
      //     this.$store.commit("global/SET_FAVICON", "/favicon/arrow_up.ico");
      //   } else if (change < 0) {
      //     this.$store.commit("global/SET_FAVICON", "/favicon/arrow_down.ico");
      //   } else {
      //     this.$store.commit("global/SET_FAVICON", "/_favicon.ico");
      //   }

      beepSound.play();

      //   setTimeout(
      //     function() {
      //       //console.log("set time out");
      //       this.$store.commit("global/SET_FAVICON", "/_favicon.ico");
      //     }.bind(this),
      //     2000
      //   );
    },
    initStock: async function(symid) {
      this.loading = "#03dac5";
      try {
        const response = await this.$api.chart.stocks.history({
          "symbol-id": symid
        });
        this.data = response.data;
        this.setIndex(parseInt(this.data.value) > 0 ? false : true);
        this.setStock(this.data);
        this.setMarketCode(this.data.market_code);
      } catch (error) {
        //console.log('error dito');
        //console.log(error);
      }
      this.loading = null;
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

          // create a tick sound and favicon for every update in sse
          this.tickSoundFavicon(data.chg);
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

      this.sse.addEventListener(
        "bidask",
        function(event) {
          if (
            this.bidask.asks !== undefined &&
            this.bidask.bids !== undefined
          ) {
            const data = JSON.parse(event.data);

            if (data.ov == "B") {
              // bid
              const bids = this.updateBidAndAsks(this.bidask.bids, data);
              this.$store.commit(
                "chart/SET_BIDS",
                bids.sort(this.sortBy("price", "desc"))
              );
            } else if (data.ov == "S") {
              // ask
              //              if (data.ty != "a" || data.ty != "au") return;
              const asks = this.updateBidAndAsks(this.bidask.asks, data);
              this.$store.commit(
                "chart/SET_ASKS",
                asks.sort(this.sortBy("price", "desc"))
              );
            }
            // console.log(this.bidask);
          }
        }.bind(this)
      );
    },

    // For Bid and Asks
    updateBidAndAsks: function(list, data) {
      const index = list.findIndex(item => item.id === data.id);
      //   console.log("update bidask", data.ty);
      //   console.log(index);
      //   console.log(list);
      //   console.log(data);
      if (data.ty == "a") {
        if (typeof list[index] !== "undefined") {
          list[index].count++;
          list[index].volume += data.vol;
        } else {
          list.push(this.addToBidAskList(data.id, data));
        }
      } else if (data.ty == "au") {
        // decrement data.id's count by 1, if count is zero, remove from list
        list = this.updateBidAskCount(list, index, -1, data.vol);
        // add new data.idn to list
        list.push(this.addToBidAskList(data.idn, data));
      } else if (data.ty == "d") {
        // decrement data.id's count by 1, if count is zero, remove from list
        list = this.updateBidAskCount(list, index, -1, data.vol);
      } else if (data.ty == "u") {
        // same as au but drop the data.id entirely and add data.idn to list
        if (typeof list[index] !== "undefined") {
          list = list.filter((item, key) => key !== index);
        }
        list.push(this.addToBidAskList(data.idn, data));
      } else if (data.ty == "fd") {
        // decrement data.id's count by 1, if count is zero, remove from list
        list = this.updateBidAskCount(list, index, -1, 0);

        list = this.updateBidAskVolume(list, index, -1 * data.vol);
      } else if (data.ty == "pd") {
        list = this.updateBidAskVolume(list, index, data.vol);
      }

      const limit = Math.max(this.bidask.asks.length, this.bidask.bids.length);
      this.$store.commit("chart/SET_BIDASK_LIMIT", limit);
      return list;
    },
    updateBidAskCount: function(list, id, increment, volume) {
      if (typeof list[id] !== "undefined") {
        list[id].count += increment;
        list[id].volume += volume * increment;
        // if count less than 0, remove from the list
        if (list[id].count <= 0) {
          list = list.filter((item, key) => key !== id);
        }
      }
      return list;
    },
    updateBidAskVolume: function(list, id, increment) {
      if (typeof list[id] !== "undefined") {
        list[id].volume += increment;
      }
      return list;
    },
    addToBidAskList: function(id, data) {
      return {
        count: 1,
        id: id,
        price: data.p,
        volume: data.vol
      };
    },
    sortBy: function(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
  },
  watch: {
    symbolid(symid, oldsymid) {
      //console.log("change");
      //console.log(symid);
      this.initStock(symid);
      this.initSSE(symid);
    }
  },
  beforeDestroy() {
    //console.log("before destroy");
  },
  created() {
    this.setSymbolID("29235364749115392"); // PSE
    // if (this.$route.params.id) {
    //   this.$api.chart.stocks
    //     .list({
    //       exchange: "PSE",
    //       symbol: this.$route.params.id.toUpperCase()
    //     })
    //     .then(response => {
    //       if (parseInt(response.data.id) > 0) {
    //         this.setSymbolID(response.data.id_str);
    //       }
    //     });
    // } else {
    //   this.setSymbolID("29235364749115392"); // PSE
    // }
  },
  mounted() {
    //this.$store.commit("global/SET_FAVICON", "/favicon/arrow_up.ico");
    console.log("open all stock sse");
    //      "http://localhost:8021/sse/market-data/pse/all"
    //"https://stream-api.arbitrage.ph/sse/market-data/pse/all"
    const evtSource = new EventSource(
      "https://stream-api.arbitrage.ph/sse/market-data/pse/all"
    );

    evtSource.onopen = function() {
      // console.log("open sse");
    };

    evtSource.onerror = function(err) {
      // console.log("open err");
      //console.log(err);
    };

    evtSource.addEventListener("all", function(e) {
      console.log("all");
      console.log(e);
    });

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
