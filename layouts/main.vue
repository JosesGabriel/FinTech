<template>
  <v-app>
    <v-content
      class="social__container"
      :class="isLightMode == 1 ? 'lightMode' : ''"
    >
      <rbHeader />
      <v-container :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
        <nuxt />
      </v-container>
      <v-snackbar v-model="alert" :color="alertState ? 'success' : 'error'">
        {{ alertMessage }}
        <v-btn color="white" text @click="alert = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>
<style>
.social__container {
  /* background-color: #fcfbfe; light mode color, add to vuex state soon */
  background-color: #00121e;
}
.lightMode {
  background-color: #f2f2f2;
}
.transparent__bg {
  background-color: transparent !important;
}
.text--green {
  color: #48ffd5;
}
.text--red {
  color: #ff4848;
}
</style>

<script>
import rbHeader from "~/components/Header";
export default {
  components: {
    rbHeader
  },
  data() {
    return {
      isLightMode: 0,
      alert: false,
      alertState: false,
      alertMessage: ""
    };
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  }
};
</script>
