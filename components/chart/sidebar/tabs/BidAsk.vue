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

    <v-card
      v-show="loading"
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      class="mt-2 mr-2"
      style="height:105px;"
      flat
      tile
    >
      <v-progress-linear
        color="success"
        indeterminate
        buffer-value="100"
        height="5"
        class="mt-3"
      ></v-progress-linear>
    </v-card>

    <!-- bid and ask -->
    <v-card
      v-show="!loading"
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      style="height:105px;"
      flat
      tile
    >
      <v-simple-table
        dense
        :dark="lightSwitch == 1"
        fixed-header
        :style="{ background: cardBackground }"
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
    <DepthBar :active-tab="activeTab" />

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
    <TimeTrade :active-tab="activeTab" />

    <!-- TransactionBar -->
    <TransactionBar :active-tab="activeTab" />
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
  props: ["activeTab"],
  data() {
    return {
      currentTab: false,
      loading: true
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      bidask: "chart/bidask",
      lightSwitch: "global/getLightSwitch",
      sse: "chart/sse"
    }),
    /**
     * toggle card background light/dark mode
     *
     * @return
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    /**
     * re run intbidask everytime symbol id changes
     *
     * @param   {String}  symid  stock id
     *
     * @return
     */
    symbolid(symid) {
      const tab = parseInt(this.activeTab.substr(4));
      if (tab == 1) {
        this.initBidask(symid);
        this.currentTab = true;
      } else {
        this.currentTab = false;
      }
    },
    /**
     * run sse once loading is done
     *
     * @param   {Boolean}  value  true/false
     *
     * @return
     */
    loading(value) {
      if (value === false && this.currentTab === true) {
        this.sse.addEventListener("bidask", this.sseBidask);
      }
    },
    /**
     * fetch what is the current active tab
     *
     * @param   {String}  value  tab id name
     *
     * @return
     */
    activeTab(value) {
      const tab = parseInt(value.substr(4));
      if (tab == 1) {
        this.initBidask(this.symbolid);
        this.currentTab = true;
      } else {
        this.currentTab = false;
      }
    }
  },
  methods: {
    ...mapActions({
      setBidask: "chart/setBidask",
      setSSEBidask: "chart/setSSEBidask"
    }),
    /**
     * format display using numeral js filter
     *
     * @param   {Object}  item  bid/ask item
     * @param   {String}  key   object key
     *
     * @return  {String}      formatted
     */
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
          result = this.$globalFilters.numeralDecimal(Object.values(item)[2]);
          break;
        case "volume":
          result = numeral(Object.values(item)[3]).format("0.0a");
          break;
      }
      return result;
    },
    /**
     * initialise and request for bidask api data
     *
     * @param   {String}  symid  sym_id
     *
     * @return
     */
    initBidask: async function(symid) {
      this.loading = true;
      try {
        const response = await this.$api.chart.stocks.bidask({
          "symbol-id": symid,
          "filter-by-last": true,
          limit: 20
        });

        const asks = Object.values(response.data.asks);
        const bids = Object.values(response.data.bids).sort(
          (a, b) => b.price - a.price
        );
        const limit = Math.max(asks.length, bids.length);
        const bidask = {
          asks,
          bids,
          limit
        };
        this.setBidask(bidask);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * initialise and listen to bidask server-side event
     *
     * @param   {Object}  e  object response
     *
     * @return
     */
    sseBidask(e) {
      if (this.bidask.asks !== undefined && this.bidask.bids !== undefined) {
        if (this.symbolid == undefined) return;
        const data = JSON.parse(e.data);
        this.setSSEBidask(data);
        if (this.symbolid !== data.sym_id) return;

        if (data.ov == "B") {
          // bid
          const bids = this.updateBidAndAsks(this.bidask.bids, data);
          this.$store.commit(
            "chart/SET_BIDS",
            bids.sort((a, b) => b.price - a.price)
          );
        } else if (data.ov == "S") {
          // ask
          const asks = this.updateBidAndAsks(this.bidask.asks, data);
          this.$store.commit(
            "chart/SET_ASKS",
            asks.sort((a, b) => a.price - b.price)
          );
        }
      }
    },
    /**
     * update the list depend on sent condition
     * idn = p * 10000 / formula
     *
     * a = add new order
     * au = add/update = deduct count and volume to the same id. then add new order with new id. idn is required
     * d = delete/cancel order, deduct count by 1, if no count left remove from the list
     * u = update = remove data.id on the list then add new using idn. same with au
     * fd = full executed delete, deduct count and volume to the same id.
     * pd = partial delete executed order, deduct volume only
     *
     *
     * @param   {Array}  list  list items bid/ask
     * @param   {Object}  data  sent data from sse
     *
     * @return  {Object}  new list item formatted
     */
    updateBidAndAsks(list, data) {
      const index = list.findIndex(item => item.id === data.id);
      if (data.ty == "a") {
        // add new data/order in table if data is not exists
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
      } else if (data.ty == "pd") {
        list = this.updateBidAskVolume(list, index, -1, data.vol);
      }

      const limit = Math.max(this.bidask.asks.length, this.bidask.bids.length);
      this.$store.commit("chart/SET_BIDASK_LIMIT", limit);
      return list;
    },
    /**
     * Update bid/ask count and volume, and once count is less 0 then remove
     *
     * @param   {Array}  list       array of displayed items
     * @param   {Integer}  id         id of bid/ask
     * @param   {Integer}  increment  value to increment
     * @param   {Float}  volume     volume value
     *
     * @return  {Array}           new array with updated object
     */
    updateBidAskCount(list, id, increment, volume) {
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
    /**
     * update volume of existing item price in the bidask list
     *
     * @param   {Object}  list       object items of bid/ask
     * @param   {Integer}  id         key id on object in array
     * @param   {Interger}  increment  Volume amount
     *
     * @return  {Object}           return object
     */
    updateBidAskVolume(list, id, increment, volume) {
      if (typeof list[id] !== "undefined") {
        list[id].volume += increment * volume;
      }
      return list;
    },
    /**
     * add new item on the lists
     *
     * @param   {Integer}  id    id = price * 10000
     * @param   {Object}  data   object to be added
     *
     * @return  {Object}     created object
     */
    addToBidAskList(id, data) {
      return {
        count: 1,
        id: id,
        price: data.p,
        volume: data.vol
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
