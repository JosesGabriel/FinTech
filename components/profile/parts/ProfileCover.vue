<template>
  <v-container dark class="pa-0 profile_cover-cont">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0" elevation="10">
        <v-img :src="cover_image" aspect-ratio="3" class="white--text align-end">
          <v-overlay absolute color="darkchart" :opacity=".9" :value="overlay">
            <v-menu offset-y dense>
              <template v-slot:activator="{ on }">
                <v-btn icon dark v-on="on">
                  <v-icon large color="success">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-list
                :dark="lightSwitch == true"
                :style="{ background: cardbackground }"
                style="padding: 0;"
              >
                <v-list-item @click.stop="showUploadCover=true">
                  <v-list-item-title class="success--text">Upload Photo</v-list-item-title>
                </v-list-item>
                <v-list-item @click>
                  <v-list-item-title class="success--text">Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-overlay>
        </v-img>
      </v-col>
      <v-col cols="12" class="cover_info pa-0">
        <v-list-item>
          <v-list-item-avatar size="180">
            <!-- <span class="profile-badge">ALPHA</span> Hide for now, wala sa mvp-->
            <v-img class="profile_photo" :src="profile_image" :lazy-src="profile_image">
              <v-overlay absolute color="darkchart" :opacity=".9" :value="overlay">
                <v-menu offset-y dense>
                  <template v-slot:activator="{ on }">
                    <v-btn icon dark v-on="on">
                      <v-icon large color="success">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-list
                    :dark="lightSwitch == true"
                    :style="{ background: cardbackground }"
                    style="padding: 0;"
                  >
                    <v-list-item @click.stop="showUploadPhoto=true">
                      <v-list-item-title class="success--text">Upload Photo</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click>
                      <v-list-item-title class="success--text">Remove</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-overlay>
            </v-img>
          </v-list-item-avatar>
          <v-card
            class="d-flex align-start flex-column cover_bottom-x"
            :height="85"
            color="transparent"
            flat
            tile
          >
            <v-card class="pa-2 mb-auto" color="transparent" outlined tile>
              <div class>
                <v-list-item-title
                  class="white--text font-weight-bold display-1 text-shadow"
                >{{ user.first_name }} {{ user.last_name }}</v-list-item-title>
                <v-list-item-title class="white--text subtitle-1 text-shadow">@{{ user.username }}</v-list-item-title>
              </div>
            </v-card>
            <v-card class="px-2 pt-1 profile_suminfo d-block" color="transparent" outlined tile>
              <v-row no-gutters>
                <div class="text-center pr-4">
                  <v-list-item-title class="white--text caption">Followers</v-list-item-title>
                  <v-list-item-title
                    class="success--text font-weight-medium body-1"
                    v-text="follow.followers"
                  ></v-list-item-title>
                </div>
                <div class="text-center pr-4">
                  <v-list-item-title class="white--text caption">Following</v-list-item-title>
                  <v-list-item-title
                    class="success--text font-weight-medium body-1"
                    v-text="follow.following"
                  ></v-list-item-title>
                </div>
                <v-spacer></v-spacer>
                <div class="text-center pt-1">
                  <v-btn
                    background-color="transparent"
                    color="success"
                    class="text-capitalize caption"
                    dark
                    icon
                    @click="overlay = !overlay"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-row>
            </v-card>
          </v-card>
        </v-list-item>

        <upload-profile :visible="showUploadPhoto" @close="showUploadPhoto=false" />
        <upload-cover :visible="showUploadCover" @close="showUploadCover=false" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import uploadProfile from "~/components/profile/dialog/UploadProfilePhoto";
import uploadCover from "~/components/profile/dialog/UploadProfileCover";

export default {
  components: {
    uploadProfile,
    uploadCover
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    user() {
      return this.$auth.user.data.user;
    },
    profile_image() {
      let profile = "/Icon/user-default.svg";
      if (this.user.profile_image != null) {
        profile = this.user.profile_image;
      }
      return profile;
    },
    cover_image() {
      let cover = "/cover-default.jpg";
      if (this.user.cover_image != null) {
        cover = this.user.cover_image;
      }
      return cover;
    }
  },
  data() {
    return {
      showUploadPhoto: false,
      showUploadCover: false,
      overlay: false,
      follow: {
        followers: 0,
        following: 0
      }
    };
  },
  mounted() {
    const user_id = this.$auth.user.data.user.uuid;
    this.$api.social.follow.follow(user_id).then(response => {
      if (response.success) {
        this.follow = response.data.user;
      }
    });
  }
};
</script>
<style scoped>
.cover_info {
  margin-top: -140px;
}
.profile_photo {
  border: 4px solid #fff;
  background-color: #d2d8dc;
}
.profile_cover-cont {
  border: thin solid hsla(0, 0%, 100%, 0.12);
  border-radius: 0 0 5px 5px;
  border-top: 0;
}
.profile_suminfo {
  /* margin-top: 26px; */
  width: 100%;
}
.cover_bottom-x {
  width: 100% !important;
}
.text-shadow {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
.profile-badge {
  padding: 2px 12px;
  position: absolute;
  z-index: 1;
  font-weight: 600;
  background: #d42083;
  border-radius: 50px;
  bottom: 13px;
  right: 0;
  box-shadow: 0px 0px 7px 0px black;
}
</style>