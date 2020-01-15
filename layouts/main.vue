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
    </v-content>
  </v-app>
</template>
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
</style>

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
      link: [{ rel: "icon", type: "image/x-icon", href: "/lyduz.ico" }]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      alert: "global/getAlert"
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
