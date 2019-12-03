<template>
  <v-col class="pa-0">
    <v-card
      v-for="n in maxshown"
      :key="n"
      class="centerPanel__card mb-3 transparent__bg"
      :dark="lightSwitch == 0 ? false : true"
      outlined
    >
      <!-- Start of Post Header -->
      <v-list-item>
        <v-list-item-avatar class="mr-2">
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
              <v-btn icon fab small class="postOptions__btn" color="secondary">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Header -->
      <!-- Start of Post Body -->
      <v-list-item class="pa-0 ma-0">
        <v-list-item-content class="ma-0 pa-0">
          <span class="body-1 px-5 pb-3">
            {{ postsObject[n - 1].content }}
          </span>
          <!-- <v-img
            src="https://storage.arbitrage.ph/dev/2018/10/mainhero-1024x682.jpg"
            height="300"
          ></v-img> -->
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Body -->
      <v-divider></v-divider>
      <v-card-actions class="pl-5">
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
        class="pa-0 ma-0 mt-3"
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
                  >{{ n - 1 }} joses {{ k - 1 }}</strong
                >
              </v-container>
              <v-container class="pa-0 ma-0">
                <v-btn icon outlined fab x-small color="success">
                  <img src="/icon/bullish.svg" width="15" />
                </v-btn>
                <span class="px-2">{{ bullCounter }}</span>
                <v-btn icon outlined fab x-small color="error">
                  <img src="/icon/bearish.svg" width="15" />
                </v-btn>
                <span class="px-2">{{ bearCounter }}</span>
                <!-- | -->
                <v-btn icon small depressed>
                  <v-icon>mdi-reply-outline</v-icon>
                </v-btn>
                <!-- | -->
                <span class="px-2 overline">6 hours ago</span>
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
        <v-list-item-avatar>
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
            dense
            rounded
            hide-details
            label="Write a comment..."
            color="primary"
            background-color="#0c1a2b"
          >
          </v-text-field>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Comment -->
      <v-divider></v-divider>

      <!-- Start of Subcomment -->

      <!-- End of Subcomment -->
    </v-card>
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
export default {
  name: "Newsfeed",
  data() {
    return {
      bullCounter: 9,
      bearCounter: 2,
      dark_theme_color: process.env.DARK_THEME_COLOR,
      user: this.$store.getters["auth/user"],
      postsObject: [],
      maxshown: 0,
      loader: true
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  created() {},
  mounted() {
    const params = {
      page: "10"
    };
    this.$api.social.posts
      .get()
      .then(response => {
        if (response.success) {
          this.postsObject = response.data.posts;
          this.maxshown = 10;
          console.log(this.postsObject);
          this.loader = false;
        }
      })
      .catch(e => {
        console.log(response);
      });
  },
  methods: {
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
