<template>
  <v-list dense>
    <template v-for="(comment, index) in comments">
      <Comment
        :key="index"
        :keyprop="iteration ? 0 : index"
        :comment="comment"
        :postindex="postindex"
        :postid="postid"
        :iteration="iteration"
      />
    </template>
  </v-list>
</template>

<script>
import { AddDynamicTime } from "~/assets/js/helpers/datetime";

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
    },
    postindex: {
      default() {
        return "";
      },
      type: Number
    },
    postid: {
      default() {
        return "";
      }
    },
    iteration: {
      default() {
        return "";
      }
    }
  },
  mounted() {
    /**
     * Set interval for updating comment time
     */
    setInterval(() => {
      this.comments.map(
        x => (x.created_at = this.addDynamicTime(x.created_at))
      );
    }, 10000);
  },
  methods: {
    addDynamicTime: AddDynamicTime
  }
};
</script>
