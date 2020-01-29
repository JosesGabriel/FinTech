<template>
  <v-content>
    <v-content>
      <tv-chart-container
        :data-feed="dataFeed"
        :charts-storage-url="`https://dev-api.arbitrage.ph/api/chart_template`"
        charts-storage-api-version="v1"
        client-id="lyduz.com"
        :user-id="userId"
        :symbol="'PSE:PSEI'"
      ></tv-chart-container>
    </v-content>
  </v-content>
</template>

<script>
import Datafeed from "~/providers/tradingview/api";

export default {
  layout: "chart",
  data() {
    return {
      userId: "",
      dataFeed: Datafeed
    };
  },
  mounted() {
    this.userId = this.$auth.user.data.user.uuid;
  }
};
</script>
