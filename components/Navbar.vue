<template>
  <v-card class="navbar__card pt-2" max-width="240" flat color="transparent">
    <v-navigation-drawer
      disable-resize-watcher
      mobile-break-point
      :mini-variant="data ? true : $vuetify.breakpoint.mdAndDown"
      class="navbarDrawer__card"
      :class="lightSwitch == 0 ? 'lightcard' : '#00121e'"
      :dark="lightSwitch == 0 ? false : true"
      color="transparent"
      floating
    >
      <v-list nav dense rounded>
        <v-list-item-group>
          <router-link to="/profile" class="navbar__links">
            <v-list-item>
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
              <v-list-item-content
                ><v-list-item-title class="font-weight-black">
                  {{
                    $auth.loggedIn
                      ? $auth.user.data.user.first_name +
                        " " +
                        $auth.user.data.user.last_name
                      : "Guest"
                  }}</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          <router-link to="/" class="navbar__links">
            <v-list-item
              :class="active == 'social' ? 'v-list-item--active' : ''"
              :color="active == 'social' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'social' ? 'success' : 'secondary'"
                  >mdi-account-supervisor-circle</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title class="font-weight-black"
                  >Social Wall</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          <router-link to="/chart" class="navbar__links">
            <v-list-item
              :class="active == 'chart' ? 'v-list-item--active' : ''"
              :color="active == 'chart' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'chart' ? 'success' : 'secondary'"
                  >mdi-chart-bar</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title class="font-weight-medium"
                  >Interactive Chart</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/journal" class="navbar__links">
            <v-list-item
              :class="active == 'journal' ? 'v-list-item--active' : ''"
              :color="active == 'journal' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4">
                <v-icon :color="active == 'journal' ? 'success' : 'secondary'"
                  >mdi-library-books</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title class="font-weight-medium"
                  >Trading Journal</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/trade-simulator" class="navbar__links">
            <v-list-item
              :class="active == 'virtualtrade' ? 'v-list-item--active' : ''"
              :color="active == 'virtualtrade' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4">
                <v-icon
                  :color="active == 'virtualtrade' ? 'success' : 'secondary'"
                  >mdi-cloud-print-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title class="font-weight-medium"
                  >Virtual Trading</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/game" class="navbar__links">
            <v-list-item
              :class="active == 'game' ? 'v-list-item--active' : ''"
              :color="active == 'game' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4"
                ><v-icon :color="active == 'game' ? 'success' : 'secondary'"
                  >mdi-gamepad</v-icon
                ></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title class="font-weight-medium"
                  >Games</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          <router-link to="/watchlist" class="navbar__links">
            <v-list-item
              :class="active == 'watchlist' ? 'v-list-item--active' : ''"
              :color="active == 'watchlist' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4"
                ><v-icon
                  :color="active == 'watchlist' ? 'success' : 'secondary'"
                  >mdi-eye-plus-outline</v-icon
                ></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title class="font-weight-medium"
                  >Watchlist</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          <v-list-item @click="powerToolsToggle = !powerToolsToggle">
            <v-list-item-icon class="mr-4">
              <v-icon color="secondary">mdi-dots-horizontal</v-icon>
            </v-list-item-icon>
            <v-list-item-content
              ><v-list-item-title class="font-weight-medium"
                >More</v-list-item-title
              ></v-list-item-content
            >
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group v-if="powerToolsToggle">
          <v-list-item-icon>
            <v-list-item-title class="caption">Power Tools</v-list-item-title>
          </v-list-item-icon>
          <v-list-item @click.stop="buySellDialog = true">
            <v-list-item-icon class="mr-4">
              <v-icon color="secondary">mdi-calculator-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Buy/Sell Calculator</v-list-item-title
              >
            </v-list-item-content>
            <v-dialog v-model="buySellDialog" max-width="500">
              <BuySellCalculator />
            </v-dialog>
          </v-list-item>
          <v-list-item @click.stop="varDialog = true">
            <v-list-item-icon class="mr-4">
              <!-- <img src="/icon/navbar-icons/varCalculator.svg" width="25" /> -->
              <v-icon color="secondary">mdi-alert-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >VAR Calculator</v-list-item-title
              >
            </v-list-item-content>
            <v-dialog v-model="varDialog" max-width="320">
              <VARCalculator :data="varDialog" />
            </v-dialog>
          </v-list-item>
          <v-list-item @click.stop="averagePriceDialog = true">
            <v-list-item-icon class="mr-4">
              <v-icon color="secondary">mdi-set-center</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Average Price Calculator</v-list-item-title
              >
            </v-list-item-content>
            <v-dialog v-model="averagePriceDialog" max-width="290">
              <AveragePriceCalculator />
            </v-dialog>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-4">
              <v-icon color="secondary">mdi-chart-areaspline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Multicharts</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import BuySellCalculator from "~/components/calculators/BuySellCalculator";
import AveragePriceCalculator from "~/components/calculators/AveragePriceCalculator";
import VARCalculator from "~/components/calculators/VARCalculator";
export default {
  components: {
    BuySellCalculator,
    AveragePriceCalculator,
    VARCalculator
  },
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
      powerToolsToggle: false
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
}
.navbar__links {
  color: white;
  text-decoration: none;
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
