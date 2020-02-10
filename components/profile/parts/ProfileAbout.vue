<template>
  <v-container class="pa-0" dark>
    <v-card class="pa-3 mb-2" outlined :dark="lightSwitch == 1 ? true : false">
      <v-row no-gutters>
        <span :class="fontColor" class="pa-2 d-block font-weight-bold subtitle-1">About</span>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          icon
          v-show="$auth.user.data.user.username === userData.username ? true : false"
          @click.stop="showUploadPhoto=true"
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </v-row>
      <span
        class="px-2 d-block caption"
      >{{ aboutData.about == null ? "Add a short bio to tell people more about yourself." : aboutData.about }}</span>

      <v-row no-gutters>
        <div>
          <v-list-item two-line class="pa-2">
            <v-list-item-content class="py-0">
              <v-list-item-title class="body-2">Location</v-list-item-title>
              <v-list-item-subtitle
                class="caption"
              >{{ aboutData.location == null ? "Add Location" : aboutData.location }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-spacer></v-spacer>
        <div class="qr-code pb-1">
          <v-card
            :dark="lightSwitch == 1 ? true : false"
            color="transparent"
            class="d-flex align-end qr-code__element"
            height="100%"
            flat
          >
            <QRCanvas :options="options" />
          </v-card>
        </div>
      </v-row>
    </v-card>
    <edit-about
      @clicked="onEdit"
      :visible="showUploadPhoto"
      @close="showUploadPhoto=false"
      @updated="onUpdated"
    />
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { QRCanvas } from "qrcanvas-vue";
import editAbout from "~/components/profile/dialog/EditProfileAbout";

export default {
  components: {
    QRCanvas,
    editAbout
  },
  props: {
    about: {
      default() {
        return [];
      }
    },
    user: {
      default() {
        return {};
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
      showUploadPhoto: false,
      options: {
        data: "",
        size: 50,
        background: "transparent",
        foreground: "#03DAC5"
      },
      aboutData: {
        about: null,
        location: null
      },
      userData: {
        username: null
      }
    };
  },
  watch: {
    about() {
      this.aboutData = this.about;
    },
    user() {
      this.userData = this.user;
      this.onUpdated();
    }
  },
  methods: {
    onEdit(value) {
      this.aboutData = value.data.profile;
    },
    onUpdated() {
      this.options = Object.assign({}, this.options, {
        data: "https://lyduz.com/profile/" + this.user.username
      });
    }
  }
};
</script>