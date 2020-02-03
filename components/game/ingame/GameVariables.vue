<template>
  <v-card
    width="100%"
    flat
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    ><v-container class="py-0">
      <v-row class="gameVar__row">
        <v-col cols="6" class="text-center">
          <div>Time Limit</div>
          <div class="display-1 font-weight-black">1:43</div>
        </v-col>
        <v-col cols="6" class="text-center">
          <div>Pot Money</div>
          <div class="display-1 font-weight-black">3000</div>
        </v-col>
      </v-row>
    </v-container></v-card
  >
</template>
<style scoped>
.gameVar__row {
  border: 2px solid #0c1a2b;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
