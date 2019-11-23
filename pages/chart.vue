<template>
  <v-content>
    <tv-chart-container></tv-chart-container>
  </v-content>
</template>

<script>
export default {
  layout: "chart",
  middleware: ["auth"]
};
</script>
