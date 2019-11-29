<template>
  <v-content>
    <v-card
      :loading="loading"
      style="height:200px"
      color="#00121e"
      elevation="12"
      dark
      flat
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
      loading: "#03dac5"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      symbolid: "chart/symbolid",
      index: "chart/index"
    })
  },
  methods: {
    ...mapActions({
      setStock: "chart/setStock",
      setSymbolID: "chart/setSymbolID",
      setIndex: "chart/setIndex"
    }),
    initStock: function(symid) {
      this.loading = "#03dac5";
      const params = {
        "symbol-id": symid
      };
      this.$api.chart.stocks.history(params).then(response => {
        this.data = response.data;
        this.setIndex(parseInt(this.data.value) > 0 ? false : true);
        //  console.log(this.data);
        this.setStock(this.data);
        this.loading = null;
      });
    }
  },
  watch: {
    symbolid(symid) {
      //console.log(symid);
      //console.log(symid);
      this.initStock(symid);
    },
    index(value) {
      //console.log("index");
      //console.log(value);
    }
  },
  created() {
    //this.setSymbolID("29235363595681792");
    this.setSymbolID("29235364749115392");
  },
  mounted() {
    // all stock
    // this.$api.chart.stocks.list().then(response => {
    // console.log(response);
    // });
  }
};
</script>

<style></style>
