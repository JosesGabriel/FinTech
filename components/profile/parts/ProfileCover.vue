<template>
  <v-container :class="lightSwitch == 1 ? 'dark' : 'light'" class="pa-0 profile_cover-cont">
    <v-row no-gutters>
      <v-col
        cols="12"
        class="pa-0 coverPhoto__container"
        @mouseenter="shoUpdateText = !shoUpdateText"
        @mouseleave="shoUpdateText = !shoUpdateText"
        elevation="10"
      >
        <v-card :dark="lightSwitch == 1 ? true : false" elevation="0" tile>
          <div class="uploadCover__photo">
            <v-btn
              text
              dark
              small
              class="uploadCover__photo-btn text-capitalize caption ma-2 px-2 white--text"
              v-show="$auth.user.data.user.username == user.username ? true : false"
              @click.stop="showUploadCover=true"
              :outlined="shoUpdateText"
            >
              <v-icon medium color="success">mdi-camera-iris</v-icon>
              <span v-show="shoUpdateText" class="pl-1">Update Cover Photo</span>
            </v-btn>
          </div>
          <v-img
            :src="user.cover_image == null ? '/cover-default.jpg' : user.cover_image "
            aspect-ratio="3"
            class="white--text align-end"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" class="cover_info pa-0">
        <v-list :dark="lightSwitch == 1 ? true : false">
          <v-list-item>
            <v-list-item-avatar size="180">
              <!-- <span class="profile-badge">ALPHA</span> Hide for now, wala sa mvp-->
              <v-img
                class="profile_photo"
                @mouseenter="overlay = !overlay"
                @mouseleave="overlay = !overlay"
                :src="user.profile_image == null ? 'default.png' : user.profile_image"
                :lazy-src="user.profile_image == null ? 'default.png' : user.profile_image"
              >
                <v-overlay
                  class="overlayProfile__photo"
                  absolute
                  color="darkchart"
                  v-show="$auth.user.data.user.username === user.username ? true : false"
                  :opacity=".9"
                  :value="overlay"
                >
                  <div @click.stop="showUploadPhoto=true" class="uploadProfile_container-btn">
                    <v-icon medium color="success">mdi-camera-iris</v-icon>
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
              <v-card
                :dark="lightSwitch == 1 ? true : false"
                class="px-2 pt-1 profile_suminfo d-block"
                color="transparent"
                outlined
                tile
              >
                <v-row no-gutters>
                  <div class="text-center pr-4">
                    <v-list-item-title :class="fontColor" class="caption">Followers</v-list-item-title>
                    <v-list-item-title
                      class="success--text font-weight-medium body-1"
                      v-text="follow.followers"
                    ></v-list-item-title>
                  </div>
                  <div class="text-center pr-4">
                    <v-list-item-title :class="fontColor" class="caption">Following</v-list-item-title>
                    <v-list-item-title
                      class="success--text font-weight-medium body-1"
                      v-text="follow.following"
                    ></v-list-item-title>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn
                    filled
                    rounded
                    color="success"
                    v-show="$auth.user.data.user.username == user.username ? false : follow.im_following == 1 ? false : follow.my_follower == 1 ? false : true"
                    @click="followAccount(user.uuid, 'follow')"
                    class="black--text caption font-weight-bold body-2 mt-2"
                  >Follow</v-btn>
                  <v-btn
                    filled
                    rounded
                    color="success"
                    v-show="$auth.user.data.user.username == user.username && follow.im_following == 1 && follow.my_follower == 1 ? false : follow.im_following == 1 ? follow.my_follower == 1 ? false : true : false"
                    @click="unfollowAccount(user.uuid)"
                    class="black--text caption font-weight-bold body-2 mt-2"
                  >Unfollow</v-btn>
                  <v-btn
                    filled
                    rounded
                    color="success"
                    v-show="$auth.user.data.user.username == user.username && follow.im_following == 1 && follow.my_follower == 1 ? false : follow.my_follower == 1 ? follow.im_following == 1 ? false : true : false"
                    @click="followAccount(user.uuid, 'followback')"
                    class="black--text caption font-weight-bold body-2 mt-2"
                  >Follow Back</v-btn>
                  <v-btn
                    filled
                    rounded
                    color="success"
                    v-show="$auth.user.data.user.username == user.username ? false : follow.my_follower == 1 && follow.im_following == 1 ? true : false"
                    class="black--text caption font-weight-bold body-2 mt-2"
                  >Followed</v-btn>
                </v-row>
              </v-card>
            </v-card>
          </v-list-item>
        </v-list>
        <upload-profile :visible="showUploadPhoto" @close="showUploadPhoto=false" />
        <upload-cover :visible="showUploadCover" @close="showUploadCover=false" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import uploadProfile from "~/components/profile/dialog/UploadProfilePhoto";
import uploadCover from "~/components/profile/dialog/UploadProfileCover";

export default {
  props: {
    userData: {
      default() {
        return [];
      }
    }
  },
  components: {
    uploadProfile,
    uploadCover
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      settings: "global/getSettings"
    }),
    fontColor() {
      return this.lightSwitch == 1 ? "white--text" : "black--text";
    },
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    // showFollow() {
    //   return this.$auth.user.data.user.username == this.user.username ? false : this.follow.im_following == 1 ? false : this.follow.my_follower == 1 ? false : true
    // },
    // shoUnfollowAccount() {
    //   return this.$auth.user.data.user.username == this.user.username || this.follow.im_following == 1 || this.follow.my_follower == 1 ? false : this.follow.im_following == 1 ? true : false; 
    // },
    // showFollowBack() {
    //   return this.$auth.user.data.user.username == this.user.username || this.follow.im_following == 1 || this.follow.my_follower == 1 ? false : this.follow.my_follower == 1 ? true : false 
    // },
    // showFollowed() {
    //   return this.$auth.user.data.user.username == this.user.username ? false : this.follow.my_follower == 1 && this.follow.im_following == 1 ? true : false
    // }
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
      shoUpdateText: false,
      user: {
        profile_image: null,
        cover_image: null,
        name: "",
        first_name: "",
        last_name: "",
        username: "",
        uuid: ""
      }
    };
  },
  watch: {
    settings() {
      this.user = this.settings.data.user;
    },
    userData() {
      this.user = this.userData;
      this.getFollow();
    }
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    getFollow() {
      const user_id = this.user.uuid;
      this.$api.social.follow.follow(user_id).then(response => {
        if (response.success) {
          this.follow = response.data.user;
        }
      });
    },
    /**
     * fires when user clicks follow button
     *
     * @param   {string}  user_id
     *
     * @return
     */
    followAccount(user_id, state) {
      const params = user_id;
      this.$api.social.follow
        .followAccount(params)
        .then(response => {
          if (response.success) {
            let alert = {
              model: true,
              state: true,
              message: "Successfully followed!"
            };
            this.setAlert(alert);

            this.follow.im_following = 1;
            this.follow.im_follower = 1;
          }
        })
        .catch(e => {
          let alert = {
            model: true,
            state: false,
            message: "You are already following this user."
          };
          this.setAlert(alert);
        });
    },
    /**
     * fires when user clicks follow button
     *
     * @param   {string}  user_id
     *
     * @return
     */
    unfollowAccount(user_id) {
      const params = user_id;
      this.$api.social.follow
        .unfollowAccount(params)
        .then(response => {
          if (response.success) {
            let alert = {
              model: true,
              state: true,
              message: "Successfully unfollowed!"
            };
            this.setAlert(alert);

            this.follow.im_following = 0;
          }
        })
        .catch(e => {
          let alert = {
            model: true,
            state: false,
            message: "You are already unfollowing this user."
          };
          this.setAlert(alert);
        });
    }
  }
};
</script>
<style scoped>
.cover_info {
  margin-top: -147px;
}
.profile_photo {
  border: 4px solid #fff;
  background-color: #d2d8dc;
}
.profile_cover-cont.light {
  border: thin solid hsl(0, 0%, 84%);
  border-radius: 0 0 5px 5px;
  border-top: 0;
}
.profile_cover-cont.dark {
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