<template>
  <!-- hello world -->
  <v-app>
    <Header />
    <div class="spacer__content"></div>
    <v-row no-gutters>
      <v-col :class="showSidebar">
        <!-- ticker -->
        <v-row no-gutters>
          <v-col class="col-12">
            <v-slide-y-transition>
              <v-content v-show="ticker" class="ticker__container">
                <!-- <h1 align="center">Ticker</h1> -->
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
                <!-- <h1 align="center">Table</h1> -->
              </v-content>
            </v-slide-y-reverse-transition>
          </v-col>
        </v-row>

        <!-- toggle button -->
        <div id="button_adjustview">
          <v-btn color="pink" class="mr-1 d-none" dark @click="toggleTicker"
            >Ticker</v-btn
          >
          <v-btn
            color="orange d-none"
            :disabled="disableTable"
            class="mr-1 d-none"
            dark
            @click="toggleTable"
            >Table</v-btn
          >
          <v-btn
            :disabled="!table"
            color="orange d-none"
            class="mr-1"
            dark
            fab
            small
            @click="maximizeTable"
          >
            <v-icon>mdi-eject</v-icon>
          </v-btn>
          <v-btn
            :disabled="!table"
            color="orange d-none"
            class="mr-1"
            dark
            fab
            small
            @click="fullscreenTable"
          >
            <v-icon>mdi-fullscreen</v-icon>
          </v-btn>
          <v-btn color="blue" class="d-none" dark @click="toggleSidebar"
            >Sidebar</v-btn
          >
        </div>
      </v-col>

      <!-- sidebar -->
      <v-slide-x-transition>
        <v-col
          v-show="sidebar"
          transition="slide-y-reverse-transition"
          class="sidebar__container col-3"
        >
          <Sidebar />
        </v-col>
      </v-slide-x-transition>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "~/components/Header";
import Sidebar from "~/components/chart/Sidebar";
import Table from "~/components/chart/Table";

export default {
  components: {
    Header,
    Sidebar,
    Table
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
    showSidebar: function() {
      return this.sidebar ? "col-9" : "col-12";
    },
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

<style scoped>
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
  margin-top: auto;
  margin-bottom: auto;
  height: 50px;
  color: #fff;
  background: #00121e;
}

.maximizeStyle {
  height: 400px;
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

.col-3 {
  flex: 0 0 22%;
  max-width: 22%;
}

.col-9 {
  flex: 0 0 78%;
  max-width: 78%;
}
</style>
