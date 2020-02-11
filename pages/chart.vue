<template>
  <v-content>
    <v-content>
      <client-only>
        <tv-chart-container
          :data-feed="dataFeed"
          :charts-storage-url="
            `https://dev-api.arbitrage.ph/api/chart_template`
          "
          charts-storage-api-version="v1"
          client-id="lyduz.com"
          :user-id="userId"
          :symbol="'PSE:PSEI'"
        ></tv-chart-container>
      </client-only>
    </v-content>
  </v-content>
</template>

<script>
import Datafeed from "~/providers/tradingview/api";

export default {
  layout: "chart",
  data() {
    return {
      userId: this.$auth.$state.user.data.user.uuid,
      dataFeed: Datafeed
    };
  },
  mounted() {
    setTimeout(() => {
      if (document.getElementById("tv_chart_container") == undefined)
        window.location.reload();
    }, 2000);
  }
};
</script>
