<template>
  <v-content
    :class="[
      { 'white--text': lightSwitch == 1 },
      { 'black--text': lightSwitch == 0 }
    ]"
  >
    <div id="top">
      <v-content class="pr-3 text-right">
        <v-icon
          id="icon__share"
          small
          :class="[
            { 'white--text': lightSwitch == 1 },
            { 'black--text': lightSwitch == 0 }
          ]"
          @click="shareActivity"
          >mdi-share-variant</v-icon
        >
      </v-content>
      <!-- top -->
      <v-content>
        <v-row class="ml-3 mr-1 mt-1 mb-1">
          <v-col class="mr-12 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Position
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                1,000.00
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-12 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Ave. Price
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>16.04
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-12 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Total Cost
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>16,047.20
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-12 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Market Value
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>200,000.00
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-12 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Profit
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                <span class="overline">PHP</span>661.90
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Perf. (%)
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                4.12
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-content>
    </div>

    <v-content class="mx-1">
      <span class="subtitle-2 ml-2">Trade History</span>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        class="data_table-container"
        :dark="lightSwitch == 1"
        dense
        fixed-header
        calculate-widths
        disable-pagination
        hide-default-footer
        :style="{ background: cardbackground }"
        :height="`${tablesize}`"
      >
        <template v-slot:item="props">
          <tr class="tr_custom">
            <td class="text-left pl-2" style="width:10%">
              <span>{{ props.item.date }}</span>
            </td>
            <td class="text-right" style="width:10%">
              <span>{{ props.item.volume }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ props.item.aveprice }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ props.item.buyvalue }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ props.item.sellprice }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ props.item.sellvalue }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span
                :class="[
                  { increase: props.item.changestatus == 1 },
                  { decrease: props.item.changestatus == 2 },
                  { neutral: props.item.changestatus == 0 }
                ]"
                >{{ props.item.profitloss }}</span
              >
            </td>
            <td class="text-right pr-2" style="width:13%">
              <span
                :class="[
                  { increase: props.item.changestatus == 1 },
                  { decrease: props.item.changestatus == 2 },
                  { neutral: props.item.changestatus == 0 }
                ]"
                >{{ props.item.percentage }}</span
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-content>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      min: "105px",
      max: "calc(100vh - 295px)",
      headers: [
        {
          text: "Date",
          value: "date",
          class: "text-left pl-2 caption font-weight-bold"
        },
        {
          text: "Volume",
          value: "volume",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Ave. Price",
          value: "aveprice",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Buy Value",
          value: "buyvalue",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Sell Price",
          value: "sellprice",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Sell Value",
          value: "sellvalue",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Profit/Loss",
          value: "profitloss",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "%",
          value: "percentage",
          class: "text-right caption font-weight-bold pr-2"
        }
      ],
      items: [
        {
          date: "2019-10-22",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-21",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-20",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-19",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-18",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-17",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-16",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-15",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-22",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-21",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-20",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-19",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-18",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-17",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-16",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-15",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-22",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-21",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-20",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-19",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-18",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-17",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-16",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-15",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-22",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-21",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-20",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-19",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-18",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-17",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-16",
          volume: "8,098",
          aveprice: "13.41",
          buyvalue: "108,594.18",
          sellprice: "2.4",
          sellvalue: "19,234.90",
          profitloss: "89,158.89",
          percentage: "82.%",
          changestatus: 1
        },
        {
          date: "2019-10-15",
          volume: "9,590",
          aveprice: "7.69",
          buyvalue: "73,747.10",
          sellprice: "14.11",
          sellvalue: "135,314.90",
          profitloss: "-61,597.80",
          percentage: "-83.49",
          changestatus: 2
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        },
        {
          date: "2019-10-14",
          volume: "6,187",
          aveprice: "7.06",
          buyvalue: "43,680.22",
          sellprice: "5.57",
          sellvalue: "34,461.59",
          profitloss: "9,218.63",
          percentage: "21.10",
          changestatus: 1
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      fullscreen: "chart/getTableFullscreen",
      ticker: "chart/getTicker",
      lightSwitch: "global/getLightSwitch",
      stock: "chart/stock",
      symbolid: "chart/symbolid",
      index: "chart/index",
      market_code: "chart/market_code"
    }),
    tablesize: function() {
      return this.fullscreen ? this.max : this.min;
    },
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    symbolid(value) {
      // console.log("symbols");
      // console.log(value);
    },
    fullscreen(value) {
      // console.log("fullscreen");
      // console.log(value);
    },
    ticker(value) {
      // console.log("ticker");
      // console.log(value);
      if (value) {
        this.max = "calc(100vh - 295px)";
      } else {
        this.max = "calc(100vh - 245px)";
      }
    }
  },
  methods: {
    shareActivity: function() {
      console.log("share");
    }
  },
  mounted() {
    // console.log(this.symbolid);

    this.$api.journal.portfolio
      .open({
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        fund: "real"
      })
      .then(response => {
        //  console.log("open real funds");
        //  console.log(response);
      });

    this.$api.journal.portfolio
      .tradelogs({
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        fund: "75396425114062848",
        stock: "29235363423715328"
      })
      .then(response => {
        //  console.log("tradelogs real funds");
        //  console.log(response);
      });
  }
};
</script>

<style scoped>
#top {
  /* background: red; */
  height: 120px;
}
#icon__share {
  cursor: pointer;
}
#div__share {
  position: absolute;
  right: 8px;
}
.tr_custom {
  line-height: 1.7rem !important;
  cursor: pointer;
}
.positive {
  color: #03dac5;
}
.negative {
  color: #fe4949;
}
.vt_realized {
  /* background: #0c1a2b73; */
  /* border: #b6b6b6 1px solid; */
  border: rgb(182, 182, 182, 0.2) 1px solid;
}
/* .vt_realized:hover {
  background: #0c1a2b;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
} */
.neutral {
  color: #dddddd !important;
}
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #f44336 !important;
}
</style>
