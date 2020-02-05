<template>
  <v-toolbar
    :dark="lightSwitch == 0 ? false : true"
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    flat
    height="54"
    class="header__toolbar"
  >
    <v-toolbar-title>
      <router-link to="/">
        <img
          class="pl-2 pt-1"
          :src="lightSwitch == 0 ? '/logo-light.svg' : '/logo-dark.svg'"
          alt
          width="85"
          height="85"
        />
      </router-link>
    </v-toolbar-title>

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
          :style="{ color: toggleFontColor }"
          class="header__menuIcon"
          @click="toggleMenu"
          >mdi-menu</v-icon
        >
        <div
          :class="this.display ? 'display' : 'noDisplay'"
          class="userSettings__dropdown--caret"
        >
          <div
            class="empty"
            :class="this.lightSwitch == 0 ? 'caretLight' : 'caretDark'"
          ></div>
        </div>
      </div>

      <v-card
        class="mx-auto header__menuIcon--lists"
        :class="this.display ? 'display' : 'noDisplay'"
        width="180"
        tile
      >
        <v-list-item
          class="listItem__marketSentiments"
          :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
        >
          <router-link
            to
            class="no-transform"
            :style="{ color: toggleFontColor }"
          >
            <v-list-item-title class="listItem__marketSentiments"
              >Market Sentiments</v-list-item-title
            >
          </router-link>
        </v-list-item>
        <!--<v-list-item class="listItem__learn">
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
        </v-list-item>-->

        <v-list-item
          class="listItem__powerTools"
          :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
          @click="displayPowerTools = true"
          @mouseleave="displayPowerTools = false"
        >
          <router-link
            to
            class="no-transform"
            :style="{ color: toggleFontColor }"
          >
            <v-list-item-title class="listItem__powerTools"
              >Power Tools</v-list-item-title
            >
          </router-link>
        </v-list-item>
      </v-card>

      <v-card
        class="mx-auto header__menuIcon--powerTools"
        :class="this.displayPowerTools ? 'display' : 'noDisplay'"
        width="180"
        tile
        @mouseover="displayPowerTools = true"
        @mouseleave="displayPowerTools = false"
      >
        <v-list-item
          class="listItem__buySellCalc"
          :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
          @click.stop="buySellDialog = true"
        >
          <router-link
            to
            class="no-transform"
            :style="{ color: toggleFontColor }"
          >
            <v-list-item-title class="listItem__buySellCalc"
              >Buy/Sell Calculator</v-list-item-title
            >
          </router-link>
          <v-dialog v-model="buySellDialog" max-width="500">
            <BuySellCalculator />
          </v-dialog>
        </v-list-item>

        <v-list-item
          class="listItem__varCalc"
          :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
          @click.stop="varDialog = true"
        >
          <router-link
            to
            class="no-transform"
            :style="{ color: toggleFontColor }"
          >
            <v-list-item-title class="listItem__varCalc"
              >VAR Calculator</v-list-item-title
            >
          </router-link>
          <v-dialog v-model="varDialog" max-width="320">
            <VARCalculator :data="varDialog" />
          </v-dialog>
        </v-list-item>

        <v-list-item
          class="listItem__avCalc"
          :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
          @click.stop="averagePriceDialog = true"
        >
          <router-link
            to
            class="no-transform"
            :style="{ color: toggleFontColor }"
          >
            <v-list-item-title class="listItem__avCalc"
              >Average Price Calculator</v-list-item-title
            >
          </router-link>
          <v-dialog v-model="averagePriceDialog" max-width="350">
            <AveragePriceCalculator />
          </v-dialog>
        </v-list-item>
      </v-card>

      <a class="social__router">
        <v-btn
          ref="accountBtn"
          class="header__button"
          text
          @click="showNotification = !showNotification"
        >
          <v-badge :value="showBadge" color="success" small dot
            >Notification</v-badge
          >
        </v-btn>
      </a>
      <HeaderNotification
        v-if="showNotification && $auth.loggedIn"
        :data-notification="dataNotification"
        @clicked="closeDropdown"
      />

      <a :href="'https://vyndue.com'" target="_blank" class="social__router">
        <v-btn class="header__button" text>Vyndue</v-btn>
      </a>
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
          >{{
            $auth.loggedIn ? $auth.user.data.user.username : "Account"
          }}</v-btn
        >
      </a>
      <HeaderDropdown v-if="showDropdown && $auth.loggedIn" />
    </v-toolbar-items>

    <LoginRegister v-model="registerDialogModel" />
  </v-toolbar>
</template>
<script>
import {
  UserNotificationEventsList,
  AllNotificationEventsList
} from "~/assets/js/config/notification";
import { mapActions, mapGetters } from "vuex";
import LoginRegister from "~/components/LoginRegister";
import HeaderDropdown from "~/components/HeaderDropdown";
import HeaderNotification from "~/components/HeaderNotification";
import BuySellCalculator from "~/components/calculators/BuySellCalculator";
import AveragePriceCalculator from "~/components/calculators/AveragePriceCalculator";
import VARCalculator from "~/components/calculators/VARCalculator";

export default {
  components: {
    LoginRegister,
    HeaderDropdown,
    HeaderNotification,
    BuySellCalculator,
    AveragePriceCalculator,
    VARCalculator
  },
  props: ["ticks"],
  data: function() {
    return {
      type: Boolean
    };
  },
  data() {
    return {
      searchButtonIsVisible: true,
      isLightMode: 0,
      registerDialogModel: false,
      tab: null,
      showDropdown: false,
      showNotification: false,
      dataNotification: [],
      display: false,
      displayPowerTools: false,
      buySellDialog: false,
      averagePriceDialog: false,
      varDialog: false,
      numberPost: 0,
      showBadge: 0
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      notification: "global/getNotification",
      stockList: "global/getStockList"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    }
  },
  watch: {
    ticks() {
      this.initSSE();
    },
    notification() {
      this.newNotication();
    }
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

    document.addEventListener("click", this.close);

    this.getNotification();
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    ...mapActions({
      setStockList: "global/setStockList",
      setNotification: "global/setNotification",
      setNewPosts: "global/setNewPosts"
    }),
    userNotificationEventsList: UserNotificationEventsList,
    allNotificationEventsList: AllNotificationEventsList,
    toggleMenu() {
      if (this.display ? (this.display = false) : (this.display = true));
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.display = false;
        this.showDropdown = false;
        this.showNotification = false;
      }
    },
    closeDropdown() {
      this.showNotification = false;
    },
    newNotication() {
      const m = {
        meta: {}
      };
      m.meta = this.notification;
      const n = {
        notificable: {}
      };
      n.notificable = {
        ...m,
        message: this.notification._message,
        id: this.notification.post.id
      };
      this.dataNotification.unshift(n);
    },
    getNotification() {
      this.$api.social.notification.notifications().then(response => {
        if (response.success) {
          this.dataNotification = response.data.notifications;
        }
      });
      const params = {
        status: "unread"
      };
      this.$api.social.notification.count(params).then(response => {
        if (response.success) {
          if (response.data.notifications.length > 0) {
            this.showBadge = response.data.notifications.length;
          } else {
            this.showBadge = 0;
          }
        }
      });
    },
    initSSE() {
      /**
       * all notifications here
       */

      const sseToken =
        this.$auth.getToken("local") != false
          ? this.$auth.getToken("local").replace("Bearer ", "")
          : null;

      const evtSourceAll = new EventSource(
        `${process.env.STREAM_API_URL}/sse/notifications/all?token=${sseToken}`
      );

      const allNotificationList = this.allNotificationEventsList();

      allNotificationList.forEach(eventName => {
        evtSourceAll.addEventListener(eventName, e => {
          this.allNotificationHandler(eventName, JSON.parse(e.data));
        });
      });

      /**
       * this is for specific user notification
       *
       * @return  {object}  returns objects
       */
      if (this.$auth.user != null) {
        const evtSource = new EventSource(
          `${process.env.STREAM_API_URL}/sse/notifications/${this.$auth.user.data.user.uuid}/?token=${sseToken}`
        );

        const userNotificationList = this.userNotificationEventsList();

        userNotificationList.forEach(eventName => {
          evtSource.addEventListener(eventName, e => {
            this.notificationHandler(eventName, JSON.parse(e.data));
          });
        });
      }
    },
    notificationHandler(eventName, data) {
      this.setNotification(data);
    },
    /**
     * This will trigger if there is a global announcement
     * announcement are: New Post, New Comment on a Post, New Sentiments on a Post
     *
     * @param   {[type]}  eventName  [eventName description]
     * @param   {[type]}  data       [data description]
     *
     * @return  {[type]}             [return description]
     */
    allNotificationHandler(eventName, data) {
      switch (eventName) {
        case "social.post":
          this.numberPost += 1;
          const posts = {
            number_posts: this.numberPost,
            event_name: eventName,
            message: data.message
          };
          this.setNewPosts(posts);
          break;

        case "social.post.comment":
          const comment = {
            event_name: eventName,
            message: data.message,
            data: data.data
          };
          this.setNewPosts(comment);
          break;

        case "social.post.sentiment":
          const sentiment = {
            event_name: eventName,
            message: data.message,
            data: data.data
          };
          this.setNewPosts(sentiment);
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style>
@import "~/assets/css/scrollbar/style.css";
</style>
<style scoped>
.header__searchbar {
  transform: scale(0.6);
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
.header__menuIcon {
  padding: 5px 15px;
}
.header__menuIcon:hover {
  cursor: pointer;
}
.noDisplay {
  display: none;
}
.display {
  display: block;
}
.header__menuIcon--lists {
  position: absolute;
  right: 325px;
  top: 40px;
  border: thin solid rgba(255, 255, 255, 0.12);
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 4px 7px 4px rgba(0, 0, 0, 0.14), 0px 5px 5px 0px rgba(0, 0, 0, 0.12);
}
.header__menuIcon--lists > .v-list-item {
  min-height: 38px !important;
  border-bottom: thin solid rgba(255, 255, 255, 0.02);
}
.header__menuIcon--lists > .v-list-item a > .v-list-item__title {
  font-size: 14px !important;
}

.searchBar__container {
  width: 630px;
}
.userSettings__dropdown--caret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid rgb(182, 182, 182, 0.2);
  position: relative;
  right: -12px;
  top: -8px;
  z-index: -1;
}
.userSettings__dropdown--caret .empty {
  position: absolute;
  top: 3px;
  left: -21px;
  width: 0;
  /*border-bottom: solid 13px white; */
  border-right: solid 10px transparent;
  border-left: solid 21px transparent;
}

.header__menuIcon--powerTools {
  position: absolute;
  right: 325px;
  top: 117px;
  border: thin solid rgba(255, 255, 255, 0.12);
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 4px 7px 4px rgba(0, 0, 0, 0.14), 0px 5px 5px 0px rgba(0, 0, 0, 0.12);
}
.listItem__buySellCalc,
.listItem__varCalc,
.listItem__avCalc {
  font-size: 14px;
}

.darkModeHover:hover {
  background-color: #142530;
}
.lightModeHover:hover {
  background-color: #e5e5e5;
}

.header__menuIcon--powerTools > .v-list-item {
  min-height: 38px !important;
  border-bottom: thin solid rgba(255, 255, 255, 0.02);
}

.caretLight {
  position: absolute;
  top: 3px;
  left: -21px;
  width: 0;
  border-bottom: solid 13px white;
  border-right: solid 10px transparent;
  border-left: solid 21px transparent;
}
.caretDark {
  position: absolute;
  top: 3px;
  left: -21px;
  width: 0;
  border-bottom: solid 13px #222f39;
  border-right: solid 10px transparent;
  border-left: solid 21px transparent;
}
</style>
<style>
.header__searchbar
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input {
  font-size: 20px;
}
</style>
