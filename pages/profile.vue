<template>
  <v-container class="page__wrapper" dark>
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
    ProfileTimeline,
    // iconfont: "fa"
  }
};
</script>
