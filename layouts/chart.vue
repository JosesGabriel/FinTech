<template>
  <!-- hello world -->
  <v-app
    id="chart_body"
    class="gameGlobal"
    :style="{ background: cardbackground }"
  >
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      sidebar: "chart/getSidebar",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setSidebar: "chart/setSidebar"
    })
  },
  head() {
    return {
      title: "Interactive Chart - Lyduz | Free Stock Trading Platform",
      meta: [
        {
          //   hid: "og emman description",
          //   name: "og karl description",
          //   content: "og My custom description"
        }
      ]
    };
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
#chart_body {
  /* background: #00121e !important; */
  /*font-family: "Karla", sans-serif !important;*/
  font-family: "Nunito Sans", sans-serif !important;
}
.chart__container {
  /* border: 1px solid red; */
}
.ticker__container {
  height: 50px;
  /* color: #fff; */
  /* background: #00121e; */
}
.table__container {
  height: 30px;
  /* color: #fff; */
  /* background: #00121e; */
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
  /* background: #00121e; */
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
