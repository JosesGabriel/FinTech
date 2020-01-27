<template>
  <v-content :style="{ background: cardBackground }">
    <v-card
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :dark="lightSwitch == 1"
      class="pa-0 ma-0"
      tile
      flat
    >
      <v-tabs
        v-model="activeTab"
        color="success"
        :background-color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
        grow
        :dark="lightSwitch == 1"
        height="35"
      >
        <v-tab
          v-for="item in tabsSidebar"
          :key="item.component"
          :href="`#tab-${item.id}`"
          :disabled="item.id == 1 && firstLoad == true"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>

        <v-tab-item
          v-for="item in tabsSidebar"
          :key="item.component"
          :value="`tab-${item.id}`"
        >
          <v-card
            :dark="lightSwitch == 1"
            :color="color"
            class="pa-0 ma-0 tab__height"
            tile
            flat
          >
            <v-card-text class="pa-0 ma-0">
              <component :is="item.component" />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BidAsk from "../sidebar/tabs/BidAsk";
import AllStock from "../sidebar/tabs/AllStock";
import Watchlist from "../sidebar/tabs/Watchlist";
export default {
  components: {
    BidAsk,
    AllStock,
    Watchlist
  },
  data() {
    return {
      activeTab: "tab-2",
      firstLoad: true
    };
  },
  computed: {
    ...mapGetters({
      tabsSidebar: "chart/tabsSidebar",
      index: "chart/index",
      symbolid: "chart/symbolid",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * toggle card text color light/dark
     *
     * @return
     */
    color() {
      return this.lightSwitch == 0 ? "lightchart" : "darkchart";
    },
    /**
     * toggle card background light/dark
     *
     * @return
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    /**
     * once stock change by default show first tab
     *
     * @return
     */
    symbolid() {
      this.activeTab = "tab-1";
      this.firstLoad = false;
    },
    /**
     * if index stock selected disable first tab
     *
     * @param   {Boolean}  value  true/false
     *
     * @return
     */
    index(value) {
      if (value == true) {
        this.activeTab = "tab-2";
        this.firstLoad = true;
      }
    }
  },
  methods: {
    ...mapActions({
      setTabsSidebar: "chart/setTabsSidebar"
    })
  }
};
</script>

<style scoped>
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
.v-data-table--dense td {
  height: 20px !important;
}
.tab__height {
  height: calc(100vh - 310px);
}
.theme--dark.v-icon {
  color: #03dac5;
}
</style>
