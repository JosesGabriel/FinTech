
<template>
  <v-dialog v-model="show" max-width="500px">
    <v-container class="pa-7 pt-4" :style="{ background: cardbackground }">
      <span class="success--text body-1 py-2 font-weight-bold">Upload Cover Photo</span>
      <v-card
        :dark="lightSwitch == true"
        height="250px"
        outlined
        class="d-flex justify-center align-center mt-2 upload-container"
      >
        <div class="image_preview-container d-flex justify-center align-center">
          <v-btn icon class="image_close" @click="myCroppa.remove()">
            <v-icon class="pa-1">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="align-center placeholderBackdrop__back">
          <span class="darkoutline--text headline align-center">
            <v-icon class="tertiary--text display-3 text-center d-block mb-3">mdi-image-filter</v-icon>
            <span class="body-2 tertiary--text text-center d-block">
              <strong>Drag photo</strong> or
              <strong>Click here</strong> to upload photo
            </span>
          </span>
        </div>

        <croppa
          v-model="myCroppa"
          :width="435"
          :height="246"
          ref="myCroppa"
          placeholder
          initial-size="cover"
          crossorigin="anonymous"
          :show-remove-button="false"
          :prevent-white-space="true"
        ></croppa>
      </v-card>
      <v-progress-linear :active="loader" color="success darken-2" indeterminate></v-progress-linear>
      <v-card :dark="lightSwitch == true" flat class="d-flex justify-end mt-3 m-1">
        <!-- Cancel upload -->
        <v-btn
          class="ma-1 text-capitalize"
          medium
          text
          color="secondary"
          @click.stop="show = false"
          @click="clearInputs"
        >Cancel</v-btn>
        <!-- Upload -->
        <v-btn
          class="ma-1 text-capitalize"
          medium
          outlined
          color="success"
          v-show="showUpload"
          @click="onClickImageUploadBtn"
        >Upload</v-btn>
        <v-btn
          class="ma-1 text-capitalize"
          medium
          outlined
          color="success"
          v-show="showSave"
          @click="save"
        >Save</v-btn>
      </v-card>
    </v-container>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["visible"],
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
          this.clearInputs();
        }
      }
    }
  },
  data() {
    return {
      imageArray: [],
      imageDefault: true,
      showUpload: true,
      showSave: false,
      cloudString: null,
      loader: false,
      myCroppa: {},
      isChosen: null
    };
  },
  watch: {
    isChosen() {
      this.upload();
    }
  },
  methods: {
    onClickImageUploadBtn() {
      this.upload();
      this.isChosen = this.$refs.myCroppa.chosenFile;
      console.log("text");
    },
    upload() {
      console.log(this.$refs.myCroppa.chosenFile);
      this.myCroppa.generateBlob(
        blob => {
          console.log("test");
          let formData = new FormData();
          formData.append("file", blob, this.$refs.myCroppa.chosenFile.name);
          this.$api.social.upload.create(formData).then(
            function(response) {
              console.log(response);
            }.bind(this)
          );
        },
        "image/jpeg",
        0.8
      ); // 80% compressed jpeg file
    },

    save() {
      const payload = {
        cover_image: this.cloudString
      };
      this.$api.accounts.account.putnoid(payload).then(response => {
        if (response.success) {
          this.showUpload = true;
          this.showSave = false;
          let update = this.photo;
        }
      });
    },

    clearInputs() {
      this.imageArray = [];
      this.showUpload = true;
      this.showSave = false;
      this.loader = false;
    }
  },
  watch: {
    imageArray() {
      if (this.imageArray.length != 0) {
        this.imageDefault = false;
      } else {
        this.imageDefault = true;
      }
    }
  }
};
</script>

<style scoped>
.placeholderBackdrop__back {
}
</style>