<template>
  <v-container
    class="page__wrapper"
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
      <v-col class="px-3 hidden-sm-and-down pr-0" cols="3" sm="3" md="3">
        <TrendingStocks />
        <WhoToMingle />
        <MiniWatchlist />
        <!-- TODO put back when implementing -->
        <!-- <Bulletin /> -->
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
import MiniWatchlist from "~/components/MiniWatchlist";
import FooterSidebar from "~/components/FooterSidebar";
import PostField from "~/components/social/PostField";
import Bulletin from "~/components/Bulletin";

import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({
      sse: "social/sse"
    })
  },
  data() {
    return {
      isOpen: true,
      newPost: {}
    };
  },
  methods: {
    ...mapActions({
      setSSE: "social/setSSE",
      setSSEInfo: "social/setSSEInfo"
    }),
    /**
     * Captures when post field emits that user has posted new post
     *
     * @param   {integer}  value
     *
     * @return  {function}
     */
    authorNewPost(value) {
      this.newPost = value;
    },

    initSSE() {
      if (this.sse !== null) {
        this.sse.close();
      }

      const sseToken =
        this.$auth.getToken("local") != false
          ? this.$auth.getToken("local").replace("Bearer ", "")
          : null;

      this.setSSE(
        new EventSource(
          `${process.env.STREAM_API_URL}/sse/market-data/pse/all?token=${sseToken}`
        )
      );

      this.sse.onopen = function() {};

      this.sse.onerror = function() {};

      this.sse.addEventListener("info", this.sseInfo);
    },
    sseInfo(e) {
      const data = JSON.parse(e.data);

      // set sse info to state
      this.setSSEInfo(data);
    }
  },
  mounted() {
    this.initSSE();
  },
  beforeDestroy() {
    this.sse.close();
  },
  computed: {
    ...mapGetters({
      sse: "social/sse"
    })
  }
};
</script>
