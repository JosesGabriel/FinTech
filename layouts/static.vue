<template>
  <v-app class="gameGlobal" :style="{ background: cardBackground }">
    <Header :ticks="ticks" />
    <v-row no-gutters class="mt-12">
      <v-col class="col-12">
        <v-content>
          <nuxt />
        </v-content>
      </v-col>
    </v-row>
    <v-footer :color="cardBackground" class="font-weight-medium pt-10 pb-4">
      <v-col
        class="text-center"
        cols="12"
        :class="[
          { light_mode: lightSwitch == 0 },
          { dark_mode: lightSwitch == 1 }
        ]"
      >
        <v-content class="mb-2">
          <v-hover v-slot:default="{ hover }">
            <v-btn icon x-large>
              <v-icon size="40" :color="!hover ? textColor : 'success'"
                >mdi-facebook</v-icon
              >
            </v-btn>
          </v-hover>
          <v-hover v-slot:default="{ hover }">
            <v-btn icon x-large>
              <v-icon size="40" :color="!hover ? textColor : 'success'"
                >mdi-twitter</v-icon
              >
            </v-btn>
          </v-hover>
        </v-content>
        <v-content>
          <router-link tag="span" to="/privacy-policy">
            <span class="footer__links caption">Privacy Policy</span>
          </router-link>
          •
          <router-link tag="span" to="/terms-of-use">
            <span class="footer__links caption">Terms of Use</span>
          </router-link>
          •
          <router-link tag="span" to="/contact-us">
            <span class="footer__links caption">Contact Us</span>
          </router-link>
          •
          <router-link tag="span" to="/about-us">
            <span class="footer__links caption">About Us</span>
          </router-link>
          <br />
          <span class="caption">Copyright © 2020 Lyduz</span>
        </v-content>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/Header";
import { UserNotificationAlertLayout } from "~/assets/js/helpers/notification";

export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      notification: "global/getNotification"
    }),
    /**
     * toggle between ligth/dark mode
     *
     * @return  {String}
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    /**
     * toggle between ligth/dark mode
     *
     * @return  {String}
     */
    textColor() {
      return this.lightSwitch == 0 ? "#455A64" : "#eeeeee";
    }
  },
  data() {
    return {
      ticks: 1
    };
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
      const user = this.notification.user;
      this.$snotify.html(
        this.userNotificationAlertLayout(
          user.profile_image,
          this.notification._message
        ),
        {
          timeout: 10000,
          showProgressBar: false,
          pauseOnHover: true,
          config: {
            newItemsOnTop: false,
            closeOnClick: true
          }
        }
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ticks = 2;
    });
  },
  methods: {
    userNotificationAlertLayout: UserNotificationAlertLayout
  }
};
</script>

<style>
.gameGlobal ::-webkit-scrollbar {
  width: 5px;
}
.gameGlobal ::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}
.gameGlobal ::-webkit-scrollbar-thumb {
  background: #03dac5;
  border-radius: 20px;
}
.gameGlobal ::-webkit-scrollbar-thumb:hover {
  background: #03dac5;
}
.content__main {
  display: flex;
  height: calc(100vh - 52px);
}
.footer__links {
  cursor: pointer;
}
.light_mode {
  color: #455a64 !important;
}
.dark_mode {
  color: #eeeeee !important;
}
.footer__links:hover {
  color: #03dac5;
}
</style>
