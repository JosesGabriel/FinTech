
<template>
  <v-dialog v-model="show" max-width="306px">
    <v-container class="pa-7 pt-4" :style="{ background: cardbackground }">
      <span
        :class="lightSwitch == 1 ? 'white--text' : 'black--text'"
        class="body-1 py-2 font-weight-bold"
      >Upload Profile Photo</span>
      <v-card
        :dark="lightSwitch == true"
        height="250px"
        width="250px"
        outlined
        class="d-flex justify-center align-center mt-2 upload-container"
      >
        <div class="image_preview-container d-flex justify-center align-center">
          <v-btn
            icon
            class="image_close"
            v-show="myCroppa.chosenFile != null ? true : false"
            @click="myCroppa.remove(), myCroppa.chosenFile = null"
          >
            <v-icon class="pa-1">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="align-center placeholderBackdrop__back">
          <span class="darkoutline--text headline align-center">
            <v-icon class="tertiary--text display-3 text-center d-block mb-3">mdi-image-filter</v-icon>
            <span class="body-2 tertiary--text text-center d-block">
              <strong>Drag photo</strong> or
              <br />
              <strong>Click here</strong> to upload photo
            </span>
          </span>
        </div>

        <croppa
          v-model="myCroppa"
          @click="onClickImageUploadBtn"
          :width="246"
          :height="246"
          ref="myCroppa"
          placeholder
          initial-size="cover"
          crossorigin="anonymous"
          :show-remove-button="false"
          :prevent-white-space="true"
          @init="onInit"
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
          class="ma-1 font-weight-bold black--text text-capitalize"
          medium
          filled
          color="success"
          v-show="showUpload"
          :disabled="myCroppa.chosenFile != null ? false : true"
          @click="onClickImageUploadBtn"
        >Upload</v-btn>
        <v-btn
          class="ma-1 font-weight-bold black--text text-capitalize"
          medium
          filled
          color="success"
          v-show="showSave"
          @click="save"
        >Save</v-btn>
      </v-card>
    </v-container>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

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
      showUpload: true,
      showSave: false,
      cloudString: null,
      loader: false,
      myCroppa: {},
      isChosen: null,
      preview: ""
    };
  },
  watch: {
    isChosen() {
      this.upload();
    }
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert",
      setSettings: "global/setSettings"
    }),

    onInit() {
      this.myCroppa.addClipPlugin(function(ctx, x, y, w, h) {
        /*
         * ctx: canvas context
         * x: start point (top-left corner) x coordination
         * y: start point (top-left corner) y coordination
         * w: croppa width
         * h: croppa height
         */
        ctx.beginPath();
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true);
        ctx.closePath();
      });
    },

    onClickImageUploadBtn() {
      this.upload();

      this.isChosen = this.$refs.myCroppa.chosenFile;
    },

    upload() {
      if (this.myCroppa.chosenFile != null) {
        this.loader = true;
        this.myCroppa.generateBlob(
          blob => {
            let formData = new FormData();
            formData.append("file", blob, this.$refs.myCroppa.chosenFile.name);
            this.$api.social.upload.create(formData).then(
              function(response) {
                this.showUpload = false;
                this.showSave = true;
                this.loader = false;

                this.cloudString = response.data.file.url;
              }.bind(this)
            );
          },
          "image/jpeg",
          0.8
        ); // 80% compressed jpeg file
      }
    },

    save() {
      const payload = {
        profile_image: this.cloudString
      };
      this.$api.accounts.account.putnoid(payload).then(response => {
        if (response.success) {
          let alertM = {
            model: true,
            state: true,
            message: "Successfully update profile photo"
          };
          this.setAlert(alertM);

          this.setSettings(response);
          console.log(response)

          this.clearInputs();
        }
      });
    },

    clearInputs() {
      this.showUpload = true;
      this.showSave = false;
      this.myCroppa.chosenFile = null;
      this.myCroppa.remove();
      this.$emit("close");
      this.loader = false;
    }
  }
};
</script>

<style scoped>
.placeholderBackdrop__back {
}
</style>