<template>
  <v-card class="transparent__bg" :dark="lightSwitch == 0 ? false : true" flat>
    <v-card-title class="body-1 font-weight-bold text-left pa-0"
      >Most Watched Stocks</v-card-title
    >
    <v-divider />
    <div
      v-for="n in 4"
      :key="n"
      class="d-flex justify-space-between pa-0 overline no-transform mt-1 mb-4"
    >
      <div>
        <span class="body-2 font-weight-bold">JFC</span><br />
        <span>JOLLIBEE FOOD CORPORATION.</span>
      </div>
      <span>2.5k following</span>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
