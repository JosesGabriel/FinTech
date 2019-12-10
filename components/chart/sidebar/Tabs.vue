<template>
  <v-content :style="{ background: cardbackground }">
    <v-card
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :dark="lightSwitch == 1"
      class="pa-0 ma-0"
      tile
    >
      <v-tabs
        v-model="active_tab"
        color="#03dac5"
        :background-color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
        grow
        :dark="lightSwitch == 1"
        height="35"
      >
        <v-tab
          v-for="item in tabs_sidebar"
          :key="item.component"
          :href="`#tab-${item.id}`"
          :disabled="item.id == 1 && first_load == true"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>

        <v-tab-item
          v-for="item in tabs_sidebar"
          :key="item.component"
          :value="`tab-${item.id}`"
        >
          <v-card
            :dark="lightSwitch == 1"
            :color="color"
            class="pa-0 ma-0 tab__height"
            tile
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
      active_tab: "tab-2",
      first_load: true
    };
  },
  computed: {
    ...mapGetters({
      tabs_sidebar: "chart/tabs_sidebar",
      index: "chart/index",
      symbolid: "chart/symbolid",
      lightSwitch: "global/getLightSwitch"
    }),
    color: function() {
      return this.lightSwitch == 0 ? "lightchart" : "darkchart";
    },
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setTabsSidebar: "chart/setTabsSidebar"
    })
  },
  watch: {
    symbolid(value) {
      //console.log(value);
      this.active_tab = "tab-1";
      this.first_load = false;
    }
  }
};
</script>

<style>
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
.v-data-table--dense td {
  height: 16px;
}
.tab__height {
  height: calc(100vh - 290px);
}
.theme--dark.v-icon {
  color: #03dac5;
}
</style>
