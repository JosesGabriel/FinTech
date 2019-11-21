<template>
  <v-col class="pa-0">
    <v-card
      v-for="n in 4"
      :key="n"
      class="centerPanel__card mb-3 transparent__bg"
      dark
      outlined
    >
      <!-- Start of Post Header -->
      <v-list-item>
        <v-list-item-avatar class="mr-2">
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pa-0 ma-0">
          <v-row>
            <v-col>
              <v-list-item-title class="subtitle-2"
                ><strong>Sven Mithreel</strong></v-list-item-title
              >
              <v-list-item-subtitle class="overline"
                >5hrs <v-icon class="overline mt-0">mdi-earth</v-icon
                ><span style="color: #00ffc3;">
                  Bullish</span
                ></v-list-item-subtitle
              >
            </v-col>
            <v-col class="text-right">
              <!--
                        <v-btn small fab class="mr-2" :color="dark_theme_color"> 
                            <v-icon>mdi-more</v-icon>
                        </v-btn>
                        -->
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Header -->

      <!-- Start of Post Body -->
      <v-list-item class="pa-0 ma-0">
        <v-list-item-content class="ma-0 pa-0">
          <span class="body-2 px-2 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fuga
            consectetur placeat id vero tenetur molestiae minus corrupti animi
            eveniet asperiores, quae incidunt ex saepe facilis numquam
            cupiditate perferendis excepturi.
          </span>
          <v-img
            src="https://storage.arbitrage.ph/dev/2018/10/mainhero-1024x682.jpg"
            height="300"
          ></v-img>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Post Body -->

      <v-card-actions>
        <v-btn icon outlined fab x-small color="success">
          <img src="/icon/bullish.svg" width="15" />
        </v-btn>
        <v-btn icon outlined fab x-small color="error">
          <v-icon>mdi-paw</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>

      <!-- Start of Comment -->
      <v-list-item class="ma-0">
        <v-list-item-avatar>
          <v-img></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pb-0 mb-0">
          <v-text-field label="Write a comment..." color="primary">
          </v-text-field>
        </v-list-item-content>
      </v-list-item>
      <!-- End of Comment -->

      <v-divider></v-divider>

      <!-- Start of Subcomment -->
      <v-list-item>
        <v-list-item-content class="pa-0 ma-0 mt-3">
          <!-- Start of Main Comment -->
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                position="top"
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0 ma-0">
              <v-container class="pa-0 body-2">
                <strong class="blue--text text--darken-2">Sven Mithreel</strong>
                <span
                  >This is a Comment. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </span>
              </v-container>
              <v-container class="pa-0 ma-0">
                <v-btn icon outlined fab x-small color="success">
                  <img src="/icon/bullish.svg" width="15" />
                </v-btn>
                <span class="px-2">{{ bullCounter }}</span>
                <v-btn icon outlined fab x-small color="red">
                  <v-icon>mdi-paw</v-icon>
                </v-btn>
                <span class="px-2">{{ bearCounter }}</span>
                |
                <v-btn small depressed :color="dark_theme_color">
                  <span>Reply</span>
                  <v-icon right>mdi-reply-outline</v-icon>
                </v-btn>
                |
                <span class="px-2 overline">6 hours ago</span>
              </v-container>
            </v-list-item-content>
          </v-list-item>
          <!-- End of Main Comment -->

          <!-- Start of Main Comment -->
          <v-list-item class="pa-0 ma-0 ml-12 mt-2">
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
                  <v-icon>mdi-paw</v-icon>
                </v-btn>
                <span class="px-2">{{ bearCounter }}</span>
                |
                <span class="px-2 overline">10 hours ago</span>
              </v-container>
            </v-list-item-content>
          </v-list-item>
          <!-- End of Main Comment -->

          <!-- start of subreply -->
          <v-list-item class="ma-0 pa-0 ml-12 mt-2">
            <v-list-item-avatar>
              <v-img></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0 ma-0">
              <v-text-field label="Write a reply..." color="primary">
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
          <!-- end of subreply -->
        </v-list-item-content>
      </v-list-item>
      <!-- End of Subcomment -->
    </v-card>
  </v-col>
</template>
<script>
export default {
  name: "Newsfeed",
  data() {
    return {
      bullCounter: 9,
      bearCounter: 2,
      dark_theme_color: process.env.DARK_THEME_COLOR,
      user: this.$store.getters["auth/user"]
    };
  },
  created() {
    //console.log("first");
    // mutations
    // this.$store.commit('auth/SET_USER', { user_id:1, fullname:'Joses Gabriel Lu', profile:'test.jpg' });
    // actions
    // simple state
    // console.log(this.$store.state.auth.user);
    // getters
    // console.log(this.$store.getters['auth/user']);
    // this.$store.dispatch("auth/setUser", {
    //   user_id: 1,
    //   fullname: "Joses Gabriel Lu",
    //   profile: "test.jpg"
    // });
  },
  mounted() {
    console.log("api");
    // console.log(this.$api);
    const params1 = {
      exchange: "PSE",
      symbol: "TEL"
    };
    // console.log(this.$api.chart.stocks.list(params1));

    const params2 = {
      "symbol-id": 29235365118214144,
      //   exchange: "PSE",
      //   symbol: "BPI",
      resolution: "1D",
      limit: "1"
    };

    console.log(this.$api.chart.charts.latest(params2));

    // standard axios
    /*
    const data = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };
    const id = 28878466413891584;
    this.$axios
      .$get(`/social/posts/${id}`, {
        data: data
      })
      .then(res => {
        console.log("old");
        console.log(res);
      });

    // repository type axios
    this.$api.social.posts.show(id).then(res => {
      console.log("new");
      console.log(res);
    });
    */
  },
  methods: {},
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
