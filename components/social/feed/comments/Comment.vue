<template>
  <v-list-item :key="comment.id" class="ma-0">
    <v-list-item-avatar style="align-self: flex-start">
      <v-img
        :src="
          comment.user.profile_image
            ? comment.user.profile_image
            : 'user_default.png'
        "
        :alt="comment.user.name"
        class="avatar__border"
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="pa-0 ma-0">
      <v-container class="pa-0 body-2">
        <strong class="text--darken-2 caption">{{ comment.user.name }}</strong>
        <span class="caption">{{ comment.content }}</span>
      </v-container>
      <v-container class="pa-0 ma-0">
        <v-btn icon outlined fab width="21" height="21" color="secondary">
          <img src="/icon/bullish_secondary.svg" height="13" width="10" />
        </v-btn>
        <span class="px-1 caption">0</span>
        <v-btn icon outlined fab width="21" height="21" color="secondary">
          <img src="/icon/bearish_secondary.svg" height="13" width="10" />
        </v-btn>
        <span class="px-1 caption">0</span>
        <!-- | -->
        <v-btn icon small depressed>
          <v-icon>mdi-reply-outline</v-icon>
        </v-btn>
        <!-- | -->
        <span class="px-2 overline no-transform">{{
          $moment(comment.created_at).format("MMM DD hh:mm A")
        }}</span>
        <List v-if="comment.comments" :comments="comment.comments" />
      </v-container>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import List from "~/components/social/feed/comments/List";

export default {
  name: "Comment",
  components: {
    List
  },
  props: {
    comment: {
      default() {
        return {};
      },
      type: Object
    }
  }
};
</script>
