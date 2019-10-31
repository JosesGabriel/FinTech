<template>
  <line-chart :chart-data="datacollection"></line-chart>
</template>
<script>
import lineChart from "~/assets/js/journal/ChartTesting.js"

export default {
  components: {
    lineChart
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
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            // label: "GitHub Commits",
            backgroundColor: "#f87979",
            data: [70, 20, 12, 39, 100, 40, 95, 80, 80, 20, 12, 101]
          }
        ]
      };
    },
  }
};
</script>