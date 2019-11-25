<template>
  <v-content>
    <v-card
      color="#00121e"
      :loading="loading"
      style="height: calc(100vh - 490px)"
      class="card__timetrade pl-1 pr-6"
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
            <th class="pl-2 header white--text font-weight-bold">
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
          <tr v-for="item in trades" :key="item.id">
            <td class="pl-2 column white--text" style="width:55px;">
              {{ $moment(item.timestamp).format("hh:mm A") }}
            </td>
            <td class="column white--text text-right" style="width:48px;">
              {{ item.executed_volume | numeral("0.0a") }}
            </td>
            <td class="column white--text text-right" style="width:50px;">
              {{ item.executed_price | | numeral('0,0.00') }}
            </td>
            <td class="pl-2 column white--text" style="width:50px;">
              {{ $globalMethod.limitDisplayString(item.buyer, 6) }}
            </td>
            <td class="pl-2 column white--text" style="width:50px;">
              {{ $globalMethod.limitDisplayString(item.seller, 6) }}
            </td>
            <td class="column white--text font-weight-bold"></td>
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
      symbolid: "chart/symbolid"
    })
  },
  mounted() {
    // Time Trade
    this.$api.chart.stocks
      .trades({
        "symbol-id": this.symbolid,
        sort: "DESC",
        broker: true
      })
      .then(response => {
        this.trades = response.data;
        //console.log(this.trades);
        this.loading = false;
      });
  }
};
</script>

<style>
.header {
  background: #00121e !important;
  font-size: 10px !important;
}
.column {
  background: #00121e !important;
  font-size: 10px !important;
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
.card__timetrade {
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
