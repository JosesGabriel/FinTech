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
<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
<script>
import Navbar from "~/components/Navbar";
import Newsfeed from "~/components/social/Newsfeed";
import TrendingStocks from "~/components/TrendingStocks";
import WhoToMingle from "~/components/WhoToMingle";
import FooterSidebar from "~/components/FooterSidebar";
import PostField from "~/components/social/PostField";
import MiniWatchlist from "~/components/MiniWatchlist";
import Bulletin from "~/components/Bulletin";
import axios from "~/node_modules/axios";

export default {
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
  mounted() {
    axios
      .get("https://dev-api.arbitrage.ph/api/social/posts/33937358302875648")
      .then(response => (this.info = response.data));
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    },
    authorNewPost: function(value) {
      this.newPost = value;
    }
  },
  head() {
    return {
      title: "Arbitrage",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>
