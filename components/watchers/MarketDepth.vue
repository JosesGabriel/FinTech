<template>
  <v-content>
    <v-row>
      <v-col class="py-0 mt-0 mb-1">
        <v-content class="">
          <v-progress-linear
            :indeterminate="progbar.loading"
            :value="progbar.value"
            background-color="error"
            color="#03dac5"
            height="8"
          ></v-progress-linear>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "MarketDepth",
  props: ["stocksym"],
  data() {
    return {
      progbar: {
        loading: true,
        value: 100
      },
      fulldepth: [],
      disabled: true
    };
  },
  computed: {
    /**
     * toogle color if component is disabled
     *
     * @return  {String}
     */
    color() {
      return this.disabled ? "secondary" : "success";
    }
  },
  mounted() {
    this.initDepthbar();
  },
  methods: {
    /**
     * Fires when component is mounted, gets the full depth of specific stock.
     * Full market depth of stock
     *
     * @return
     */
    async initDepthbar() {
      this.progbar.loading = true;
      this.progbar.value = 100;
      this.disabled = true;
      try {
        const params = {
          "symbol-id": this.stocksym,
          entry: 5
        };
        const response = await this.$api.chart.stocks.fulldepth(params);
        this.fulldepth = parseFloat(response.data.bid_total_percent).toFixed(2);
        this.progbar.value = this.fulldepth;
        this.progbar.loading = false;
        this.disabled = false;
      } catch (error) {
        this.progbar.value = 100;
        this.progbar.loading = false;
        this.disabled = true;
      }
    }
  }
};
</script>
