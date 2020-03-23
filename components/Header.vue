<template>
  <v-toolbar
    :dark="lightSwitch == 0 ? false : true"
    :class="lightSwitch == 0 ? 'lightcard' : 'darkchart'"
    flat
    height="54"
    class="header__toolbar"
  >
    <v-toolbar-title>
      <router-link to="/">
        <img
          class="pl-2 pt-1"
          :src="lightSwitch == 0 ? '/logo-dark.svg' : '/logo-light.svg'"
          alt
          width="125"
          height="auto"
        />
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="mt-3" dark>
      <HeaderMenu v-if="showHeaderMenu" class="headerMenu" />
      <HeaderNotification
        v-if="showNotification && $auth.loggedIn"
        :data-notification="dataNotification"
        @clicked="closeDropdown"
      />
      <a
        v-if="$auth.loggedIn ? true : false"
        small
        :dark="lightSwitch == 0 ? false : true"
        icon
        class="social__router pt-4"
        @click="
          (showHeaderMenu = !showHeaderMenu),
            (showNotification = false),
            (showDropdown = false)
        "
      >
        <v-icon>mdi-menu</v-icon>
      </a>
      <a v-show="$auth.loggedIn ? true : false" class="social__router">
        <v-btn
          ref="accountBtn"
          class="header__button"
          text
          @click="
            (showNotification = !showNotification),
              (showHeaderMenu = false),
              (showDropdown = false),
              showBadge = 0
          "
        >
          <v-badge
            :value="showBadge"
            :content="showBadge"
            class="header__button notif__counter-badge font-weight-black no-transform body-2"
            color="error"
            small
          >Notification</v-badge>
        </v-btn>
      </a>

      <a
        v-show="$auth.loggedIn ? true : false"
        href="https://vyndue.lyduz.com"
        target="_blank"
        class="social__router"
      >
        <v-btn class="header__button no-transform font-weight-black body-2" text>
          <v-badge
            content="TRY"
            offset-x="23"
            offset-y="-1"
            dark
            left
            class="header__button font-weight-black no-transform vyndue__badge"
            color="transparent"
            small
          ></v-badge>Vyndue
        </v-btn>
      </a>
      <a v-show="$auth.loggedIn ? true : false" class="social__router">
        <v-btn
          ref="accountBtn"
          class="header__button no-transform font-weight-black body-2"
          text
          @click="
            $auth.loggedIn
              ? (showDropdown = !showDropdown)
              : (registerDialogModel = true),
              (showHeaderMenu = false),
              (showNotification = false)
          "
        >{{ $auth.loggedIn ? $auth.user.data.user.first_name : "Account" }}</v-btn>
      </a>
    </v-toolbar-items>

    <HeaderDropdown v-if="showDropdown && $auth.loggedIn" />
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
import HeaderDropdown from "~/components/header/HeaderDropdown";
import HeaderMenu from "~/components/header/HeaderMenu";
import HeaderNotification from "~/components/header/HeaderNotification";

export default {
  components: {
    LoginRegister,
    HeaderDropdown,
    HeaderNotification,
    HeaderMenu
  },
  data() {
    return {
      searchButtonIsVisible: true,
      isLightMode: 0,
      registerDialogModel: false,
      showDropdown: false,
      showNotification: false,
      showHeaderMenu: false,
      dataNotification: [],
      display: false,
      numberPost: 0,
      showBadge: 0,
      whiteMode: null,
      evtSourceAll: null,
      evtSource: null
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      notification: "global/getNotification",
      stockList: "global/getStockList"
    })
  },
  watch: {
    /**
     * Increment value on notif status set to localstorage
     *
     * @return  {returns}  returns increment number 1 step per notification
     */
    notification() {
      this.newNotication();
      let notifCounter = parseFloat(localStorage.notificationStatus);
      localStorage.notificationStatus = notifCounter += 1;
    },
    /**
     * Fires when shownotification or notif dropdown modals try to false
     * Set showbadge to 0, hide
     *
     * @return  {number}  returns number of notification
     */
    showNotification() {
      this.showBadge = 0;
      localStorage.notificationStatus = 0;
    }
  },
  mounted() {
    this.checkNotificationStatus();
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
    this.evtSource.close();
    this.evtSourceAll.close();
  },
  methods: {
    ...mapActions({
      setStockList: "global/setStockList",
      setNotification: "global/setNotification",
      setNewPosts: "global/setNewPosts"
    }),
    userNotificationEventsList: UserNotificationEventsList,
    allNotificationEventsList: AllNotificationEventsList,
    /**
     * trigger when user clicked outside the notification dropdown
     *
     * @param   {Event}  e  event
     *
     * @return  {Boolean}     returns boolean to all showed dropdown
     */
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.display = false;
        this.showDropdown = false;
        this.showNotification = false;
        this.showHeaderMenu = false;
      }
    },
    /**
     * trigger when user click again the notification navbar
     *
     * @return  {Boolean}  returns boolean to notification dropdown
     */
    closeDropdown() {
      this.showNotification = false;
      this.showBadge = 0;
      localStorage.notificationStatus = 0;
    },
    /**
     * Trigger when user has new notification user notification and watchlist
     * Manipulation of data when new notification come
     *
     * @return  {Object}  returns object
     */
    newNotication() {
      const m = {
        meta: {}
      };
      m.meta = this.notification;
      let n = {
        notificable: {},
        id: null,
        status: "unread"
      };
      if (typeof this.notification.post !== "undefined") {
        n.notificable = {
          ...m,
          message: this.notification._message,
          id: this.notification.post.id
        };
        n.id = this.notification.notification.id;
      } else if (
        typeof this.notification.user !== "undefined" &&
        typeof this.notification.post === "undefined"
      ) {
        n.notificable = {
          ...m,
          message: this.notification._message
        };
        n.id = this.notification.notification.id;
      } else if (typeof this.notification.stock !== "undefined") {
        n = this.notification;
      }
      this.dataNotification.unshift(n);
      this.showBadge += 1;
    },
    /**
     * Fires when mounted, just wrap it in a function so that the mounted will be clean & clear
     *
     * @return
     */
    checkNotificationStatus() {
      if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
      if (localStorage.notificationStatus)
        this.showBadge = parseFloat(localStorage.notificationStatus);

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
      this.whiteMode = window.location.pathname;
      document.addEventListener("click", this.close);
      this.getNotification();
      this.initSSE();
    },
    /**
     * get fetched notification on load
     *
     * @return  {Array}  returns user specific notification
     */
    getNotification() {
      this.$api.social.notification.notifications().then(response => {
        if (response.success) {
          this.dataNotification = response.data.notifications;
        }
      });
    },
    /**
     * Stream of All, User specific, and Watchlist notification
     *
     * @return  {Object}  returns object
     */
    initSSE() {
      if (this.evtSourceAll !== null && this.evtSource !== null) {
        this.evtSourceAll.close();
        this.evtSource.close();
      }
      /**
       * all notifications here
       */
      const sseToken =
        this.$auth.getToken("local") != null &&
        this.$auth.getToken("local") != false
          ? this.$auth.getToken("local").replace("Bearer ", "")
          : null;

      this.evtSourceAll = new EventSource(
        `${process.env.STREAM_API_URL}/sse/notifications/all?token=${sseToken}`
      );

      const allNotificationList = this.allNotificationEventsList();

      allNotificationList.forEach(eventName => {
        this.evtSourceAll.addEventListener(eventName, e => {
          this.allNotificationHandler(eventName, JSON.parse(e.data));
        });
      });

      /**
       * this is for specific user notification
       *
       * @return  {object}  returns objects
       */
      if (typeof this.$auth != "undefined" && this.$auth.user != null) {
        this.evtSource = new EventSource(
          `${process.env.STREAM_API_URL}/sse/notifications/${this.$auth.user.data.user.uuid}?token=${sseToken}`
        );

        const userNotificationList = this.userNotificationEventsList();

        userNotificationList.forEach(eventName => {
          this.evtSource.addEventListener(eventName, e => {
            this.notificationHandler(eventName, JSON.parse(e.data));
          });
        });
      }
    },
    /**
     * catch notification that from social activity and watchlist
     *
     * @param   {String}  eventName  returns string event name
     * @param   {Object}  data       returns object from stream and filtered notification
     *
     * @return  {Object}             return object with customized props pass it to notification state to make it global
     */
    notificationHandler(eventName, data) {
      if (typeof data.stock !== "undefined") {
        data.stock = { ...data.stock, symbol: "" };
        const filteredStocksEntry = this.stockList.data.filter(stock => {
          return stock.id_str == data.stock.id;
        });
        data.stock.symbol = filteredStocksEntry[0].symbol;
      }
      this.setNotification(data);
    },
    /**
     * This will trigger if there is a global announcement
     * announcement are: New Post, New Comment on a Post, New Sentiments on a Post
     *
     * @param   {String}  eventName  returns string event name
     * @param   {Object}  data       returns object data
     *
     * @return  {Object}             returns object data and pass it to notification vuex state
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
.social__router {
  text-decoration: none;
  display: inline-flex;
  height: 0;
}
.header__toolbar {
  position: fixed !important;
  width: 100%;
  z-index: 100;
  background-color: #00121e;
  border-bottom: 1px white;
}
.headerMenu {
  position: relative;
  top: 40px;
  left: 35px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.vyndue__badge .v-badge__wrapper .v-badge__badge {
  color: #f44336;
  font-size: 10px;
}
.notif__counter-badge span.v-badge__badge {
  padding: 3px 0 !important;
  height: 13px;
  min-width: 13px;
  font-size: 8px;
}
</style>
