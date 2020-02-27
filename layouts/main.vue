<template>
  <v-app>
    <v-content :class="lightSwitch == 0 ? 'lightMode' : 'darkMode'">
      <client-only>
        <Header class="header__container" />
      </client-only>
      <v-container
        v-show="!$device.isMobileOrTablet"
        :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
        class="componentContainer"
      >
        <div v-show="showLamp" class="lampBtn">
          <!-- :class="lightSwitch == 1 ? 'lampDark__btn' : 'lampLight__btn'" -->
          <img :src="lampMode" @click="lampSwitch" />
          <img
            :class="lightSwitch == 1 ? 'd-none' : ''"
            class="lightRays_img"
            src="/Lamp-LightRays.svg"
          />
        </div>
        <client-only>
          <nuxt />
        </client-only>
      </v-container>
      <v-snackbar
        v-model="alert.model"
        :color="alert.state ? 'success' : 'error'"
      >
        {{ alert.message }}
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
          <v-icon class="alertDialog__icon" x-large color="success"
            >mdi-check</v-icon
          >
        </div>
        <v-card class="alertDialog__card">
          <v-card-title
            class="headline text-center d-block success--text alertDialog__title"
            :class="alertDialog.state ? 'success--text' : 'error--text'"
            >{{ alertDialog.header }}</v-card-title
          >

          <v-card-text
            class="text-center"
            :class="alertDialog.state ? 'success--text' : 'error--text'"
            >{{ alertDialog.body }}</v-card-text
          >
          <v-card-text class="text-center">{{
            alertDialog.subtext
          }}</v-card-text>
        </v-card>
      </v-dialog>
      <!-- dont remove -->
      <div v-show="false" id="tv_chart_container"></div>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  UserNotificationAlertLayout,
  AllNotificationAlertLayout
} from "~/assets/js/helpers/notification";
import { SnotifyPosition, SnotifyStyle } from "vue-snotify";

import Header from "~/components/Header";

export default {
  components: {
    Header
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
  middleware: "isMobileOrTablet",
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
      notification: "global/getNotification"
    }),
    lampMode() {
      return this.lightSwitch == 1
        ? "/Lamp-Darkmode.svg"
        : "/Lamp-Lightmode.svg";
    },
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
  mounted() {
    this.$fb.enable();
    if (localStorage.currentMode) {
      this.setLightSwitch(localStorage.currentMode);
    }

    this.lightSwitch_m = this.lightSwitch == 0 ? true : false;
    // this.showAnnouncements();
  },
  methods: {
    ...mapActions({
      setLightSwitch: "global/setLightSwitch"
    }),
    userNotificationAlertLayout: UserNotificationAlertLayout,
    allNotificationAlertLayout: AllNotificationAlertLayout,
    lampSwitch() {
      let lampMode = localStorage.currentMode;

      this.setLightSwitch(lampMode == 1 ? 0 : 1);
      localStorage.currentMode = this.lightSwitch;
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
}
</style>
