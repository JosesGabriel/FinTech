<template>
  <v-list-item class="ma-0">
    <v-list-item-avatar size="28" class="mr-2">
      <v-img
        class="avatar__border"
        :src="
          $auth.user.data.user.profile_image
            ? $auth.user.data.user.profile_image
            : 'default.png'
        "
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="pt-0 mb-0">
      <v-text-field
        dense
        rounded
        hide-details
        placeholder="Write a comment..."
        class="caption"
        color="primary"
        :background-color="lightSwitch == 0 ? '#e3e9ed' : 'darkcard'"
        :dark="lightSwitch == 0 ? false : true"
        @keyup.enter="postComment"
      >
      </v-text-field>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    parentId: {
      default: "0",
      type: String
    },
    postId: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      content: ""
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
    postComment() {
      let payload = {
        parent_id: this.parentId,
        user_id: this.$auth.user.data.user.uuid,
        content: this.content
      };
      this.$api.social.posts
        .postComment(this.postId, payload)
        .then(response => {
          if (response.success) {
            this.setAlert({ type: true, message: response.message });
            this.$emit("add-comment", {
              content: this.content,
              created_at: new Date(),
              user: {
                profile_image: this.$auth.user.data.user.profile_image,
                first_name: this.$auth.user.data.user.first_name,
                last_name: this.$auth.user.data.user.last_name
              }
            });
          } else {
            this.setAlert({ type: false, message: response.message });
          }
        })
        .catch(() => {
          this.setAlert({ type: false, message: "An error has occurred." });
        });
    }
  }
};
</script>
