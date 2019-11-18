<template>
  <v-toolbar
    :dark="isLightMode == 1 ? false : true"
    :color="isLightMode == 1 ? 'lightcard' : 'darkcard'"
    height="54"
    class="header__toolbar"
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
        <v-btn class="header__button" text @click="$auth.logout()">
          Vyndue
        </v-btn>
      </router-link>
      <a class="social__router">
        <v-btn class="header__button" text @click="registerDialogModel = true">
          {{ $auth.loggedIn ? true : "Account" }}
        </v-btn>
      </a>
    </v-toolbar-items>

    <v-dialog v-model="registerDialogModel" max-width="360px">
      <LoginRegister />
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
  background-color: #00121e;
}
.header__button {
  text-transform: none;
  font-weight: 600;
  font-size: 0.75em;
}
</style>
<script>
import LoginRegister from "~/components/LoginRegister";
export default {
  components: {
    LoginRegister
  },
  data() {
    return {
      searchButtonIsVisible: true,
      isLightMode: 0,
      registerDialogModel: false,
      tab: null
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
