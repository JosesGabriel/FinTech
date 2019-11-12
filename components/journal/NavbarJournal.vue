<template>
  <v-card class="navbar__card" height="100%" flat color="transparent">
    <v-navigation-drawer
      disable-resize-watcher
      mobile-break-point
      :mini-variant="$vuetify.breakpoint.mdAndDown"
      class="navbarDrawer__card-journal"
      dark
      color="transparent"
    >
      <v-list class="pt-10 mt-5">
        <v-list-item>
          <router-link to="/user">
            <v-list-item>
                <v-list-item-avatar>
                <v-img src="https://picsum.photos/500/300?image=15"></v-img>
                </v-list-item-avatar>
            </v-list-item>
          </router-link>

          <v-list-item-content>
            <v-list-item-title class="caption"
              ><strong>Eazy-E</strong></v-list-item-title
            >
            <v-list-item-subtitle class="overline"
              >@cruisindown</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav dense flat rounded>
        <v-list-item-group>
            <router-link to="/" class="navbar__links">
            <v-list-item>
              <v-list-item-icon>
                <img src="/icon/navbar-icons/social.svg" width="25" />
              </v-list-item-icon>
              <v-list-item-content
                ><v-list-item-title
                  >Social Wall</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/chart" class="navbar__links">
            <v-list-item>
              <v-list-item-icon>
                <img src="/icon/navbar-icons/chart.svg" width="20">
                </v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
                  >Interactive Chart</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          
          <router-link to="/journal" class="navbar__links">
            <v-list-item>
              <v-list-item-icon
                >
                <v-icon color="#ababab"
                  >mdi-library-books</v-icon
                >
                </v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
                  >Trading Journal</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/virtual-trade" class="navbar__links">
            <v-list-item>
              <v-list-item-icon>
                <img src="/icon/journal-icons/mdi-eye-plus-outline.svg" width="25">
                </v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
                  >Virtual Trade</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/watchlist" class="navbar__links">
            <v-list-item>
              <v-list-item-icon
                ><v-icon color="#ababab"
                  >mdi-eye-plus-outline</v-icon
                ></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
                  >Watchers & Alerts</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>

          <router-link to="/game" class="navbar__links">
            <v-list-item>
              <v-list-item-icon
                ><v-icon color="#ababab">mdi-gamepad</v-icon></v-list-item-icon
              >
              <v-list-item-content
                ><v-list-item-title
                  >Games</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
          
          <router-link to="" class="navbar__links">
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="#B6B6B6">mdi-dots-horizontal</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                ><v-list-item-title
                  ></v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </router-link>
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
</style>