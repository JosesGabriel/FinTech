
<template>
  <v-dialog v-model="show" max-width="500px">
    <v-container class="pa-7 pt-4" :style="{ background: cardbackground }">
      <v-item-title class="success--text body-1 py-2">Upload Cover Photo</v-item-title>
      <v-card
        :dark="lightSwitch == true"
        height="250px"
        outlined
        class="d-flex justify-center align-center mt-2 upload-container"
      >
        <div class="image_preview-container d-flex justify-center align-center">
          <img :src="imageArray[0]" width="100%" height="auto" />
          <v-btn icon class="image_close" v-show="imageDefault != true" @click="clearInputs ,imageArray = []">
            <v-icon class="pa-1">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="align-center" v-show="imageDefault">
          <span class="darkoutline--text headline align-center">
            <v-icon class="darkoutline--text display-3 text-center d-block mb-3">mdi-image-filter</v-icon>Drag photo here
          </span>
        </div>
      </v-card>
      <v-card :dark="lightSwitch == true" flat class="d-flex justify-end mt-3 m-1">
        <!-- File handler -->
        <input
          ref="postField__inputRef"
          type="file"
          class="d-none"
          multiple
          accept=".jpg, .jpeg, .png, .mp4, .webm, .gif"
          @change="onInputFileChange"
        />
        <!-- Cancel upload -->
        <v-btn
          class="ma-1 text-capitalize"
          medium
          text
          color="secondary"
          @click.stop="show = false"
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
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
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
      cloudString: null
    };
  },
  methods: {
    onClickImageUploadBtn() {
      this.$refs.postField__inputRef.click();
    },

    onInputFileChange(e) {
      this.upload();
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for (var i = 0; i < files.length; i++) {
        var filetype = files[i].type.split("/")[0];
        this.generateImagePreviews(files[i], filetype);
      }
    },

    generateImagePreviews(file, type) {
      this.imageArray = [];
      var reader = new FileReader();
      reader.onload = e => {
        this.imageArray.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    upload() {
      this.cloudString = "";
      let formData = new FormData();
      formData.append("file", this.$refs.postField__inputRef.files[0]);
      this.$api.social.upload
        .create(formData)
        .then(
          function(response) {
            this.showUpload = false;
            this.showSave = true;

            this.cloudString = response.data.file.url;
          }.bind(this)
        )
    },

    save() {
      const payload = {
        cover_image: this.cloudString
      };
      this.$api.accounts.account.putnoid(payload).then(response => {
        if (response.success) {
          this.showUpload = true;
          this.showSave = false;
        }
      });
    },

    clearInputs() {
      this.imageArray = [];
      this.showUpload = true;
      this.showSave = false;
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