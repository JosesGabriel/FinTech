<template>
  <div id="pgbr__container">
    <div id="progressbar">
      <v-progress-linear
        :indeterminate="progbar.loading"
        :value="progbar.value"
        background-color="error"
        color="#48FFD5"
        height="5"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TransactionBar",
  data() {
    return {
      progbar: {
        loading: true,
        value: 100
      }
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index"
    })
  },
  watch: {
    symbolid(symid) {
      //   console.log("depthbar");
      //   console.log(symid);
      this.initTransbar(symid);
    }
  },
  mounted() {
    this.initTransbar(this.symbolid);
  },
  methods: {
    initTransbar: function(symid) {
      this.progbar.loading = true;
      this.progbar.value = 100;
      const params = {
        "symbol-id": symid,
        entry: 5
      };
      // Top Depth
      this.$api.chart.stocks
        .topdepth(params)
        .then(response => {
          this.progbar.value = parseFloat(
            response.data.bid_total_percent
          ).toFixed(2);
          this.progbar.loading = false;
        })
        .catch(error => {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#pgbr__container {
  height: 30px;
  /* background: green; */
  padding-top: 10px;
  padding-left: 27px;
  padding-right: 27px;
}
#progressbar {
  /* margin-top: 10px; */
}
</style>
