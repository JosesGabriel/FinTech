<template>
  <v-card
    class="pa-4 transparent__bg pb-3"
    :dark="lightSwitch == 0 ? false : true"
    :loading="loader"
    outlined
  >
    <v-form enctype="multipart/form-data">
      <v-avatar size="45" class="postField__avatar">
        <img
          class="avatar__border"
          alt="Avatar"
          :src="
            $auth.user.data.user.profile_image
              ? $auth.user.data.user.profile_image
              : 'default.png'
          "
        />
      </v-avatar>
      <div class="postField__textareaContainer">
        <v-textarea
          v-if="$auth.loggedIn"
          v-model="postFieldModel"
          :placeholder="
            'Hey ' +
              $auth.user.data.user.username +
              ', penny for your thoughts?'
          "
          class="pt-0 caption postField__textarea"
          rows="3"
          row-height="25"
          color="primary"
          required
          no-resize
          solo
          flat
          background-color="transparent"
          :loading="postField__loading"
          >{{ postFieldModel }}</v-textarea
        >
        <v-textarea
          v-else
          v-model="postFieldModel"
          label="Hey Guest, penny for your thoughts?"
          class="pt-0"
          rows="3"
          row-height="25"
          color="primary"
          required
          :loading="postField__loading"
          >{{ postFieldModel }}</v-textarea
        >
        <v-divider class="postField__divider" />
        <div>
          <input
            ref="postField__inputRef"
            type="file"
            class="d-none"
            multiple
            accept=".jpg, .jpeg, .png, .mp4, .webm, .gif"
            @change="onInputFileChange"
          />
          <div class="postField__preview pt-2">
            <!-- <v-btn @click="removeImage" color="rgba(000,000,000,0.70)" fab x-small dark absolute>
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn> -->
            <!-- <img :src="postField__previewImage" class="postField__previewImage" v-if="post__isImage"/>
                        <video controls :src="postField__previewImage" class="postField__previewImage" v-if="!post__isImage"/> -->
            <div class="postField__imageWrapper">
              <div
                v-for="n in postField__imagesArray.length"
                v-show="postField__imagesArray[n - 1] != ''"
                :key="n"
                class="postField__imageCard px-1"
              >
                <v-btn
                  color="rgba(000,000,000,0.70)"
                  fab
                  x-small
                  dark
                  class="postField__imageWrapper--closebtn"
                  @click="removeImage(n)"
                >
                  <v-icon color="white">mdi-close</v-icon>
                </v-btn>
                <video
                  v-if="!post__isImage"
                  controls
                  :src="postField__imagesArray[n - 1]"
                  class="postField__imageWrapper--image"
                />
                <img
                  v-else
                  :src="postField__imagesArray[n - 1]"
                  class="postField__imageWrapper--image"
                />
              </div>
            </div>
          </div>
          <v-btn
            class="postField__btn"
            small
            :dark="lightSwitch == 0 ? false : true"
            icon
            @click="onClickImageUploadBtn"
          >
            <v-icon color="success">mdi-image-outline</v-icon
            ><span class="success--text">Photo</span>
          </v-btn>
          <v-btn
            class="postField__btn p-10"
            small
            :dark="lightSwitch == 0 ? false : true"
            icon
            @click="onClickImageUploadBtn"
          >
            <img class="mr-1" src="/icon/video.svg" width="20" />
            <span class="success--text">Video</span>
          </v-btn>
          <v-btn
            class="postField__btn"
            small
            :dark="lightSwitch == 0 ? false : true"
            icon
          >
            <img class="mr-1" src="/icon/polls.svg" width="17" />
            <span class="success--text">Polls</span>
          </v-btn>
          <v-btn
            rounded
            outlined
            small
            right
            absolute
            color="success"
            :disabled="!postFieldModel"
            @click="postFieldSubmit"
          >
            Post
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      post__isImage: null,
      postFieldModel: null,
      postField__previewImage: [],
      postField__loading: false,
      postField__imagesArray: [],
      postField__cloudArray: [],
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    /**
     * Fires when user clicks post button in social
     * Will also run some specific code if user has images
     * attached to their post
     *
     * @return
     */
    postFieldSubmit() {
      this.postField__loading = true;

      if (this.$refs.postField__inputRef.files) {
        //text + image
        const params = {
          content: this.postFieldModel,
          attachments: this.postField__cloudArray,
          visibility: "public",
          status: "active"
        };
        this.$api.social.actions
          .create(params)
          .then(
            function(response) {
              this.$emit("authorNewPost", params);
              this.clearInputs(true, response.message);
            }.bind(this)
          )
          .catch(error => {
            this.clearInputs(false, error.response.data.message);
          });
      } else {
        // can't reuse $auth.user.data.user.profile_image code above bc its asynchronous. Suggestions on how to improve r welcome
        const params = {
          content: this.postFieldModel,
          visibility: "public",
          status: "active"
        };
        this.$api.social.actions
          .create(params)
          .then(
            function(response) {
              this.$emit("authorNewPost", params);
              this.clearInputs(true, response.message);
            }.bind(this)
          )
          .catch(error => {
            this.clearInputs(false, error.response.data.message);
          });
      }
    },
    /**
     * clicks actual input type file button. lisod i-style ang <input type="file">
     *
     * @return
     */
    onClickImageUploadBtn() {
      this.$refs.postField__inputRef.click();
    },
    /**
     * fires when user clicks post button and they have images attached to the post
     * Will post to GCP server
     *
     * @return
     */
    uploadImage() {
      this.loader = "success";
      for (let i = 0; i < this.$refs.postField__inputRef.files.length; i++) {
        let formData = new FormData();
        formData.append("file", this.$refs.postField__inputRef.files[i]);
        this.$api.social.upload
          .create(formData)
          .then(
            function(response) {
              this.postField__cloudArray.push(response.data.file.url);
              this.loader = false;
            }.bind(this)
          )
          .catch(error => {
            this.clearInputs(false, error.response.data.message);
          });
      }
    },
    /**
     * Detects when input field triggers a change
     * splits file name to get file type and pass to generateImagePreviews()
     *
     * @param   {[type]}  e
     *
     * @return
     */
    onInputFileChange(e) {
      this.uploadImage();
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for (var i = 0; i < files.length; i++) {
        var filetype = files[i].type.split("/")[0];
        this.generateImagePreviews(files[i], filetype);
      }
    },
    /**
     * Generates the small image previews that can be seen after user selects images to upload
     *
     * @param   {object}  file
     * @param   {string}  type
     *
     * @return
     */
    generateImagePreviews(file, type) {
      var reader = new FileReader();
      reader.onload = e => {
        type == "image"
          ? (this.post__isImage = true)
          : (this.post__isImage = false);
        this.postField__imagesArray.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    /**
     * Fires when user clicks 'x' button in image previews
     *
     * @param   {integer}  closeId
     *
     * @return
     */
    removeImage(closeId) {
      this.$set(this.postField__imagesArray, closeId - 1, "");
    },
    /**
     * clears post text field
     *
     * @param   {string}  type
     * @param   {string}  message
     *
     * @return
     */
    clearInputs(type, message) {
      this.postFieldModel = "";
      this.postField__loading = false;

      let alert = {
        model: true,
        state: type,
        message: message
      };
      this.setAlert(alert);

      this.removeImage();
    }
  }
};
</script>

<style>
.postField__divider {
  position: absolute;
  width: 526px;
  left: 0px;
}
.postField__preview img,
.postField__preview video {
  max-width: 100%;
  max-height: 120px;
}
.postField__avatar {
  position: absolute;
}
.postField__textareaContainer {
  margin-left: 50px;
}
.postField__previewImage {
  border-radius: 10px;
}
.postField__imageWrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
}
.postField__imageCard {
  flex: 0 0 auto;
}
.postField__btn {
  position: relative;
  right: 30px;
  text-transform: none;
}
.p-10 {
  margin: 0 50px;
}
.postField__btn::before {
  color: transparent;
}
.postField__imageWrapper--closebtn {
  position: relative;
  bottom: 96px;
  right: 3px;
  z-index: 1;
}
.postField__imageWrapper--image {
  margin-left: -40px;
}
.postField__textarea {
  position: relative;
  bottom: 10px;
}
</style>
