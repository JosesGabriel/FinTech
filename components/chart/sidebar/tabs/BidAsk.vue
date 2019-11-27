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
      <div id="div__bidask">
        <div id="div__bid">
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
                <th class="headers pr-1">
                  #
                </th>
                <th class="headers pr-1">
                  VOL
                </th>
                <th class="headers pr-4">
                  BID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bids" :key="item.id" class="tr_custom">
                <td class="column pr-1" style="width:30px;">
                  {{ item.price | numeral("0,0.00") }}
                </td>
                <td class="column pr-1" style="width:30px;">
                  {{ item.volume | numeral("0.0a") }}
                </td>
                <td class="column pr-4" style="width:30px;">
                  {{ item.count | numeral("0,0") }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
        <div id="div__ask">
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
                <th class="headers pr-1">
                  ASK
                </th>
                <th class="headers pr-1">
                  VOL
                </th>
                <th class="headers pr-4">
                  #
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in asks" :key="item.id" class="tr_custom">
                <td class="column pr-1" style="width:30px;">
                  {{ item.price | numeral("0,0.00") }}
                </td>
                <td class="column pr-1" style="width:30px;">
                  {{ item.volume | numeral("0.0a") }}
                </td>
                <td class="column pr-4" style="width:30px;">
                  {{ item.count | numeral("0,0") }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </div>
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
      index: "chart/index",
      bidask: "chart/bidask"
    })
  },
  watch: {
    symbolid(symid) {
      this.initBidask(symid);
      this.asks = [];
      this.bids = [];
    }
  },
  methods: {
    ...mapActions({
      setBidask: "chart/setBidask"
    }),
    initBidask: function(symid) {
      this.loading = "#48FFD5";
      this.$api.chart.stocks
        .bidask({
          "symbol-id": symid,
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
          // console.log(bidask);
          this.setBidask(bidask);
          this.loading = null;
        })
        .catch(error => {
          // console.log(error);
        });
    }
  },
  mounted() {
    this.initBidask(this.symbolid);
  }
};
</script>

<style>
/* html {
  font-size: 11px !important;
} */
.headers {
  background: #00121e !important;
  font-size: 10px !important;
  color: #fff !important;
  text-align: center !important;
}
#div__bidask {
  display: flex;
  height: 100%;
  margin-left: 7px;
}
#div__bid {
  flex: 0 0 120px;
  background: blue;
}
#div__ask {
  flex: 0 0 120px;
  background: red;
}
.tr_custom {
  line-height: 0.1rem !important;
}
.custom_table tr {
  height: 5px !important;
}
.header {
  background: #00121e !important;
  font-size: 10px !important;
  color: #fff !important;
  text-align: right !important;
}
.column {
  background: #00121e !important;
  font-size: 10px !important;
  color: #bbb;
  text-align: right;
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
