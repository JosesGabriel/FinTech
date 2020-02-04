<template>
  <!-- hello world -->
  <v-app class="gameGlobal" :style="{ background: cardBackground }">
    <Header />
    <div class="spacer__content"></div>
    <div class="content__main">
      <div class="content__left">
        <!-- ticker -->
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
              <v-content class="table__container">
                <Table />
              </v-content>
            </v-slide-y-reverse-transition>
          </v-col>
        </v-row>
      </div>

      <!-- sidebar -->
      <div
        v-show="sidebar"
        transition="slide-y-reverse-transition"
        class="content__right"
        :class="[
          { right_dark_mode: lightSwitch == 1 },
          { right_light_mode: lightSwitch == 0 }
        ]"
      >
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
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      sidebar: "chart/getSidebar",
      lightSwitch: "global/getLightSwitch",
      sse: "chart/sse",
      symbolid: "chart/symbolid"
    }),
    /**
     * toggle between ligth/dark mode
     *
     * @return  {String}
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setSidebar: "chart/setSidebar",
      setSSE: "chart/setSSE"
    }),
    /**
     * Close SSE connection, set back dafault favicon
     *
     * @return
     */
    closeSSE() {
      this.sse.close();
      this.$store.commit(
        "global/SET_FAVICON",
        `${process.env.APP_URL}/favicon/favicon.ico?v=3`
      );
    },
    /**
     * initialise SSE connection, used on mount hook
     *
     * @return  {function}  [return description]
     */
    initSSE() {
      if (this.sse !== null) {
        this.closeSSE();
      }

      this.setSSE(
        new EventSource(`${process.env.SSE_STREAM}market-data/pse/all`)
      );

      this.sse.onopen = function() {};

      this.sse.onerror = function() {};
    }
  },
  mounted() {
    this.initSSE();
  },
  beforeDestroy() {
    this.closeSSE();
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
  background: #03dac5;
  border-radius: 20px;
}
.gameGlobal ::-webkit-scrollbar-thumb:hover {
  background: #03dac5;
}
/* #chart_body {
  font-family: "Nunito Sans", sans-serif !important;
}
.v-application {
  font-family: "Nunito Sans", sans-serif !important;
} */
.chart__container {
}
.ticker__container {
  height: 50px;
}
.table__container {
  height: 30px;
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
  padding-left: 3px !important;
  margin-left: 10px !important;
  flex: 0 0 270px;
}

.right_light_mode {
  border-left: 1px solid #e3e9ed !important;
}

.right_dark_mode {
  border-left: 1px solid #172431 !important;
}
</style>
