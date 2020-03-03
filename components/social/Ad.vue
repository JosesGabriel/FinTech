<template>
  <v-card class="mx-auto ad__card" :dark="lightSwitch == 0 ? false : true">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="body-2 font-weight-black"
          >Advertisement</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-img src="mytradead.gif" height="194"></v-img>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>

<style>
.ad__card {
  border: thin solid rgba(255, 255, 255, 0.12) !important;
}
</style>
