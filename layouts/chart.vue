<template>
  <!-- hello world -->
  <v-app id="chart_body" class="gameGlobal">
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      sidebar: "chart/getSidebar"
    })
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setSidebar: "chart/setSidebar"
    })
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
.chart__container {
}
.ticker__container {
  height: 50px;
  color: #fff;
  background: #00121e;
}
.table__container {
  height: 30px;
  color: #fff;
  background: #00121e;
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
  background: #00121e;
  flex: 0 0 250px;
}
</style>
