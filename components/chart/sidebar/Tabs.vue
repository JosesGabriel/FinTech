<template>
  <v-content>
    <v-card dark class="pa-0 ma-0">
      <v-tabs
        v-model="tab"
        color="#48ffd5"
        background-color="#00122e"
        grow
        dark
        height="35"
        icons-and-text
      >
        <v-tab v-for="item in items" :key="item.component">
          <v-icon>{{ item.mdi }}</v-icon>
          <!-- <v-content class="mt-2">
            <v-img
              width="25px"
              height="25px"
              :src="`/Icon/chart/${item.icon}.svg`"
            ></v-img>
          </v-content> -->
        </v-tab>

        <v-tab-item v-for="item in items" :key="item.component">
          <v-card dark color="#00122e" class="pa-0 ma-0 tab__height">
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
      tab: null,
      //items: ["mdi-phone", "mdi-heart", "mdi-phone", "mdi-heart"],
      items: [
        {
          icon: "bull-circle",
          mdi: "mdi-cash-usd-outline",
          component: "BidAsk"
        },
        {
          icon: "bear-circle",
          mdi: "mdi-format-list-bulleted-square",
          component: "AllStock"
        },
        {
          icon: "bull-circle",
          mdi: "mdi-card-search-outline",
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
  height: calc(100vh - 368px);
}
</style>
