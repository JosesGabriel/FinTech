<template>
  <v-content>
    <v-card
      id="card__container"
      :loading="loading"
      color="#00121e"
      elevation="12"
      dark
    >
      <v-card-text class="pa-0 py-3">
        <v-row class="ma-0">
          <v-col class="pa-0">
            <Headline />
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <Status />
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <Sentiment />
          </v-col>
        </v-row>
      </v-card-text>
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

<style>
#card__container {
  height: 280px;
}
@media (max-width: 1280px) {
  #card__container {
    height: 230px;
  }
}
</style>
