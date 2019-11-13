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
.header--rainbow {
  height: 4px;
  background-image: linear-gradient(
    to right,
    #894b9d,
    #eb8023,
    #c2b819,
    #49ba6f,
    #2581bc
  );
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1de9b6;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1de9b6;
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
      isLightMode: 0
    };
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  }
};
</script>
