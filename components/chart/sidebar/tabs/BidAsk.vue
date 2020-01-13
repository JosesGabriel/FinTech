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
      loading: "#03dac5"
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      bidask: "chart/bidask",
      lightSwitch: "global/getLightSwitch",
      sse: "chart/sse"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    symbolid(symid) {
      this.initBidask(symid);
    },
    loading: function(value) {
      if (value === false) {
        this.sse.addEventListener("bidask", this.sseBidask);
      }
    }
  },
  methods: {
    ...mapActions({
      setBidask: "chart/setBidask",
      setSSEBidask: "chart/setSSEBidask"
    }),
    formatItem: function(item, key = null) {
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
    initBidask: async function(symid) {
      this.loading = "#03dac5";
      //console.log("bidask");
      try {
        const response = await this.$api.chart.stocks.bidask({
          "symbol-id": symid,
          "filter-by-last": true,
          limit: 10
        });
        const asks = Object.values(response.data.asks);
        const bids = Object.values(response.data.bids);
        const limit = Math.max(asks.length, bids.length);
        const bidask = {
          asks,
          bids,
          limit
        };
        this.setBidask(bidask);
        this.loading = false;
        // console.log("bidask response", bidask);
      } catch (error) {
        //console.log("bidask error", error);
      }
    },
    sseBidask: function(e) {
      if (this.bidask.asks !== undefined && this.bidask.bids !== undefined) {
        if (this.symbolid == undefined) return;
        const data = JSON.parse(e.data);
        this.setSSEBidask(data);
        // console.log(data);
        // console.log(this.symbolid);
        if (this.symbolid !== data.sym_id) return;

        if (data.ov == "B") {
          // bid
          const bids = this.updateBidAndAsks(this.bidask.bids, data);
          this.$store.commit(
            "chart/SET_BIDS",
            bids.sort(this.sortBy("price", "desc"))
          );
        } else if (data.ov == "S") {
          // ask
          //              if (data.ty != "a" || data.ty != "au") return;
          const asks = this.updateBidAndAsks(this.bidask.asks, data);
          this.$store.commit(
            "chart/SET_ASKS",
            asks.sort(this.sortBy("price", "desc"))
          );
        }
        // console.log(this.bidask);
      }
    },
    // For Bid and Asks
    updateBidAndAsks: function(list, data) {
      const index = list.findIndex(item => item.id === data.id);
      //   console.log("update bidask", data.ty);
      //   console.log(index);
      //   console.log(list);
      //   console.log(data);
      if (data.ty == "a") {
        if (typeof list[index] !== "undefined") {
          list[index].count++;
          list[index].volume += data.vol;
        } else {
          list.push(this.addToBidAskList(data.id, data));
        }
      } else if (data.ty == "au") {
        // decrement data.id's count by 1, if count is zero, remove from list
        list = this.updateBidAskCount(list, index, -1, data.vol);
        // add new data.idn to list
        list.push(this.addToBidAskList(data.idn, data));
      } else if (data.ty == "d") {
        // decrement data.id's count by 1, if count is zero, remove from list
        list = this.updateBidAskCount(list, index, -1, data.vol);
      } else if (data.ty == "u") {
        // same as au but drop the data.id entirely and add data.idn to list
        if (typeof list[index] !== "undefined") {
          list = list.filter((item, key) => key !== index);
        }
        list.push(this.addToBidAskList(data.idn, data));
      } else if (data.ty == "fd") {
        // decrement data.id's count by 1, if count is zero, remove from list
        list = this.updateBidAskCount(list, index, -1, 0);

        list = this.updateBidAskVolume(list, index, -1 * data.vol);
      } else if (data.ty == "pd") {
        list = this.updateBidAskVolume(list, index, data.vol);
      }

      const limit = Math.max(this.bidask.asks.length, this.bidask.bids.length);
      this.$store.commit("chart/SET_BIDASK_LIMIT", limit);
      return list;
    },
    updateBidAskCount: function(list, id, increment, volume) {
      if (typeof list[id] !== "undefined") {
        list[id].count += increment;
        list[id].volume += volume * increment;
        // if count less than 0, remove from the list
        if (list[id].count <= 0) {
          list = list.filter((item, key) => key !== id);
        }
      }
      return list;
    },
    updateBidAskVolume: function(list, id, increment) {
      if (typeof list[id] !== "undefined") {
        list[id].volume += increment;
      }
      return list;
    },
    addToBidAskList: function(id, data) {
      return {
        count: 1,
        id: id,
        price: data.p,
        volume: data.vol
      };
    },
    sortBy: function(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
  },
  mounted() {
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
