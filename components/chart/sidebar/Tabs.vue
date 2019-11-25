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
        <v-tab v-for="item in items" :key="item.component">
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>
        <v-tab-item v-for="item in items" :key="item.component">
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
      tab: null,
      items: [
        {
          icon: "mdi-cash-usd-outline",
          component: "BidAsk"
        },
        {
          icon: "mdi-format-list-bulleted-square",
          component: "AllStock"
        },
        {
          icon: "mdi-card-search-outline",
          component: "Watchlist"
        }
      ]
    };
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
