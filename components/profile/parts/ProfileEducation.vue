<template>
  <v-card class="transparent__bg" outlined :dark="lightSwitch == 1 ? true : false">
    <v-container :dark="lightSwitch == 1 ? true : false" class="pa-0">
      <v-expansion-panels :dark="lightSwitch == 1 ? true : false" disabled>
        <v-expansion-panel :elevation="0" class="expansion_panel-sub">
          <v-expansion-panel-header class="tertiary--text font-weight-bold subtitle-1">Education</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
  }
}
</script>