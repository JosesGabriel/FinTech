<template>
  <v-container class="page__wrapper" dark>
    <v-row no-gutters>
      <v-col class="px-2" cols="12" sm="12" md="12" lg="12">
        <v-tabs color="success" background-color="transparent" dark>
          <v-tabs-slider></v-tabs-slider>

          <v-tab :href="`#tab-1`" class="text-capitalize subtitle-1">Profile</v-tab>
          <v-tab :href="`#tab-2`" class="text-capitalize subtitle-1">Activities</v-tab>
          <v-tab :href="`#tab-3`" class="text-capitalize subtitle-1">Services</v-tab>

          <v-tab-item class="mt-10" :value="'tab-1'">
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="8" lg="8">
                <ProfileAbout class="my-2" />
                <ProfileExperience class="my-2" />
                <ProfileEducation class="my-2" />
                <ProfileSkills class="my-2" />
                <ProfileInterests class="my-2" />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <ProfileCourse class="my-2" />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProfileAbout from "~/components/profile/parts/ProfileAbout";
import ProfileExperience from "~/components/profile/parts/ProfileExperience";
import ProfileEducation from "~/components/profile/parts/ProfileEducation";
import ProfileSkills from "~/components/profile/parts/ProfileSkills";
import ProfileInterests from "~/components/profile/parts/ProfileInterests";
import ProfileCourse from "~/components/profile/parts/ProfileCourse";

export default {
  layout: "main",
  components: {
    ProfileAbout,
    ProfileExperience,
    ProfileEducation,
    ProfileSkills,
    ProfileInterests,
    ProfileCourse
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
</style>