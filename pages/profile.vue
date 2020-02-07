<template>
  <v-container class="page__wrapper profile-page__wrapper" dark>
    <ProfileCover />

    <v-row no-gutters>
      <v-col cols="12">
        <ProfileTimeline />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProfileCover from "~/components/profile/parts/ProfileCover";
import ProfileTimeline from "~/components/profile/ProfileTimeline";
// import iconfont from "@fortawesome/fontawesome-free/css/all.css";

export default {
  layout: "main",
  components: {
    ProfileCover,
    ProfileTimeline
    // iconfont: "fa"
  },
  mounted() {
    this.user();
  },
  methods: {
    user() {
      const params = this.$auth.user.data.user.username;
      this.$api.social.user.users(params).then(response => {
        console.log(response);
      });
    }
  }
};
</script>
