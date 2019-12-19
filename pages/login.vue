<template>
  <v-card class="investagram_bulok text-center" color="transparent" dark>
    <span class="display-4 text-center d-inline-block">
      <marquee behavior="scroll" direction="left" scrollamount="50"
        ><iframe
          src="https://www.youtube.com/embed/2g2bBK3ucRg?autoplay=1"
        ></iframe
      ></marquee>
      Bawal ang #MajorGaya
      <marquee behavior="scroll" direction="right" scrollamount="50"
        ><img
          src="https://www.dairyqueen.com/Global/Food/Hot-Dogs_8-to-1_470x500.jpg?width=&height=810"
          width="100px"
      /></marquee>
    </span>
  </v-card>
</template>
<script>
export default {
  layout: "main",

  middleware: ["auth"],
  components: {},
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style>
.investagram_bulok {
  margin-top: 250px;
}
</style>
