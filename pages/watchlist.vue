<template>
  <v-container class="page__wrapper" :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
    
    <NavbarDrawer />
    <NavbarDrawerRight />
    <v-row class="mb-5" no-gutters>
      <v-col class="navbar__container hidden-xs-only px-3" cols="1" sm="1" md="1" lg="1">
        <Navbar :data="navbarMiniVariantSetter" active="watchlist" />
      </v-col>
      <v-col
        xs="11"
        sm="11"
        md="11"
        lg="11"
        class="pt-5"
        :class="{'pl-8' : $vuetify.breakpoint.mdAndUp}"
      >
        <v-container v-if="$vuetify.breakpoint.mdAndUp">
          <v-row>
            <v-col cols="3">
              <PSEICard :data="pseData" />
            </v-col>
            <v-col cols="5">
              <SectorIndexList @pseiData="getPSEIData" />
            </v-col>
            <v-col cols="4">
              <MostWatchedStocks :key="addMostWatched" @add-watchlist-data="getEmitID" />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="pt-0" :class="{'px-5': $vuetify.breakpoint.smAndDown}" fluid>
          <span
            class="body-2 font-weight-black pl-1"
            :class="lightSwitch == 0 ? 'black--text' : 'white--text'"
          >Watchlist</span>
          <v-divider class :dark="lightSwitch == 0 ? false : true" />
          <v-divider class="mb-4" :dark="lightSwitch == 0 ? false : true" />
          <div v-if="loadingBar" class="text-center">
            <v-progress-circular :size="50" color="success" indeterminate></v-progress-circular>
          </div>
          <div class="mb-4 d-flex justify-end">
            <div class="d-flex">
              <AddWatcherModal
                v-if="!loadingBar"
                :addnewstock="emitID"
                @addFromMostWatched="addMostWatched++"
              />
              <EditDeleteWatcherModal v-if="!loadingBar" />
            </div>
          </div>
          <v-row>
            <v-col
              v-for="(n, index) in watchListObject"
              :key="n"
              lg="3"
              md="4"
              sm="6"
              xs="12"
              cols="12"
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
import { mapActions, mapGetters } from "vuex";

import Navbar from "~/components/Navbar";
import WatchCard from "~/components/watchers/WatchCard.vue";
import AddWatcherModal from "~/components/watchers/AddWatcherModal.vue";
import EditDeleteWatcherModal from "~/components/watchers/EditDeleteWatcherModal.vue";
import PSEICard from "~/components/watchers/PSEICard.vue";
import SectorIndexList from "~/components/watchers/SectorIndexList.vue";
import MostWatchedStocks from "~/components/watchers/MostWatchedStocks.vue";

import NavbarDrawer from "~/components/social/drawers/NavbarDrawer";
import NavbarDrawerRight from "~/components/social/drawers/NavbarDrawerRight";

export default {
  layout: "main",
  components: {
    Navbar,
    WatchCard,
    AddWatcherModal,
    EditDeleteWatcherModal,
    PSEICard,
    SectorIndexList,
    MostWatchedStocks,
    NavbarDrawer,
    NavbarDrawerRight
  },
  head() {
    return {
      title: "Watchlist",
      meta: [
        {
          hid: "watchlist"
        }
      ]
    };
  },
  data() {
    return {
      isOpen: true,
      isDarkMode: 0,
      watchListObject: "",
      navbarMiniVariantSetter: true,
      loadingBar: true,
      pseData: [],
      emitID: "",
      addMostWatched: ""
    };
  },
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      renderChartKey: "watchers/getRenderChartKey",
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    /**
     * Watches vuex value. When this value updates, that means a user has added, edited or deleted a watched stock.
     * Execute GET again to update user watchlist with new values.
     *
     * @return
     */
    renderChartKey() {
      this.getUserWatchList();
    }
  },
  mounted() {
    this.getUserWatchList();
  },
  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks",
      setRenderChartKey: "watchers/setRenderChartKey"
    }),
    /**
     * Fires when user click the add watch button, carry the stock id and emit
     *
     * @param   {string}  val  carry the most watched stock ID
     *
     * @return  {string}       returns ID string
     */
    getEmitID(val) {
      this.emitID = val;
    },
    /**
     * Captures emit from sectorindexlist which already contains PSEI data
     * In order to prevent doing another request, this data is then passed to the PSEICard component
     *
     * @param   {object}  value
     *
     * @return
     */
    getPSEIData(value) {
      this.pseData = value;
    },
    /**
     * Get user watched stocks
     *
     * @return
     */
    getUserWatchList() {
      this.$api.watchlist.watchlists
        .index()
        .then(
          function(response) {
            this.watchListObject = response.data.watchlist;
            this.setUserWatchedStocks(response.data.watchlist);
            this.loadingBar = false;
          }.bind(this)
        )
        .catch(error => {
          if (error.response.status == 404) {
            this.loadingBar = false;
          }
        });
    }
  }
};
</script>