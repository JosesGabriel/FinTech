<template>
  <v-container class="px-0" dark>
    <v-row no-gutters>
      <v-col class="px-0" cols="12" sm="12" md="12" lg="12">
        <v-tabs background-color="transparent" :dark="lightSwitch == 1 ? true : false">
          <v-tabs-slider color="success"></v-tabs-slider>

          <v-tab :class="fontColor" :href="`#tab-1`" class="text-capitalize subtitle-1">Profile</v-tab>
          <v-tab :class="fontColor" class="text-capitalize subtitle-1" disabled>Activities</v-tab>
          <v-tab :class="fontColor" class="text-capitalize subtitle-1" disabled>Services</v-tab>

          <!-- Profile tab -->
          <v-tab-item class="mt-5" :value="'tab-1'">
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="8" lg="8">
                <ProfileAbout :about="about" :user="user" class="my-2" />
                <PostField class="mb-3" @authorNewPost="authorNewPost" />
                <Newsfeed :new-post="newPost" />
                <!-- <ProfileExperience class="my-2" />
                <ProfileEducation class="my-2" />
                <ProfileSkills class="my-2" />
                <ProfileInterests class="my-2" />-->
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <!-- <ProfileCourse /> // hide for now -->
                <!-- <ProfileSuggestedUser /> -->

                <WhoToMingle class="pl-3" />
                <!-- <ProfileRooms /> -->
                <!-- <ProfileAds /> -->
                <v-container>
                  <FooterSidebar />
                </v-container>
              </v-col>
            </v-row>
          </v-tab-item>
          <!-- Activities tab -->
          <v-tab-item class="mt-10" :value="'tab-2'">
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="5" lg="5" class="pr-4">
                <!-- <ProfileIdeas class="my-3" /> -->
                <ProfileFollowing class="my-3" />
                <div class="activity_sticky-sidebar">
                  <ProfileFollowers class="my-3" />
                  <v-container>
                    <FooterSidebar />
                  </v-container>
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="7" lg="7">
                <v-container class="px-md-0 pr-lg-0">
                  <PostField class="mb-3" @authorNewPost="authorNewPost" />
                  <Newsfeed :new-post="newPost" />
                </v-container>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// Profile tab
import ProfileAbout from "~/components/profile/parts/ProfileAbout";
// import ProfileExperience from "~/components/profile/parts/ProfileExperience";
// import ProfileEducation from "~/components/profile/parts/ProfileEducation";
// import ProfileSkills from "~/components/profile/parts/ProfileSkills";
// import ProfileInterests from "~/components/profile/parts/ProfileInterests";
// import ProfileRooms from "~/components/profile/parts/ProfileRooms";
// import ProfileSuggestedUser from "~/components/profile/parts/ProfileSuggestedUser";
import WhoToMingle from "~/components/WhoToMingle";
// import ProfileAds from "~/components/profile/parts/ProfileAds";
import FooterSidebar from "~/components/FooterSidebar";

// import ProfileCourse from "~/components/profile/parts/ProfileCourse"; // hide for now

// Profile tab
// import ProfileIdeas from "~/components/profile/parts/ProfileIdeas";
import ProfileFollowing from "~/components/profile/parts/ProfileFollowing";
import ProfileFollowers from "~/components/profile/parts/ProfileFollowers";
import PostField from "~/components/social/PostField";
import Newsfeed from "~/components/social/Newsfeed";
import { mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    ProfileAbout,
    // ProfileRooms,
    WhoToMingle,
    // ProfileAds,
    FooterSidebar,
    // ProfileExperience,
    // ProfileEducation,
    // ProfileSkills,
    // ProfileInterests,
    // ProfileSuggestedUser,
    // ProfileCourse, // hide for now
    // ProfileIdeas,
    // ProfileFollowing,
    // ProfileFollowers,
    PostField,
    Newsfeed
  },
  props: {
    userData: {
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    fontColor() {
      return this.lightSwitch == 1 ? "white--text" : "black--text";
    }
  },
  data() {
    return {
      isOpen: true,
      newPost: {},
      about: null,
      user: null
    };
  },
  watch: {
    userData() {
      this.about = this.userData.profile;
      this.user = this.userData;
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    authorNewPost(value) {
      this.newPost = value;
    }
  }
};
</script>
<style>
.container_profile {
  border: 1px solid;
}
.expansion_panel-sub {
  background-color: transparent !important;
}
.expansion_panel-sub.v-expansion-panel::before {
  box-shadow: none;
}
.profile_course-cont {
  margin-top: 80px;
}
.v-item-group.theme--dark.v-slide-group.v-tabs-bar {
  border-bottom: 1px solid #1f2f39 !important;
}
.v-item-group.theme--light.v-slide-group.v-tabs-bar {
  border-bottom: 1px solid hsl(0, 0%, 84%) !important;
}
.qr-code {
  width: 50px;
}
.v-card.qr-code__element > *:last-child:not(.v-btn):not(.v-chip) {
  border-radius: unset;
}
.heading-underline {
  border-bottom: thin solid rgba(255, 255, 255, 0.12);
}
.theme--dark.upload-container {
  border: 2px dashed #0c1a2b !important;
  border-radius: 1px !important;
}
.previewProfile__container {
  border: 2px dashed #0c1a2b !important;
  border-radius: 50% !important;
}
.image_close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}
.edit_about-textarea.v-textarea.theme--dark fieldset {
  border-color: #1f2e39;
}
.edit_about-textfield.v-text-field.theme--dark fieldset {
  border-color: #1f2e39;
}
.activity_sticky-sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 57px;
}
</style>