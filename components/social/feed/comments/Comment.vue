<template>
  <v-list-item :key="comment.id" class="ma-0 pt-3">
    <v-list-item-avatar
      style="align-self: flex-start"
      class="mt-0"
      size="32"
      @click="$router.push('/profile/' + comment.user.username)"
    >
      <img
        :src="
          comment.user.profile_image
            ? comment.user.profile_image
            : 'default.png'
        "
        :alt="comment.user.name"
        class="avatar__border"
      />
    </v-list-item-avatar>
    <v-text-field
      v-if="editModeToggle"
      class="py-3"
      outlined
      dense
      rounded
      color="success"
      :value="comment.content"
      hint="Press Esc to Cancel"
      persistent-hint
      @keydown.esc="editModeToggle = false"
      @keydown.enter="editComment(comment.id, $event.target.value)"
    ></v-text-field>
    <v-list-item-content v-else class="pa-0 ma-0">
      <v-container
        class="pa-0 body-2"
        :class="[
          { 'black--text': lightSwitch == 0 },
          { 'white--text': lightSwitch == 1 }
        ]"
      >
        <span class="caption font-weight-black">{{ comment.user.name }}</span>

        <span v-if="comment.user.uuid == $auth.user.data.user.uuid">
          <v-btn
            icon
            x-small
            @click="commentSettingsToggle = !commentSettingsToggle"
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </span>

        <span v-if="commentSettingsToggle">
          <v-btn x-small @click="editModeToggle = !editModeToggle">Edit</v-btn>
          <v-btn x-small @click="deleteComment(comment.id)">Delete</v-btn>
        </span>
        <div class="overline no-transform">
          {{ localFormat(comment.created_at, "fn") }}
        </div>
        <div class="caption py-2 comment__content">{{ comment.content }}</div>
      </v-container>
      <v-container class="pa-0 ma-0">
        <v-btn
          class="bull__btn--comment"
          :class="
            comment.my_sentiment && comment.my_sentiment.type == 'bull'
              ? 'sentiment__btn--active'
              : ''
          "
          icon
          outlined
          fab
          width="21"
          height="21"
          color="secondary"
          @click="postReact(comment.id, 'bull')"
        >
          <img src="/icon/bullish_secondary.svg" height="13" width="10" />
        </v-btn>
        <span
          class="px-1 caption"
          :class="[
            { 'black--text': lightSwitch == 0 },
            { 'white--text': lightSwitch == 1 }
          ]"
          >{{ comment.bulls_count }}</span
        >
        <v-btn
          class="bear__btn--comment"
          :class="
            comment.my_sentiment && comment.my_sentiment.type == 'bear'
              ? 'sentiment__btn--active'
              : ''
          "
          icon
          outlined
          fab
          width="21"
          height="21"
          color="secondary"
          :disabled="reactButtons"
          @click="postReact(comment.id, 'bear')"
        >
          <img src="/icon/bearish_secondary.svg" height="13" width="10" />
        </v-btn>
        <span
          class="px-1 caption"
          :class="[
            { 'black--text': lightSwitch == 0 },
            { 'white--text': lightSwitch == 1 }
          ]"
          >{{ comment.bears_count }}</span
        >
        <v-btn
          icon
          small
          depressed
          :disabled="reactButtons"
          @click="
            (replyCommentMode = !replyCommentMode),
              (currentCommentIndex = postindex)
          "
        >
          <v-icon>mdi-reply-outline</v-icon>
        </v-btn>

        <List
          v-if="comment.comments"
          :comments="comment.comments"
          :postid="postid"
          :iteration="comment.id"
          :postindex="postindex"
          :ischild="true"
          :keyprop="keyprop"
        />
      </v-container>
      <span>
        <v-list-item-content class="pt-0 mb-0">
          <template v-if="userTagMode" slot="item" slot-scope="s">
            <v-avatar size="22" @click="clickUserSuggestion(s)">
              <img
                :src="
                  s.item.profile_image ? s.item.profile_image : 'default.png'
                "
              />
            </v-avatar>
            <span
              class="pl-2"
              @click="clickUserSuggestion(s)"
              @keyup.enter="test"
              v-text="s.item.name"
            ></span>
          </template>

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
            @keyup.@="userTagMode = true"
            @keyup="catcher"
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
    },
    childkeyprop: {
      default() {
        return "";
      }
    },
    ischild: {
      default() {
        return false;
      },
      type: Boolean
    }
  },
  data() {
    return {
      replyCommentMode: false,
      currentCommentIndex: "",
      commentValue: "",
      commentSettingsToggle: false,
      editModeToggle: false,
      reactButtons: false,
      currentTaggedUser: "",
      taggedUsers: [],
      hasTaggedUser: true,
      userTagMode: false,
      members: []
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
      setNewComment: "social/setNewComment",
      setDeleteComment: "social/setDeleteComment",
      setUpdateComment: "social/setUpdateComment"
    }),
    localFormat: LocalFormat,

    catcher(e) {
      let regExp = /^[0-9a-zA-Z]+$/;
      if (this.userTagMode && !regExp.test(e.key)) {
        this.currentTaggedUser = "";
      }
      if (regExp.test(e.key) && e.key.length == 1 && this.userTagMode) {
        this.hasTaggedUser = true;
        this.currentTaggedUser += e.key;
        this.search("user");
      } else if (e.key == "Backspace" && this.userTagMode) {
        this.currentTaggedUser = this.currentTaggedUser.slice(0, -1);
        this.search("user");
      }
      if (
        this.userTagMode &&
        e.key == "Backspace" &&
        this.currentTaggedUser == ""
      ) {
        this.userTagMode = false;
      } else if (this.userTagMode && e.key == "Backspace") {
        this.search("user");
      }

      if (this.commentValue == "") {
        this.userTagMode = false;
        this.currentTaggedUser = "";
        this.hasTaggedUser = false;
        this.taggedUsers = [];
      }
    },
    /**
     * Searches from stock list based on stock that user is currently typing, fires when stockTagMode is true.
     *
     * @return
     */
    search(type) {
      if (type == "user") {
        if (this.currentTaggedUser != "") {
          let payload = {
            name: this.currentTaggedUser
          };
          this.$api.accounts.account
            .index(payload)
            .then(response => {
              this.members = response.data.users;
            })
            .catch(e => {})
            .finally(function() {}.bind(this));
        }
      }
    },
    clickUserSuggestion(selected) {
      this.taggedUsers.push({
        uuid: selected.item.uuid,
        name: selected.item.name
      });
      this.currentTaggedUser = "";
      this.userTagMode = false;
    },
    /**
     * Fires when user clicks either Bull or Bear button.
     * Executes requests
     *
     * @param   {string}  type
     * @param   {integer}  index
     *
     * @return
     */
    postReact(comment_id, type) {
      this.reactButtons = true;
      const params = {
        postID: this.postid,
        commentID: comment_id
      };
      if (
        type == "bull" &&
        this.comment.my_sentiment &&
        this.comment.my_sentiment.type == "bull"
      ) {
        this.$api.social.posts
          .unbullishComment(params)
          .then(response => {
            if (response.success) {
              this.comment.bulls_count--;
              this.comment.my_sentiment = null;
              this.reactButtons = false;
            } else {
              this.triggerAlert(false, response.message);
              this.reactButtons = false;
            }
          })
          .catch(e => {
            this.reactButtons = false;
            this.triggerAlert(false, e.message);
          });
      } else if (type == "bull") {
        this.$api.social.posts
          .bullishComment(params)
          .then(response => {
            if (response.success) {
              this.comment.bulls_count += 1;
              if (
                this.comment.my_sentiment &&
                this.comment.my_sentiment.type == "bear"
              ) {
                this.comment.bears_count--;
              }

              this.comment.my_sentiment = {
                type: "bull"
              };
              this.reactButtons = false;
            } else {
              this.triggerAlert(false, response.message);
              this.reactButtons = false;
            }
          })
          .catch(e => {
            this.reactButtons = false;
            this.triggerAlert(false, e.message);
          });
      }

      if (
        type == "bear" &&
        this.comment.my_sentiment &&
        this.comment.my_sentiment.type == "bear"
      ) {
        this.$api.social.posts
          .unbearishComment(params)
          .then(response => {
            if (response.success) {
              this.comment.bears_count--;
              this.comment.my_sentiment = null;
              this.reactButtons = false;
            } else {
              this.triggerAlert(false, response.message);
            }
          })
          .catch(e => {
            this.reactButtons = false;
            this.triggerAlert(false, e.message);
          });
      } else if (type == "bear") {
        this.$api.social.posts
          .bearishComment(params)
          .then(response => {
            if (response.success) {
              this.comment.bears_count += 1;
              if (
                this.comment.my_sentiment &&
                this.comment.my_sentiment.type == "bull"
              ) {
                this.comment.bulls_count--;
              }
              this.comment.my_sentiment = {
                type: "bear"
              };
              this.reactButtons = false;
            } else {
              this.triggerAlert(false, response.message);
            }
          })
          .catch(e => {
            this.reactButtons = false;
            this.triggerAlert(false, e.message);
          });
      }
    },
    editComment(comment_id, content) {
      this.commentSettingsToggle = false;
      const payload = {
        content: content
      };
      this.$api.social.posts
        .updateComment(this.postid, comment_id, payload)
        .then(response => {
          if (response.success) {
            this.setUpdateComment({
              data: response.data.comment,
              postIndex: this.postindex,
              commentIndex: this.ischild ? this.childkeyprop : this.keyprop,
              isChild: this.ischild
            });
            this.editModeToggle = false;
            const alert = {
              model: true,
              state: true,
              message: response.message
            };
            this.setAlert(alert);
          }
        });
    },

    deleteComment(id) {
      this.commentSettingsToggle = false;
      this.$api.social.posts.deleteComment(this.postid, id).then(response => {
        if (response.success) {
          this.setDeleteComment({
            data: response.data.comment,
            postIndex: this.postindex,
            commentIndex: this.ischild ? this.childkeyprop : this.keyprop,
            isChild: this.ischild
          });
          const alert = {
            model: true,
            state: true,
            message: response.message
          };
          this.setAlert(alert);
        }
      });
    },
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
            this.replyCommentMode = false;
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
              commentIndex: this.ischild ? this.childkeyprop : this.keyprop
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

<style>
.bull__btn--comment {
  border: 2px solid #546e7a;
}
.bear__btn--comment {
  border: 2px solid #546e7a;
}
.sentiment__btn--active {
  background-color: #9ecae0;
}
.comment__content {
  line-height: 1.15rem;
}
</style>
