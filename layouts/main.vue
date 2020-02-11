<template>
  <v-app>
    <v-content :class="lightSwitch == 0 ? 'lightMode' : 'darkMode'">
      <rbHeader :ticks="ticks" class="header__container" />
      <v-container
        :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
        class="componentContainer"
      >
        <div v-show="showLamp">
          <img
            v-show="
              whiteMode == '/login/' || whiteMode == '/login' ? true : false
            "
            :class="lightSwitch == 1 ? 'lampDark__btn' : 'lampLight__btn'"
            :src="lampMode"
            @click="lampSwitch"
          />
        </div>
        <nuxt />
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
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import rbHeader from "~/components/Header";
import { UserNotificationAlertLayout } from "~/assets/js/helpers/notification";
import { SnotifyPosition, SnotifyStyle } from "vue-snotify";

export default {
  components: {
    rbHeader
  },
  data() {
    return {
      isLightMode: 0,
      notificationQueue: [],
      notificationAlert: true,
      notificationTimeout: 100000,
      ticks: 1,
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
        const user = this.notification.user;
        this.$snotify.html(
          this.userNotificationAlertLayout(
            user.profile_image,
            this.notification._message,
            this.notification.post.id
          ),
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
    if (localStorage.currentMode) {
      this.setLightSwitch(localStorage.currentMode);
    }
    /**
     * For avoid duplicating mount need to refactor
     */
    this.$nextTick(() => {
      this.ticks = 2;
    });
    this.whiteMode = window.location.pathname;

    this.lightSwitch_m = this.lightSwitch == 0 ? true : false;
  },
  methods: {
    ...mapActions({
      setLightSwitch: "global/setLightSwitch"
    }),
    userNotificationAlertLayout: UserNotificationAlertLayout,
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
.lampDark__btn {
  z-index: 100;
  position: absolute;
  width: 8%;
  top: 0;
  right: 340px;
}
.lampLight__btn {
  z-index: 100;
  position: absolute;
  width: 44%;
  top: 0;
  right: 131px;
}
.componentContainer {
  position: relative;
}
</style>
