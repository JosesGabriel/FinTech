<template>
  <v-col class="pa-0 mt-3">
    <v-progress-linear
      color="success"
      indeterminate
      buffer-value="100"
      height="5"
      class="mt-3"
      v-show="loading"
    ></v-progress-linear>
    <v-simple-table
      v-show="!loading"
      class="data_table-container jockey_table mt-2 ml-3 mr-2"
      dense
      :dark="lightSwitch == true"
      disable-pagination
      fixed-header
      hide-default-footer
      :height="`${tablesize}`"
      :style="{ background: cardbackground }"
    >
      <template v-slot:default>
        <thead>
          <tr class="ma-0 pb-1">
            <th class="text-left" style="padding-bottom: 6px !important;"></th>
            <th
              colspan="4"
              class="text-left j_header"
              :style="
                sortName == 'buy_volume'
                  ? 'border-bottom: 1px solid #03dac5 !important'
                  : 'border-bottom: 1px solid #414f58 !important'
              "
              style="padding-bottom: 6px !important; font-size: 12px;font-weight: bold;"
              @click="sortArray('buy_volume')"
            >
              Buying
            </th>

            <th class="text-left"></th>
            <th
              colspan="4"
              class="text-left j_header"
              :style="
                sortName == 'sell_volume'
                  ? 'border-bottom: 1px solid #03dac5 !important'
                  : 'border-bottom: 1px solid #414f58 !important'
              "
              style="padding-bottom: 6px !important; border-bottom: 1px solid #414f58 !important; font-size: 12px;font-weight: bold;"
              @click="sortArray('sell_volume')"
            >
              Selling
            </th>

            <th class="text-left"></th>
            <th
              colspan="2"
              class="text-left j_header"
              :style="
                sortName == 'net_volume'
                  ? 'border-bottom: 1px solid #03dac5 !important'
                  : 'border-bottom: 1px solid #414f58 !important'
              "
              style="padding-bottom: 6px !important; border-bottom: 1px solid #414f58 !important; font-size: 12px;font-weight: bold;"
              @click="sortArray('net_volume')"
            >
              Net
            </th>
            <th
              class="text-left"
              style="padding-bottom: 5px !important; border-bottom: 1px solid #414f58 !important;"
            ></th>
          </tr>
          <tr class="ma-0 pb-1">
            <th
              class="text-left j_header secondary_color pt-2"
              @click="sortArray('broker_code')"
            >
              Broker
            </th>
            <th
              class="text-center j_header secondary_color pt-2"
              @click="sortArray('buy_volume')"
            >
              Volume
            </th>
            <th
              class="text-right j_header secondary_color pt-2"
              @click="sortArray('buy_avprice')"
            >
              Ave. Price
            </th>
            <th class="text-right secondary_color pt-2">Value</th>
            <th class="text-right secondary_color pt-2">Weight</th>
            <th class="text-right pt-2"></th>
            <th
              class="text-right j_header secondary_color pt-2"
              @click="sortArray('sell_volume')"
            >
              Volume
            </th>
            <th
              class="text-right j_header secondary_color pt-2"
              @click="sortArray('sell_avprice')"
            >
              Ave. Price
            </th>
            <th class="text-right secondary_color pt-2">Value</th>
            <th class="text-right secondary_color pt-2">Weight</th>
            <th class="text-right pt-2"></th>
            <th class="text-right secondary_color pt-2">Net Volume</th>
            <th class="text-right pr-2 secondary_color pt-2">Net Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in jockey"
            :id="item.broker_code"
            :key="item.broker_code"
          >
            <td style="width:200px;">
              <div style="font-weight: bold; padding-top: 3px;">
                {{ item.broker_code }}
              </div>
              <div class="broker_desc text-uppercase">
                {{ item.broker_description }}
              </div>
            </td>
            <td class="text-right">{{ addcomma(item.buy_volume) }}</td>
            <td
              :class="
                item.buy_avprice < current
                  ? 'positive'
                  : item.buy_avprice > current
                  ? 'negative'
                  : ''
              "
              class="text-right"
            >
              {{ addcomma(item.buy_avprice) }}
            </td>
            <td class="text-right">{{ addcomma(item.buy_value) }}</td>
            <td class="text-right">{{ addcomma(item.buy_mweight) }}%</td>
            <td class="text-center" style="width:20px;"></td>
            <td class="text-right">{{ addcomma(item.sell_volume) }}</td>
            <td
              :class="
                item.sell_avprice > current
                  ? 'positive'
                  : item.sell_avprice < current
                  ? 'negative'
                  : ''
              "
              class="text-right"
            >
              {{ addcomma(item.sell_avprice) }}
            </td>
            <td class="text-right">{{ addcomma(item.sell_value) }}</td>
            <td class="text-right">{{ addcomma(item.sell_mweight) }}%</td>
            <td class="text-center" style="width:20px;"></td>
            <td class="text-right">{{ addcomma(item.net_volume) }}</td>
            <td
              :class="
                item.net_volume > 0
                  ? 'positive'
                  : item.net_volume < 0
                  ? 'negative'
                  : ''
              "
              class="text-right pr-2"
            >
              {{ addcomma(item.net_value) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      min: "255px",
      max: "calc(100vh - 300px)",
      jockey: [],
      desc: true,
      current: 0,
      hover: false,
      symbol_id: "",
      sortName: "",
      loading: true
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index",
      fullscreen: "chart/getTableFullscreen",
      ticker: "chart/getTicker",
      lightSwitch: "global/getLightSwitch",
      sse: "chart/sse",
      sseTrade: "chart/sseTrade"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    tablesize: function() {
      return this.fullscreen ? this.max : this.min;
    }
  },
  watch: {
    symbolid(symid) {
      this.getCurrent(symid);
      this.initJockey(symid);
    },
    fullscreen(value) {},
    ticker(value) {
      if (value) {
        this.max = "calc(100vh - 300px)";
      } else {
        this.max = "calc(100vh - 250px)";
      }
    },
    sseTrade: function(data) {
      this.jockeyRealTime(data);
    }
  },
  mounted() {
    this.initJockey(this.symbolid);
  },
  methods: {
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },
    /**
     * Get last price
     */
    getCurrent(id) {
      this.$api.chart.stocks
        .history({
          "symbol-id": id
        })
        .then(response => {
          this.current = response.data.last;
        });
    },
    /**
     * Initialized Jockey
     *
     * @param   {string}  id  Stock symbol ID
     *
     */
    initJockey(id) {
      this.loading = true;
      this.symbol_id = id;
      this.$api.chart.stocks
        .brokersActivity({
          "symbol-id": id
        })
        .then(response => {
          this.jockey = response.data;
          for (let i = 0; i < response.data.length; i++) {
            this.jockey[i].broker_code = this.jockey[i].broker_code;
            this.jockey[i].broker_description = this.jockey[
              i
            ].broker_description;
            this.jockey[i].buy_volume = this.jockey[i].buying.volume;
            this.jockey[i].buy_avprice = this.jockey[i].buying.average_price;
            this.jockey[i].buy_value = this.jockey[i].buying.value;
            this.jockey[i].buy_mweight = this.jockey[
              i
            ].buying.market_weight_percentage;
            this.jockey[i].sell_volume = this.jockey[i].selling.volume;
            this.jockey[i].sell_avprice = this.jockey[i].selling.average_price;
            this.jockey[i].sell_value = this.jockey[i].selling.value;
            this.jockey[i].sell_mweight = this.jockey[
              i
            ].selling.market_weight_percentage;
            this.jockey[i].net_volume = this.jockey[i].net.volume;
            this.jockey[i].net_value = this.jockey[i].net.value;
          }
          this.desc = true;
          this.sortArray("buy_volume");
          this.sortName = "buy_volume";
          this.loading = false;
        });
    },

    /**
     * Real Time Execution
     *
     * @param   {object}  data  Jockey Data
     *
     */
    jockeyRealTime(data) {
      if (this.symbol_id == data.sym_id) {
        for (let index = 0; index < this.jockey.length; index++) {
          if (this.jockey[index].broker_code == data.b) {
            this.jockey[index].buy_volume =
              parseFloat(this.jockey[index].buy_volume) +
              parseFloat(data.exvol);
            this.jockey[index].buy_value =
              parseFloat(this.jockey[index].buy_value) +
              parseFloat(data.exvol) * parseFloat(data.exp);
            this.jockey[index].buy_avprice =
              this.jockey[index].buy_value / this.jockey[index].buy_volume;
            this.jockey[index].buy_mweight =
              (this.jockey[index].buy_volume / this.totalBuyVolume()) * 100;
            this.jockey[index].net_volume =
              this.jockey[index].buy_volume -
              parseFloat(this.jockey[index].sell_volume);
            this.jockey[index].net_value =
              this.jockey[index].buy_value -
              parseFloat(this.jockey[index].sell_value);
            let updatedItem = { ...this.jockey[index] };
            this.jockey.splice(index, 1, updatedItem);
            this.updateEffect(this.jockey[index].broker_code);
          }
          if (this.jockey[index].broker_code == data.s) {
            this.jockey[index].sell_volume =
              parseFloat(this.jockey[index].sell_volume) +
              parseFloat(data.exvol);
            this.jockey[index].sell_value =
              parseFloat(this.jockey[index].sell_value) +
              parseFloat(data.exvol) * parseFloat(data.exp);
            this.jockey[index].sell_avprice =
              this.jockey[index].sell_value / this.jockey[index].sell_volume;
            this.jockey[index].sell_mweight =
              (this.jockey[index].sell_volume / this.totalSellVolume()) * 100;
            this.jockey[index].net_volume =
              this.jockey[index].buy_volume -
              parseFloat(this.jockey[index].sell_volume);
            this.jockey[index].net_value =
              this.jockey[index].buy_value -
              parseFloat(this.jockey[index].sell_value);
            let updatedItem = { ...this.jockey[index] };
            this.jockey.splice(index, 1, updatedItem);
            this.updateEffect(this.jockey[index].broker_code);
          }
        }
      }
    },
    /**
     * Calculate total Buy VOlume
     *
     * @return  {Float} total buy volume
     */
    totalBuyVolume() {
      let total = 0;
      for (let i = 0; i < this.jockey.length; i++) {
        total = total + parseFloat(this.jockey[i].buy_volume);
      }
      return total;
    },
    /**
     * Calculate total Sell VOlume
     *
     * @return  {Float} total sell volume
     */
    totalSellVolume() {
      let total = 0;
      for (let i = 0; i < this.jockey.length; i++) {
        total = total + parseFloat(this.jockey[i].sell_volume);
      }
      return total;
    },

    /**
     * Data SOrting according to volume, average price
     *
     * @param   {array}  data  jockey data
     *
     * @return  {array}        sorted data of jockey
     */
    sortArray(data) {
      this.sortName = data;
      if (this.desc) {
        this.desc = false;
        function compare(a, b) {
          if (a[data] > b[data]) return -1;
          if (a[data] < b[data]) return 1;
          return 0;
        }
        return this.jockey.sort(compare);
      } else {
        this.desc = true;
        function compare(a, b) {
          if (a[data] < b[data]) return -1;
          if (a[data] > b[data]) return 1;
          return 0;
        }
        return this.jockey.sort(compare);
      }
    },
    /**
     * Blinking change effect
     *
     */
    updateEffect: dom => {
      const item = document.getElementById(dom);
      if (item == null) return;
      item.style.background = "rgb(182,182,182,.2)";
      //item.style.background = "rgb(3,218,197,0.27)";
      setTimeout(function() {
        item.style.background = "";
      }, 800);
    },

    /**
     * NUmber formatter from 1000 to 1K, 1000000 to 1M
     *
     * @param   {float}  num  number
     *
     * @return  {string}      formatted number
     */
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.0$/, "") + "K";
      }
      return num;
    }
  }
};
</script>
<style>
.v-data-table--fixed-header thead tr:nth-child(2) th {
  top: 25px;
}
.hover_active {
  background-color: #b6b6b6 !important;
  opacity: 20%;
}
.hover_inactive {
  background-color: unset;
  opacity: unset;
}

.theme--light.v-tabs-items {
  background: none;
}
.positive {
  color: #03dac5;
}
.negative {
  color: #f44336;
}
.label {
  color: #a9a8a7;
}
.highest {
  background: #00ffc329;
}
.j_header:hover {
  cursor: pointer;
}

.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expand-row) {
  background-color: rgb(182, 182, 182, 0.2) !important;
}
.theme--dark.v-data-table tbody tr:hover {
  background-color: rgb(182, 182, 182, 0.2) !important;
}
.broker_desc {
  font-size: 8px;
  width: 200px;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.secondary_color {
  color: #e5e5e5;
}
</style>
