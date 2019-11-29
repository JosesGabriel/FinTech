<template>
  <v-col class="pa-0">
    <v-content class="content__btncontainer">
      <v-btn
        v-show="maximize || fullscreen"
        small
        icon
        :color="fullscreen ? '#03dac5' : '#BBB'"
        :class="[{ button__disable: !maximize && !fullscreen }]"
        title="Maximize Table"
        @click="toggleTabsFullscreen"
      >
        <v-icon class="icon-flipped-y">mdi-window-maximize</v-icon>
        <!-- :color="maximize && !fullscreen ? '#03dac5' : '#BBB'" -->
        <!-- <v-icon class="icon-flipped-y">{{
          !fullscreen ? "mdi-window-maximize" : "mdi-window-minimize"
        }}</v-icon> -->
      </v-btn>

      <!-- <v-btn
        v-show="!maximize && !fullscreen"
        small
        icon
        color="#03dac5"
        title="Expand Up"
        @click="toggleTabs(0)"
      >
        <v-icon>mdi-arrow-expand-up</v-icon>
      </v-btn> -->

      <v-btn
        small
        icon
        :color="ticker ? '#03dac5' : '#BBB'"
        title="Ticker"
        @click="toggleTicker"
      >
        <v-icon class="icon-flipped-y">mdi-dock-bottom</v-icon>
      </v-btn>

      <v-btn
        small
        icon
        :color="sidebarboard ? '#03dac5' : '#BBB'"
        title="Sidebar"
        @click="toggleSidebarBoard"
      >
        <v-icon>mdi-dock-right</v-icon>
      </v-btn>
    </v-content>

    <v-tabs height="30" color="#03dac5" background-color="#00121e" dark>
      <v-tab
        v-for="item in tabs_content"
        :key="item.id"
        :href="`#tab-${item.id}`"
        class="text-capitalize subtitle-1"
        @click="toggleTabs(item.id)"
      >
        {{ item.title }}
      </v-tab>

      <v-tab-item
        v-for="item in tabs_content"
        :key="item.id"
        :value="`tab-${item.id}`"
        style="background: #00121e;"
        color="#03dac5"
      >
        <component :is="item.component" v-show="tabs_show" />
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Jockey from "~/components/chart/table/Jockey";
import Activity from "~/components/chart/table/Activity";
import Trade from "~/components/chart/table/Trade";

export default {
  components: {
    Jockey,
    Activity,
    Trade
  },
  data() {
    return {
      tabs_show: false,
      active_tab: 0,
      last_visit: 0,
      tabs_content: [
        {
          id: 1,
          icon: "mdi-cash-usd-outline",
          title: "Jockey",
          component: "Jockey",
          disabled: false
        },
        {
          id: 2,
          icon: "mdi-format-list-bulleted-square",
          title: "Activity",
          component: "Activity",
          disabled: false
        },
        {
          id: 3,
          icon: "mdi-card-search-outline",
          title: "Trade",
          component: "Trade",
          disabled: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      maximize: "chart/getTableMaximize",
      fullscreen: "chart/getTableFullscreen",
      sidebarboard: "chart/getSidebar"
    })
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setSidebar: "chart/setSidebar",
      setTable: "chart/setTable",
      setTableMaximize: "chart/setTableMaximize",
      setTableFullscreen: "chart/setTableFullscreen"
    }),
    toggleTicker: function() {
      this.setTicker(!this.ticker);
      this.$bus.$emit("adjustChartView");
    },
    toggleSidebarBoard: function() {
      this.setSidebar(!this.sidebarboard);
    },
    toggleTabs: function(tab) {
      //console.log(tab);
      if (this.fullscreen) return;
      if (this.active_tab == tab || this.maximize == false) {
        this.tabs_show = !this.tabs_show;
        this.setTableMaximize(!this.maximize);
        this.$bus.$emit("adjustChartView");
      }
      this.active_tab = tab;
    },
    toggleTabsFullscreen: function() {
      this.setTableFullscreen(!this.fullscreen);
      this.$bus.$emit("adjustChartView");
    }
  }
};
</script>

<style scoped>
.content__btncontainer {
  padding: 0px;
  position: absolute;
  right: 0;
  height: 30px;
  z-index: 1;
  width: 150px;
  margin-right: 5px;
  /* background: red; */
  text-align: right;
}
.icon-flipped-x {
  -o-transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
  transform: scaleX(-1);
}
.icon-flipped-y {
  -o-transform: scaleY(-1);
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -ms-transform: scaleY(-1);
  transform: scaleY(-1);
}
.button__disable {
  cursor: not-allowed !important;
  pointer-events: none;
}
</style>
