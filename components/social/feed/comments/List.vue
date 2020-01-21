<template>
  <v-list dense>
    <template v-for="(comment, index) in comments">
      <Comment :key="index" :comment="comment" />
    </template>
  </v-list>
</template>
<script>
export default {
  name: "List",
  components: {
    Comment: () => import("~/components/social/feed/comments/Comment.vue")
  },
  props: {
    comments: {
      default() {
        return [];
      },
      type: Array
    }
  }
};
</script>
