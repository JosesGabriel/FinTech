<template>
  <v-content>
    <v-card
      :loading="loading"
      style="height:200px"
      color="#00121e"
      elevation="12"
      dark
    >
      <Headline />
      <Status />
      <Sentiment />
    </v-card>
    <v-divider></v-divider>
    <Tabs />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Headline from "../chart/sidebar/Headline";
import Status from "../chart/sidebar/Status";
import Sentiment from "../chart/sidebar/Sentiment";
import Tabs from "../chart/sidebar/Tabs";

export default {
  name: "Sidebar",
  components: {
    Headline,
    Status,
    Sentiment,
    Tabs
  },
  data() {
    return {
      data: {},
      loading: "#48FFD5"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      symbolid: "chart/symbolid"
    })
  },
  methods: {
    ...mapActions({
      setStock: "chart/setStock",
      setSymbolID: "chart/setSymbolID"
    })
  },
  created() {
    this.setSymbolID("29235363595681792");
  },
  mounted() {
    const params = {
      "symbol-id": this.symbolid
    };
    this.$api.chart.stocks.history(params).then(response => {
      this.data = response.data;
      this.setStock(this.data);
      this.loading = null;
    });

    // all stock
    this.$api.chart.stocks.list().then(response => {
      // console.log(response);
    });
  }
};
</script>

<style></style>
