<template>
  <v-content>
    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :loading="loading"
      :style="`height: calc(100vh - ${responsive_height + 20}px)`"
      class="card__timetrade pl-1 pr-2"
      flat
      tile
    >
      <v-simple-table
        dense
        :dark="lightSwitch == 1"
        fixed-header
        :style="{ background: cardbackground }"
        :height="`calc(100vh - ${responsive_height + 20}px)`"
      >
        <thead>
          <tr>
            <th class="pl-2 text-left font-weight-bold">
              TIME
            </th>
            <th class="font-weight-bold text-right">
              VOL
            </th>
            <th class="font-weight-bold text-right">
              PRICE
            </th>
            <th class="text-right font-weight-bold pl-2">
              BUYER
            </th>
            <th class="text-right font-weight-bold pl-2 pr-2">
              SELLER
            </th>
            <th class="font-weight-bold"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in trades" :key="item.id" class="tr_custom">
            <td class="pl-2" style="width:40px;">
              {{ $moment(item.timestamp).format("HH:mm") }}
            </td>
            <td class="text-right" style="width:40px;">
              {{ item.executed_volume | numeral("0.0a") }}
            </td>
            <td class="text-right" style="width:40px;">
              {{ item.executed_price | numeral("0,0.00") }}
            </td>
            <td class="pl-2 text-right" style="width:30px;">
              {{ $globalMethod.limitDisplayString(item.buyer, 6) }}
            </td>
            <td class="pl-2 pr-2 text-right" style="width:30px;">
              {{ $globalMethod.limitDisplayString(item.seller, 6) }}
            </td>
            <td class="font-weight-bold" style="width:5px;"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TimeTrade",
  data() {
    return {
      trades: [],
      loading: "#03dac5"
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index",
      lightSwitch: "global/getLightSwitch",
      responsive_height: "chart/responsive_height"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    symbolid(symid) {
      //   console.log("time trade");
      //   console.log(this.index);
      this.initTimetrade(symid);
    }
  },
  mounted() {
    //console.log("responsive height");
    //console.log(this.responsive_height);
    this.initTimetrade(this.symbolid);
  },
  methods: {
    initTimetrade: function(symid) {
      this.loading = "#03dac5";
      this.$api.chart.stocks
        .trades({
          "symbol-id": symid,
          sort: "DESC",
          broker: true,
          limit: 100
        })
        .then(response => {
          this.trades = response.data;
          //console.log(this.trades);
          this.loading = false;
        })
        .catch(error => {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.tr_custom {
  line-height: 0.1rem !important;
}
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
</style>
