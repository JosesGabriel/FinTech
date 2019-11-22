<template>
  <v-content>
    <v-row>
      <!-- toggle bid and ask -->
      <v-col class="py-0 mt-0 mb-1">
        <v-content>
          <v-row>
            <v-col class="col-5 text-right pa-0">
              <span
                :class="{ 'white--text font-weight-bold': !toggleButton }"
                class="overline"
                >Top Five</span
              >
            </v-col>
            <v-col class="col-2 pa-0">
              <v-content>
                <v-switch
                  v-model="toggleButton"
                  class="toggleButton"
                  color="#48FFD5"
                ></v-switch>
              </v-content>
            </v-col>
            <v-col class="col-5 text-left pa-0">
              <span
                :class="{ 'white--text font-weight-bold': toggleButton }"
                class="overline"
                >Full Depth</span
              >
            </v-col>
          </v-row>
        </v-content>
        <v-content class="pl-8 pr-7">
          <v-progress-linear
            :indeterminate="progbar.loading"
            :value="progbar.value"
            background-color="error"
            color="#48FFD5"
            height="5"
          ></v-progress-linear>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DepthBar",
  data() {
    return {
      toggleButton: false,
      progbar: {
        loading: true,
        value: 100
      },
      topdepth: [],
      fulldepth: []
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid"
    })
  },
  watch: {
    toggleButton(value) {
      if (value == true) {
        this.progbar.value = this.fulldepth;
      } else {
        this.progbar.value = this.topdepth;
      }
    }
  },
  mounted() {
    const params = {
      "symbol-id": this.symbolid,
      entry: 5
    };
    // Top Depth
    this.$api.chart.stocks.topdepth(params).then(response => {
      this.topdepth = parseFloat(response.data.bid_total_percent).toFixed(2);
      this.progbar.value = this.topdepth;
      this.progbar.loading = false;
    });
    // Full Depth
    this.$api.chart.stocks.fulldepth(params).then(response => {
      this.fulldepth = parseFloat(response.data.bid_total_percent).toFixed(2);
    });
  }
};
</script>

<style scoped>
.overline {
  font-size: 8px !important;
}
.toggleButton {
  transform: scale(0.675);
  position: absolute;
  top: -24px;
  left: 7px;
}
</style>