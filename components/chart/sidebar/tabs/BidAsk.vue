<template>
  <v-content>
    <div class="sub__title">Bid and Ask</div>
    <!-- bid and ask -->
    <v-card
      color="#00121e"
      class="pl-1 pr-5"
      :loading="loading"
      style="height:105px;"
      flat
    >
      <v-simple-table
        dense
        dark
        fixed-header
        style="background:#00121e"
        height="105px"
        class="custom_table"
      >
        <thead>
          <tr>
            <th class="text-right header white--text font-weight-bold">
              #
            </th>
            <th class="text-right header white--text font-weight-bold">
              VOL
            </th>
            <th class="text-right header white--text font-weight-bold">
              BID
            </th>
            <th class="text-right header white--text font-weight-bold">
              ASK
            </th>
            <th class="text-right header white--text font-weight-bold">
              VOL
            </th>
            <th class="text-right header white--text font-weight-bold">
              #
            </th>
            <th class="header"></th>
          </tr>
        </thead>
        <tbody>
          <span class="d-none">{{ (ctr = 0) }}</span>
          <tr v-for="item in asks" class="tr_custom" :key="item.id">
            <td class="text-right column white--text" style="width:30px">
              {{ bids[ctr].count | numeral("0,0") }}
            </td>
            <td
              class="text-right column white--text text-uppercase"
              style="width:40px"
            >
              {{ bids[ctr].volume | numeral("0.0a") }}
            </td>
            <td
              class="text-right column white--text text-uppercase"
              style="width:50px"
            >
              {{ bids[ctr].price | numeral("0,0.00") }}
            </td>
            <td class="text-right column white--text" style="width:60px">
              {{ item.price | numeral("0,0.00") }}
            </td>
            <td class="text-right column white--text" style="width:40px">
              {{ item.volume | numeral("0.0a") }}
            </td>
            <td class="text-right column white--text" style="width:20px">
              {{ item.count | numeral("0,0") }}
            </td>
            <td class="column" style="width:10px"></td>
            <span class="d-none">{{ ctr++ }}</span>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <!-- depthbar -->
    <DepthBar />

    <!-- time and trades -->
    <div class="sub__title">Time and Trade</div>
    <TimeTrade />

    <!-- TransactionBar -->
    <TransactionBar />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import DepthBar from "../tabs/DepthBar";
import TimeTrade from "../tabs/TimeTrade";
import TransactionBar from "../tabs/TransactionBar";

export default {
  name: "BidAsk",
  components: {
    DepthBar,
    TimeTrade,
    TransactionBar
  },
  data() {
    return {
      loading: "#48FFD5",
      asks: [],
      bids: []
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      bidask: "chart/bidask"
    })
  },
  methods: {
    ...mapActions({
      setBidask: "chart/setBidask"
    })
  },
  mounted() {
    // Bidask
    this.$api.chart.stocks
      .bidask({
        "symbol-id": this.symbolid,
        "filter-by-last": true,
        limit: 10
      })
      .then(response => {
        this.asks = Object.values(response.data.asks);
        this.bids = Object.values(response.data.bids);
        const bidask = {
          asks: this.asks,
          bids: this.bids
        };
        this.setBidask(bidask);
        this.loading = false;
      });
  }
};
</script>

<style>
/* html {
  font-size: 11px !important;
} */
.tr_custom {
  line-height: 0.1rem !important;
}
.custom_table tr {
  height: 5px !important;
}
.header {
  background: #00121e !important;
  font-size: 10px !important;
}
.column {
  background: #00121e !important;
  font-size: 10px !important;
}
/*  {
  font-size: 8px !important;
} */
.v-data-table--dense th {
  height: 20px;
}
.v-data-table--dense tr {
  /* height: 10px !important;
  padding: 0; */
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none !important;
}
.theme--dark.v-data-table.v-data-table--fixed-header thead th {
  /* background: #424242;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.12); */
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
