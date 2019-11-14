<template>
  <v-toolbar
    :dark="isLightMode == 1 ? false : true"
    height="54"
    class="header__toolbar"
    :class="isLightMode == 1 ? 'lightMode' : 'darkMode'"
  >
    <v-toolbar-title
      ><router-link to="/">
        <img src="logo.png" alt="" width="45" height="45" /> </router-link
    ></v-toolbar-title>

    <v-btn icon @click="paletteSwitch()">
      <v-icon color="yellow">mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <v-toolbar-items class="mt-3" dark>
      <transition name="fade">
        <div
          v-if="!searchButtonIsVisible"
          class="searchBar__container hidden-md-only"
        >
          <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
            class="header__searchbar ml-3 mt-1 headline"
            outlined
            rounded
            solo
            flat
            dense
            background-color="transparent"
          ></v-text-field>
        </div>
      </transition>
      <transition name="slide-fade">
        <router-link v-if="searchButtonIsVisible" to="/" class="social__router">
          <v-btn
            ref="header__searchButton"
            class="header__button"
            text
            @click="toggleSearch()"
          >
            Search
          </v-btn>
        </router-link>
      </transition>
      <router-link to="/" class="social__router">
        <v-btn class="header__button" text>
          Power Tools
        </v-btn>
      </router-link>
      <router-link to="/" class="social__router">
        <v-btn class="header__button" text>
          Notification
        </v-btn>
      </router-link>
      <router-link to="/" class="social__router">
        <v-btn class="header__button" text>
          Vyndue
        </v-btn>
      </router-link>
      <router-link to="/" class="social__router">
        <v-btn class="header__button" text>
          Account
        </v-btn>
      </router-link>
    </v-toolbar-items>

    <v-dialog v-model="registerDialogModel" max-width="350px">
      <v-card>
        <v-card-text>
          <div class="title text-center pt-5" style="color: black;">
            Join Arbitrage. It's free!
          </div>
          <div class="body-2 text-center">
            Already have an account? <a>Log in</a>
          </div>
        </v-card-text>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Full name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email address"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Username" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>By signing up, you agree to the Terms and Conditions.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="registerDialogModel = false"
            >Sign Up</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.header__searchbar {
  transform: scale(0.6);
  transform-origin: top right;
}
.social__router {
  text-decoration: none;
  display: inline-flex;
  height: 0;
}
.header__toolbar {
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: #00121e;
  border-bottom: 1px white;
}
.lightMode {
  background-color: #f2f2f2;
}
.darkMode {
  /* TEMPORARY */
  background-color: #00121e !important;
}
.header__button {
  text-transform: none;
  font-weight: 600;
  font-size: 0.75em;
}
</style>
<script>
export default {
  data() {
    return {
      searchButtonIsVisible: true,
      isLightMode: 0,
      registerDialogModel: false
    };
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    toggleSearch() {
      this.searchButtonIsVisible
        ? (this.searchButtonIsVisible = false)
        : (this.searchButtonIsVisible = true);
    },
    paletteSwitch() {
      if (localStorage.currentMode && localStorage.currentMode == 0) {
        localStorage.currentMode = 1;
        this.isLightMode = 1;
      } else {
        localStorage.currentMode = 0;
        this.isLightMode = 0;
      }
    }
  }
};
</script>
