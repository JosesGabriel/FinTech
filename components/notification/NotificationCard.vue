<template>
  <router-link :to="link" class="no-transform">
    <v-list-item @click three-line class="notification__item" :class="notification.status">
      <v-list-item-avatar class="mr-3" size="35">
        <img :src="profileImage" />
      </v-list-item-avatar>

      <v-list-item-content class="py-2">
        <v-list-item-subtitle class="body-2 ma-0 userMessage__dropdown-title">
          <span class="body-2 ma-0 userMessage__message">{{ notification.notificable.message }}</span>
        </v-list-item-subtitle>
        <span class="caption tertiary--text">{{ localFormat(notification.created_at, "fn") }}</span>
      </v-list-item-content>

      <v-list-item-action></v-list-item-action>
    </v-list-item>
  </router-link>
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
    link() {
      return this.notification.notificable.meta.post
        ? "/post/" + this.notification.notificable.meta.post.id
        : "#";
    },
    profileImage() {
      return this.user.profile_image
        ? this.user.profile_image
        : "/Icon/user-default.svg";
    }
  },
  methods: {
    localFormat: LocalFormat,
    addDynamicTime: AddDynamicTime
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