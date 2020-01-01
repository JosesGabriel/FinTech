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
        <Navbar :data="navbarMiniVariantSetter" active="watchlist" />
      </v-col>
      <v-col xs="11" sm="11" md="11" lg="11" class="pl-8">
        <v-container>
          <v-row>
            <v-col cols="3">
              <PSEICard :data="pseData" />
            </v-col>
            <v-col cols="5">
              <SectorIndexList @pseiData="getPSEIData" />
            </v-col>
            <v-col cols="4">
              <MostWatchedStocks />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="pt-0" fluid>
          <span
            class="body-1"
            :style="lightSwitch == 0 ? 'color: black' : 'color: white'"
            >Watchlist</span
          >
          <v-divider class="mb-2" :dark="lightSwitch == 0 ? false : true" />
          <div v-if="loadingBar" class="text-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <div class="mb-2 d-flex justify-end">
            <div class="d-flex">
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
<script>
import Navbar from "~/components/Navbar";
import WatchCard from "~/components/watchers/WatchCard.vue";
import AddWatcherModal from "~/components/watchers/AddWatcherModal.vue";
import EditDeleteWatcherModal from "~/components/watchers/EditDeleteWatcherModal.vue";
import PSEICard from "~/components/watchers/PSEICard.vue";
import SectorIndexList from "~/components/watchers/SectorIndexList.vue";
import MostWatchedStocks from "~/components/watchers/MostWatchedStocks.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    Navbar,
    WatchCard,
    AddWatcherModal,
    EditDeleteWatcherModal,
    PSEICard,
    SectorIndexList,
    MostWatchedStocks
  },
  data() {
    return {
      isOpen: true,
      isDarkMode: 0,
      watchListObject: "",
      navbarMiniVariantSetter: true,
      loadingBar: true,
      pseData: []
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
      setRenderChartKey: "watchers/setRenderChartKey",
      lightSwitch: "global/getLightSwitch"
    }),
    getPSEIData(value) {
      this.pseData = value;
    },
    getUserWatchList() {
      //Params won't be needed in the future, user token only

      // let userData = {
      //   user_id: this.$auth.loggedIn ? this.$auth.user.data.user.uuid : "000"
      // };
      this.$api.watchlist.watchlists.index().then(
        function(response) {
          this.watchListObject = response.data.watchlist;
          this.setUserWatchedStocks(response.data.watchlist);
          this.loadingBar = false;
          let ctr = 1;
          response.data.watchlist.forEach(element => {
            console.log(`${ctr++} - ${element.user_id}`);
          });
        }.bind(this)
      );
    }
  }
};
</script>
<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
