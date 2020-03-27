<template>
  <v-navigation-drawer
    v-model="drawer"
    v-if="$vuetify.breakpoint.xsOnly && $route.path != '/watchlist'"
    :dark="lightSwitch == 1"
    class="mt-10"
    :class="lightSwitch == 1 ? 'darkmode':'lightmode'"
    right
    fixed
    app
  >
    <div class="pt-5 px-3">
      <TrendingStocks />
      <WhoToMingle />
      <MiniWatchlist />
      <FooterSidebar class="mb-10 pb-10" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

import TrendingStocks from "~/components/TrendingStocks";
import WhoToMingle from "~/components/WhoToMingle";
import MiniWatchlist from "~/components/MiniWatchlist";
import FooterSidebar from "~/components/FooterSidebar";

export default {
  layout: "main",
  components: {
    TrendingStocks,
    WhoToMingle,
    MiniWatchlist,
    FooterSidebar
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>

<style scoped>
.darkmode {
  background: #00121e;
}
.lightmode {
  background: #f2f2f2;
}
</style>