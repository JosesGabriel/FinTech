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
        @click="(showHeaderMenu = !showHeaderMenu), (showNotification = false)"
      >
        <v-icon>mdi-menu</v-icon>
      </a>
      <a v-show="$auth.loggedIn ? true : false" class="social__router">
        <v-btn
          ref="accountBtn"
          class="header__button"
          text
          @click="
            (showNotification = !showNotification), (showHeaderMenu = false)
          "
        >
          <v-badge
            :value="showBadge"
            class="header__button font-weight-black no-transform body-2"
            color="error"
            small
            dot
            >Notification</v-badge
          >
        </v-btn>
      </a>

      <a
        v-show="$auth.loggedIn ? true : false"
        href="https://vyndue.lyduz.com"
        target="_blank"
        class="social__router"
      >
        <v-btn class="header__button no-transform font-weight-black body-2" text
          >Vyndue</v-btn
        >
      </a>
      <a v-show="$auth.loggedIn ? true : false" class="social__router">
        <v-btn
          ref="accountBtn"
          class="header__button no-transform font-weight-black body-2"
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
    this.whiteMode = window.location.pathname;
    document.addEventListener("click", this.close);
    this.getNotification();
    this.initSSE();
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
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.display = false;
        this.showDropdown = false;
        this.showNotification = false;
        this.showHeaderMenu = false;
      }
    },
    closeDropdown() {
      this.showNotification = false;
      this.showBadge = 0;
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
      if (this.evtSourceAll !== null && this.evtSource !== null) {
        this.evtSourceAll.close();
        this.evtSource.close();
      }
      /**
       * all notifications here
       */
      const sseToken =
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
</style>
