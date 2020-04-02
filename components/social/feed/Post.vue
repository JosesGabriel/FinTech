<template>
  <v-card
    class="centerPanel__card mb-3 list-item"
    :dark="lightSwitch == 0 ? false : true"
    outlined
    :style="{ background: cardBackground }"
  >
    <!-- Start of Post Header -->
    <v-list-item class="pt-1">
      <router-link :to="'/profile/' + post.user.username" class="no-transform">
        <v-list-item-avatar class="mr-2" size="42">
          <v-img
            class="avatar__border"
            :src="
              post.user.profile_image ? post.user.profile_image : 'default.png'
            "
            @error="post.user.profile_image = 'default.png'"
          />
        </v-list-item-avatar>
      </router-link>
      <v-list-item-content class="pa-0 ma-0">
        <v-row>
          <v-col>
            <router-link
              :to="'/profile/' + post.user.username"
              class="no-transform"
            >
              <v-list-item-title
                class="subtitle-2"
                :class="lightSwitch == 1 ? 'white--text' : 'black--text'"
              >
                <strong>{{ post.user.name }}</strong>
                <v-chip
                  v-if="$auth.user.data.user.is_backer"
                  class="text-capitalize px-1 ml-1 mt-n1 alpha__badge-chip"
                  x-small
                  color="alpha"
                  >ALPHA</v-chip
                >
              </v-list-item-title>
            </router-link>
            <v-list-item-subtitle class="overline no-transform">
              {{ localFormat(post.created_at, "fn") }}
              <span
                v-if="post.tagged_stocks && post.tagged_stocks.length != 0"
                class="success--text overline post--sentiment pa-05"
              >
                <v-btn
                  v-if="post.tagged_stocks[0].tag_meta.sentiment == 'bull'"
                  icon
                  outlined
                  fab
                  width="14"
                  height="14"
                  color="success"
                >
                  <img src="/icon/bullish.svg" width="6" />
                </v-btn>
                <v-btn
                  v-else
                  icon
                  outlined
                  fab
                  width="14"
                  height="14"
                  color="error"
                >
                  <img src="/icon/bearish.svg" width="6" />
                </v-btn>
              </span>
            </v-list-item-subtitle>
          </v-col>
          <v-col class="text-right">
            <v-icon
              color="secondary"
              class="postOptions__btn"
              @click="
                (postOptionsMode = !postOptionsMode), (currentPost = index)
              "
              >mdi-dots-horizontal</v-icon
            >
            <div v-if="postOptionsMode && currentPost == index">
              <div class="postOptions__container">
                <v-list dense class="postOptions__list" elevation="8">
                  <v-list-item-group class="postOptions__itemgroup">
                    <v-list-item
                      v-for="(option, key) in options"
                      v-show="
                        (post.user.uuid == $auth.user.data.user.uuid &&
                          [1, 2].includes(option.id)) ||
                          (post.user.uuid != $auth.user.data.user.uuid &&
                            [3].includes(option.id))
                      "
                      :key="key"
                      class="postOptions__listitem"
                      x-small
                      text
                      @click.prevent="doOptionEvent(option, { post, index })"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          class="text-center caption"
                          v-text="option.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <!-- End of Post Header -->
    <!-- Start of Post Body -->
    <v-list-item class="pa-0 ma-0">
      <v-list-item-content class="ma-0 pa-0">
        <div
          v-if="
            editPostMode &&
              post.user.uuid == $auth.user.data.user.uuid &&
              currentPost == index
          "
        >
          <v-textarea
            id="editPost__textarea"
            v-model="editTextAreaModel[index]"
            outlined
            :placeholder="post.content"
            dense
            hide-details
          ></v-textarea>
          <v-content class="text-right">
            <v-btn
              small
              text
              class="font-weight-bold"
              @click="editPostMode = false"
              >Cancel</v-btn
            >
            <v-btn
              small
              text
              class="font-weight-bold"
              @click.prevent="
                $emit('editPost', {
                  id: post.id,
                  content: editTextAreaModel[index],
                  index
                }),
                  (editPostMode = false)
              "
              >Save</v-btn
            >
          </v-content>
        </div>

        <div v-else class="body-2 px-5 pb-3 post__Content">
          <span v-show="!showLinkImageOnly(post)" v-html="post.content"></span>
        </div>

        <PhotoCarousel :images="post.attachments" />
        <LinkPreview
          v-if="hasMetaLink(post)"
          :meta="post.meta"
          @visitLink="openConfirmDialog"
        />
      </v-list-item-content>
    </v-list-item>
    <!-- End of Post Body -->
    <v-divider></v-divider>
    <v-card-actions class="pl-4 py-2">
      <v-btn
        icon
        outlined
        fab
        width="24"
        height="24"
        color="success"
        class="bull__btn"
        :class="
          post.my_sentiment && post.my_sentiment.type == 'bull'
            ? 'bull__btn--active'
            : ''
        "
        :disabled="reactButtons"
        @click.prevent="
          $emit('postReact', { post_id: post.id, type: 'bull', index })
        "
      >
        <img src="/icon/bullish.svg" width="12" />
      </v-btn>
      <span class="px-2 caption">{{ post.bulls_count }}</span>
      <v-btn
        icon
        outlined
        fab
        width="24"
        height="24"
        color="error"
        class="bear__btn"
        :class="
          post.my_sentiment && post.my_sentiment.type == 'bear'
            ? 'bear__btn--active'
            : ''
        "
        :disabled="reactButtons"
        @click.prevent="
          $emit('postReact', { post_id: post.id, type: 'bear', index })
        "
      >
        <img src="/icon/bearish.svg" width="12" />
      </v-btn>
      <span class="px-2 caption">{{ post.bears_count }}</span>
      <v-spacer></v-spacer>
      <v-icon class="pr-2" icon fab small>mdi-comment-text-outline</v-icon>
      <span class="caption">{{ post.comment_descendants_count }}</span>
      <!-- TODO Share counter -->
      <!-- <v-btn
        icon
        fab
        x-small
        color="secondary"
        @click="$emit('showShareModal', post.id)"
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <span class="caption">1000</span> -->
    </v-card-actions>
    <v-divider></v-divider>
    <List :comments="post.comments" :postindex="index" :postid="post.id" />
    <!-- Start of Comment -->
    <v-divider v-if="post.comments.length > 0"></v-divider>
    <v-list-item class="ma-0">
      <router-link
        :to="'/profile/' + $auth.user.data.user.username"
        class="no-transform"
      >
        <v-list-item-avatar size="28" class="mr-2">
          <img
            class="avatar__border"
            :src="
              $auth.user.data.user.profile_image
                ? $auth.user.data.user.profile_image
                : 'default.png'
            "
          />
        </v-list-item-avatar>
      </router-link>
      <v-list-item-content class="pt-2 mb-0">
        <v-text-field
          dense
          rounded
          hide-details
          placeholder="Write a comment..."
          class="caption"
          color="primary"
          :background-color="lightSwitch == 0 ? '#e3e9ed' : 'darkcard'"
          :dark="lightSwitch == 0 ? false : true"
          :value="commentValue"
          @keyup.enter="
            $emit('postComment', {
              id: post.id,
              content: $event.target.value,
              index
            })
          "
        ></v-text-field>
      </v-list-item-content>
    </v-list-item>
    <!-- End of Comment -->
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LocalFormat } from "~/assets/js/helpers/datetime";

import List from "~/components/social/feed/comments/List";
import PhotoCarousel from "~/components/social/PhotoCarousel";
import LinkPreview from "~/components/social/LinkPreview";

export default {
  name: "Newsfeed",
  components: {
    List,
    PhotoCarousel,
    LinkPreview
  },
  props: {
    post: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      editTextAreaModel: [],
      currentPost: "",
      editPostMode: false,
      postOptionsMode: false, // tiny menu on the right
      showShare: false,
      sharePostID: "",
      showBanner: false,
      commentValue: "",
      linkURL: "",
      options: [
        { id: 1, text: "Edit" },
        { id: 2, text: "Delete" },
        { id: 3, text: "Follow" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      newPosts: "global/getNewPosts",
      newComment: "social/getNewComment",
      deleteComment: "social/getDeleteComment",
      updateComment: "social/getUpdateComment",
      confirmDialog: "social/confirmDialog",
      reactButtons: "social/reactButtons"
    }),
    cardBackground() {
      return this.lightSwitch == 0 ? "#ffffff" : "#142530";
    }
  },
  created() {
    this.$bus.$on("onLinkClick", value => {
      this.onLinkClick(value);
    });
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert",
      setConfirmDialog: "social/setConfirmDialog",
      setDeleteDialog: "social/setDeleteDialog",
      setSelectedPost: "social/setSelectedPost"
    }),
    localFormat: LocalFormat,
    /**
     * check if meta link is available
     *
     * @param   {Object}  post  objet
     *
     * @return  {Boolean}        true/false
     */
    hasMetaLink(post) {
      if (post.meta != null) {
        return post.meta.links != undefined && post.meta.links.length > 0
          ? true
          : false;
      }
      return false;
    },
    /**
     * show image only once post is url only without text
     *
     * @param   {Object}  post  post
     *
     * @return  {Boolean}        true/false
     */
    showLinkImageOnly(post) {
      if (post.meta != null) {
        if (post.meta.links != undefined && post.meta.links.length > 0) {
          if (post.meta.links[0].meta != undefined) {
            const hasImage =
              post.meta.links[0].meta.image != undefined ||
              post.meta.links[0].meta.images != undefined
                ? true
                : false;
            let content = post.content.replace(
              /<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g,
              ""
            );
            content = content.replace(post.meta.links[0].url, "");
            return hasImage == true && content.trim().length == 0
              ? true
              : false;
          }
          return false;
        }
        return false;
      }
      return false;
    },
    /**
     * manage event click add filters and conditions before open new tab
     *
     * @param   {String}  url  link
     *
     * @return
     */
    openConfirmDialog(url) {
      const test = url.split("/");
      this.linkURL = url;
      if (!test[2].toLowerCase().includes("lyduz")) {
        this.setConfirmDialog(true);
      } else {
        this.onLinkClick(true);
      }
    },
    /**
     * redirect user to new tab depend to same site boolena
     *
     * @param   {Boolean}  sameSite  true/false
     *
     * @return
     */
    onLinkClick(sameSite) {
      console.log(this.linkURL);
      this.setConfirmDialog(false);
      if (sameSite === false) {
        setTimeout(() => {
          window.open(this.linkURL, "_blank");
        }, 300);
      } else {
        // supposed to be manage by vue router
        window.open(this.linkURL, "_blank");
      }
    },
    doOptionEvent(item, { post, index }) {
      this.postOptionsMode = false;
      switch (item.text.toLowerCase()) {
        case "edit":
          this.editPostMode = !this.editPostMode;
          break;
        case "delete":
          this.setSelectedPost({ postid: post.id, index });
          this.setDeleteDialog(true);
          break;
        case "follow":
          this.$emit("followAccount", post.user.uuid);
          break;
      }
    }
  }
};
</script>

<style>
.bull__btn {
  border: 2px solid #03dac5;
}
.bear__btn {
  border: 2px solid #f44336;
}
.bull__btn--active {
  background-color: #03dac599;
}
.bear__btn--active {
  background-color: #f4433699;
}
.postOptions__btn {
  position: relative;
  bottom: 8px;
  left: 4px;
}
.postOptions__btn:focus {
  background-color: transparent;
}
.postOptions__list {
  position: absolute;
  top: 28px;
  right: 10px;
  z-index: 1;
  padding: 0;
}
.postOptions__listitem {
  height: 20px;
}
.postOptions__list .v-list-item {
  min-height: 0px;
}
.postOptions__itemgroup {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.post__Content {
  white-space: pre-wrap;
}

.list-item {
  display: block;
}
.list-enter-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  transition: all 0.5s;
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

#editPost__textarea {
  font-size: 14px !important;
}
</style>
