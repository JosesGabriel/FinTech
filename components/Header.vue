<template>
  <v-toolbar
    :dark="lightSwitch == 0 ? false : true"
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    flat
    height="54"
    class="header__toolbar"
  >
    <v-toolbar-title
      ><router-link to="/">
        <img
          class="pl-2 pt-1"
          :src="lightSwitch == 0 ? '/logo-light.svg' : '/logo-dark.svg'"
          alt=""
          width="85"
          height="85"
        /> </router-link
    ></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="mt-3" dark>
      <!--<div class="searchBar__container hidden-md-only">-->
      <div class="searchBar__container">
        <v-text-field
          label="Search"
          class="header__searchbar ml-3 mt-1 headline"
          placeholder="Search"
          full-width
          solo
          flat
          dense
          :background-color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
        ></v-text-field>
      </div>

      <div>
        <v-icon 
        :style="{color: toggleFontColor }"
        class="header__menuIcon"
        @click="toggleMenu"
        >mdi-menu</v-icon>
      </div>

      <v-card
        class="mx-auto header__menuIcon--lists"
        :class="this.display ? 'display' : 'noDisplay'"
        width="180"
        tile
      >
        <v-list-item class="listItem__marketSentiments">
          <router-link to="" class="no-transform"  :style="{color: toggleFontColor }">
            <v-list-item-title class="listItem__marketSentiments" >Market Sentiments</v-list-item-title>
          </router-link>
        </v-list-item>
       <v-list-item class="listItem__learn">
          <router-link to="" class="no-transform"  :style="{color: toggleFontColor }">
            <v-list-item-title class="listItem__learn">Learn</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item class="listItem__ideas">
         <router-link to="" class="no-transform"  :style="{color: toggleFontColor }">
            <v-list-item-title class="listItem__ideas">Ideas</v-list-item-title>
         </router-link>
        </v-list-item>
         <v-list-item class="listItem__bulletin">
          <router-link to="" class="no-transform"  :style="{color: toggleFontColor }">
            <v-list-item-title class="listItem__bulletin">Bulletin</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item class="listItem__powerTools">
          <router-link to="" class="no-transform"  :style="{color: toggleFontColor }">
            <v-list-item-title class="listItem__powerTools">Power Tools</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-card>
     
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
          ref="accountBtn"
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
<script>
import { mapActions, mapGetters } from "vuex";
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
      showDropdown: false,
      display: false,
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      stockList: "global/getStockList"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
    if (this.stockList.length == 0) {
      const params = {
        exchange: "PSE",
        status: "active",
        type: "stock"
      };
      this.$api.chart.stocks.list(params).then(
        function(result) {
          this.setStockList(result);
        }.bind(this)
      );
    }

    document.addEventListener('click', this.close);

  },
  beforeDestroy () {
    document.removeEventListener('click',this.close);
  },
  methods: {
    ...mapActions({
      setStockList: "global/setStockList"
    }),
    toggleMenu(){
      if(this.display ? this.display = false : this.display = true );
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.display = false;
        this.showDropdown = false;
      }
    }
  }
};
</script>
<style scoped>
.header__searchbar {
  transform: scale(0.5);
  transform-origin: top center;
  border-bottom: 1px solid;
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
.header__menuIcon{
  padding: 5px 15px;
}
.header__menuIcon:hover{
  cursor: pointer;
}
.noDisplay{
  display: none;
}
.display{
  display: block;
}
.header__menuIcon--lists{
  position: absolute;
  right: 325px;
  top: 30px;
  border: thin solid rgba(255, 255, 255, 0.12);
  box-shadow: 0px 5px 1px -2px rgba(0, 0, 0, 0.2), 0px 5px 2px 0px rgba(0, 0, 0, 0.14), 0px 15px 5px 0px rgba(0, 0, 0, 0.12)
}
.header__menuIcon--lists > .v-list-item{
  min-height: 38px !important;
  border-bottom: thin solid rgba(255, 255, 255, 0.02);
}
.header__menuIcon--lists > .v-list-item a > .v-list-item__title{
  font-size: 14px !important;
}
.listItem__marketSentiments:hover, 
.listItem__learn:hover, 
.listItem__ideas:hover,
.listItem__bulletin:hover,
.listItem__powerTools:hover{
 background-color: #03dac5;
 color: black;
}
.searchBar__container {
  width: 630px;
}
</style>

