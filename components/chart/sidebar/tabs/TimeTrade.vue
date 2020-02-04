<template>
  <v-content>
    <v-card
      v-show="loading"
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      class="mt-2 mr-2"
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

    <v-card
      v-show="!loading"
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :style="`height: calc(100vh - ${responsiveHeight + 20}px)`"
      class="card__timetrade pl-1 pr-2"
      flat
      tile
    >
      <v-simple-table
        dense
        :dark="lightSwitch == 1"
        fixed-header
        :style="{ background: cardBackground }"
        :height="`calc(100vh - ${responsiveHeight + 20}px)`"
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
        <tbody id="tbody__trades">
          <tr
            v-for="item in trades"
            :id="item.id"
            :key="item.id"
            class="tr_custom"
          >
            <td class="pl-2" style="width:40px;">
              {{ $moment.unix(item.timestamp).format("HH:mm") }}
            </td>
            <td class="text-right" style="width:40px;">
              {{ item.executed_volume | numeral("0.0a") }}
            </td>
            <td class="text-right" style="width:40px;">
              {{ item.executed_price | numeralDecimal }}
            </td>
            <td class="pl-2 text-right" style="width:30px;">
              {{ item.buyer | limitString(6) }}
            </td>
            <td class="pl-2 pr-2 text-right" style="width:30px;">
              {{ item.seller | limitString(6) }}
            </td>
            <td class="font-weight-bold" style="width:5px;"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TimeTrade",
  props: ["activeTab"],
  data() {
    return {
      loading: true,
      currentTab: false,
      tempTrades: [],
      ctrTrades: 0
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index",
      lightSwitch: "global/getLightSwitch",
      responsiveHeight: "chart/responsiveHeight",
      trades: "chart/trades",
      sse: "chart/sse",
      blink: "chart/blink"
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
     * run initTimetrade everytime symbol id changes
     *
     * @param   {String}  symid  symbol id
     *
     * @return
     */
    symbolid(symid) {
      const tab = parseInt(this.activeTab.substr(4));
      if (tab == 1) {
        this.initTimetrade(symid);
        this.currentTab = true;
      } else {
        this.currentTab = false;
      }
    },
    /**
     * Once a trade data coming in, create a simlple blink effect
     *
     * @param   {Object}  value  response data object
     *
     * @return
     */
    trades(value) {
      setTimeout(
        function() {
          this.updateEffect(value[0].id);
        }.bind(this),
        100
      );
    },
    /**
     * once loading is done run and listen to trade sse
     *
     * @param   {Boolena}  value  true/false
     *
     * @return
     */
    loading(value) {
      if (value === false && this.currentTab === true) {
        this.tempTrades = this.trades;
        this.sse.addEventListener("trade", this.sseTrade);
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
        this.initTimetrade(this.symbolid);
        this.currentTab = true;
      } else {
        this.currentTab = false;
      }
    }
  },
  methods: {
    ...mapActions({
      setTrades: "chart/setTrades",
      setSSETrade: "chart/setSSETrade"
    }),
    /**
     * initialise and request time trade api on mount hook
     *
     * @param   {String}  symid  sym_id
     *
     * @return
     */
    initTimetrade(symid) {
      this.loading = true;
      this.$api.chart.stocks
        .trades({
          "symbol-id": symid,
          sort: "DESC",
          broker: true,
          limit: 100
        })
        .then(response => {
          this.setTrades(response.data);
          this.loading = false;
        })
        .catch(() => {});
    },
    /**
     * initialise sse, listen to time trade
     *
     * @param   {Object}  e  response
     *
     * @return
     */
    sseTrade(e) {
      try {
        if (this.symbolid == undefined) return;
        const trades = JSON.parse(e.data);
        this.setSSETrade(trades);
        if (this.symbolid !== trades.sym_id) return;
        this.tempTrades.unshift({
          id: `${trades.t}_${this.ctrTrades++}`,
          id_str: String(`${trades.t}_${this.ctrTrades++}`),
          timestamp: trades.t,
          date: null,
          datetime: null,
          executed_price: trades.exp,
          executed_volume: trades.exvol,
          buyer: trades.b,
          seller: trades.s
        });

        if (this.trades.length !== undefined && this.trades.length > 0) {
          if (this.tempTrades.length > 99) {
            this.tempTrades.pop();
          }
          this.setTrades(this.tempTrades);
        }
      } catch (err) {}
    },
    /**
     * add simple blink animation
     *
     * @param   {String}  dom  id of element
     *
     * @return
     */

    updateEffect(dom) {
      const item = document.getElementById(dom);
      if (item == null) return;
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(() => {
        item.style.background = "";
      }, this.blink);
    }
  },
  mounted() {
    this.initTimetrade(this.symbolid);
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
