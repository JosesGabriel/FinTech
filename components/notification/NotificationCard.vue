<template>
  <v-list-item
    @click="linkTo(notification.notificable.meta.post.id ? notification.notificable.meta.post.id : '#', notification.id)"
    class="notification__item py-1"
    :class="notification.status"
  >
    <v-list-item-avatar class="mr-3" size="35">
      <img :src="profileImage" />
    </v-list-item-avatar>

    <v-list-item-content class="listItem__content py-1">
      <div class="body-2 ma-0 userMessage__dropdown-title">
        <span class="body-2 ma-0 userMessage__message caption">{{ notification.notificable.message }}</span>
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
    user() {
      return this.notification.notificable.meta.user;
    },
    profileImage() {
      return this.user.profile_image
        ? this.user.profile_image
        : "/Icon/user-default.svg";
    }
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
    }
  },
  created() {
    /**
     * set interval dinamic time changing on posts
     * 10000ms interval
     */
    // setInterval(() => {
    //   this.notification.map(
    //     x => (x.created_at = this.addDynamicTime(x.created_at))
    //   );
    // }, 10000);
  }
};
</script>