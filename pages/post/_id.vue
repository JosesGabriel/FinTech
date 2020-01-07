<template>
  <v-container
    class="page__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-row class="mb-5" no-gutters>
      <v-col class="hidden-xs-only px-3" sm="2" md="2" lg="3"> </v-col>
      <v-col xs="12" sm="10" md="6" lg="6">
        <Newsfeed :postid="$route.params.id" @postData="parsePost" />
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3"> </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios"; //temporary. 'this' keyword is not accessible on asyncData method
import Newsfeed from "~/components/social/Newsfeed";
export default {
  components: {
    Newsfeed
  },
  data() {
    return {
      post: "",
      postImage: "https://lyduz.com/png_logo.png"
    };
  },

  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  async asyncData({ params }) {
    return axios
      .get(`https://dev-api.arbitrage.ph/api/social/posts/${params.id}`)
      .then(res => {
        return { post: res.data.data.post };
      });
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
          content: "407039123333666"
        }
      ]
    };
  },
  auth: false,
  layout: "main",
  mounted() {},
  methods: {
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
