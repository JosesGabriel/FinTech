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
            <th class="headers">
              #
            </th>
            <th class="headers">
              VOL
            </th>
            <th class="headers">
              BID
            </th>
            <th class="headers">
              ASK
            </th>
            <th class="headers">
              VOL
            </th>
            <th class="headers">
              #
            </th>
            <th class="headers"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, key) in bidask.limit"
            :key="item.id"
            class="tr_custom"
          >
            <td class="column pr-1" style="width:15px;">
              {{ formatItem(bidask.bids[key], "count") }}
            </td>
            <td class="column pr-1" style="width:25px;">
              {{ formatItem(bidask.bids[key], "volume") }}
            </td>
            <td class="column pr-4" style="width:30px;">
              {{ formatItem(bidask.bids[key], "price") }}
            </td>
            <td class="column pr-4" style="width:30px;">
              {{ formatItem(bidask.asks[key], "price") }}
            </td>
            <td class="column pr-1" style="width:25px;">
              {{ formatItem(bidask.asks[key], "volume") }}
            </td>
            <td class="column pr-1" style="width:15px;">
              {{ formatItem(bidask.asks[key], "count") }}
            </td>
            <td class="column" style="width:5px;"></td>
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

let numeral = require("numeral");

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
      asks: {},
      bids: {}
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
      this.asks = {};
      this.bids = {};
    }
  },
  methods: {
    ...mapActions({
      setBidask: "chart/setBidask"
    }),
    formatItem(item, key = null) {
      if (item == undefined) return;
      let result = null;
      switch (key) {
        case "count":
          result = numeral(Object.values(item)[0]).format("0,0");
          break;
        case "id":
          result = Object.values(item)[1];
          break;
        case "price":
          result = numeral(Object.values(item)[2]).format("0,0.00");
          break;
        case "volume":
          result = numeral(Object.values(item)[3]).format("0.0a");
          break;
      }
      return result;
    },
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
          const limit = Math.max(this.asks.length, this.bids.length);
          const bidask = {
            asks: this.asks,
            bids: this.bids,
            limit
          };
          //console.log(bidask);
          this.setBidask(bidask);
          this.loading = null;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    //this.initBidask("29235363595681792");
    this.initBidask(this.symbolid);
  }
};
</script>

<style scoped>
/* html {
  font-size: 11px !important;
} */
.headers {
  background: #00121e !important;
  font-size: 10px !important;
  color: #fff !important;
  text-align: right !important;
}
.tr_custom {
  line-height: 0.1rem !important;
}
.custom_table tr {
  height: 5px !important;
}
.column {
  /* background: #00121e !important; */
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
