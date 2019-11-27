<template>
  <v-carousel
    class="mt-6"
    cycle
    interval="2000"
    height="300px"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-img
        src="http://cms.egg.network/media/images/69409370_2223754717747222_162318058340220928_n.original.jpg"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: [" 13th month "]
    };
  }
};
</script>
