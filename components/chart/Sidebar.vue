<template>
  <v-content :style="{ background: cardbackground }">
    <v-card
      :loading="loading"
      style="height:200px"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      elevation="2"
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
      data: {},
      loading: "#03dac5"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      symbolid: "chart/symbolid",
      index: "chart/index",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setStock: "chart/setStock",
      setSymbolID: "chart/setSymbolID",
      setIndex: "chart/setIndex",
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
        //  console.log(this.data);
        this.setStock(this.data);
        this.loading = null;
      });
    }
  },
  watch: {
    symbolid(symid) {
      //console.log(symid);
      //console.log(symid);
      this.initStock(symid);
    },
    index(value) {
      //console.log("index");
      //console.log(value);
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
  font-size: 10px;
}
</style>
