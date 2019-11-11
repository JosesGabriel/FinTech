<template>
  <v-container
    class="socialWall__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-5" no-gutters>
      <v-col
        class="navbar__container hidden-xs-only px-3"
        cols="1"
        sm="1"
        md="1"
        lg="1"
      >
        <Navbar :data="navbarMiniVariantSetter" />
      </v-col>
      <v-col xs="11" sm="11" md="11" lg="11" class="pl-8">
        <v-container class="pt-0" fluid>
          <div v-if="loadingBar" class="text-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <div style="display: flex;justify-content: flex-end;" class="mb-2">
            <div style="display: flex;">
              <AddWatcherModal v-if="!loadingBar" />
              <EditDeleteWatcherModal v-if="!loadingBar" />
            </div>
          </div>
          <v-row>
            <v-col
              v-for="(n, index) in watchListObject.length"
              :key="n"
              cols="3"
              class="pt-0"
            >
              <WatchCard :data="index" />
            </v-col>
          </v-row>
        </v-container>
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
import WatchCard from "~/components/watchers/WatchCard.vue";
import AddWatcherModal from "~/components/watchers/AddWatcherModal.vue";
import EditDeleteWatcherModal from "~/components/watchers/EditDeleteWatcherModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    Navbar,
    WatchCard,
    AddWatcherModal,
    EditDeleteWatcherModal
  },
  data() {
    return {
      isOpen: true,
      isDarkMode: 0,
      watchListObject: "",
      navbarMiniVariantSetter: true,
      loadingBar: true,
      componentKey: 0
    };
  },
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      renderChartKey: "watchers/getRenderChartKey"
    })
  },
  watch: {
    renderChartKey: function() {
      this.getUserWatchList();
    }
  },
  mounted: function() {
    // GET Data from User Watchlist
    this.getUserWatchList();
  },
  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks",
      setRenderChartKey: "watchers/setRenderChartKey"
    }),
    getUserWatchList() {
      let userData = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58"
      };
      this.$axios
        .$get("https://dev-api.arbitrage.ph/api/journal/watchlist", userData)
        .then(response => {
          this.watchListObject = response.data.watchlist;
          this.setUserWatchedStocks(response.data.watchlist);
          this.loadingBar = false;
        });
      this.componentKey++; //forces re-render
    }
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
