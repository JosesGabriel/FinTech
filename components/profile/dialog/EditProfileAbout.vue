
<template>
  <v-dialog v-model="show" max-width="500px">
    <v-container class="px-4 py-2 pb-4" :style="{ background: cardbackground }">
      <v-card :dark="lightSwitch == 1 ? true : false" color="transparent" flat>
        <v-row no-gutters>
          <span :class="lightSwitch == 1 ? 'white--text' : 'black--text'" class="body-1 py-2">Edit About</span>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="show = false">
            <v-icon small color="secondary">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card>
      <v-row no-gutters :class="lightSwitch == 1 ? 'secondary--text' : 'black--text'">
        <span class="caption">Info</span>
        <v-spacer></v-spacer>
        <span class="caption">{{ counter }}/300</span>
      </v-row>
      <v-card :dark="lightSwitch == 1 ? true : false" color="transparent" flat>
        <v-textarea
          outlined
          color="success"
          maxlength="300"
          v-model="info"
          :dark="lightSwitch == true"
          class="secondary--text caption edit_about-textarea"
          name="input-7-4"
        ></v-textarea>
        <span :class="lightSwitch == 1 ? 'secondary--text' : 'black--text'" class="caption">Location</span>
        <v-text-field
          outlined
          color="success"
          v-model="location"
          :dark="lightSwitch == true"
          class="secondary--text caption edit_about-textfield"
          name="input-7-4"
        ></v-text-field>
      </v-card>
      <v-row no-gutters>
        <div class="pa-0">
          <span class="caption" :class="lightSwitch == 1 ? 'secondary--text' : 'black--text'">
            <v-icon color="success" small class="py-1 pr-1">mdi-help-circle-outline</v-icon>Supported Formats
          </span>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          class="text-capitalize black--text font-weight-bold"
          medium
          filled
          small
          color="success"
          @click="saveNow"
          @click.stop="show = false"
        >Save</v-btn>
      </v-row>
    </v-container>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    visible: Boolean,
    edit: {
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
        this.data = this.edit;
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
      data: {},
      info: null,
      location: null,
      counter: 0
    };
  },
  watch: {
    info(e) {
      this.counter = e.length;
    }
  },
  methods: {
    saveNow() {
      const payload = {
        about: this.info,
        location: this.location
      };
      this.$api.social.user.putprofile(payload).then(response => {
        if (response.success) {
          const data = response;

          this.$emit("clicked", data);
        }
      });
    }
  }
};
</script>