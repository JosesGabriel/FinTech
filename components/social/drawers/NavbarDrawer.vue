<template>
  <v-navigation-drawer
    v-model="drawer"
    v-if="$vuetify.breakpoint.xsOnly"
    :dark="lightSwitch == 1"
    class="mt-10 pt-3"
    fixed
    app
  >
    <v-list height="100%" nav dense rounded class="py-0 pt-5">
      <v-list-item-group>
        <router-link
          :to="
              $auth.loggedIn ? '/profile/' + $auth.user.data.user.username : ''
            "
          class="no-transform"
        >
          <v-list-item class="tertiary--text">
            <v-list-item-avatar :class="[$vuetify.breakpoint.mdAndDown ? '' : 'mr-4']" size="24">
              <v-img
                class="avatar__border"
                :src="
                    $auth.loggedIn
                      ? $auth.user.data.user.profile_image
                        ? $auth.user.data.user.profile_image
                        : 'default.png'
                      : ''
                  "
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="navbar__name body-2"
              >{{ $auth.loggedIn ? $auth.user.data.user.name : "Guest" }}</v-list-item-title>
              <span class="overline no-transform">@{{ $auth.user.data.user.username }}</span>
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
            <v-list-item-icon :class="[$vuetify.breakpoint.mdAndDown ? '' : 'mr-4']">
              <v-icon :color="active == 'social' ? 'success' : ''">mdi-account-supervisor-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-black no-transform body-2"
                :class="lightSwitch == 0 ? 'black--text' : 'white--text'"
              >Social Wall</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/chart" class="no-transform">
          <v-list-item
            :class="active == 'chart' ? 'v-list-item--active' : ''"
            class="tertiary--text"
          >
            <v-list-item-icon :class="[$vuetify.breakpoint.mdAndDown ? '' : 'mr-4']">
              <v-icon :color="active == 'chart' ? 'success' : ''">mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium no-transform body-2">Interactive Chart</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to="/journal" class="no-transform">
          <v-list-item
            :class="active == 'journal' ? 'v-list-item--active' : ''"
            class="tertiary--text"
          >
            <v-list-item-icon :class="[$vuetify.breakpoint.mdAndDown ? '' : 'mr-4']">
              <v-icon :color="active == 'journal' ? 'success' : ''">mdi-text-box-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium no-transform body-2">Trading Journal</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to="/trade-simulator" class="no-transform">
          <v-list-item
            :class="active == 'virtualtrade' ? 'v-list-item--active' : ''"
            class="tertiary--text"
          >
            <v-list-item-icon :class="[$vuetify.breakpoint.mdAndDown ? '' : 'mr-4']">
              <v-icon :color="active == 'virtualtrade' ? 'success' : ''">mdi-cloud-print-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium no-transform body-2">Virtual Trading</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/watchlist" class="no-transform">
          <v-list-item
            :class="active == 'watchlist' ? 'v-list-item--active' : ''"
            class="tertiary--text"
          >
            <v-list-item-icon :class="[$vuetify.breakpoint.mdAndDown ? '' : 'mr-4']">
              <v-icon :color="active == 'watchlist' ? 'success' : ''">mdi-eye-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium no-transform body-2">Watchlist</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
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
      darkText: false,
      navbarDrawerModel: true,
      drawer: false
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
  position: fixed;
  top: 60px;
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
