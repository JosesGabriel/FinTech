<template>
  <v-toolbar
    :dark="isLightMode == 1 ? false : true"
    :color="isLightMode == 1 ? 'lightcard' : '#00121e'"
    flat
    height="54"
    class="header__toolbar"
  >
    <v-toolbar-title
      ><router-link to="/">
        <img
          class="pl-2 pt-1"
          src="logo-dark.svg"
          alt=""
          width="85"
          height="85"
        /> </router-link
    ></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="mt-3" dark>
      <div class="searchBar__container hidden-md-only">
        <v-text-field
          label="Search"
          class="header__searchbar ml-3 mt-2 headline"
          placeholder="Search"
          solo
          flat
          dense
          background-color="rgb(37,37,48)"
        ></v-text-field>
      </div>
      <router-link to="/" class="social__router">
        <v-btn class="header__button" text @click="paletteSwitch()">
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
      <a class="social__router">
        <v-btn
          class="header__button"
          text
          @click="
            $auth.loggedIn
              ? (showDropdown = !showDropdown)
              : (registerDialogModel = true)
          "
        >
          {{ $auth.loggedIn ? $auth.user.data.user.username : "Account" }}
        </v-btn>
      </a>
      <HeaderDropdown v-if="showDropdown && $auth.loggedIn" />
    </v-toolbar-items>

    <LoginRegister v-model="registerDialogModel" />
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
  transform: scale(0.5);
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
import HeaderDropdown from "~/components/HeaderDropdown";
export default {
  components: {
    LoginRegister,
    HeaderDropdown
  },
  data() {
    return {
      searchButtonIsVisible: true,
      isLightMode: 0,
      registerDialogModel: false,
      tab: null,
      showDropdown: false
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
