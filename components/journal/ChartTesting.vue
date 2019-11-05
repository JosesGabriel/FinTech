<template>
  <custom-bar :chart-data="datacollection"></custom-bar>
</template>
<script>
import CustomBar from "~/assets/js/journal/ChartTesting.js"

export default {
  components: {
    CustomBar
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                backgroundColor: "#00FFC3",
                data: [60, 80, 81, 56, 55, 40]
            }
        ]
      }
    },
  }
};
</script>