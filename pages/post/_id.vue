<template>
  <v-container
    class="page__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-row class="mb-5" no-gutters>
      <v-col class="hidden-xs-only px-3" sm="2" md="2" lg="3">
        <Navbar active="social" />
      </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <Newsfeed :postid="$route.params.id" @postData="parsePost" />
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
        <TrendingStocks />
        <WhoToMingle />
        <MiniWatchlist />
        <FooterSidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from "~/components/Navbar";
import TrendingStocks from "~/components/TrendingStocks";
import WhoToMingle from "~/components/WhoToMingle";
import MiniWatchlist from "~/components/MiniWatchlist";
import FooterSidebar from "~/components/FooterSidebar";

import { mapGetters } from "vuex";
import Newsfeed from "~/components/social/Newsfeed";

export default {
  components: {
    Navbar,
    Newsfeed,
    TrendingStocks,
    WhoToMingle,
    MiniWatchlist,
    FooterSidebar
  },
  data() {
    return {
      post: "",
      postImage: "https://lyduz.com/png_logo.png",
      newsFeedModal: true
    };
  },

  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  /**
   * asyncdata is used to render server side values, in this case a single post object
   * This is needed for dynamic generation of OG tags without visiting the page itself.
   *
   * asyncData lifecycle has no access to 'this' keyword. Needs to use $axios syntax
   *
   * @param   {object}  $axios  unsure, but this is the $axios object
   * @param   {string}  params
   *
   * @return
   */
  async asyncData({ $axios, params }) {
    $axios
      .get(params.id)
      .then(res => {
        return { post: res.data.data.post };
      })
      .catch(e => {});
  },
  head() {
    return {
      title: this.post.content,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: this.post.content },
        {
          property: "og:description",
          content: this.post.content
        },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content:
            this.post.attachments_count > 0
              ? this.post.attachments[0].url
              : this.postImage
        },
        {
          property: "fb:app_id",
          content: process.env.FB_APP_ID
        }
      ]
    };
  },
  auth: false,
  layout: "main",
  methods: {
    /**
     * Captures data emitted by Newsfeed component
     *
     * @param   {object}  object
     *
     * @return
     */
    parsePost(object) {
      this.post = object[0].content;
      if (object[0].attachments_count > 0) {
        this.postImage = object[0].attachments[0].url;
      }
    }
  }
};
</script>

<style scoped>
.page__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
