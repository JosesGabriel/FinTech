<template>
  <v-content>
    <!-- bid and ask -->
    <v-card color="#00121e" :loading="loading_bidask" style="height:190px">
      <v-row class="py-0">
        <v-col class="py-0 mt-1">
          <span class="caption ml-4 font-weight-bold white--text"
            >Bid and Ask</span
          >
          <v-content>
            <v-simple-table
              dense
              dark
              fixed-header
              height="110"
              style="background:#00121e"
              class="mx-2"
            >
              <thead>
                <tr>
                  <th :class="header">#</th>
                  <th :class="header">VOL</th>
                  <th :class="header">BID</th>
                  <th :class="header">ASK</th>
                  <th :class="header">VOL</th>
                  <th :class="header">#</th>
                  <th :class="header"></th>
                </tr>
              </thead>
              <tbody>
                <span class="d-none">{{ (ctr = 0) }}</span>
                <tr v-for="item in asks" :key="item.id">
                  <td :class="column" style="width:10%">
                    {{ bids[ctr].count | numeral("0,0") }}
                  </td>
                  <td :class="column" class="text-uppercase" style="width:15%">
                    {{ bids[ctr].volume | numeral("0.0a") }}
                  </td>
                  <td :class="column" class="text-uppercase" style="width:18%">
                    {{ bids[ctr].price | numeral("0,0.00") }}
                  </td>
                  <td :class="column" style="width:18%">
                    {{ item.price | numeral("0,0.00") }}
                  </td>
                  <td :class="column" style="width:18%">
                    {{ item.volume | numeral("0.0a") }}
                  </td>
                  <td :class="column" style="width:10%">
                    {{ item.count | numeral("0,0") }}
                  </td>
                  <td :class="column"></td>
                  <span class="d-none">{{ ctr++ }}</span>
                </tr>
              </tbody>
            </v-simple-table>
          </v-content>
        </v-col>
      </v-row>
      <v-row>
        <!-- toggle bid and ask -->
        <v-col class="py-0 mt-3 mb-3">
          <v-content>
            <v-row>
              <v-col class="col-5 text-right pa-0">
                <span
                  :class="{ 'white--text font-weight-bold': !toggleButton }"
                  class="overline"
                  >Top Five</span
                >
              </v-col>
              <v-col class="col-2 pa-0">
                <v-content>
                  <v-switch
                    v-model="toggleButton"
                    class="toggleButton"
                    color="#48FFD5"
                  ></v-switch>
                </v-content>
              </v-col>
              <v-col class="col-5 text-left pa-0">
                <span
                  :class="{ 'white--text font-weight-bold': toggleButton }"
                  class="overline"
                  >Full Depth</span
                >
              </v-col>
            </v-row>
          </v-content>
          <v-content class="px-12">
            <v-progress-linear
              :indeterminate="progbar.loading"
              :value="progbar.value"
              background-color="error"
              color="#48FFD5"
              height="5"
            ></v-progress-linear>
          </v-content>
        </v-col>
      </v-row>
    </v-card>

    <!-- time and trades -->
    <v-card
      color="#00121e"
      :loading="loading_timetrades"
      class="card__timetrade"
    >
      <v-row class="py-0">
        <v-col class="py-0 mt-3">
          <span class="caption ml-4 font-weight-bold white--text"
            >Time and Trade</span
          >
          <v-simple-table
            dense
            dark
            fixed-header
            style="background:#00121e"
            height="calc(100vh - 650px)"
            class="ml-4"
          >
            <thead>
              <tr>
                <th class="pl-2 overline header white--text font-weight-bold">
                  TIME
                </th>
                <th :class="header">VOL</th>
                <th :class="header">PRICE</th>
                <th class="pl-3 overline header white--text font-weight-bold">
                  BUYER
                </th>
                <th class="pl-2 overline header white--text font-weight-bold">
                  SELLER
                </th>
                <th :class="header"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in trades" :key="item.id">
                <td class="pl-2 overline column white--text" style="width:20%;">
                  {{ $moment(item.timestamp).format("hh:mm A") }}
                </td>
                <td :class="column" class="text-uppercase" style="width:12%;">
                  {{ item.executed_volume | numeral("0.0a") }}
                </td>
                <td :class="column" style="width:19%;">
                  {{ item.executed_price | | numeral('0,0.00') }}
                </td>
                <td
                  class="pl-4 overline column white--text font-weight-bold"
                  style="width:20%;"
                >
                  {{ $globalMethod.limitDisplayString(item.buyer, 6) }}
                </td>
                <td
                  class="pl-4 overline column white--text font-weight-bold"
                  style="width:20%;"
                >
                  {{ $globalMethod.limitDisplayString(item.seller, 6) }}
                </td>
                <td :class="column"></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <!-- toggle time and trades-->
        <v-col class="py-0">
          <v-content class="px-12">
            <v-progress-linear
              background-color="error"
              color="#48FFD5"
              height="5"
              value="50"
            ></v-progress-linear>
          </v-content>
        </v-col>
      </v-row>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BidAsk",
  data() {
    return {
      loading_bidask: "#48FFD5",
      loading_timetrades: "#48FFD5",
      toggleButton: false,
      header: "text-right overline header white--text font-weight-bold",
      column: "text-right overline column white--text",
      trades: [],
      asks: [],
      bids: [],
      progbar: {
        loading: true,
        value: 100
      },
      topdepth: [],
      fulldepth: []
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      bidask: "chart/bidask"
    })
  },
  watch: {
    toggleButton(value) {
      if (value == true) {
        this.progbar.value = this.fulldepth;
      } else {
        this.progbar.value = this.topdepth;
      }
    }
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
        this.loading_bidask = false;
      });
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
        this.loading_timetrades = false;
      });

    const params = {
      "symbol-id": this.symbolid,
      entry: 5
    };
    // Top Depth
    this.$api.chart.stocks.topdepth(params).then(response => {
      this.topdepth = parseFloat(response.data.bid_total_percent).toFixed(2);
      this.progbar.value = this.topdepth;
      this.progbar.loading = false;
    });
    // Full Depth
    this.$api.chart.stocks.fulldepth(params).then(response => {
      this.fulldepth = parseFloat(response.data.bid_total_percent).toFixed(2);
    });
  }
};
</script>

<style>
.header {
  background: #00121e !important;
}
.column {
  background: #00121e !important;
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
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
.icon__toggle {
  cursor: pointer;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
.card__timetrade {
  height: calc(100vh - 559px);
}
.toggleButton {
  transform: scale(0.675);
  position: absolute;
  top: -24px;
  left: 7px;
}
</style>
