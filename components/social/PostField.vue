<template>
  <div>
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

        <v-btn
          class="postField__emoji--btn"
          absolute
          right
          icon
          @click="emojiToggle = !emojiToggle"
        >
          <v-icon color="#B2B7BB">mdi-emoticon-happy-outline</v-icon>
        </v-btn>

        <client-only
          ><Picker
            v-if="emojiToggle"
            class="emojiPicker"
            :class="
              lightSwitch == 0
                ? 'lightcard emojiPicker--light'
                : 'darkcard emojiPicker--dark'
            "
            color="#03DAC5"
            title=""
            emoji="dollar"
            set="twitter"
            :show-preview="false"
            @select="addEmoji"
        /></client-only>
        <v-progress-circular
          class="characterLimit overline"
          :value="characterLimit"
          size="23"
          width="3"
          :color="200 - postField.length >= 0 ? 'success' : 'error'"
        ></v-progress-circular>
        <div class="postField__textareaContainer">
          <at
            :class="
              lightSwitch == 0
                ? 'postField__tagging--light'
                : 'postField__tagging--dark'
            "
            :members="members != [] ? members : ''"
            :ats="['@', '＠', '$']"
            :name-key="stockTagMode ? 'symbol' : 'name'"
          >
            <template slot="item" slot-scope="s">
              <v-avatar v-if="userTagMode" size="22">
                <v-img
                  :src="
                    s.item.profile_image
                      ? s.item.profile_image
                      : 'user_default.png'
                  "
                >
                </v-img>
              </v-avatar>
              <span
                class="pl-2"
                @click="clickUserSuggestion(s)"
                v-text="stockTagMode ? s.item.symbol : s.item.name"
              ></span>
            </template>
            <v-textarea
              id="postField__textarea"
              v-model="postField"
              :placeholder="
                'Hey ' +
                  $auth.user.data.user.name +
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
              :loading="postFieldLoader"
              @keyup="catcher"
              >{{ postField }}</v-textarea
            >
          </at>
          <!-- <div v-if="stockTagMode" class="stockSuggestions__wrapper">
            <v-btn
              v-for="n in stockSuggestionsArray.length"
              :key="n"
              class="black--text mr-2 mb-2"
              depressed
              color="success"
              x-small
              @click="
                appendToField(stockSuggestionsArray[n - 1].symbol, 'stock'),
                  (hasTaggedStock = true),
                  (taggedStocks = [stockSuggestionsArray[n - 1].id_str])
              "
            >
              {{ stockSuggestionsArray[n - 1].symbol }}
            </v-btn>
          </div>
          <div v-if="userTagMode">
            <div
              v-if="userSuggestionsArrray.length > 1"
              class="userSuggestions__dropdownCaret"
            ></div>
            <v-list dense avatar class="userSuggestions__vlist py-0">
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="n in userSuggestionsArrray.length > 5
                    ? 5
                    : userSuggestionsArrray.length"
                  :key="n"
                  @click="
                    appendToField(userSuggestionsArrray[n - 1].name, 'user'),
                      (hasTaggedUser = true),
                      (userTagMode = false),
                      taggedUsers.push(userSuggestionsArrray[n - 1].name)
                  "
                >
                  <v-list-item-avatar size="30">
                    <v-img
                      :src="
                        userSuggestionsArrray[n - 1].profile_image
                          ? userSuggestionsArrray[n - 1].profile_image
                          : 'default.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="
                        userSuggestionsArrray[n - 1].first_name +
                          ' ' +
                          userSuggestionsArrray[n - 1].last_name
                      "
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div> -->
          <v-divider class="postField__divider" />
          <div class="pt-2">
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
              <!-- <img :src="previewImage" class="postField__previewImage" v-if="postIsImage"/>
                        <video controls :src="previewImage" class="postField__previewImage" v-if="!postIsImage"/> -->
              <div class="postField__imageWrapper">
                <div
                  v-for="n in imagesArray.length"
                  v-show="imagesArray[n - 1] != ''"
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
                    v-if="!postIsImage"
                    controls
                    :src="imagesArray[n - 1]"
                    class="postField__imageWrapper--image"
                  />
                  <img
                    v-else
                    :src="imagesArray[n - 1]"
                    class="postField__imageWrapper--image"
                  />
                </div>
              </div>
            </div>
            <v-btn
              class="postField__btn px-2"
              color="rgba(3, 218, 197, 0.2)"
              depressed
              small
              rounded
              :dark="lightSwitch == 0 ? false : true"
              @click="onClickImageUploadBtn"
            >
              <img
                class="mr-1 media__button"
                src="/icon/postfield/photo.svg"
                width="20"
              /><span>Photo</span>
            </v-btn>
            <v-btn
              class="postField__btn px-2 ml-2"
              color="rgba(3, 218, 197, 0.2)"
              depressed
              small
              rounded
              :dark="lightSwitch == 0 ? false : true"
              @click="onClickImageUploadBtn"
            >
              <img
                class="mr-1 media__button"
                src="/icon/postfield/video.svg"
                width="20"
              />
              <span>Video</span>
            </v-btn>
            <!-- TODO after launching -->
            <!-- <v-btn
            class="postField__btn"
            small
            :dark="lightSwitch == 0 ? false : true"
            icon
          >
            <img class="mr-1" src="/icon/polls.svg" width="17" />
            <span class="success--text">Polls</span>
          </v-btn> -->

            <div v-if="hasTaggedStock" class="d-inline">
              <v-btn
                class="authorSentiment__button--bull"
                icon
                outlined
                fab
                width="24"
                height="24"
                x-small
                right
                absolute
                color="success"
                @click="authorSentiment = 'bull'"
              >
                <img src="/icon/bullish.svg" width="12" /> </v-btn
              ><v-btn
                class="authorSentiment__button--bear"
                icon
                outlined
                fab
                width="24"
                height="24"
                x-small
                right
                absolute
                color="error"
                @click="authorSentiment = 'bear'"
              >
                <img src="/icon/bearish.svg" width="12" />
              </v-btn>
            </div>
            <v-btn
              class="no-transform post__button"
              rounded
              small
              right
              depressed
              absolute
              color="success"
              :disabled="postBtnDisable"
              @click="
                taggedStocks.length > 0
                  ? getTaggedStockValues()
                  : postFieldSubmit()
              "
            >
              Post
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-card>

    <div v-if="hasTaggedStock" class="postField__dropdown d-inline">
      <div class="postField__dropdown--caret"></div>
      <v-card
        :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
        :dark="lightSwitch == 0 ? false : true"
        outlined
        max-width="250px"
      >
        <v-card-actions class="d-block">
          <span class="caption">Register your sentiment for this stock.</span>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Picker
  },
  data() {
    return {
      postBtnDisable: true,
      postIsImage: null,
      postField: "",
      previewImage: [],
      postFieldLoader: false,
      imagesArray: [],
      cloudArray: [],
      stockSuggestionsArray: [],
      userSuggestionsArrray: [],
      stockTagMode: false,
      userTagMode: false,
      currentTaggedStock: "",
      currentTaggedUser: "",
      hasTaggedStock: false,
      hasTaggedUser: false,
      taggedStocks: [],
      taggedUsers: [],
      authorSentiment: false,
      loader: false,
      emojiToggle: false,
      value: "val",
      selected: [],
      members: [],
      text: "",
      characterLimit: 0
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    postField() {
      if (this.postField) {
        this.postBtnDisable = false;
      } else {
        this.postBtnDisable = true;
      }
      this.characterLimit = this.postField.length / 2;
    }
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    clickUserSuggestion(selected) {
      this.taggedUsers.push({
        uuid: selected.item.uuid,
        name: selected.item.name
      });
      // this.members = [];
      this.currentTaggedUser = "";
    },
    /**
     * Appends selected emoji to post field
     *
     * @param   {object}  e
     *
     * @return  {[type]}
     */
    addEmoji(e) {
      this.postField += e.native;
    },
    /**
     * Fires when user clicks Suggested stock button. Appends to PostField.
     *
     * @param   {string}  symbol
     *
     * @return
     */
    appendToField(value, type) {
      let index;
      if (type == "stock") {
        index = this.postField.lastIndexOf("$");
        this.stockTagMode = false;
      } else if (type == "user") {
        index = this.postField.lastIndexOf("@");
      }
      this.postField = this.postField.slice(0, index + 1);
      this.postField += value;
    },
    /**
     * Searches from stock list based on stock that user is currently typing, fires when stockTagMode is true.
     *
     * @return
     */
    search(type) {
      if (type == "stock") {
        const params = {
          exchange: "PSE",
          query: this.currentTaggedStock,
          limit: "10",
          type: "stock"
        };
        this.$api.chart.charts.search(params).then(
          function(result) {
            this.members = result.data;
            console.log(this.members);
          }.bind(this)
        );
      } else if (type == "user") {
        if (this.currentTaggedUser != "") {
          let payload = {
            name: this.currentTaggedUser
          };
          this.$api.accounts.account
            .index(payload)
            .then(response => {
              this.members = response.data.users;
              console.log(this.members);
            })
            .catch(e => {})
            .finally(function() {}.bind(this));
        }
      }
    },
    /**
     * Fires at keyup event on PostField. Used for stock tagging.
     * Checks if user typed a dollar sign ($) then toggles stockTagMode
     *
     * @param   {object}  e
     *
     * @return
     */
    catcher(e) {
      let regExp = /^[0-9a-zA-Z]+$/;
      if (e.key == "$") {
        this.stockTagMode = true;
        this.search("stock");
      } else if (this.stockTagMode && !regExp.test(e.key)) {
        this.stockTagMode = false;
        this.currentTaggedStock = "";
      }
      if (regExp.test(e.key) && e.key.length == 1 && this.stockTagMode) {
        this.hasTaggedStock = true;
        this.currentTaggedStock += e.key;
        this.search("stock");
      } else if (e.key == "Backspace" && this.stockTagMode) {
        this.currentTaggedStock = this.currentTaggedStock.slice(0, -1);
        this.search("stock");
      }
      if (
        this.stockTagMode &&
        e.key == "Backspace" &&
        this.currentTaggedStock == ""
      ) {
        this.stockTagMode = false;
      } else if (this.stockTagMode && e.key == "Backspace") {
        this.search("stock");
      }

      ////USER TAGGED
      if (e.key == "@") {
        this.userTagMode = true;
      } else if (this.userTagMode && !regExp.test(e.key)) {
        this.userTagMode = false;
        this.currentTaggedUser = "";
      }
      if (regExp.test(e.key) && e.key.length == 1 && this.userTagMode) {
        this.hasTaggedUser = true;
        this.currentTaggedUser += e.key;
        this.search("user");
      } else if (e.key == "Backspace" && this.userTagMode) {
        this.currentTaggedUser = this.currentTaggedUser.slice(0, -1);
        this.search("user");
      }
      if (
        this.userTagMode &&
        e.key == "Backspace" &&
        this.currentTaggedUser == ""
      ) {
        this.userTagMode = false;
      } else if (this.userTagMode && e.key == "Backspace") {
        this.search("user");
      }

      if (this.postField == "") {
        this.stockTagMode = false;
        this.currentTaggedStock = "";
        this.hasTaggedStock = false;
        this.taggedStocks = [];

        this.userTagMode = false;
        this.currentTaggedUser = "";
        this.hasTaggedUser = false;
        this.taggedUsers = [];
      }
    },
    /**
     * Parses entire post text and finds if author tagged a stock or not
     *
     * @return
     */
    postHasTaggedStock() {
      let isStockTagged;
      let stockTagged;
      let postArray = this.postField.split(" ");
      for (let i = 0; i < postArray.length; i++) {
        if (postArray[i].charAt(0) == "$" && postArray[i].length > 1) {
          isStockTagged = true;
          stockTagged = postArray[i];
          break;
        } else {
          isStockTagged = false;
        }
      }
    },
    /**
     * Fires when user clicks post button in social
     * Will also run some specific code if user has images
     * attached to their post
     *
     * @return
     */
    postFieldSubmit(stockValues) {
      this.postFieldLoader = "success";
      this.stockTagMode = false;
      this.imagesArray = [];
      let postTags = [];
      if (stockValues) {
        postTags = [
          {
            tag_id: this.taggedStocks[0],
            tag_type: "stock",
            tag_meta: {
              last: stockValues.last,
              changepercentage: stockValues.change,
              sentiment: this.authorSentiment
            }
          }
        ];
      }
      if (this.taggedUsers) {
        for (let i = 0; i < this.taggedUsers.length; i++) {
          if (this.postField.indexOf(this.taggedUsers[i].name) > 0) {
            postTags.push({
              tag_id: this.taggedUsers[i].uuid,
              tag_type: "user",
              tag_meta: [
                {
                  name: this.taggedUsers[i].name
                }
              ]
            });
          }
        }
      }

      if (this.$refs.postField__inputRef.files) {
        //text + image
        const params = {
          content: this.postField.substring(0, 200),
          attachments: this.cloudArray,
          visibility: "public",
          status: "active",
          tags: postTags
        };
        this.$api.social.actions
          .create(params)
          .then(
            function(response) {
              let responsePost = response.data.post;
              responsePost.attachments = this.cloudArray;
              responsePost.user = {
                uuid: this.$auth.user.data.user.uuid
              };
              this.$emit("authorNewPost", responsePost);
              this.clearInputs(true, response.message);
            }.bind(this)
          )
          .catch(error => {
            this.clearInputs(false, error.response.data.message);
          });
      } else {
        // can't reuse $auth.user.data.user.profile_image code above bc its asynchronous. Suggestions on how to improve r welcome
        const params = {
          content: this.postField.substring(0, 200),
          visibility: "public",
          status: "active",
          tags: postTags
        };
        this.$api.social.actions
          .create(params)
          .then(
            function(response) {
              let responsePost = response.data.post;
              responsePost.user = {
                uuid: this.$auth.user.data.user.uuid
              };
              this.$emit("authorNewPost", response.data.post);
              this.clearInputs(true, response.message);
            }.bind(this)
          )
          .catch(error => {
            this.clearInputs(false, error.response.data.message);
          });
      }

      this.currentTaggedStock = "";
      this.taggedStocks = [];
      this.hasTaggedStock = false;
    },
    /**
     * gets price and last change percentage of tagged stock.
     * fires before posting a post
     *
     * @return
     */
    getTaggedStockValues() {
      const params = {
        "symbol-id": this.taggedStocks[0]
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          let values = {
            last: result.data.last,
            change: result.data.changepercentage
          };
          this.postFieldSubmit(values);
        }.bind(this)
      );
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
              this.cloudArray.push(response.data.file.url);
              this.postBtnDisable = false;
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
     * @param   {object}  e
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
          ? (this.postIsImage = true)
          : (this.postIsImage = false);
        this.imagesArray.push(e.target.result);
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
      this.$set(this.imagesArray, closeId - 1, "");
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
      this.postField = "";
      this.postFieldLoader = false;
      this.cloudArray = [];
      this.postBtnDisable = true;

      this.$refs.postField__inputRef.type = "text";
      this.$refs.postField__inputRef.type = "file";

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
.postField__tagging--dark .atwho-panel .atwho-inner .atwho-view .atwho-ul {
  background-color: #00121e;
  color: white;
}
.postField__tagging--light .atwho-panel .atwho-inner .atwho-view .atwho-ul {
  background-color: #f2f2f2;
  color: black;
}
.atwho-ul {
  padding: 0 !important;
  max-height: unset;
}
.atwho-li {
  border-bottom: 1px solid #142530;
  padding: 15px 10px;
}
.atwho-view {
  bottom: unset;
  top: 15px;
  overflow-y: unset;
  max-height: unset;
  border: 2px solid #142530;
  box-shadow: unset;
}
.atwho-cur {
  background-color: #03dac5;
}
.media__button {
  margin-left: -3px;
}
.userSuggestions__dropdownCaret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid rgb(182, 182, 182, 0.2);
  position: absolute;
  bottom: 46px;
}
.userSuggestions__vlist {
  position: absolute;
  z-index: 1;
  border: thin solid rgba(255, 255, 255, 0.12);
}
.userSuggestions__vlist .v-item-group .v-list-item--link:hover {
  background-color: #03dac5;
}
.userSuggestions__vlist
  .v-item-group
  .v-list-item
  .v-list-item__content
  .v-list-item__title {
  font-weight: 600;
}
.postField__emoji--btn {
  top: 70px;
  z-index: 1;
}
.emojiPicker {
  position: absolute;
  z-index: 1;
  top: 110px;
  right: 0;
}
.characterLimit {
  position: absolute;
  z-index: 1;
  top: 77px;
  right: 54px;
}
.emojiPicker--dark .emoji-mart-category-label span {
  background-color: #0c1a2b !important;
  color: white;
}
.emojiPicker--light .emoji-mart-category-label span {
  background-color: #f2f2f2 !important;
  color: black;
}
.authorSentiment__button--bull {
  right: 130px !important;
  bottom: 12px;
}
.authorSentiment__button--bear {
  right: 95px !important;
  bottom: 12px;
}
.post__button {
  font-weight: 600;
}
.postField__dropdown--caret {
  position: relative;
  left: 100px;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 10px solid rgb(182, 182, 182, 0.2);
}
.postField__dropdown {
  position: absolute;
  margin-left: 250px;
  z-index: 1;
}
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
  right: 50px;
  text-transform: none;
  font-weight: 600;
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
.stockSuggestions__wrapper {
  position: relative;
  right: 45px;
}
</style>
