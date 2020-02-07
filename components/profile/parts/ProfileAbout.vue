<template>
  <v-container class="pa-0" dark>
    <v-card class="transparent__bg pa-3 mb-2" outlined dark>
      <v-row no-gutters>
        <span class="white--text pa-2 d-block font-weight-bold body-2">About</span>
        <v-spacer></v-spacer>
        <v-btn color="success" icon @click.stop="showUploadPhoto=true">
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
          <v-card class="d-flex align-end qr-code__element" height="100%" flat>
            <QRCanvas :options="options" @updated="onUpdated" />
          </v-card>
        </div>
      </v-row>
    </v-card>
    <edit-about :visible="showUploadPhoto" @close="showUploadPhoto=false" />
  </v-container>
</template>
<script>
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
  data() {
    return {
      showUploadPhoto: false,
      options: {
        data: "hello",
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
      this.userData = this.user;

      console.log(this.user);
      this.options = Object.assign({}, this.options, {
        data: "/profile/" + this.userData.username
      });
    }
  },
  methods: {
    onUpdated() {
      // this.options.data = 
    }
  }
};
</script>