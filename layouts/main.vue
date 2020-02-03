<template>
  <v-app>
    <v-content :class="lightSwitch == 0 ? 'lightMode' : 'darkMode'">
      <rbHeader />
      <v-container :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
        <nuxt />
      </v-container>
      <v-snackbar
        v-model="alert.model"
        :color="alert.state ? 'success' : 'error'"
      >
        {{ alert.message }}
        <v-btn color="white" text @click="alert.model = false">Close</v-btn>
      </v-snackbar>

      <v-dialog
        v-model="alertDialog.model"
        content-class="alertDialog"
        max-width="325"
        :dark="lightSwitch == 0 ? false : true"
      >
        <div class="d-grid alertDialog__icon--wrapper">
          <v-icon class="alertDialog__icon" x-large color="success"
            >mdi-check</v-icon
          >
        </div>
        <v-card class="alertDialog__card">
          <v-card-title
            class="headline text-center d-block success--text alertDialog__title"
            :class="alertDialog.state ? 'success--text' : 'error--text'"
            >{{ alertDialog.header }}</v-card-title
          >

          <v-card-text
            class="text-center"
            :class="alertDialog.state ? 'success--text' : 'error--text'"
          >
            {{ alertDialog.body }}
          </v-card-text>
          <v-card-text class="text-center">
            {{ alertDialog.subtext }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import rbHeader from "~/components/Header";
export default {
  components: {
    rbHeader
  },
  data() {
    return {
      isLightMode: 0
    };
  },
  head() {
    return {
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      alert: "global/getAlert",
      favicon: "global/favicon",
      alertDialog: "global/getAlertDialog"
    })
  },
  mounted() {
    if (localStorage.currentMode) {
      this.setLightSwitch(localStorage.currentMode);
    }
  },
  methods: {
    ...mapActions({
      setLightSwitch: "global/setLightSwitch"
    })
  }
};
</script>

<style>
@import "~/assets/css/scrollbar/style.css";

.theme--dark.v-sheet {
  background-color: #00121e;
}
.darkMode {
  background-color: #00121e;
}
.lightMode {
  background-color: #f2f2f2;
}
.transparent__bg {
  background-color: transparent !important;
}
.text__secondary--light {
  color: #494949;
}
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
  background-color: #142530;
  font-size: 50px !important;
  padding: 10px;
  border-radius: 50px;
  position: relative;
  top: 40px;
  z-index: 1;
}
</style>
