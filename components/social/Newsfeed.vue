<template>
  <v-col class="pa-0">
    <span class="newPosts_banner caption black--text" @click="fetchNewPost()" v-show="showBanner">
      <v-icon small color="black">mdi-arrow-up</v-icon>
      <span class="font-weight-bold">New posts</span>
    </span>
    <!-- Written by Joses | December 2019 -->
    <!-- Docs: Posts object is retrieved on mount, then mag iterate thru the entire
    object as can be seen sa v-card underneath. Then if post has comments, mag loop thru lang gihapon sa length.
    
    So basically, puro checks lang sa current index if it has comments, or attachments etc., then display.
    Only used 1 external component (PhotoCarousel.vue) for easier organizing of data flow.

    Image posts will be passed to PhotoCarousel.vue <- contains the grid layout arrangement para sa images.
    also contains the carousel modal that is triggered on click.

    "[n-1]" is used extensively, current index lang meaning ana.
    -->
    <v-card
      v-for="n in postsObject.length"
      :key="n"
      class="centerPanel__card mb-3"
      :dark="lightSwitch == 0 ? false : true"
      outlined
    >
      <!-- Start of Post Header -->
      <v-list-item class="pt-1">
        <v-list-item-avatar class="mr-2" size="42">
          <img
            class="avatar__border"
            :src="
              postsObject[n - 1].user.profile_image
                ? postsObject[n - 1].user.profile_image
                : 'user_default.png'
            "
          />
        </v-list-item-avatar>
        <v-list-item-content class="pa-0 ma-0">
          <v-row>
            <v-col>
              <v-list-item-title class="subtitle-2">
                <strong>
                  {{ postsObject[n - 1].user.first_name }}
                  {{ postsObject[n - 1].user.last_name }}
                </strong>
              </v-list-item-title>
              <v-list-item-subtitle class="overline no-transform">
                {{ localFormat(postsObject[n - 1].created_at, "fn") }}
                <v-icon class="body-2 mt-0">mdi-earth</v-icon>
                <span
                  v-if="
                    postsObject[n - 1].tagged_stocks &&
                      postsObject[n - 1].tagged_stocks.length != 0
                  "
                  class="success--text overline post--sentiment pa-05"
                >
                  <v-btn
                    v-if="
                      postsObject[n - 1].tagged_stocks[0].tag_meta.sentiment ==
                        'bull'
                    "
                    icon
                    outlined
                    fab
                    width="14"
                    height="14"
                    color="success"
                  >
                    <img src="/icon/bullish.svg" width="6" />
                  </v-btn>
                  <v-btn v-else icon outlined fab width="14" height="14" color="error">
                    <img src="/icon/bearish.svg" width="6" />
                  </v-btn>
                </span>
              </v-list-item-subtitle>
            </v-col>
            <v-col class="text-right">
              <v-btn
                icon
                fab
                small
                class="postOptions__btn"
                color="secondary"
                @click="
                  (postOptionsMode = !postOptionsMode), (currentPost = n - 1)
                "
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
              <div v-if="postOptionsMode && currentPost == n - 1">
                <div class="postOptions__dropdown--caret"></div>
                <div class="postOptions__container">
                  <v-dialog width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-if="
                          postsObject[n - 1].user.uuid ==
                            $auth.user.data.user.uuid
                        "
                        x-small
                        text
                        v-on="on"
                      >Delete</v-btn>
                    </template>

                    <v-card
                      :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
                      :dark="lightSwitch == 0 ? false : true"
                    >
                      <v-card-title
                        class="headline success--text lighten-2"
                        primary-title
                      >Delete Post?</v-card-title>

                      <v-card-text>
                        Are you sure you want to permanently remove this post
                        from Lyduz?
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <!-- <v-btn color="secondary" text @click="deleteDialog = false">
                      Cancel
                        </v-btn>-->
                        <v-btn
                          v-if="
                            postsObject[n - 1].user.uuid ==
                              $auth.user.data.user.uuid
                          "
                          text
                          color="error"
                          @click="
                            deletePost(postsObject[n - 1].id, n - 1),
                              (deleteDialog = false)
                          "
                        >Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-btn
                    v-if="
                      postsObject[n - 1].user.uuid == $auth.user.data.user.uuid
                    "
                    x-small
                    text
                    @click="
                      (editPostMode = !editPostMode), (currentPost = n - 1)
                    "
                  >Edit</v-btn>
                  <v-btn
                    v-if="
                      postsObject[n - 1].user.uuid != $auth.user.data.user.uuid
                    "
                    x-small
                    text
                    @click="followAccount(postsObject[n - 1].user.uuid)"
                  >Follow</v-btn>
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
                postsObject[n - 1].user.uuid == $auth.user.data.user.uuid &&
                currentPost == n - 1
            "
          >
            <v-textarea
              v-model="editTextAreaModel[n - 1]"
              outlined
              :placeholder="postsObject[n - 1].content"
              dense
              hide-details
            ></v-textarea>
            <v-btn small outlined @click="editPostMode = false">Cancel</v-btn>
            <v-btn
              small
              outlined
              @click="
                editPost(
                  postsObject[n - 1].id,
                  editTextAreaModel[n - 1],
                  n - 1
                ),
                  (editPostMode = false)
              "
            >Done Editing</v-btn>
          </div>
          <span v-else class="caption px-5 pb-3">
            {{
            postsObject[n - 1].content
            }}
          </span>

          <PhotoCarousel :images="postsObject[n - 1].attachments" />
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Body -->
      <v-divider></v-divider>
      <v-card-actions class="pl-5 py-1">
        <v-btn
          icon
          outlined
          fab
          width="24"
          height="24"
          color="success"
          @click="postReact(postsObject[n - 1].id, 'bull', n - 1)"
        >
          <img src="/icon/bullish.svg" width="12" />
        </v-btn>
        <span class="px-2 caption">{{ postsObject[n - 1].bulls_count }}</span>
        <v-btn
          icon
          outlined
          fab
          width="24"
          height="24"
          color="error"
          @click="postReact(postsObject[n - 1].id, 'bear', n - 1)"
        >
          <img src="/icon/bearish.svg" width="12" />
        </v-btn>
        <span class="px-2 caption">{{ postsObject[n - 1].bears_count }}</span>
        <v-spacer></v-spacer>
        <v-btn icon fab x-small color="secondary">
          <v-icon>mdi-comment-text-outline</v-icon>
        </v-btn>
        <span class="caption">{{ postsObject[n - 1].comments_count }}</span>
        <v-btn icon fab x-small color="secondary" @click="showShareModal(postsObject[n - 1].id)">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <span class="caption">1000</span>
      </v-card-actions>
      <v-divider></v-divider>
      <List :comments="postsObject[n - 1].comments" />
      <!-- Start of Comment -->
      <v-divider v-if="postsObject[n - 1].comments.length > 0"></v-divider>
      <v-list-item class="ma-0">
        <v-list-item-avatar size="28" class="mr-2">
          <v-img
            class="avatar__border"
            :src="
              $auth.user.data.user.profile_image
                ? $auth.user.data.user.profile_image
                : 'default.png'
            "
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pt-0 mb-0">
          <v-text-field
            dense
            rounded
            hide-details
            placeholder="Write a comment..."
            class="caption"
            color="primary"
            :background-color="lightSwitch == 0 ? '#e3e9ed' : 'darkcard'"
            :dark="lightSwitch == 0 ? false : true"
            @keyup.enter="
              postComment(postsObject[n - 1].id, $event.target.value, n - 1)
            "
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Comment -->
      <!-- <v-divider></v-divider> -->

      <!-- Start of Subcomment -->

      <!-- End of Subcomment -->
    </v-card>
    <Share v-if="showShare" :postid="sharePostID" @closeModal="showShare = false" />
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
      showBanner: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      newPosts: "global/getNewPosts"
    })
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
        content: this.newPost.content,
        attachments: attachments,
        bears_count: 0,
        bulls_count: 0,
        created_at: new Date(),
        user: {
          profile_image: this.$auth.user.data.user.profile_image,
          first_name: this.$auth.user.data.user.first_name,
          last_name: this.$auth.user.data.user.last_name
        },
        tagged_stocks: this.newPost.tagged_stocks,
        comments: [],
        comments_count: 0
      });
    },
    newPosts() {
      console.log(this.newPosts);
      if(this.newPosts.event_name === "social.post") {
        this.postCounter();
      } else if (this.newPosts.event_name === "social.post.comment") {
        this.putNumberComment();
      } else if (this.newPosts.event_name === "social.post.sentiment") {
        this.putNumberSentiments();
      }
      this.numberPost = this.newPosts.number_posts;
    }
  },
  mounted() {
    if (this.postid) {
      this.searchPost();
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
      if (this.numberPost >= 1) {
        this.showBanner = true;
      } else {
        this.showBanner = false;
      }
    },
    putNumberComment() {
      for(let i = 0; i<this.postsObject.length; i++) {
        if(this.postsObject[i].id === this.newPosts.data.post.id) {
          this.postsObject[i].comments_count += 1
          console.log('putNumberComment')
        }
      }
    },
    putNumberSentiments() {
      for(let i = 0; i<this.postsObject.length; i++) {
        if(this.postsObject[i].id === this.newPosts.data.post.id) {
          console.log(this.postsObject[i])
          console.log('putNumberSentiments')
        }
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
        content: content
      };
      this.$api.social.actions
        .put(id, payload)
        .then(response => {
          this.triggerAlert(true, response.message);
          this.postsObject[index].content = content;
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
        content: content
      };
      this.$api.social.posts.postComment(id, payload).then(response => {
        if (response.success) {
          this.triggerAlert(true, response.message);
          this.postsObject[index].comments.push({
            content: content,
            created_at: new Date(),
            user: {
              profile_image: this.$auth.user.data.user.profile_image,
              first_name: this.$auth.user.data.user.first_name,
              last_name: this.$auth.user.data.user.last_name
            }
          });
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
      const params = post_id;
      if (type == "bull") {
        this.$api.social.posts.bullish(params).then(response => {
          if (response.success) {
            this.postsObject[index].bulls_count += 1;
          } else {
            this.triggerAlert(false, response.message);
          }
        });
      } else if (type == "bear") {
        this.$api.social.posts.bearish(params).then(response => {
          if (response.success) {
            this.postsObject[index].bears_count += 1;
          } else {
            this.triggerAlert(false, response.message);
          }
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
