<template>
  <v-container class="page__wrapper" :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }" dark>
    <v-row class="mb-5" no-gutters>
      <v-col class="navbar__container hidden-xs-only px-3" sm="2" md="2" lg="3">
        <Navbar active="social" />
      </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <v-card
          :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
          :dark="lightSwitch == 0 ? false : true"
          outlined
          class="userMessage__dropdown"
        >
          <v-container :dark="lightSwitch == 0 ? false : true" class="pa-0">
            <v-row no-gutters class="userMessage__dropdown-header">
              <span class="pa-4 pb-2 body-2">Notifications</span>
            </v-row>
            <v-list class="py-0 userMessage__dropdown-body scrollbar">
              <v-list-item
                v-for="(item, index) in dataNotification"
                :key="index"
                @click="linkTo(item.notificable.meta.post.id ? item.notificable.meta.post.id : '#', item.id)"
                two-line
                class="notification__item"
                :class="item.status"
              >
                <v-list-item-avatar class="mr-3" size="35">
                  <img
                    :src="item.notificable.meta.user.profile_image ? item.notificable.meta.user.profile_image : '/Icon/user-default.svg'"
                  />
                </v-list-item-avatar>

                <v-list-item-content class="py-2">
                  <v-list-item-subtitle class="body-2 ma-0 userMessage__dropdown-title">
                    <span class="body-2 ma-0 userMessage__message">{{ item.notificable.message }}</span>
                  </v-list-item-subtitle>
                  <span class="caption tertiary--text">{{ localFormat(item.created_at, "fn") }}</span>
                </v-list-item-content>

                <v-list-item-action></v-list-item-action>
              </v-list-item>
            </v-list>
            <v-row no-gutters class="userMessage__dropdown-footer text-center">
              <span class="pa-2 caption d-block seeall_dropdown-footer">See All</span>
            </v-row>
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

import { mapActions, mapGetters } from "vuex";

import { AddDynamicTime, LocalFormat } from "~/assets/js/helpers/datetime";

export default {
  layout: "main",
  components: {
    Navbar,
    WhoToMingle,
    FooterSidebar
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
      notification: "global/getNotification"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    }
  },
  watch: {
    notification() {
      this.newNotification();
    }
  },
  mounted() {
    if (process) {
      this.getNotification();
    }
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
    linkTo(post_id, notification_id) {
      /**
       * get post_id of a post, if post_id is null will get # params this is for now
       * until emman provide the activity name
       *
       * @return  {string}  returns string link
       */
      if (post_id != "#") {
        window.location.href = "/post/" + post_id;
      } else {
        window.location.href = post_id;
      }

      /**
       * Read flag notification
       */
      this.$api.social.notification.read(notification_id).then(response => {
        if (response.success) {
        }
      });
    },
    /**
     * will trigger if user has notification real-time then then unshift
     * to notification array
     *
     * @return  {object}  returns object data notification
     */
    newNotification() {
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
    }
  }
};
</script>