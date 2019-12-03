<template>
  <v-card class="navbar__card" max-width="240" flat color="transparent">
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
      <v-list>
        <v-list-item>
          <router-link to="/user">
            <v-list-item-avatar>
              <v-img
                :src="
                  $auth.loggedIn
                    ? $auth.user.data.user.profile_image
                    : 'default.png'
                "
              ></v-img>
            </v-list-item-avatar>
          </router-link>

          <v-list-item-content>
            <v-list-item-title class="caption"
              ><strong>
                {{
                  $auth.loggedIn
                    ? $auth.user.data.user.first_name +
                      " " +
                      $auth.user.data.user.last_name
                    : "Guest"
                }}
              </strong>
            </v-list-item-title>
            <v-list-item-subtitle class="overline"
              >@{{
                $auth.loggedIn ? $auth.user.data.user.username : "Guest"
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav dense rounded>
        <v-list-item-group>
          <router-link to="/" class="navbar__links">
            <v-list-item
              :class="active == 'social' ? 'v-list-item--active' : ''"
              :color="active == 'social' ? 'success' : ''"
            >
              <v-list-item-icon class="mr-4">
                <v-icon color="#b6b6b6">mdi-account-supervisor-circle</v-icon>
                <!-- <img src="/icon/navbar-icons/journal.svg" width="20"> -->
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title
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
                <!-- <v-icon color="#bfb538"
                  >mdi-chart-bar</v-icon
                > -->
                <img src="/icon/navbar-icons/chart.svg" width="20" />
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title
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
                <v-icon color="#b6b6b6">mdi-library-books</v-icon>
                <!-- <img src="/icon/navbar-icons/journal.svg" width="20"> -->
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title
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
                <img
                  src="/icon/journal-icons/mdi-eye-plus-outline.svg"
                  width="25"
                />
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title
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
                ><v-icon color="#b6b6b6">mdi-gamepad</v-icon></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
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
                ><v-icon color="#b6b6b6"
                  >mdi-eye-plus-outline</v-icon
                ></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
                  >Watchlist</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          <v-list-item @click="powerToolsToggle = !powerToolsToggle">
            <v-list-item-icon class="mr-4">
              <v-icon color="#b6b6b6">mdi-dots-horizontal</v-icon>
            </v-list-item-icon>
            <v-list-item-content
              ><v-list-item-title>More</v-list-item-title></v-list-item-content
            >
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group v-if="powerToolsToggle">
          <v-list-item-icon>
            <v-list-item-title class="caption">Power Tools</v-list-item-title>
          </v-list-item-icon>
          <v-list-item @click.stop="buySellDialog = true">
            <v-list-item-icon class="mr-4">
              <img src="/icon/navbar-icons/buySellCalculator.svg" width="25" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Buy/Sell Calculator</v-list-item-title>
            </v-list-item-content>
            <v-dialog v-model="buySellDialog" max-width="290">
              <BuySellCalculator />
            </v-dialog>
          </v-list-item>
          <v-list-item @click.stop="varDialog = true">
            <v-list-item-icon class="mr-4">
              <img src="/icon/navbar-icons/varCalculator.svg" width="25" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>VAR Calculator</v-list-item-title>
            </v-list-item-content>
            <v-dialog v-model="varDialog" max-width="320">
              <VARCalculator :data="varDialog" />
            </v-dialog>
          </v-list-item>
          <v-list-item @click.stop="averagePriceDialog = true">
            <v-list-item-icon class="mr-4">
              <img
                src="/icon/navbar-icons/averagePriceCalculator.svg"
                width="25"
              />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Average Price Calculator</v-list-item-title>
            </v-list-item-content>
            <v-dialog v-model="averagePriceDialog" max-width="290">
              <AveragePriceCalculator />
            </v-dialog>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-4">
              <v-icon color="#b6b6b6">mdi-chart-areaspline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Multicharts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<style scoped>
.navbar__card {
  position: fixed;
}
.navbar__links {
  color: white;
  text-decoration: none;
}
.v-list-item--active .v-list-item__icon i {
  color: rgb(72, 255, 213) !important;
}
.v-list-item--active::before {
  opacity: 0;
}
</style>
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
