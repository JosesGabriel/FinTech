<template>
  <v-dialog v-model="inputValue" width="500px">
    <v-card
      :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-card-title class="py-2 pl-3">
        <span class="body-1 font-weight-bold">Delete Post?</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-content class="mx-4 mt-3">
          <span class="caption font-weight-bold">
            Are you sure you want to permanently remove this post from Lyduz?
          </span>
        </v-content>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          class="font-weight-bold text-capitalize caption"
          text
          depressed
          :dark="lightSwitch == true"
          dense
          @click="setDeleteDialog(false)"
          >Cancel</v-btn
        >

        <v-hover v-slot:default="{ hover }">
          <v-btn
            v-if="post.user.uuid == $auth.user.data.user.uuid"
            :dark="lightSwitch == 1"
            class="black--text font-weight-bold text-capitalize caption"
            :color="!hover ? 'success' : 'successhover'"
            elevation="1"
            :disabled="loading"
            :loading="loading"
            @click.prevent="(loading = true), $emit('deletePost')"
            >Delete</v-btn
          >
        </v-hover>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DeletePostDialog",
  props: {
    post: {
      type: Object,
      default: undefined
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    loading: false
  }),
  watch: {
    deleteDialog(value) {
      if (value == true) {
        this.loading = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      deleteDialog: "social/deleteDialog",
      lightSwitch: "global/getLightSwitch"
    }),
    inputValue: {
      get() {
        return this.deleteDialog;
      },
      set(val) {
        this.setDeleteDialog(val);
      }
    }
  },
  methods: {
    ...mapActions({
      setDeleteDialog: "social/setDeleteDialog"
    })
  }
};
</script>
