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
        <v-btn
          icon
          small
          depressed
          @click="
            (replyCommentMode = !replyCommentMode),
              (currentCommentIndex = postindex)
          "
        >
          <v-icon>mdi-reply-outline</v-icon>
        </v-btn>
        <span class="px-2 overline no-transform">
          {{ localFormat(comment.created_at, "fn") }}
        </span>
        <List
          v-if="comment.comments"
          :comments="comment.comments"
          :postid="postid"
          :iteration="comment.id"
          :postindex="postindex"
        />
      </v-container>
      <span>
        <v-list-item-content class="pt-0 mb-0">
          <v-text-field
            v-if="replyCommentMode && currentCommentIndex == postindex"
            dense
            rounded
            hide-details
            placeholder="Write a comment..."
            class="caption"
            color="primary"
            :value="commentValue"
            :background-color="lightSwitch == 0 ? '#e3e9ed' : 'darkcard'"
            :dark="lightSwitch == 0 ? false : true"
            @keyup.enter="replyToComment(comment.id, $event.target.value)"
          ></v-text-field>
        </v-list-item-content>
      </span>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import List from "~/components/social/feed/comments/List";
import { LocalFormat } from "~/assets/js/helpers/datetime";

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
    keyprop: {
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      replyCommentMode: false,
      currentCommentIndex: "",
      commentValue: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert",
      setNewComment: "social/setNewComment"
    }),
    localFormat: LocalFormat,
    /**
     * Fires when user replies to a comment
     * Includes an if condition which checks if comment being replied to is 'top-level' or 'child-level'
     * If 'top-level', pass the comment id of top-level comment
     * else use top-level comment id.
     *
     * This is to prevent the behavior of passing the 'child-level' comment id, which doesnt work.
     *
     * @param   {string}  id
     * @param   {string}  content
     *
     * @return
     */
    replyToComment(id, content) {
      let payload = {};
      if (this.iteration) {
        payload = {
          parent_id: this.iteration,
          content: content
        };
      } else {
        payload = {
          parent_id: id,
          content: content
        };
      }
      this.$api.social.posts
        .postComment(this.postid, payload)
        .then(response => {
          if (response.success) {
            //Important!! do not remove. Used to empty comment textfield on submit
            if (this.commentValue == " ") {
              this.commentValue = "";
            } else {
              this.commentValue = " ";
            }
            let responseObject = response.data.comment;
            responseObject.user = {
              name: this.$auth.user.data.user.name,
              profile_image: this.$auth.user.data.user.profile_image
            };
            this.setNewComment({
              data: responseObject,
              postIndex: this.postindex,
              commentIndex: this.keyprop
            });
            const alert = {
              model: true,
              state: true,
              message: response.message
            };
            this.setAlert(alert);
          }
        });
    }
  }
};
</script>
