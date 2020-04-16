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
    <transition-group name="list" tag="div">
      <v-content v-for="(post, index) in postsObject" :key="post.id">
        <Post
          v-if="!post.ads"
          :post="post"
          :index="index"
          @followAccount="followAccount"
          @postReact="postReact"
          @postComment="postComment"
          @editPost="editPost"
          @showShareModal="showShareModal"
        />
        <Ads v-else :image="post.image" :link="post.link" />
      </v-content>
    </transition-group>

    <Share
      v-if="showShare"
      :postid="sharePostID"
      @closeModal="showShare = false"
    />
    <DeletePostDialog @deletePost="deletePost" />
    <ConfirmDialog
      text="You will open a link outside of Lyduz. Do you wish to continue?"
    >
      <template>
        <v-hover v-slot:default="{ hover }">
          <v-btn
            :dark="lightSwitch == 1"
            class="black--text font-weight-bold text-capitalize caption"
            :color="!hover ? 'success' : 'successhover'"
            elevation="1"
            @click.prevent="$bus.$emit('onLinkClick', false)"
            >Okay</v-btn
          >
        </v-hover>
      </template>
    </ConfirmDialog>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AddDynamicTime } from "~/assets/js/helpers/datetime";

import Ads from "~/components/social/feed/Ads";
import Post from "~/components/social/feed/Post";
import Share from "~/components/modals/Share";
import ConfirmDialog from "~/components/modals/Confirm";
import DeletePostDialog from "~/components/social/DeletePostDialog";

export default {
  name: "Newsfeed",
  components: {
    Share,
    ConfirmDialog,
    Ads,
    Post,
    DeletePostDialog
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
      showShare: false,
      sharePostID: "",
      numberPost: 0,
      showBanner: false
    };
  },
  watch: {
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
        comment_descendants_count: 0,
        meta: this.newPost.meta
      });
    },
    newPosts() {
      this.numberPost = this.newPosts.number_posts;
      if (this.newPosts.event_name === "social.post") {
        this.postCounter();
      } else if (this.newPosts.event_name === "social.post.comment") {
        this.putNumberComment();
      } else if (this.newPosts.event_name === "social.post.sentiment") {
        this.putNumberSentiments(this.newPosts.data.post.id);
      }
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
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      newPosts: "global/getNewPosts",
      newComment: "social/getNewComment",
      deleteComment: "social/getDeleteComment",
      updateComment: "social/getUpdateComment",
      confirmDialog: "social/confirmDialog",
      selectedPost: "social/selectedPost"
    }),
    /**
     * toggle card background color
     *
     * @return  {String}  dark/light mode
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#ffffff" : "#142530";
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

    // manage link click event
    document.querySelector("body").addEventListener(
      "click",
      evt => {
        if (evt.target.classList.contains("socialPostParsedLink")) {
          this.openConfirmDialog(evt.target.dataset.url);
        }
      },
      true
    );
  },
  methods: {
    ...mapActions({
      setConfirmDialog: "social/setConfirmDialog",
      setDeleteDialog: "social/setDeleteDialog",
      setReactButtons: "social/setReactButtons",
      setAlert: "global/setAlert"
    }),
    addDynamicTime: AddDynamicTime,
    /**
     * add ads for every 10 posts randomly
     *
     * @param   {Array}  posts post objects
     *
     * @return  {Array}  post parsed
     */
    postCounter() {
      if (this.numberPost >= 5 && this.$route.path === "/") {
        this.showBanner = true;
      } else {
        this.showBanner = false;
      }
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
    // temporary hard code
    /**
     * push ads randomly for every 10 posts 1 ad
     *
     * @param   {Array}  posts  post objects
     *
     * @return  {Array}         post with pushed ad
     */
    pushAds(posts) {
      posts.splice(Math.floor(Math.random() * 10) + 1, 0, {
        id: Math.floor(Math.random() * 999) + 99,
        ads: true,
        image: "https://www.digital-shadow.com/images/2019/11/Facebook-Ads.jpg",
        link: "https://www.facebook.com/"
      });
      return posts;
    },
    /**
     * initialize all post and request from post endpoint
     *
     * @return  {Array}    post objects
     */
    async loadPosts() {
      const params = {
        page: this.pageCount
      };
      try {
        const response = await this.$api.social.posts.get(params);
        const posts = this.pushAds(response.data.posts);
        this.postsObject = this.postsObject.concat(posts);
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
      } catch (error) {
        console.log(error);
      }
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
    },
    /**
     * delete post function using selectedPost vuex
     *
     * @return
     */
    deletePost() {
      this.$api.social.actions
        .delete(this.selectedPost.postid)
        .then(response => {
          this.postOptionsMode = false;
          this.setDeleteDialog(false);
          setTimeout(() => {
            this.postsObject.splice(this.selectedPost.index, 1);
            //this.$bus.$emit("deletePost", index);
            this.triggerAlert(true, response.message);
          }, 200);
        })
        .catch(e => {
          this.triggerAlert(true, e.message);
        });
    },
    /**
     * counts number of comment per post
     *
     * @return
     */
    putNumberComment() {
      for (let i = 0; i < this.postsObject.length; i++) {
        if (this.postsObject[i].id === this.newPosts.data.post.id) {
          this.postsObject[i].comment_descendants_count++;
        }
      }
    },
    /**
     * counts number of sentiments per post
     *
     * @param   {String}  post_id  post id
     *
     * @return
     */
    putNumberSentiments(post_id) {
      const post = this.newPosts.data.post;

      this.postsObject.forEach((e, i) => {
        if (e.id === post_id) {
          this.postsObject[i].bulls_count = post.bulls;
          this.postsObject[i].bears_count = post.bears;
          //  this.postsObject[i].my_sentiment = this.newPosts.data.sentiment.type;
        }
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
    editPost({ id, content, index }) {
      if (content == undefined) {
        this.triggerAlert(false, "Unable to save empty message");
        return;
      }
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
    postComment({ id, content, index }) {
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
    postReact({ post_id, type, index }) {
      this.setReactButtons(true);
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
              this.setReactButtons(false);
            } else {
              this.triggerAlert(false, response.message);
              this.setReactButtons(false);
            }
          })
          .catch(e => {
            this.setReactButtons(false);
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
              this.setReactButtons(false);
            } else {
              this.triggerAlert(false, response.message);
              this.setReactButtons(false);
            }
          })
          .catch(e => {
            this.setReactButtons(false);
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
              this.setReactButtons(false);
            } else {
              this.triggerAlert(false, response.message);
              this.setReactButtons(false);
            }
          })
          .catch(e => {
            this.setReactButtons(false);
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
              this.setReactButtons(false);
            } else {
              this.triggerAlert(false, response.message);
              this.setReactButtons(false);
            }
          })
          .catch(e => {
            this.setReactButtons(false);
            this.triggerAlert(false, e.message);
          });
      }
    },
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
     * Triggers snackbar alerts
     *
     * @param   {boolean}  type
     * @param   {string}  message
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
    }
  }
};
</script>
