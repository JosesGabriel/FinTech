<template>
  <v-app class="game__container">
    <v-content :class="lightSwitch == 0 ? 'lightMode' : 'darkMode'">
      <rbHeader />
      <v-container class="maxwidth pa-0 mx-0">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<style>
.maxwidth {
  max-width: 100%;
}
.darkMode {
  /* background-color: #fcfbfe; light mode color, add to vuex state soon */
  background: radial-gradient(50% 50% at 50% 50%, #0d2641 0%, #00121e 88.54%);
}
.lightMode {
  background-color: #f2f2f2;
}
.transparent__bg {
  background-color: transparent !important;
}
</style>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  }
};
</script>
