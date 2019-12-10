<template>
  <v-col class="pa-0">
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
      class="centerPanel__card mb-3 transparent__bg"
      :dark="lightSwitch == 0 ? false : true"
      outlined
    >
      <!-- Start of Post Header -->
      <v-list-item>
        <v-list-item-avatar class="mr-2" size="42">
          <img
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
              <v-list-item-title class="subtitle-2"
                ><strong
                  >{{ postsObject[n - 1].user.first_name }}
                  {{ postsObject[n - 1].user.last_name }}</strong
                ></v-list-item-title
              >
              <v-list-item-subtitle class="overline"
                >{{
                  $moment(postsObject[n - 1].created_at).format(
                    "MMM DD hh:mm A"
                  )
                }}
                <v-icon class="overline mt-0">mdi-earth</v-icon
                ><span class="text--green"> Bullish</span></v-list-item-subtitle
              >
            </v-col>
            <v-col class="text-right">
              <!-- <v-btn icon fab small class="postOptions__btn" color="secondary">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn> -->
              <v-dialog width="500">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="
                      postsObject[n - 1].user.uuid == $auth.user.data.user.uuid
                    "
                    x-small
                    icon
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>

                <v-card
                  :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
                  :dark="lightSwitch == 0 ? false : true"
                >
                  <v-card-title
                    class="headline text--green lighten-2"
                    primary-title
                  >
                    Delete Post?
                  </v-card-title>

                  <v-card-text>
                    Are you sure you want to permanently remove this post from
                    Lyduz?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <!-- <v-btn color="secondary" text @click="deleteDialog = false">
                      Cancel
                    </v-btn> -->
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
                      >Delete</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn
                v-if="postsObject[n - 1].user.uuid == $auth.user.data.user.uuid"
                x-small
                icon
                @click="(editPostMode = !editPostMode), (currentEdit = n - 1)"
                ><v-icon>mdi-comment-edit</v-icon></v-btn
              >
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
                currentEdit == n - 1
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
              >Done Editing</v-btn
            >
          </div>
          <span v-else class="body-2 px-5 pb-3">
            {{ postsObject[n - 1].content }}
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
          x-small
          color="success"
          @click="post_react(postsObject[n - 1].id, 'bull')"
        >
          <img src="/icon/bullish.svg" width="15" />
        </v-btn>
        <span class="px-2">{{ postsObject[n - 1].bulls_count }}</span>
        <v-btn
          icon
          outlined
          fab
          x-small
          color="error"
          @click="post_react(postsObject[n - 1].id, 'bear')"
        >
          <img src="/icon/bearish.svg" width="15" />
        </v-btn>
        <span class="px-2">{{ postsObject[n - 1].bears_count }}</span>
        <v-spacer></v-spacer>
        <v-btn icon fab x-small color="secondary">
          <v-icon>mdi-comment-text-outline</v-icon>
        </v-btn>
        <span>{{ postsObject[n - 1].comments_count }}</span>
        <v-btn icon fab x-small color="secondary">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <span>1000</span>
      </v-card-actions>
      <v-divider></v-divider>
      <v-list-item
        v-for="k in postsObject[n - 1].comments.length"
        :key="k"
        class="pa-0 ma-0"
      >
        <v-list-item-content>
          <!-- Start of Main Comment -->
          <v-list-item>
            <v-list-item-avatar>
              <img
                :src="
                  postsObject[n - 1].comments[k - 1]['user']['profile_image']
                    ? postsObject[n - 1].comments[k - 1]['user'][
                        'profile_image'
                      ]
                    : 'user_default.png'
                "
              />
            </v-list-item-avatar>
            <v-list-item-content class="pa-0 ma-0">
              <v-container class="pa-0 body-2">
                <strong class="blue--text text--darken-2"
                  >{{
                    postsObject[n - 1].comments[k - 1]["user"]["first_name"]
                  }}
                  {{
                    postsObject[n - 1].comments[k - 1]["user"]["last_name"]
                  }}</strong
                >
                <span>{{ postsObject[n - 1].comments[k - 1].content }}</span>
              </v-container>
              <v-container class="pa-0 ma-0">
                <v-btn icon outlined fab x-small color="success">
                  <img src="/icon/bullish.svg" width="15" />
                </v-btn>
                <span class="px-2">0</span>
                <v-btn icon outlined fab x-small color="error">
                  <img src="/icon/bearish.svg" width="15" />
                </v-btn>
                <span class="px-2">0</span>
                <!-- | -->
                <v-btn icon small depressed>
                  <v-icon>mdi-reply-outline</v-icon>
                </v-btn>
                <!-- | -->
                <span class="px-2 overline">{{
                  $moment(postsObject[n - 1].comments[k - 1].created_at).format(
                    "MMM DD hh:mm A"
                  )
                }}</span>
              </v-container>
            </v-list-item-content>
          </v-list-item>
          <!-- End of Main Comment -->
          <!-- Start of Main Comment -->
          <!-- <v-list-item class="pa-0 ma-0 ml-12 mt-2">
            <v-list-item-avatar>
              <v-img
                src="https://66.media.tumblr.com/d6c116eb3990fddb869d916c64f18e5c/tumblr_phsox3GWrv1uwzkkgo1_400.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0 ma-0">
              <v-container class="py-0 pl-0 pr-12 body-2">
                <strong class="blue--text text--darken-2">Jenny Mtril</strong>
                <span>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old.
                </span>
              </v-container>
              <v-container class="pa-0 ma-0">
                <v-btn icon outlined fab x-small color="success">
                  <img src="/icon/bullish.svg" width="15" />
                </v-btn>
                <span class="px-2">{{ bullCounter }}</span>
                <v-btn icon outlined fab x-small color="red">
                  <img src="/icon/bearish.svg" width="15" />
                </v-btn>
                <span class="px-2">{{ bearCounter }}</span>
                <span class="px-2 overline">10 hours ago</span>
              </v-container>
            </v-list-item-content>
          </v-list-item> -->
          <!-- End of Main Comment -->

          <!-- start of subreply -->
          <!-- <v-list-item class="ma-0 pa-0 ml-12 mt-2">
            <v-list-item-avatar>
              <v-img></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0 ma-0">
              <v-text-field label="Write a reply..." color="primary">
              </v-text-field>
            </v-list-item-content>
          </v-list-item> -->
          <!-- end of subreply -->
        </v-list-item-content>
      </v-list-item>
      <!-- Start of Comment -->
      <v-list-item class="ma-0">
        <v-list-item-avatar size="28" class="mr-2">
          <v-img
            :src="
              $auth.loggedIn
                ? $auth.user.data.user.profile_image
                : 'default.png'
            "
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pt-0 mb-0">
          <v-text-field
            v-model="commentField[n - 1]"
            dense
            rounded
            hide-details
            label="Write a comment..."
            color="primary"
            :background-color="lightSwitch == 0 ? '#e3e9ed' : 'darkcard'"
            :dark="lightSwitch == 0 ? false : true"
            @keyup.enter="
              postComment(postsObject[n - 1].id, commentField[n - 1], n - 1)
            "
          >
          </v-text-field>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Comment -->
      <v-divider></v-divider>

      <!-- Start of Subcomment -->

      <!-- End of Subcomment -->
    </v-card>
    <v-snackbar v-model="alert" :color="alertState ? 'success' : 'error'">
      {{ alertResponse }}
      <v-btn color="white" text @click="alert = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-col>
</template>
<style>
.postOptions__btn {
  position: relative;
  bottom: 15px;
  left: 10px;
}
.postOptions__btn::before {
  color: transparent;
}
</style>
<script>
import { mapGetters } from "vuex";
import PhotoCarousel from "~/components/social/PhotoCarousel";
export default {
  name: "Newsfeed",
  components: {
    PhotoCarousel
  },
  props: {
    newPost: {
      default: function() {
        return [];
      },
      type: Object
    }
  },
  data() {
    return {
      dark_theme_color: process.env.DARK_THEME_COLOR,
      user: this.$store.getters["auth/user"],
      postsObject: [],
      loader: true,
      scrolledToBottom: false,
      pageCount: 1,
      commentModel: "",
      commentField: [],
      alert: false,
      alertState: "",
      alertResponse: "",
      postOptionsModal: [],
      editModel: [],
      editPostMode: false,
      editTextAreaModel: [],
      currentEdit: 0,
      deleteDialog: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    newPost: function() {
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
        comments: [],
        comments_count: 0
      });
    }
  },
  created() {},
  mounted() {
    this.loadPosts();
    this.scroll();
  },
  methods: {
    loadPosts() {
      const params = {
        page: this.pageCount
      };
      this.$api.social.posts
        .get(params)
        .then(response => {
          if (response.success) {
            this.postsObject = this.postsObject.concat(response.data.posts);
            console.log(this.postsObject);
            this.loader = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    deletePost(id, index) {
      this.$api.social.deletePost
        .delete(id)
        .then(response => {
          this.triggerAlert(true, response.message);
          this.postsObject.splice(index, 1);
        })
        .catch(e => {
          this.triggerAlert(true, e.message);
        });
    },
    editPost(id, content, index) {
      let payload = {
        content: content
      };
      this.$api.social.updatePost
        .put(id, payload)
        .then(response => {
          this.triggerAlert(true, response.message);
          this.postsObject[index].content = content;
        })
        .catch(e => {
          this.triggerAlert(true, e.message);
        });
    },
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
          this.commentField[index] = "";
        } else {
          this.triggerAlert(false, response.message);
        }
      });
    },
    post_react(post_id, type) {
      const params = post_id;
      if (type == "bull") {
        this.$api.social.posts.bullish(params).then(response => {
          this.postsObject[n - 1].bears_count;
          console.log(response);
        });
      } else if (type == "bear") {
        this.$api.social.posts.bearish(params).then(response => {
          console.log(response);
        });
      }
    },
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
    triggerAlert(type, message) {
      this.alert = true;
      this.alertState = type;
      this.alertResponse = message;
    }
  },
  head() {
    return {
      title: "Arbitrage | Social Page",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Arbitrage | Social Page"
        }
      ]
    };
  }
};
</script>
