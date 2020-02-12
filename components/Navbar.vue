<template>
  <v-card class="navbar__card" max-width="240" flat color="transparent">
    <v-navigation-drawer
      disable-resize-watcher
      mobile-break-point
      :mini-variant="data ? true : $vuetify.breakpoint.mdAndDown"
      class="navbarDrawer__card transparent"
      :class="lightSwitch == 0 ? 'lightcard' : ''"
      :dark="lightSwitch == 0 ? false : true"
      floating
    >
      <v-list nav dense rounded class="py-0">
        <v-list-item-group>
          <router-link
            :to="'/profile/' + $auth.user.data.user.username"
            class="no-transform"
          >
            <v-list-item class="tertiary--text">
              <v-list-item-avatar class="mr-4" size="24">
                <v-img
                  class="avatar__border"
                  :src="
                    $auth.user.data.user.profile_image
                      ? $auth.user.data.user.profile_image
                      : 'default.png'
                  "
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="navbar__name body-2">
                  {{ $auth.loggedIn ? $auth.user.data.user.name : "Guest" }}
                </v-list-item-title>
                <span class="overline no-transform"
                  >@{{ $auth.user.data.user.username }}</span
                >
              </v-list-item-content>
            </v-list-item>
            <div v-if="!data">
              <v-divider></v-divider>
              <v-divider class="mb-1"></v-divider>
            </div>
          </router-link>
          <router-link to="/" class="no-transform">
            <v-list-item
              :class="active == 'social' ? 'v-list-item--active' : ''"
              class="tertiary--text"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'social' ? 'success' : ''"
                  >mdi-account-supervisor-circle</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-black no-transform body-2"
                  :class="lightSwitch == 0 ? 'black--text' : 'white--text'"
                  >Social Wall</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/chart" class="no-transform">
            <v-list-item
              :class="active == 'chart' ? 'v-list-item--active' : ''"
              class="tertiary--text"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'chart' ? 'success' : ''"
                  >mdi-chart-bar</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-medium no-transform body-2"
                  >Interactive Chart</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/journal" class="no-transform">
            <v-list-item
              :class="active == 'journal' ? 'v-list-item--active' : ''"
              class="tertiary--text"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'journal' ? 'success' : ''"
                  >mdi-library-books</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-medium no-transform body-2"
                  >Trading Journal</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/trade-simulator" class="no-transform">
            <v-list-item
              :class="active == 'virtualtrade' ? 'v-list-item--active' : ''"
              class="tertiary--text"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'virtualtrade' ? 'success' : ''"
                  >mdi-cloud-print-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-medium no-transform body-2"
                  >Virtual Trading</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <!-- TODO put back after launch -->
          <!-- <router-link to="/game" class="no-transform">
            <v-list-item
              :class="active == 'game' ? 'v-list-item--active' : ''"
              :color="active == 'game' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4"
                ><v-icon :color="active == 'game' ? 'success' : ''"
                  >mdi-gamepad</v-icon
                ></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title class="font-weight-medium"
                  >Games</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>-->
          <router-link to="/watchlist" class="no-transform">
            <v-list-item
              :class="active == 'watchlist' ? 'v-list-item--active' : ''"
              class="tertiary--text"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'watchlist' ? 'success' : ''"
                  >mdi-eye-plus-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-medium no-transform body-2"
                  >Watchlist</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  layout: "main",
  props: {
    data: {
      type: Boolean
    },
    active: {
      default: "social",
      type: String
    }
  },
  data() {
    return {
      buySellDialog: false,
      averagePriceDialog: false,
      varDialog: false,
      isLightMode: 0,
      darkText: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    if (localStorage.currentMode) {
      this.isLightMode = localStorage.currentMode;
      localStorage.currentMode == 0
        ? (this.darkText = true)
        : (this.darkText = false);
    } else {
      localStorage.currentMode = 0;
      this.darkText = true;
    }
  }
};
</script>
<style scoped>
.navbar__card {
  position: relative;
}
.navbar__name {
  font-weight: 600 !important;
}
.v-list-item:hover::before {
  opacity: 0;
}
.v-list-item--active::before {
  opacity: 0;
}
.v-list-item--active .v-list-item__content .v-list-item__title {
  font-weight: bold;
}
</style>
