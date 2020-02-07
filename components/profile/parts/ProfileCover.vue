<template>
  <v-container dark class="pa-0 profile_cover-cont">
    <v-row no-gutters>
      <v-col
        cols="12"
        class="pa-0 coverPhoto__container"
        @mouseenter="shoUpdateText = !shoUpdateText"
        @mouseleave="shoUpdateText = !shoUpdateText"
        elevation="10"
      >
        <div class="uploadCover__photo">
          <v-btn
            text
            dark
            small
            class="uploadCover__photo-btn text-capitalize caption ma-2 px-2 white--text"
            @click.stop="showUploadCover=true"
            :outlined="shoUpdateText"
          >
            <v-icon medium color="success">mdi-camera</v-icon>
            <span v-show="shoUpdateText" class="pl-1">Update Cover Photo</span>
          </v-btn>
        </div>
        <v-img :src="cover_image" aspect-ratio="3" class="white--text align-end"></v-img>
      </v-col>
      <v-col cols="12" class="cover_info pa-0">
        <v-list-item>
          <v-list-item-avatar size="180">
            <!-- <span class="profile-badge">ALPHA</span> Hide for now, wala sa mvp-->
            <v-img
              class="profile_photo"
              @mouseenter="overlay = !overlay"
              @mouseleave="overlay = !overlay"
              :src="profile_image"
              :lazy-src="profile_image"
            >
              <v-overlay
                class="overlayProfile__photo"
                absolute
                color="darkchart"
                :opacity=".9"
                :value="overlay"
              >
                <div @click.stop="showUploadPhoto=true" class="uploadProfile_container-btn">
                  <v-icon medium color="success">mdi-camera</v-icon>
                  <div class="body-2">Update</div>
                </div>
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
      lightSwitch: "global/getLightSwitch",
      settings: "global/getSettings"
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
      },
      update: {
        image: ""
      },
      shoUpdateText: false
    };
  },
  watch: {
    settings() {
      this.$auth.user.data.user = this.settings.data.user;
    }
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
.coverPhoto__container {
  position: relative;
}
.uploadCover__photo {
  z-index: 1;
  position: absolute;
  right: 0;
}
.uploadCover__photo-btn {
  min-width: unset !important;
  opacity: 0.7;
}
.coverPhoto__container:hover .uploadCover__photo-btn {
  opacity: 1;
}
.overlayProfile__photo {
  cursor: pointer;
}
.uploadProfile_container-btn {
  width: 100%;
  height: 100%;
}
</style>
<style>
.image_preview-container {
  overflow: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
}
.placeholderBackdrop__back {
  position: absolute;
}
.croppa-container {
  background: none;
}
</style>