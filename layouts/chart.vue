<template>
  <!-- hello world -->
  <v-app id="chart_body" class="gameGlobal">
    <Header />
    <div class="spacer__content"></div>
    <div class="content__main">
      <div class="content__left">
        <!-- main -->
        <v-row no-gutters>
          <v-col class="col-12">
            <v-slide-y-transition>
              <v-content v-show="ticker" class="ticker__container">
                <Ticker />
              </v-content>
            </v-slide-y-transition>
          </v-col>
        </v-row>

        <!-- chart -->
        <v-row no-gutters>
          <v-col class="col-12">
            <v-content class="chart__container">
              <nuxt />
            </v-content>
          </v-col>
        </v-row>

        <!-- table -->
        <v-row no-gutters>
          <v-col class="col-12">
            <v-slide-y-reverse-transition>
              <v-content
                v-show="table"
                class="table__container"
                :class="tableStyle"
              >
                <Table />
                <!-- <h3 align="center">Table</h3> -->
              </v-content>
            </v-slide-y-reverse-transition>
          </v-col>
        </v-row>
      </div>
      <div
        v-show="sidebar"
        transition="slide-y-reverse-transition"
        class="content__right"
      >
        <!-- sidebar -->
        <Sidebar />
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "~/components/Header";
import Sidebar from "~/components/chart/Sidebar";
import Table from "~/components/chart/Table";
import Ticker from "~/components/chart/Ticker";

export default {
  components: {
    Header,
    Sidebar,
    Table,
    Ticker
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      table: "chart/getTable",
      sidebar: "chart/getSidebar",
      maximize: "chart/getTableMaximize",
      fullscreen: "chart/getTableFullscreen"
    }),
    tableStyle: function() {
      return {
        maximizeStyle: this.maximize,
        fullscreen_tickeropen: this.ticker && this.fullscreen,
        fullscreen_tickerclose: !this.ticker && this.fullscreen
      };
    },
    disableTable: function() {
      return this.maximize || this.fullscreen;
    }
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setTable: "chart/setTable",
      setSidebar: "chart/setSidebar",
      setTableMaximize: "chart/setTableMaximize",
      setTableFullscreen: "chart/setTableFullscreen"
    }),
    toggleTicker: function() {
      const ticker = !this.ticker;
      this.setTicker(ticker);
      this.$bus.$emit("adjustChartView");
    },
    toggleTable: function() {
      const table = !this.table;
      this.setTable(table);
      this.$bus.$emit("adjustChartView");
    },
    maximizeTable: function() {
      // table must be visible
      if (!this.table) return;
      this.setTableFullscreen(false);

      const maximize = !this.maximize;
      this.setTableMaximize(maximize);
      this.$bus.$emit("adjustChartView");
    },
    fullscreenTable: function() {
      // table must be visible
      if (!this.table) return;
      this.setTableMaximize(false);

      const fullscreen = !this.fullscreen;
      this.setTableFullscreen(fullscreen);
      this.$bus.$emit("adjustChartView");
    },
    toggleSidebar: function() {
      const sidebar = !this.sidebar;
      this.setSidebar(sidebar);
    }
  },
  mounted() {
    //console.log('mounted');
    //this.setTickerShow(false);
  }
};
</script>

<style>
.gameGlobal ::-webkit-scrollbar {
  width: 5px;
}
.gameGlobal ::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}
.gameGlobal ::-webkit-scrollbar-thumb {
  background: #1de9b6;
  border-radius: 20px;
}
.gameGlobal ::-webkit-scrollbar-thumb:hover {
  background: #1de9b6;
}
#chart_body {
  background: #00121e !important;
  font-family: "Karla", sans-serif !important;
}
#button_adjustview {
  position: absolute;
  width: 500px;
  top: 57px;
  left: 10px;
  z-index: 9;
}
.chart__container {
}
.sidebar__container {
  background: #00121e;
}
.ticker__container {
  height: 50px;
  color: #fff;
  background: #00121e;
}
.table__container {
  /* margin-top: auto;
  margin-bottom: auto; */
  height: 30px;
  color: #fff;
  background: #00121e;
}
.maximizeStyle {
  height: 300px;
}
.fullscreen_tickeropen {
  height: calc(100vh - 100px);
}
.fullscreen_tickerclose {
  height: calc(100vh - 50px);
}
.spacer__content {
  height: 52px;
}
.content__main {
  display: flex;
  height: calc(100vh - 52px);
}
.content__left {
  flex: 1;
}
.content__right {
  flex: 0 0 250px;
}
</style>
