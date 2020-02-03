<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Ticker",
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    mode() {
      return this.lightSwitch == false ? "light" : "dark";
    }
  }
};
</script>

<style></style>
