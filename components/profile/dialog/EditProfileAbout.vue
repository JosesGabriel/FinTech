
<template>
  <v-dialog v-model="show" max-width="500px">
    <v-container class="px-4 py-2" :style="{ background: cardbackground }">
      <v-card :dark="lightSwitch == true" flat>
        <v-row no-gutters>
          <span class="success--text body-1 py-2">Edit About</span>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="show = false">
            <v-icon small color="secondary">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card>
      <v-row no-gutters>
        <span class="caption secondary--text">Introduction</span>
        <v-spacer></v-spacer>
        <span class="caption secondary--text">{{ counter }}/300</span>
      </v-row>
      <v-card :dark="lightSwitch == true" flat>
        <v-textarea
          outlined
          color="success"
          maxlength="300"
          v-model="message"
          :dark="lightSwitch == true"
          class="secondary--text edit_about-textarea"
          name="input-7-4"
        ></v-textarea>
      </v-card>
      <v-row no-gutters>
        <div class="pa-0">
          <span class="caption tertiary--text">
            <v-icon color="success" small class="py-1 pr-1">mdi-help-circle-outline</v-icon>Supported Formats
          </span>
        </div>
        <v-spacer></v-spacer>
        <div class="pa-0">
          <v-btn class="ma-1 text-capitalize" medium outlined color="success">
            <v-icon color="success">mdi-plus</v-icon>Add Media
          </v-btn>
          <!-- Upload -->
          <v-btn class="ma-1 text-capitalize" medium outlined color="success">Link</v-btn>
        </div>
      </v-row>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <div class="pa-0">
          <!-- Upload -->
          <v-btn class="ma-1 mt-10 text-capitalize" medium outlined small color="success">Save</v-btn>
        </div>
      </v-row>
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
      message: null,
      counter: 0
    };
  },
  watch: {
    message(e) {
      this.counter = e.length;
    }
  }
};
</script>