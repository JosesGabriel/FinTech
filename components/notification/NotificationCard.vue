<template>
  <v-list-item
    @click="linkTo(notification.id)"
    class="notification__item py-1"
    :class="notification.status"
  >
    <v-list-item-avatar class="mr-3" size="35">
      <!-- if notification is specific user notification -->
      <img
        v-if="notification.notificable"
        :src="typeof data !== 'undefined'
      ? data.meta.user.profile_image
      : 'default.png'"
      />
      <!-- if notification is watchlist notification -->
      <span v-if="notification.stock">{{ data.id }}</span>
    </v-list-item-avatar>

    <v-list-item-content class="listItem__content py-1">
      <div class="body-2 ma-0 userMessage__dropdown-title">
        <span
          v-if="notification.notificable"
          class="body-2 ma-0 userMessage__message caption"
        >{{ notification.notificable.message }}</span>
        <span
          v-if="notification.stock ? data.trigger === 'Entry Price' : ''"
          class="body-2 ma-0 userMessage__message caption"
        >{{ entry.first_message + data.id + entry.second_message + ' Current price is now ₱' + data.executed_price }}</span>
        <span
          v-else-if="notification.stock ? data.trigger === 'Take Profit' : ''"
          class="body-2 ma-0 userMessage__message caption"
        >{{ take.first_message + data.id + entry.second_message + ' Current price is now ₱' + data.executed_price }}</span>
        <span
          v-else-if="notification.stock ? data.trigger === 'Stop Lost' : ''"
          class="body-2 ma-0 userMessage__message caption"
        >{{ stop.first_message + data.id + entry.second_message + ' Current price is now ₱' + data.executed_price }}</span>
      </div>
      <span class="caption tertiary--text">{{ localFormat(notification.created_at, "fn") }}</span>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { AddDynamicTime, LocalFormat } from "~/assets/js/helpers/datetime";

export default {
  props: {
    notification: {
      default() {
        return {};
      },
      type: Object
    }
  },
  computed: {
    data() {
      return typeof this.notification.notificable !== "undefined"
        ? this.notification.notificable
        : typeof this.notification.stock !== "undefined"
        ? this.notification.stock
        : "";
    }
  },
  data() {
    return {
      entry: {
        first_message: "Your entry price for ",
        second_message: " is hit. Buy now."
      },
      take: {
        first_message: "Your take profit price for ",
        second_message: " is hit. Sell now."
      },
      stop: {
        first_message: "Your cut loss price for ",
        second_message: " is hit. Sell now."
      }
    };
  },
  methods: {
    localFormat: LocalFormat,
    addDynamicTime: AddDynamicTime,

    /**
     * building link for each item
     *
     * @param   {string}  post_id          carries the post id
     * @param   {string}  notification_id  carries the notification id
     *
     * @return  {string}                   returns the build link
     */
    linkTo(notification_id) {
      /**
       * Read flag notification
       */
      this.$api.social.notification.read(notification_id).then(response => {
        if (response.success) {
          this.notification.status = "read";
          if (typeof this.notification.notificable !== "undefined") {
            window.location = this.notification.notificable.meta.post
              ? "/post/" + this.data.meta.post.id
              : "/profile/" + this.data.meta.user.username;
          } else {
            window.location = "/watchlist"
          }
        }
      });
    }
  }
};
</script>