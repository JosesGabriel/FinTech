<template>
  <v-card class="investagram_bulok text-center" color="transparent" dark>
    <span class="display-4 text-center d-inline-block">
      <marquee behavior="scroll" direction="left" scrollamount="50"
        ><iframe
          src="https://www.youtube.com/embed/7d3QJ48Gzmc?autoplay=1"
        ></iframe
      ></marquee>
      🤠
      <span class="font-weight-thin rainbow--text"
        >Merry Christmas mga ate at koya </span
      >🤠
      <marquee behavior="scroll" direction="right" scrollamount="50"
        ><iframe src="https://www.youtube.com/embed/d51-EetcL8M?mute=1"></iframe
      ></marquee>
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
  margin-top: 150px;
}
.rainbow--text {
  background: linear-gradient(
    to right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
