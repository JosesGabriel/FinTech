<template>
  <v-content>
    <v-content>
      <tv-chart-container
        :dataFeed="dataFeed"
        :chartsStorageUrl="'https://saveload.tradingview.com'"
        :symbol="'PSE:PSEI'"
      ></tv-chart-container>
    </v-content>
  </v-content>
</template>

<script>
import Datafeed from "~/providers/tradingview/api";

export default {
  layout: "chart",
  data(){
    return {
      dataFeed: Datafeed
    }
  }
};
</script>
