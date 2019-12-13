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
      sse: null,
      data: {},
      loading: "#03dac5"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      symbolid: "chart/symbolid",
      index: "chart/index",
      market_code: "chart/market_code",
      lightSwitch: "global/getLightSwitch"
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
      setTicker: "chart/setTicker"
    }),
    initStock: function(symid) {
      this.loading = "#03dac5";
      const params = {
        "symbol-id": symid
      };
      this.$api.chart.stocks.history(params).then(response => {
        this.data = response.data;
        this.setIndex(parseInt(this.data.value) > 0 ? false : true);
        console.log("sidebar data");
        console.log(this.data);
        this.setStock(this.data);
        this.setMarketCode(this.data.market_code);
        this.loading = null;
      });
    },
    initSSE: function(symid) {
      if (this.sse !== null) {
        this.sse.close();
      }

      this.sse = new EventSource(
        "https://stream-api.arbitrage.ph/sse?stream=market-data"
      );
      //      this.sse = new EventSource("localhost/8021/sse?stream=market-data");

      this.sse.onopen = function() {
        console.log("open sse");
      };

      this.sse.onerror = function(err) {
        console.log("error");
        console.log(err);
      };

      const that = this;
      this.sse.addEventListener(`M-D.INFO.${symid}`, function(e) {
        const data = JSON.parse(e.data);
        console.log("sse");
        console.log(data);

        that.$store.commit("chart/SET_STOCK_OBJ", { last: data.c });
        that.$store.commit("chart/SET_STOCK_OBJ", { volume: data.vol });
        that.$store.commit("chart/SET_STOCK_OBJ", { value: data.val });
        that.$store.commit("chart/SET_STOCK_OBJ", { change: data.chg });
        that.$store.commit("chart/SET_STOCK_OBJ", {
          changepercentage: data.chgpc
        });
        that.$store.commit("chart/SET_STOCK_OBJ", { high: data.h });
        that.$store.commit("chart/SET_STOCK_OBJ", { low: data.l });
        that.$store.commit("chart/SET_STOCK_OBJ", { open: data.o });
        that.$store.commit("chart/SET_STOCK_OBJ", {
          average: data.val / data.vol
        });
      });
    }
  },
  watch: {
    symbolid(symid, oldsymid) {
      //console.log("sidebar watch");
      console.log(symid);
      this.initStock(symid);
      this.initSSE(symid);
    }
  },
  created() {
    //this.setSymbolID("29235363595681792");
    this.setSymbolID("29235364749115392");
    //this.setTicker(false);
  },
  mounted() {
    // all stock
    // this.$api.chart.stocks.list().then(response => {
    // console.log(response);
    // });
  }
};
</script>

<style>
/* light / dark mode */
.theme--dark.v-data-table .v-data-table-header th.sortable {
  background: #00121e;
  font-size: 11px;
}
.theme--light.v-data-table .v-data-table-header th.sortable {
  background: #f2f2f2;
  font-size: 11px;
}

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
  color: #b6b6b6;
}

.theme--light.v-data-table {
  color: #535358;
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
