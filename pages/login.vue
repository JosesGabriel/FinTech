<template>
  <v-card class="investagram_bulok text-center" color="transparent" dark>
    <span class="display-4 text-center d-inline-block">
      <marquee behavior="scroll" direction="left" scrollamount="50"
        ><img
          src="https://www.dairyqueen.com/Global/Food/Hot-Dogs_8-to-1_470x500.jpg?width=&height=810"
          width="100px"
      /></marquee>
      Bawal ang #MajorGaya
      <marquee behavior="scroll" direction="right" scrollamount="50"
        ><img
          src="https://www.dairyqueen.com/Global/Food/Hot-Dogs_8-to-1_470x500.jpg?width=&height=810"
          width="100px"
      /></marquee>
    </span>
  </v-card>
</template>
<style>
.investagram_bulok {
  margin-top: 250px;
}
</style>
<script>
import axios from "~/node_modules/axios";

export default {
  layout: "main",

  middleware: ["auth"],
  components: {},
  data() {
    return {
      isOpen: true
    };
  },
  mounted() {
    axios
      .get("https://dev-api.arbitrage.ph/api/social/posts/33937358302875648")
      .then(response => (this.info = response.data));
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  },
  head() {
    return {
      title: "Arbitrage",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>
