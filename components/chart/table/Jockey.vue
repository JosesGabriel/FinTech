<template>
  <!-- hehhee -->
  <v-col class="pa-0 mt-3">
    <template >
      <tr  >
        <td style="width: 214px;"></td>
        <td
          style="width: 62px; text-align:right;border-bottom: 1px solid #828b91;"
          class="label"
        >
          Buying
        </td>
        <td style="width: 275px;border-bottom: 1px solid #828b91;"></td>
        <td
          style="width: 62px; text-align:right;border-bottom: 1px solid #828b91;"
          class="label"
        >
          Selling
        </td>
        <td style="width: 275px;border-bottom: 1px solid #828b91;"></td>
        <td
          style="width: 83px; text-align:right;border-bottom: 1px solid #828b91;"
          class="label"
        >
          Net
        </td>
        <td style="width: 98px;border-bottom: 1px solid #828b91;"></td>
      </tr>
    </template>
    <v-data-table
      :headers="headers"
      :items="jockey"
      class="data_table-container jockey_table"
      dense
      :dark="lightSwitch == true"
      fixed-header
      hide-default-footer
      :height="`${tablesize}`"
      :style="{ background: cardbackground }"
    >
      <template v-slot:item="props">
        <tr>
          <td>
            <div class="ml-1">
              {{ props.item.broker_code }}
            </div>
            <div class="broker_desc mr-0 pr-0 ml-1">
              {{ props.item.broker_description }}
            </div>
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.buying.volume) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.buying.average_price) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.buying.value) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{
                props.item.buying.market_weight_percentage.toFixed(2)
              }}%</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.selling.volume) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.selling.average_price) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.selling.value) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{
                props.item.selling.market_weight_percentage.toFixed(2)
              }}%</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.net.volume) }}</span
            >
          </td>
          <td style="text-align: right;">
            <span
              class="font-regular caption item_position-prop text-right px-1 py-0"
              >{{ addcomma(props.item.net.value) }}</span
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      min: "225px",
      max: "calc(100vh - 300px)",
      headers: [
        { text: "Broker", value: "broker_code", align: "left", width: "20%" },
        {
          text: "Volume",
          value: "buy_volume",
          align: "right",
          child: ["December"]
        },
        { text: "Ave. Price", value: "buy_avprice", align: "right" },
        { text: "Value", value: "buy_value", align: "right" },
        { text: "Market Weight", value: "buy_mweight", align: "right" },
        { text: "Volume", value: "sell_volume", align: "right" },
        { text: "Ave. Price", value: "sell_avprice", align: "right" },
        { text: "Value", value: "sell_value", align: "right" },
        { text: "Market Weight", value: "sell_mweight", align: "right" },
        { text: "Net Volume", value: "net_volume", align: "right" },
        { text: "Net Value", value: "net_value", align: "right" }
      ],
      jockey: []
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index",
      fullscreen: "chart/getTableFullscreen",
      ticker: "chart/getTicker",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
     tablesize: function() {
      return this.fullscreen ? this.max : this.min;
    },
  },
  watch: {
    symbolid(symid) {
      //   console.log("time trade");
      //   console.log('stock id - '+symid);
      this.initJockey(symid);
    },
        fullscreen(value) {
      console.log("fullscreen");
      console.log(value);
    },
    ticker(value) {
      // console.log("ticker");
      // console.log(value);
      if (value) {
        this.max = "calc(100vh - 300px)";
      } else {
        this.max = "calc(100vh - 250px)";
      }
    }
  },
  mounted() {
    this.$api.chart.stocks
      .brokersActivity({
        "symbol-id": "29235365118214144"
      })
      .then(response => {
        this.jockey = response.data;
      });
  },
  methods: {
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },
    initJockey(id) {
      this.$api.chart.stocks
        .brokersActivity({
          "symbol-id": id
        })
        .then(response => {
          console.log("data response");
          this.jockey = response.data;
        });
    }
  }
};
</script>
<style>
/* .jockey_table > .v-data-table__wrapper table thead tr th {
  background: #00121e !important;
} */
.theme--light.v-tabs-items {
  background: none;
}
.positive {
  color: #00ffc3;
}
.negative {
  color: #fe4949;
}
.label {
  color: #a9a8a7;
}
.highest {
  background: #00ffc329;
}
.buying:hover {
  cursor: pointer;
}
.selling:hover {
  cursor: pointer;
}
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expand-row) {
  background: rgb(20, 42, 70) !important;
}
.theme--dark.v-data-table tbody tr:hover {
  background: rgb(20, 42, 70) !important;
}
.broker_desc {
  font-size: 11px;
  font-weight: 100;
  color: grey;
}
</style>
