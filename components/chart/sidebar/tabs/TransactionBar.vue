<template>
  <div id="pgbr__container">
    <div id="progressbar">
      <v-progress-linear
        :indeterminate="progbar.loading"
        :value="progbar.value"
        background-color="error"
        color="#03dac5"
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
      this.initTransbar(symid);
    }
  },
  mounted() {
    this.initTransbar(this.symbolid);
  },
  methods: {
    /**
     * initialise and request transaction api on mounted hook
     *
     * @param   {String}  symid  sym_id
     *
     * @return
     */
    initTransbar(symid) {
      this.progbar.loading = true;
      this.progbar.value = 100;
      const params = {
        "symbol-id": symid
      };
      // Transaction Bar
      this.$api.chart.stocks
        .transaction(params)
        .then(response => {
          this.progbar.value = parseFloat(
            response.data.high_total_percent
          ).toFixed(2);
          this.progbar.loading = false;
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
#pgbr__container {
  height: 30px;
  padding-top: 10px;
  padding-left: 27px;
  padding-right: 27px;
}
</style>
