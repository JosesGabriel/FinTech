<template>
  <v-content>
    <v-card dark class="pa-0 ma-0">
      <v-tabs
        v-model="tab"
        color="#48ffd5"
        background-color="#0B1F33"
        grow
        dark
        height="40"
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
          <v-card dark height="360" color="#0B1F33" class="pa-0 ma-0">
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
          mdi: "attach_money",
          component: "BidAsk"
        },
        {
          icon: "bear-circle",
          mdi: "format_list_bulleted",
          component: "AllStock"
        },
        {
          icon: "bull-circle",
          mdi: "search",
          component: "Watchlist"
        }
      ]
    };
  }
};
</script>

<style></style>
