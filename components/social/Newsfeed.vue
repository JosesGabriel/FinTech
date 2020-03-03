<template>
  <v-col class="pa-0">
    <span
      v-show="showBanner"
      class="newPosts_banner caption black--text"
      @click="fetchNewPost()"
    >
      <v-icon small color="black">mdi-arrow-up</v-icon>
      <span class="font-weight-bold">New posts</span>
    </span>
    <!-- Written by Joses | December 2019 -->
    <!-- Docs: Posts object is retrieved on mount, then mag iterate thru the entire
    object as can be seen sa v-card underneath. Then if post has comments, comments object is passed to List.vue
    
    So basically, puro checks lang sa current index if it has comments, or attachments etc., then display.

    Image posts will be passed to PhotoCarousel.vue <- contains the grid layout arrangement para sa images.
    also contains the carousel modal that is triggered on click.
    -->
    <v-card
      v-for="(post, index) in postsObject"
      :key="index"
      class="centerPanel__card mb-3"
      :dark="lightSwitch == 0 ? false : true"
      outlined
    >
      <!-- Start of Post Header -->
      <v-list-item class="pt-1">
        <router-link
          :to="'/profile/' + post.user.username"
          class="no-transform"
        >
          <v-list-item-avatar class="mr-2" size="42">
            <img
              class="avatar__border"
              :src="
                post.user.profile_image
                  ? post.user.profile_image
                  : 'default.png'
              "
            />
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content class="pa-0 ma-0">
          <v-row>
            <v-col>
              <router-link
                :to="'/profile/' + post.user.username"
                class="no-transform"
              >
                <v-list-item-title
                  class="subtitle-2"
                  :class="lightSwitch == 1 ? 'white--text' : 'black--text'"
                >
                  <strong>{{ post.user.name }}</strong>
                </v-list-item-title>
              </router-link>
              <v-list-item-subtitle class="overline no-transform">
                {{ localFormat(post.created_at, "fn") }}
                <span
                  v-if="post.tagged_stocks && post.tagged_stocks.length != 0"
                  class="success--text overline post--sentiment pa-05"
                >
                  <v-btn
                    v-if="post.tagged_stocks[0].tag_meta.sentiment == 'bull'"
                    icon
                    outlined
                    fab
                    width="14"
                    height="14"
                    color="success"
                  >
                    <img src="/icon/bullish.svg" width="6" />
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    outlined
                    fab
                    width="14"
                    height="14"
                    color="error"
                  >
                    <img src="/icon/bearish.svg" width="6" />
                  </v-btn>
                </span>
              </v-list-item-subtitle>
            </v-col>
            <v-col class="text-right">
              <v-icon
                color="secondary"
                class="postOptions__btn"
                @click="
                  (postOptionsMode = !postOptionsMode), (currentPost = index)
                "
                >mdi-dots-horizontal</v-icon
              >
              <div v-if="postOptionsMode && currentPost == index">
                <div class="postOptions__container">
                  <!-- Start Delete Dialog -->
                  <v-dialog v-model="deleteDialog" width="500">
                    <v-card
                      :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
                      :dark="lightSwitch == 0 ? false : true"
                    >
                      <v-card-title class="py-2 pl-3"
                        ><span class="body-1 font-weight-bold"
                          >Delete Post?</span
                        ></v-card-title
                      >
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-content class="mx-4 mt-3">
                          <span class="caption font-weight-bold">
                            Are you sure you want to permanently remove this
                            post from Lyduz?</span
                          >
                        </v-content>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          class="font-weight-bold text-capitalize caption"
                          text
                          depressed
                          :dark="lightSwitch == true"
                          dense
                          @click="deleteDialog = false"
                        >
                          Cancel
                        </v-btn>

                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            v-if="post.user.uuid == $auth.user.data.user.uuid"
                            :dark="lightSwitch == 1"
                            class="black--text font-weight-bold text-capitalize caption"
                            :color="!hover ? 'success' : 'successhover'"
                            elevation="1"
                            @click="
                              deletePost(post.id, index), (deleteDialog = false)
                            "
                            >Delete</v-btn
                          >
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- End Delete Dialog -->
                  <v-list dense class="postOptions__list" elevation="8">
                    <v-list-item-group class="postOptions__itemgroup">
                      <v-list-item
                        v-if="post.user.uuid == $auth.user.data.user.uuid"
                        class="postOptions__listitem"
                        x-small
                        text
                        @click="
                          (editPostMode = !editPostMode), (currentPost = index)
                        "
                      >
                        <v-list-item-content>
                          <v-list-item-title class="text-center caption"
                            >Edit</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item
                        v-if="post.user.uuid == $auth.user.data.user.uuid"
                        class="postOptions__listitem"
                        x-small
                        text
                        @click.stop="deleteDialog = true"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="text-center caption">
                            Delete
                          </v-list-item-title>
                        </v-list-item-content></v-list-item
                      >
                      <v-list-item
                        v-if="post.user.uuid != $auth.user.data.user.uuid"
                        x-small
                        text
                        @click="followAccount(post.user.uuid)"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="text-center caption">
                            Follow
                          </v-list-item-title>
                        </v-list-item-content></v-list-item
                      >
                    </v-list-item-group>
                  </v-list>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Header -->
      <!-- Start of Post Body -->
      <v-list-item class="pa-0 ma-0">
        <v-list-item-content class="ma-0 pa-0">
          <div
            v-if="
              editPostMode &&
                post.user.uuid == $auth.user.data.user.uuid &&
                currentPost == index
            "
          >
            <v-textarea
              v-model="editTextAreaModel[index]"
              outlined
              :placeholder="post.content"
              dense
              hide-details
            ></v-textarea>
            <v-btn small outlined @click="editPostMode = false">Cancel</v-btn>
            <v-btn
              small
              outlined
              @click="
                editPost(post.id, editTextAreaModel[index], index),
                  (editPostMode = false)
              "
              >Done Editing</v-btn
            >
          </div>
          <span v-else class="body-2 px-5 pb-3">
            {{ post.content }}
          </span>

          <PhotoCarousel :images="post.attachments" />
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Body -->
      <v-divider></v-divider>
      <v-card-actions class="pl-4 py-2">
        <v-btn
          icon
          outlined
          fab
          width="24"
          height="24"
          color="success"
          class="bull__btn"
          :class="
            post.my_sentiment && post.my_sentiment.type == 'bull'
              ? 'bull__btn--active'
              : ''
          "
          :disabled="reactButtons"
          @click="postReact(post.id, 'bull', index)"
        >
          <img src="/icon/bullish.svg" width="12" />
        </v-btn>
        <span class="px-2 caption">{{ post.bulls_count }}</span>
        <v-btn
          icon
          outlined
          fab
          width="24"
          height="24"
          color="error"
          class="bear__btn"
          :class="
            post.my_sentiment && post.my_sentiment.type == 'bear'
              ? 'bear__btn--active'
              : ''
          "
          :disabled="reactButtons"
          @click="postReact(post.id, 'bear', index)"
        >
          <img src="/icon/bearish.svg" width="12" />
        </v-btn>
        <span class="px-2 caption">{{ post.bears_count }}</span>
        <v-spacer></v-spacer>
        <v-icon class="pr-2" icon fab small>mdi-comment-text-outline</v-icon>
        <span class="caption">
          {{ post.comment_descendants_count }}
        </span>
        <!-- TODO Share counter -->
        <!-- <v-btn
          icon
          fab
          x-small
          color="secondary"
          @click="showShareModal(post.id)"
        >
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <span class="caption">1000</span>-->
      </v-card-actions>
      <v-divider></v-divider>
      <List :comments="post.comments" :postindex="index" :postid="post.id" />
      <!-- Start of Comment -->
      <v-divider v-if="post.comments.length > 0"></v-divider>
      <v-list-item class="ma-0">
        <router-link
          :to="'/profile/' + $auth.user.data.user.username"
          class="no-transform"
        >
          <v-list-item-avatar size="28" class="mr-2">
            <img
              class="avatar__border"
              :src="
                $auth.user.data.user.profile_image
                  ? $auth.user.data.user.profile_image
                  : 'default.png'
              "
            />
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content class="pt-2 mb-0">
          <v-text-field
            dense
            rounded
            hide-details
            placeholder="Write a comment..."
            class="caption"
            color="primary"
            :background-color="lightSwitch == 0 ? '#e3e9ed' : 'darkcard'"
            :dark="lightSwitch == 0 ? false : true"
            :value="commentValue"
            @keyup.enter="postComment(post.id, $event.target.value, index)"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Comment -->
      <!-- <v-divider></v-divider> -->

      <!-- Start of Subcomment -->

      <!-- End of Subcomment -->
    </v-card>
    <Share
      v-if="showShare"
      :postid="sharePostID"
      @closeModal="showShare = false"
    />
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AddDynamicTime, LocalFormat } from "~/assets/js/helpers/datetime";

import List from "~/components/social/feed/comments/List";
import PhotoCarousel from "~/components/social/PhotoCarousel";
import Share from "~/components/modals/Share";
export default {
  name: "Newsfeed",
  components: {
    List,
    PhotoCarousel,
    Share
  },
  props: {
    newPost: {
      default() {
        return [];
      }
    },
    postid: {
      default() {
        return "";
      },
      type: String
    },
    authorId: {
      default() {
        return "";
      },
      type: String
    }
  },
  data() {
    return {
      postsObject: [],
      loader: true,
      pageCount: 1,
      editTextAreaModel: [],
      currentPost: "",
      deleteDialog: false,
      editPostMode: false,
      postOptionsMode: false,
      showShare: false,
      sharePostID: "",
      numberPost: 0,
      showBanner: false,
      reactButtons: false,
      commentValue: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      newPosts: "global/getNewPosts",
      newComment: "social/getNewComment",
      deleteComment: "social/getDeleteComment",
      updateComment: "social/getUpdateComment"
    })
  },
  watch: {
    deleteDialog(value) {
      if (value == false && this.postOptionsMode == true) {
        this.postOptionsMode = false;
      }
    },
    /**
     * Fires when user submits a new post.
     * Creates a new object based on submitted post and unshifts postsObject
     * so that post is automatically shown to user after submitting
     *
     * @return
     */
    newPost() {
      let attachments = [];
      for (let i = 0; i < this.newPost.attachments.length; i++) {
        attachments[i] = {};
        attachments[i]["url"] = this.newPost.attachments[i];
      }
      this.postsObject.unshift({
        id: this.newPost.id,
        user_id: this.newPosts.user_id,
        content: this.newPost.content,
        attachments: attachments,
        bears_count: 0,
        bulls_count: 0,
        created_at: new Date(),
        user: {
          uuid: this.newPost.user.uuid,
          profile_image: this.$auth.user.data.user.profile_image,
          name: this.$auth.user.data.user.name
        },
        tagged_stocks: this.newPost.tagged_stocks,
        comments: [],
        comment_descendants_count: 0
      });
    },
    newPosts() {
      this.numberPost = this.newPosts.number_posts;
      if (this.newPosts.event_name === "social.post") {
        this.postCounter();
      } else if (this.newPosts.event_name === "social.post.comment") {
        this.putNumberComment();
      }
      //  else if (this.newPosts.event_name === "social.post.sentiment") {
      //     this.putNumberSentiments();
      //   }
    },
    newComment() {
      this.postsObject[this.newComment.postIndex].comments[
        this.newComment.commentIndex
      ].comments.push(this.newComment.data);
    },
    updateComment() {
      if (this.updateComment.isChild) {
        let parentComment = this.postsObject[this.updateComment.postIndex]
          .comments[this.updateComment.commentIndex].comments;

        for (let i = 0; i < parentComment.length; i++) {
          if (parentComment[i].id == this.updateComment.data.id) {
            this.postsObject[this.updateComment.postIndex].comments[
              this.updateComment.commentIndex
            ].comments[i].content = this.updateComment.data.content;
          }
        }
      } else {
        this.postsObject[this.updateComment.postIndex].comments[
          this.updateComment.commentIndex
        ].content = {};
        this.postsObject[this.updateComment.postIndex].comments[
          this.updateComment.commentIndex
        ].content = this.updateComment.data.content;
      }
    },
    deleteComment() {
      if (this.deleteComment.isChild) {
        let parentComment = this.postsObject[this.deleteComment.postIndex]
          .comments[this.deleteComment.commentIndex].comments;

        for (let i = 0; i < parentComment.length; i++) {
          if (parentComment[i].id == this.deleteComment.data.id) {
            this.postsObject[this.deleteComment.postIndex].comments[
              this.deleteComment.commentIndex
            ].comments.splice(i, 1);
          }
        }
      } else {
        this.postsObject[this.deleteComment.postIndex].comments.splice(
          this.deleteComment.commentIndex,
          1
        );
      }
    }
  },
  mounted() {
    if (this.postid) {
      this.searchPost();
    } else if (this.authorId) {
      this.getAuthorPost(this.authorId);
    } else {
      this.loadPosts();
    }
    if (this.$route.name == "index") this.scroll();
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    addDynamicTime: AddDynamicTime,
    localFormat: LocalFormat,

    postCounter() {
      if (this.numberPost >= 5 && this.$route.path === "/") {
        this.showBanner = true;
      } else {
        this.showBanner = false;
      }
    },
    putNumberComment() {
      for (let i = 0; i < this.postsObject.length; i++) {
        if (this.postsObject[i].id === this.newPosts.data.post.id) {
          this.postsObject[i].comment_descendants_count++;
        }
      }
    },
    // putNumberSentiments() {
    //   for (let i = 0; i < this.postsObject.length; i++) {
    //     if (this.postsObject[i].id === this.newPosts.data.post.id) {
    //       this.postsObject[i].bulls_count = this.newPosts.data.post.bulls;
    //       this.postsObject[i].bears_count = this.newPosts.data.post.bears;
    //       this.postsObject[i].my_sentiment = this.newPosts.data.sentiment.type;
    //     }
    //   }
    // },
    /**
     * fires when user clicks follow button
     *
     * @param   {string}  user_id
     *
     * @return
     */
    followAccount(user_id) {
      const params = user_id;
      this.$api.social.follow
        .followAccount(params)
        .then(response => {
          if (response.success) {
            this.triggerAlert(true, "Successfully followed!");
          }
        })
        .catch(e => {
          this.triggerAlert(false, "You are already following this user.");
        });
    },
    /**
     * changes sharePostID value that is being used as a key in the share component.
     * this change will trigger the share modal to be visible
     *
     * @param   {string}  postid
     *
     * @return
     */
    showShareModal(postid) {
      this.sharePostID = postid;
      this.showShare = true;
    },
    /**
     * triggers when this component is loaded with an ID parameter in the URL.
     * 'searches' specific post by executing a request.
     * Emits postData which is then captured by the single post page.
     *
     * @return
     */
    searchPost() {
      this.$api.social.actions
        .show(this.postid)
        .then(response => {
          this.postsObject = this.postsObject.concat(response.data.post);
          this.$emit("postData", this.postsObject);
        })
        .catch(e => {
          console.log(e);
        });
    },
    /**
     * triggers when component loads or user hits bottom of page.
     * Concatenates to postsObject
     *
     * @return
     */
    loadPosts() {
      const params = {
        page: this.pageCount
      };
      this.$api.social.posts
        .get(params)
        .then(response => {
          if (response.success) {
            this.postsObject = this.postsObject.concat(response.data.posts);
            this.loader = false;
            console.log(response);
            /**
             * set interval dinamic time changing on posts
             * 10000ms interval
             */
            setInterval(() => {
              this.postsObject.map(
                x => (x.created_at = this.addDynamicTime(x.created_at))
              );
            }, 10000);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    /**
     * triggers when component loads or user hits bottom of page on profile page.
     * Concatenates to postsObject
     *
     * @return
     */
    getAuthorPost(id) {
      const params = {
        author_id: id
      };
      this.$api.social.posts
        .get(params)
        .then(response => {
          if (response.success) {
            this.postsObject = this.postsObject.concat(response.data.posts);
            this.loader = false;
            /**
             * set interval dinamic time changing on posts
             * 10000ms interval
             */
            setInterval(() => {
              this.postsObject.map(
                x => (x.created_at = this.addDynamicTime(x.created_at))
              );
            }, 10000);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    /**
     * triggered if user fetched new posts to latest posts
     *
     * @return
     */
    fetchNewPost() {
      const params = {
        page: 1
      };
      this.postsObject = [];
      this.$api.social.posts
        .get(params)
        .then(response => {
          if (response.success) {
            this.postsObject = this.postsObject.concat(response.data.posts);
            this.loader = false;
            this.showBanner = false;
            this.numberPost = 0;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    /**
     * deletes user post from database; also removes from postsObject
     * which will remove the post from the page
     *
     * @param   {string}  id
     * @param   {integer}  index
     *
     * @return
     */
    deletePost(id, index) {
      this.$api.social.actions
        .delete(id)
        .then(response => {
          this.triggerAlert(true, response.message);
          this.postsObject.splice(index, 1);
          this.postOptionsMode = false;
        })
        .catch(e => {
          this.triggerAlert(true, e.message);
        });
    },
    /**
     * edits user post from database; also removes from postObject
     * which will remove the post from the page
     *
     * @param   {string}  id
     * @param   {string}  content
     * @param   {integer}  index
     *
     * @return
     */
    editPost(id, content, index) {
      let payload = {
        content: content.substring(0, 200)
      };
      this.$api.social.actions
        .put(id, payload)
        .then(response => {
          this.triggerAlert(true, response.message);
          this.postsObject[index].content = content;
          this.postOptionsMode = false;
        })
        .catch(e => {
          this.triggerAlert(true, e.message);
        });
    },
    /**
     * posts comment; also automatically adds to page after button click
     *
     * @param   {string}  id
     * @param   {string}  content
     * @param   {integer}  index
     *`
     * @return`
     */
    postComment(id, content, index) {
      let payload = {
        parent_id: 0,
        user_id: this.$auth.user.data.user.uuid,
        content: content.substring(0, 200)
      };

      //Important!! do not remove. Used to empty comment textfield on submit
      if (this.commentValue == " ") {
        this.commentValue = "";
      } else {
        this.commentValue = " ";
      }

      this.$api.social.posts.postComment(id, payload).then(response => {
        if (response.success) {
          this.triggerAlert(true, response.message);
          this.postsObject[index].comments.push({
            id: response.data.comment.id,
            post_id: response.data.comment.post_id,
            user_id: response.data.comment.user_id,
            parent_id: response.data.comment.parent_id,
            comments: [],
            content: content,
            created_at: new Date(),
            user: {
              profile_image: this.$auth.user.data.user.profile_image,
              name: this.$auth.user.data.user.name,
              uuid: this.$auth.user.data.user.uuid
            }
          });
          // this.postsObject[index].comments_count++;
        } else {
          this.triggerAlert(false, response.message);
        }
      });
    },
    /**
     * Fires when user clicks either Bull or Bear button.
     * Executes requests
     *
     * @param   {integer}  post_id
     * @param   {string}  type
     * @param   {integer}  index
     *
     * @return
     */
    postReact(post_id, type, index) {
      this.reactButtons = true;
      const params = post_id;
      if (
        type == "bull" &&
        this.postsObject[index].my_sentiment &&
        this.postsObject[index].my_sentiment.type == "bull"
      ) {
        this.$api.social.posts
          .unbullish(params)
          .then(response => {
            if (response.success) {
              this.postsObject[index].bulls_count--;
              this.postsObject[index].my_sentiment = null;
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
          .bullish(params)
          .then(response => {
            if (response.success) {
              this.postsObject[index].bulls_count += 1;
              if (
                this.postsObject[index].my_sentiment &&
                this.postsObject[index].my_sentiment.type == "bear"
              ) {
                this.postsObject[index].bears_count--;
              }

              this.postsObject[index].my_sentiment = {
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
        this.postsObject[index].my_sentiment &&
        this.postsObject[index].my_sentiment.type == "bear"
      ) {
        this.$api.social.posts
          .unbearish(params)
          .then(response => {
            if (response.success) {
              this.postsObject[index].bears_count--;
              this.postsObject[index].my_sentiment = null;
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
          .bearish(params)
          .then(response => {
            if (response.success) {
              this.postsObject[index].bears_count += 1;
              if (
                this.postsObject[index].my_sentiment &&
                this.postsObject[index].my_sentiment.type == "bull"
              ) {
                this.postsObject[index].bulls_count--;
              }
              this.postsObject[index].my_sentiment = {
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
    /**
     * Watches when user scrolls down to the bottom of the page.
     * When that condition is satisfied, GET more posts from endpoint
     * and concatenate it to postsObject
     *
     * @return
     */
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.pageCount++;
          this.loadPosts();
          this.getAuthorPost();
        }
      };
    },
    /**
     * Triggers snackbar alerts
     *
     * @param   {boolean}  type
     * @param   {string}  message
     *
     * @return
     */
    triggerAlert(type, message) {
      let alert = {
        model: true,
        state: type,
        message: message
      };
      this.setAlert(alert);
    }
  }
};
</script>

<style>
.bull__btn {
  border: 2px solid #03dac5;
}
.bear__btn {
  border: 2px solid #f44336;
}
.bull__btn--active {
  background-color: #03dac599;
}
.bear__btn--active {
  background-color: #f4433699;
}
.postOptions__btn {
  position: relative;
  bottom: 8px;
  left: 4px;
}
.postOptions__btn:focus {
  background-color: transparent;
}
.postOptions__list {
  position: absolute;
  top: 28px;
  right: 10px;
  z-index: 1;
  padding: 0;
}
.postOptions__listitem {
  height: 20px;
}
.postOptions__list .v-list-item {
  min-height: 0px;
}
.postOptions__itemgroup {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
