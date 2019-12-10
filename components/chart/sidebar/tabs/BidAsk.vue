<template>
  <v-content>
    <div
      class="sub__title"
      :class="[
        { 'black--text': lightSwitch == 0 },
        { 'white--text': lightSwitch == 1 }
      ]"
    >
      Bid and Ask
    </div>
    <!-- bid and ask -->
    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :loading="loading"
      style="height:105px;"
      flat
      tile
    >
      <v-simple-table
        dense
        :dark="lightSwitch == 1"
        fixed-header
        :style="{ background: cardbackground }"
        height="105px"
        class="custom_table pl-5 pr-3"
      >
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              VOL
            </th>
            <th>
              BID
            </th>
            <th>
              ASK
            </th>
            <th>
              VOL
            </th>
            <th>
              #
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, key) in bidask.limit"
            :key="item.id"
            class="tr_custom"
          >
            <td class="" style="width:15px;">
              {{ formatItem(bidask.bids[key], "count") }}
            </td>
            <td class="" style="width:10px;">
              {{ formatItem(bidask.bids[key], "volume") }}
            </td>
            <td class="" style="width:10px;">
              {{ formatItem(bidask.bids[key], "price") }}
            </td>
            <td class="" style="width:25px;">
              {{ formatItem(bidask.asks[key], "price") }}
            </td>
            <td class="" style="width:10px;">
              {{ formatItem(bidask.asks[key], "volume") }}
            </td>
            <td class="" style="width:10px;">
              {{ formatItem(bidask.asks[key], "count") }}
            </td>
            <td style="width:5px;"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <!-- depthbar -->
    <DepthBar />

    <!-- time and trades -->
    <div
      class="sub__title"
      :class="[
        { 'black--text': lightSwitch == 0 },
        { 'white--text': lightSwitch == 1 }
      ]"
    >
      Time and Trade
    </div>
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
      loading: "#03dac5",
      asks: {},
      bids: {}
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index",
      bidask: "chart/bidask",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
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
      this.loading = "#03dac5";
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
.tr_custom {
  line-height: 0.1rem !important;
}
.custom_table tr {
  height: 5px !important;
}
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
</style>
