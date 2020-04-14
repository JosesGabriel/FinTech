<template>
  <v-app
    v-touch="{
        left: () => putSwipe('Left'),
        right: () => putSwipe('Right'),
        up: () => putSwipe('Up'),
        down: () => putSwipe('Down')
      }"
  >
    <v-content :class="lightSwitch == 0 ? 'lightMode' : 'darkMode'">
      <client-only>
        <Header class="header__container" />
      </client-only>
      <v-container
        :class="{ 'pa-0': $vuetify.breakpoint.xsOnly}"
        :fluid="$route.path == '/login/'"
        class="componentContainer"
      >
        <div v-if="showLamp" class="lampBtn" :class="{'d-none': $vuetify.breakpoint.smAndDown}">
          <img :src="lampMode" @click="lampSwitch" />
          <img
            :class="[lightSwitch == 1 ? 'd-none' : '', {'pr-5':  $vuetify.breakpoint.mdOnly}]"
            class="lightRays_img"
            src="/Lamp-LightRays.svg"
          />
        </div>
        <client-only>
          <nuxt />
        </client-only>
      </v-container>
      <v-snackbar v-model="alert.model" :color="alert.state ? 'success' : 'error'">
        {{ alert.message }}
        <span v-if="alert.redirect" class="d-block pl-1">
          <a
            :href="alert.redirect"
            class="no-transform font-weight-bold white--text pr-1"
          >Click here</a>to redirect to login page.
        </span>
        <v-btn color="white" text @click="alert.model = false">Close</v-btn>
      </v-snackbar>
      <vue-snotify></vue-snotify>

      <v-dialog
        v-model="alertDialog.model"
        content-class="alertDialog"
        max-width="325"
        :dark="lightSwitch == 0 ? false : true"
      >
        <div class="d-grid alertDialog__icon--wrapper">
          <v-icon class="alertDialog__icon" x-large color="success">mdi-check</v-icon>
        </div>
        <v-card class="alertDialog__card">
          <v-card-title
            class="headline text-center d-block success--text alertDialog__title"
            :class="alertDialog.state ? 'success--text' : 'error--text'"
          >{{ alertDialog.header }}</v-card-title>

          <v-card-text
            class="text-center"
            :class="alertDialog.state ? 'success--text' : 'error--text'"
          >{{ alertDialog.body }}</v-card-text>
          <v-card-text class="text-center">{{ alertDialog.subtext }}</v-card-text>
        </v-card>
      </v-dialog>
      <client-only>
        <VyndueDock v-if="$route.name != 'login' && $route.name != 'sso'" />
      </client-only>
      <!-- dont remove -->
      <div v-show="false" id="tv_chart_container"></div>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
import { SnotifyPosition, SnotifyStyle } from "vue-snotify";
import {
  UserNotificationAlertLayout,
  AllNotificationAlertLayout
} from "~/assets/js/helpers/notification";

import Header from "~/components/Header";
import VyndueDock from "~/components/vyndue/Dock";

export default {
  components: {
    Header,
    VyndueDock
  },
  data() {
    return {
      isLightMode: 0,
      notificationQueue: [],
      notificationAlert: true,
      notificationTimeout: 100000,
      whiteMode: null,
      lampBtn: false
    };
  },
  middleware: ["isMobileOrTablet", "isTokenExpired"],
  head() {
    return {
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      alert: "global/getAlert",
      favicon: "global/favicon",
      alertDialog: "global/getAlertDialog",
      notification: "global/getNotification",
      user: "vyndue/getUser",
      clientIsPrepared: "vyndue/getClientIsPrepared",
      swipe: "global/getSwipe"
    }),
    /**
     * Switch lamp image button base on current theme mode
     *
     * @return  {string}  returns image url string
     */
    lampMode() {
      return this.lightSwitch == 1
        ? "/Lamp-Darkmode.svg"
        : "/Lamp-Lightmode.svg";
    },
    /**
     * Show this lamp image only on following route
     *
     * @return  {boolean}  returns boolean
     */
    showLamp() {
      let lampBtn;
      if (this.$route.path == "/login/" || this.$route.path == "/login") {
        lampBtn = true;
      } else {
        lampBtn = false;
      }
      return lampBtn;
    }
  },
  watch: {
    /**
     * gets current logged in vyndue user data and sets is to the 'user' vuex state
     * then calls function to get initial room
     *
     * @return
     */
    clientIsPrepared() {
      const user = client.getUser(client.getUserId());
      user.avatarUrl = client.mxcUrlToHttp(user.avatarUrl, 40, 40, "crop");
      this.setVyndueUser({
        userId: user.userId,
        displayName: user.rawDisplayName,
        avatarUrl: user.avatarUrl
      });
      this.getInitialRoom();
    },
    /**
     * This function it'll only show if user received notifications
     * Also used helpers this.userNotificationAlertLayout it'll return html code
     * based on the user notification
     *
     * @return  returns alert
     */
    notification() {
      if (this.notification) {
        this.$snotify.html(
          this.userNotificationAlertLayout(this.notification),
          {
            timeout: 5000,
            showProgressBar: false,
            pauseOnHover: true,
            position: SnotifyPosition.leftBottom,
            newItemsOnTop: false,
            config: {
              closeOnClick: true
            }
          }
        );
      }
    }
  },
  beforeMount() {
    this.prepareClient();
  },
  mounted() {
    if (localStorage.currentMode) {
      this.setLightSwitch(localStorage.currentMode);
    }

    this.lightSwitch_m = this.lightSwitch == 0 ? true : false;
  },
  methods: {
    ...mapActions({
      setLightSwitch: "global/setLightSwitch",
      setClientIsPrepared: "vyndue/setClientIsPrepared",
      setVyndueUser: "vyndue/setVyndueUser",
      setCurrentRoom: "vyndue/setCurrentRoom",
      setSwipe: "global/setSwipe"
    }),
    userNotificationAlertLayout: UserNotificationAlertLayout,
    allNotificationAlertLayout: AllNotificationAlertLayout,
    /**
     * Toggle lamp base on current on theme mode
     *
     * @return  {boolean}  returns boolean
     */
    lampSwitch() {
      let lampMode = localStorage.currentMode;

      this.setLightSwitch(lampMode == 1 ? 0 : 1);
      localStorage.currentMode = this.lightSwitch;
    },
    /**
     * fires on beforeMount hook
     * Waits until Matrix client emits 'sync' event.
     * If it is prepared, set vuex variable clientIsPrepared to true
     *
     * @return
     */
    prepareClient() {
      client.once("sync", state => {
        if (state === "PREPARED") {
          this.setClientIsPrepared(true);
        } else {
          process.exit(1);
        }
      });
    },
    /**
     * gets initial chat room to be loaded, currently set to 'Lyduz Public Community'
     *
     * @return
     */
    getInitialRoom() {
      const currentRoom = client.getRoom(process.env.DEFAULT_CHAT_ROOM_ID);
      currentRoom.avatarUrl = currentRoom.getAvatarUrl(
        client.getHomeserverUrl(),
        40,
        40,
        "crop"
      );
      this.setCurrentRoom({
        roomId: currentRoom.roomId,
        displayName: currentRoom.name,
        avatarUrl: currentRoom.avatarUrl
      });
    },
    /**
     * Set directives to state globally
     *
     * @param   {string}  direction  returns string directive
     *
     * @return  {string}             returns string
     */
    putSwipe(direction) {
      this.setSwipe(direction);
    }
  }
};
</script>

<style>
@import "~/assets/css/scrollbar/style.css";

.theme--dark.v-sheet {
  background-color: #00121e;
}
.darkMode {
  background-color: #00121e;
}
.lightMode {
  background-color: #f2f2f2;
}
.lightWhiteMode {
  background-color: #fafafa;
}
.transparent__bg {
  background-color: transparent !important;
}
.text__secondary--light {
  color: #494949;
}
.alertDialog {
  box-shadow: none;
}
.alertDialog__title {
  padding-top: 50px !important;
}
.alertDialog__icon--wrapper {
  padding: 0 125px;
}
.alertDialog__icon {
  background-color: #142530;
  font-size: 50px !important;
  padding: 10px;
  border-radius: 50px;
  position: relative;
  top: 40px;
  z-index: 1;
}
.header__container {
  position: relative;
}
.lampBtn {
  z-index: 100;
  position: absolute;
  width: 8%;
  top: 0;
  right: 340px;
}
.lightRays_img {
  position: relative;
  z-index: 9999;
  width: 350px;
  right: 129px;
  top: -18px;
}
.componentContainer {
  position: relative;
  margin-bottom: 38px;
  height: 100%;
}
</style>
