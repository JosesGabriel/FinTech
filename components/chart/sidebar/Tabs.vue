<template>
  <v-content>
    <v-card dark class="pa-0 ma-0">
      <v-tabs
        v-model="tab"
        color="#48ffd5"
        background-color="#00121e"
        grow
        dark
        height="35"
      >
        <!-- <v-tab
          v-for="item in items"
          :key="item.component"
          :disabled="item.disabled"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab> -->

        <v-tab :href="`#tab-1`" :disabled="index"
          ><v-icon>mdi-cash-usd-outline</v-icon></v-tab
        >
        <v-tab :href="`#tab-2`"
          ><v-icon>mdi-format-list-bulleted-square</v-icon></v-tab
        >
        <v-tab :href="`#tab-3`"><v-icon>mdi-card-search-outline</v-icon></v-tab>

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
      tab: null
    };
  },
  computed: {
    ...mapGetters({
      tabs_sidebar: "chart/tabs_sidebar",
      index: "chart/index"
    })
  },
  methods: {
    ...mapActions({
      setTabsSidebar: "chart/setTabsSidebar"
    })
  },
  watch: {
    index(value) {
      //console.log(value);
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
  color: #48ffd5;
}
</style>
