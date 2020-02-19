<template>
  <v-container class="page__wrapper profile-page__wrapper" dark>
    <ProfileCover :userData="user" />

    <v-row no-gutters>
      <v-col cols="12">
        <ProfileTimeline :userData="user" />
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
  head() {
    return {
      title: "Profile",
      meta: [
        {
          hid: "profile"
        }
      ]
    };
  },
  data() {
    return {
      user: null,
      profile: null
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const params = this.$route.params.id;
      this.$api.social.user.users(params).then(({ data }) => {
        this.user = data.user;
        this.profile = data.profile;
        
      });
    }
  }
};
</script>
