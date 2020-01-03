<template>
  <v-container
    class="socialWall__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
    dark
  >
    <v-row class="mb-5" no-gutters>
      <v-col class="navbar__container hidden-xs-only px-3" sm="2" md="2" lg="3">
        <Navbar active="social" />
      </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <PostField class="mb-3" @authorNewPost="authorNewPost" />
        <Newsfeed :new-post="newPost" />
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
        <TrendingStocks />
        <WhoToMingle />
        <MiniWatchlist />
        <Bulletin />
        <FooterSidebar />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "~/components/Navbar";
import Newsfeed from "~/components/social/Newsfeed";
import TrendingStocks from "~/components/TrendingStocks";
import WhoToMingle from "~/components/WhoToMingle";
import FooterSidebar from "~/components/FooterSidebar";
import PostField from "~/components/social/PostField";
import MiniWatchlist from "~/components/MiniWatchlist";
import Bulletin from "~/components/Bulletin";

export default {
  head() {
    return {
      title: "INDEX",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          property: "description",
          name: "description",
          hid: "description",
          content: "My post page"
        },
        { property: "og:title", name: "og:title", content: `My Post` },
        {
          property: "og:description",
          name: "og:description",
          content: "INDEX PAGE"
        },
        { property: "og:type", name: "og:type", content: "website" },
        {
          property: "og:url",
          name: "og:url",
          content: `http://euro-travel-example.com/thumbnail.jpg`
        },
        {
          property: "og:image",
          name: "og:image",
          content: `http://euro-travel-example.com/thumbnail.jpg`
        }
      ]
    };
  },
  layout: "main",
  components: {
    Navbar,
    Newsfeed,
    TrendingStocks,
    WhoToMingle,
    MiniWatchlist,
    Bulletin,
    FooterSidebar,
    PostField
  },
  data() {
    return {
      isOpen: true,
      newPost: {}
    };
  },
  mounted() {},
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    },
    authorNewPost: function(value) {
      this.newPost = value;
    }
  }
};
</script>
<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
