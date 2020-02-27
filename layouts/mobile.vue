<template>
  <v-app :style="{ background: cardBackground }">
    <v-row>
      <v-col cols="12">
        <v-content>
          <nuxt />
        </v-content>
      </v-col>
    </v-row>

    <!-- snackbar alert -->
    <v-snackbar
      v-model="alert.model"
      :color="alert.state ? 'success' : 'error'"
    >
      {{ alert.message }}
      <v-btn color="white" text @click="alert.model = false">Close</v-btn>
    </v-snackbar>

    <!-- dialog alert -->
    <v-dialog
      v-model="alertDialog.model"
      max-width="325"
      content-class="alertDialog"
      :dark="!lightSwitch ? false : true"
    >
      <div class="d-grid alertDialog__icon--wrapper">
        <v-icon
          class="alertDialog__icon"
          x-large
          :style="{ background: cardBackground }"
          :dark="lightSwitch ? false : true"
          :color="alertDialog.state ? 'success' : 'error'"
          v-html="alertDialog.state ? 'mdi-check' : 'mdi-close'"
        ></v-icon>
      </div>
      <v-card class="alertDialog__card">
        <v-card-title
          class="headline text-center d-block alertDialog__title"
          :class="alertDialog.state ? 'success--text' : 'error--text'"
          >{{ alertDialog.header }}</v-card-title
        >

        <v-card-text class="text-center">{{ alertDialog.body }}</v-card-text>
        <v-card-text class="text-center">
          {{ alertDialog.subtext }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      alert: "global/getAlert",
      lightSwitch: "global/getLightSwitch",
      alertDialog: "global/getAlertDialog"
    }),
    /**
     * toggle between ligth/dark mode
     *
     * @return  {String}
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  mounted() {
    this.setLightSwitch(0);
  },
  methods: {
    ...mapActions({
      setLightSwitch: "global/setLightSwitch"
    })
  }
};
</script>

<style>
/* alert dialog */
.alertDialog {
  box-shadow: none;
}
.alertDialog__title {
  padding-top: 50px !important;
}
.alertDialog__icon--wrapper {
  padding: 0 125px;
}
.alertDialog__icon {
  font-size: 50px !important;
  padding: 10px;
  border-radius: 50px;
  position: relative;
  top: 40px;
  z-index: 1;
}
</style>
