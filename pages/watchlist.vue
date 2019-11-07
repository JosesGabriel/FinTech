<template>
  <v-container
    class="socialWall__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-5" no-gutters>
      <v-col
        class="navbar__container hidden-xs-only px-3"
        cols="3"
        sm="2"
        md="3"
        lg="3"
      >
        <Navbar />
      </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <v-container class="pt-0" fluid>
          <div v-if="loadingBar" class="text-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-row>
            <v-col
              v-for="(n, index) in watchListObject.length"
              :key="n"
              cols="6"
              class="pt-0"
            >
              <WatchCard :data="watchListObject[index]" />
            </v-col>
            <AddWatcherModal v-if="!loadingBar" />
          </v-row>
        </v-container>
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
        <TrendingStocks />
        <TrendingStocks />
        <FooterSidebar />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
<script>
import Navbar from "~/components/Navbar";
import FooterSidebar from "~/components/FooterSidebar.vue";
import TrendingStocks from "~/components/TrendingStocks.vue";
import WatchCard from "~/components/watchers/WatchCard.vue";
import AddWatcherModal from "~/components/watchers/AddWatcherModal.vue";

export default {
  layout: "main",
  components: {
    Navbar,
    TrendingStocks,
    FooterSidebar,
    WatchCard,
    AddWatcherModal
  },
  data() {
    return {
      isOpen: true,
      isDarkMode: 0,
      watchListObject: "",
      loadingBar: true
    };
  },
  mounted() {
    // GET Data from User Watchlist
    let userData = {
      user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58"
    };
    this.$axios
      .$get("https://dev-api.arbitrage.ph/api/journal/watchlist", userData)
      .then(response => {
        this.watchListObject = response.data.watchlists;
        this.loadingBar = false;
      });
  },
  head() {
    return {
      title: "Arbitrage",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>
