<template>
  <v-card class="transparent__bg" :dark="lightSwitch == 0 ? false : true" flat>
    <v-card-title class="body-1 font-weight-bold text-left pa-0"
      >Sector Indices</v-card-title
    >
    <v-divider />
    <div class="container caption pa-0">
      <div v-for="n in 7" :key="n" class="row">
        <div class="col-5 py-1">{{ sectoralIndexType[n - 1] }}</div>
        <div class="col-3 pa-1">
          {{ sectoralIndexLast[n - 1] | numeral("0,0.00") }}
        </div>
        <div
          class="col-4 pa-1 text-right"
          :class="
            sectoralIndexChangePercent[n - 1] > 0
              ? 'success--text'
              : 'error--text'
          "
        >
          {{ sectoralIndexChange[n - 1] }} (
          {{ sectoralIndexChangePercent[n - 1] }}%)
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      sectoralIndexType: [
        "All Shares",
        "Financials",
        "Holding Firms",
        "Industrial",
        "Mining and Oil",
        "Property",
        "Services"
      ],
      sectoralIndexLast: [],
      sectoralIndexChange: [],
      sectoralIndexChangePercent: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    this.getSectoralIndex();
  },
  methods: {
    /**
     * Fires on mount, gets sectoral index
     * Ignores PSEI index
     *
     * @return
     */
    getSectoralIndex() {
      const params = {
        exchange: "PSE",
        type: "index"
      };
      this.$api.chart.stocks.history(params).then(
        function(result) {
          for (let i = 0; i < result.data.length; i++) {
            //ignores PSEI index
            if (result.data[i].stockidstr != "29235364749115392") {
              this.sectoralIndexLast.push(result.data[i].last);
              this.sectoralIndexChange.push(result.data[i].change);
              this.sectoralIndexChangePercent.push(
                result.data[i].changepercentage.toFixed(2)
              );
            } else {
              this.$emit("pseiData", result.data[i]);
            }
          }
        }.bind(this)
      );
    }
  }
};
</script>
