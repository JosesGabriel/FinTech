<template>
  <v-list dense class="py-0" :style="{ background: cardBackground }" >
    <template v-for="(comment, index) in comments">
      <Comment
        :key="index"
        :keyprop="iteration ? 0 : index"
        :childkeyprop="keyprop"
        :comment="comment"
        :postindex="postindex"
        :postid="postid"
        :iteration="iteration"
        :ischild="ischild"
      />
    </template>
  </v-list>
</template>

<script>
import { AddDynamicTime } from "~/assets/js/helpers/datetime";
import { mapGetters, mapActions } from "vuex";

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
    },
    ischild: {
      default() {
        return false;
      },
      type: Boolean
    },
    keyprop: {
      default() {
        return "";
      }
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
      }),
      cardBackground() {
        return this.lightSwitch == 0 ? "#ffffff" : "#142530";
      },
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
