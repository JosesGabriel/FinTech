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

export default {
  layout: "main",
  components: {
    ProfileCover,
    ProfileTimeline
  },
  data() {
    return {
      userId: this.$route.params.id
    };
  },
  watch: {
    // userId() {
    //   console.log(this.userId);
    // }
  },
  methods: {
    // user() {
    //   this.$api.social.user.users(params.id).then(response => {
    //     console.log(response);
    //   });
    // }
  },
  beforeDestroy(){
      console.log("destroy")
      console.log(this.userId)
  },
  watch: {
      userId() {
          console.log("tesasd",this.userId)
      }
  },
  mounted() {
      console.log("hey")
    //   const params = this.$auth.user.data.user.username
    //   this.$api.social.user.users(params).then(response => {
    //     console.log(response);
    //   });
  }
};
</script>
