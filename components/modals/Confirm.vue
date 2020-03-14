<template>
  <v-dialog v-model="confirmDialog" width="500">
    <v-card
      :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-card-title class="py-2 pl-3">
        <span class="body-1 font-weight-bold">{{ title }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-content class="mx-4 mt-3">
          <span class="caption font-weight-bold">
            {{ text }}
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
          @click.prevent="setConfirmDialog(false)"
          >Cancel</v-btn
        >

        <slot>
          <!-- custom confirm button -->
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Confirm",
  props: {
    title: {
      type: String,
      default: "Confirmation Dialog"
    },
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      confirmDialog: "social/confirmDialog"
    })
  },
  methods: {
    ...mapActions({
      setConfirmDialog: "social/setConfirmDialog"
    })
  }
};
</script>

<style></style>
