<template>
  <v-app>
    <v-content :class="lightSwitch == 0 ? 'lightMode' : 'darkMode'">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  head() {
    return {
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      favicon: "global/favicon"
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
.lightWhiteMode {
  background-color: #fafafa;
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
.header__container {
  position: relative;
}
.lampBtn {
  z-index: 100;
  position: absolute;
  width: 8%;
  top: 0;
  right: 340px;
}
.lightRays_img {
  position: relative;
  z-index: 9999;
  width: 350px;
  right: 129px;
  top: -18px;
}
.componentContainer {
  position: relative;
  margin-bottom: 38px;
}
</style>
