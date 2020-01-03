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
import Newsfeed from "~/components/social/Newsfeed";
export default {
  head() {
    return {
      title: "Test Title share",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: this.post },
        {
          property: "og:description",
          content: this.post
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://lyduz.com/login"
        },
        {
          property: "og:image",
          content: this.postImage
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
  mounted() {
    console.log(this.$route.params.id);
  },
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
