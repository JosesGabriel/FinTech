<template>
  <v-content style="background: #00121e;">
    <v-card color="#00121e" dark class="pa-0 ma-0">
      <v-tabs
        v-model="active_tab"
        color="success"
        background-color="#00121e"
        grow
        dark
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
          <v-card dark :color="color" class="pa-0 ma-0 tab__height">
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
      color: "#00121e",
      active_tab: "tab-2",
      first_load: true
    };
  },
  computed: {
    ...mapGetters({
      tabs_sidebar: "chart/tabs_sidebar",
      index: "chart/index",
      symbolid: "chart/symbolid"
    })
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
