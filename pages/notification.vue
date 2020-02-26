<template>
  <v-container class="page__wrapper" :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }" dark>
    <v-row class="mb-5" no-gutters>
      <v-col class="navbar__container hidden-xs-only px-3" sm="2" md="2" lg="3">
        <Navbar active="social" />
      </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <v-row
          no-gutters
          class="userMessage__dropdown-header pb-2"
          :class="lightSwitch == 0 ? 'black--text' : 'secondary--text'"
        >
          <span class="pa-4 pl-0 pb-2 body-2 font-weight-bold">Notifications</span>
          <v-spacer></v-spacer>
          <span
            @click="markAllRead"
            class="markAll_btn tertiary--text caption pa-4 pr-1 pb-2"
          >Mark all as read</span>
        </v-row>
        <v-card
          :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
          :dark="lightSwitch == 0 ? false : true"
          outlined
          class="userMessage_container"
        >
          <v-container :dark="lightSwitch == 0 ? false : true" class="pa-0">
            <v-list class="py-0 userMessage__dropdown-body scrollbar">
              <PageNotificationCard
                v-for="(item, index) in dataNotification"
                :key="index"
                :notification="item"
              />
            </v-list>
          </v-container>
        </v-card>
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
        <WhoToMingle />
        <FooterSidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from "~/components/Navbar";
import WhoToMingle from "~/components/WhoToMingle";
import FooterSidebar from "~/components/FooterSidebar";
import PageNotificationCard from "~/components/notification/PageNotificationCard";

import { mapActions, mapGetters } from "vuex";

import { AddDynamicTime, LocalFormat } from "~/assets/js/helpers/datetime";

export default {
  layout: "main",
  components: {
    Navbar,
    WhoToMingle,
    FooterSidebar,
    PageNotificationCard
  },
  head() {
    return {
      title: "Notification",
      meta: [
        {
          hid: "notification"
        }
      ]
    };
  },
  data() {
    return {
      isOpen: true,
      dataNotification: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      notification: "global/getNotification",
      markAll: "global/getMarkAll"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
    /**
     * transfer data to meta to make code shorter.
     *
     * @return  {Object}  returns object
     */
    meta() {
      return this.notification.notificable.meta;
    }
  },
  watch: {
    notification() {
      this.newNotication();
    },
    markAll() {
      this.dataNotification.filter(x => (x.status = "read"));
    }
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    localFormat: LocalFormat,
    addDynamicTime: AddDynamicTime,
    /**
     * get the user notification history on mounted
     *
     * @return  {array}  returns array of notification data
     */
    getNotification() {
      this.$api.social.notification.notifications().then(response => {
        if (response.success) {
          this.dataNotification = response.data.notifications;
        }
      });
    },
    /**
     * building link for each item
     *
     * @param   {string}  post_id          carries the post id
     * @param   {string}  notification_id  carries the notification id
     *
     * @return  {string}                   returns the build link
     */
    linkTo(id, notification_id) {
      /**
       * Read flag notification
       */
      this.$api.social.notification.read(notification_id).then(response => {
        if (response.success) {
          this.dataNotification.status = "read";

          const statusId = id.split(",");
          if (statusId[0] == "user") {
            window.location = "/profile/" + statusId[1];
          } else if (statusId[0] == "post") {
            window.location = "/post/" + statusId[1];
          }
        }
      });
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
    },

    markAllRead() {
      this.dataNotification.filter(x =>
        x.status == "unread" ? (x.status = "read") : (x.status = "read")
      );

      this.$api.social.notification.markall().then(response => {
        if (response.success) {
        }
      });
    }
  }
};
</script>
<style scoped>
.userMessage_container {
  overflow: hidden;
}
.markAll_btn {
  cursor: pointer;
}
</style>