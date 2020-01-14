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

export default {
  layout: "main",
  components: {
    ProfileCover,
    ProfileTimeline
  }
};
</script>
