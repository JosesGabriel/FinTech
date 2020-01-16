<template>
  <v-content :style="{ background: cardbackground }">
    <v-card
      :loading="headline_loading"
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
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      lightSwitch: "global/getLightSwitch",
      headline_loading: "chart/headline_loading"
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
      setHeadlineLoading: "chart/setHeadlineLoading"
    }),
    initStock: async function(symid) {
      this.setHeadlineLoading("#03dac5");
      try {
        const response = await this.$api.chart.stocks.history({
          "symbol-id": symid
        });
        const data = response.data;
        this.setIndex(parseInt(data.value) > 0 ? false : true);
        this.setStock(data);
        this.setMarketCode(data.market_code);
        this.setHeadlineLoading(false);

        if (data.change > 0) {
          this.$store.commit(
            "global/SET_FAVICON",
            `${process.env.APP_URL}/favicon/up.ico?v=${Math.round(
              Math.random() * 999
            )}`
          );
        } else if (data.change < 0) {
          this.$store.commit(
            "global/SET_FAVICON",
            `${process.env.APP_URL}/favicon/down.ico?v=${Math.round(
              Math.random() * 999
            )}`
          );
        } else {
          this.$store.commit(
            "global/SET_FAVICON",
            `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
              Math.random() * 999
            )}`
          );
        }
      } catch (error) {
        //console.log(error);
      }
    }
  },
  watch: {
    symbolid(symid, oldsymid) {
      this.initStock(symid);
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
    this.initStock(this.symbolid);
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
