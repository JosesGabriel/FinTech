<template>
  <v-content>
    <v-card
      color="#00121e"
      :loading="loading"
      style="height: calc(100vh - 490px)"
      class="card__timetrade pl-1 pr-2"
      flat
    >
      <v-simple-table
        dense
        dark
        fixed-header
        style="background:#00121e"
        height="calc(100vh - 490px)"
      >
        <thead>
          <tr>
            <th class="pl-4 text-left header white--text font-weight-bold">
              TIME
            </th>
            <th class="header white--text font-weight-bold text-right">VOL</th>
            <th class="header white--text font-weight-bold text-right">
              PRICE
            </th>
            <th class="header white--text font-weight-bold pl-2">
              BUYER
            </th>
            <th class="header white--text font-weight-bold pl-2">
              SELLER
            </th>
            <th class="header white--text font-weight-bold"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in trades" :key="item.id" class="tr_custom">
            <td class="pl-2 column" style="width:55px;">
              {{ $moment(item.timestamp).format("hh:mm A") }}
            </td>
            <td class="column text-right" style="width:40px;">
              {{ item.executed_volume | numeral("0.0a") }}
            </td>
            <td class="column text-right" style="width:45px;">
              {{ item.executed_price | numeral("0,0.00") }}
            </td>
            <td class="pl-2 column" style="width:50px;">
              {{ $globalMethod.limitDisplayString(item.buyer, 6) }}
            </td>
            <td class="pl-2 pr-2 column text-right" style="width:50px;">
              {{ $globalMethod.limitDisplayString(item.seller, 6) }}
            </td>
            <td class="column font-weight-bold" style="width:5px;"></td>
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
      loading: "#48FFD5"
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
      //   console.log("time trade");
      //   console.log(this.index);
      this.initTimetrade(symid);
    }
  },
  mounted() {
    this.initTimetrade(this.symbolid);
  },
  methods: {
    initTimetrade: function(symid) {
      this.loading = "#48FFD5";
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

<style>
.tr_custom {
  line-height: 0.1rem !important;
}
.header {
  background: #00121e !important;
  font-size: 10px !important;
}
.column {
  font-size: 10px !important;
  color: #bbb;
}
.v-data-table--dense th {
  height: 20px;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none !important;
}
.theme--dark.v-data-table.v-data-table--fixed-header thead th {
  box-shadow: none !important;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
.sub__title {
  width: 100%;
  height: 20px;
  padding: 0;
  padding-left: 10px;
  font-weight: bold;
  font-size: 10px;
}
</style>
