<template>
  <v-content>
    <div id="top">
      <!-- top -->
      <v-content>
        <v-row class="ml-1 mt-1 mb-3">
          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Position
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                1,000.00
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Ave. Price
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>16.04
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Total Cost
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>16,047.20
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Market Value
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                <span class="overline">PHP</span>200,000.00
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
            <v-row class="mt-1 pl-3 caption">
              Profit
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                <span class="overline">PHP</span>661.90
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized" style="width:20%;">
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

      <!-- mid -->
      <v-content style="border-bottom:1px solid #0C1A2B">
        <span class="subtitle-1 ml-3">Trade History</span>
      </v-content>
      <v-content class="my-1">
        <v-btn
          small
          color="#00121e"
          class="caption white--text font-weight-bold text-capitalize increase"
          >Filter</v-btn
        >

        <v-btn
          small
          color="#00121e"
          class="caption ml-12 white--text font-weight-bold text-capitalize"
          >Day</v-btn
        >

        <v-btn
          small
          color="#00121e"
          class="caption white--text font-weight-bold text-capitalize"
          >Week</v-btn
        >

        <v-btn
          small
          color="#00121e"
          class="caption white--text font-weight-bold text-capitalize"
          >Month</v-btn
        >

        <v-btn
          small
          color="#00121e"
          class="caption white--text font-weight-bold text-capitalize"
          >Year</v-btn
        >
        <v-btn
          small
          color="#00121e"
          class="caption white--text font-weight-bold text-capitalize increase"
          >Custom</v-btn
        >
      </v-content>
    </div>
    <v-content class="mx-1">
      <v-data-table
        :headers="headers"
        :items="items"
        class="data_table-container custom_table"
        dark
        dense
        fixed-header
        calculate-widths
        disable-pagination
        hide-default-footer
        style="background:#00121e"
        :height="`${tablesize}`"
      >
        <template v-slot:item="props">
          <tr class="tr_custom">
            <td class="column text-left pl-2" style="width:10%">
              <span>{{ props.item.date }}</span>
            </td>
            <td class="column text-right" style="width:10%">
              <span>{{ props.item.volume }}</span>
            </td>
            <td class="column text-right" style="width:13%">
              <span>{{ props.item.aveprice }}</span>
            </td>
            <td class="column text-right" style="width:13%">
              <span>{{ props.item.buyvalue }}</span>
            </td>
            <td class="column text-right" style="width:13%">
              <span>{{ props.item.sellprice }}</span>
            </td>
            <td class="column text-right" style="width:13%">
              <span>{{ props.item.sellvalue }}</span>
            </td>
            <td class="column text-right" style="width:13%">
              <span
                :class="[
                  { increase: props.item.changestatus == 1 },
                  { decrease: props.item.changestatus == 2 },
                  { neutral: props.item.changestatus == 0 }
                ]"
                >{{ props.item.profitloss }}</span
              >
            </td>
            <td class="column text-right pr-2" style="width:13%">
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
      min: "100px",
      max: "calc(100vh - 300px)",
      headers: [
        {
          text: "Date",
          value: "date",
          class: "white--text text-left pl-2 caption font-weight-bold header"
        },
        {
          text: "Volume",
          value: "volume",
          class: "white--text text-right caption font-weight-bold header"
        },
        {
          text: "Ave. Price",
          value: "aveprice",
          class: "white--text text-right caption font-weight-bold header"
        },
        {
          text: "Buy Value",
          value: "buyvalue",
          class: "white--text text-right caption font-weight-bold header"
        },
        {
          text: "Sell Price",
          value: "sellprice",
          class: "white--text text-right caption font-weight-bold header"
        },
        {
          text: "Sell Value",
          value: "sellvalue",
          class: "white--text text-right caption font-weight-bold header"
        },
        {
          text: "Profit/Loss",
          value: "profitloss",
          class: "white--text text-right caption font-weight-bold header"
        },
        {
          text: "%",
          value: "percentage",
          class: "white--text text-right caption font-weight-bold header pr-2"
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
      ticker: "chart/getTicker"
    }),
    tablesize: function() {
      return this.fullscreen ? this.max : this.min;
    }
  },
  watch: {
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
  }
};
</script>

<style scoped>
#top {
  /* background: red; */
  height: 150px;
}
.tr_custom {
  line-height: 2.3rem !important;
  cursor: pointer;
}
.column {
  /* background: #00121e !important; */
  font-size: 12px !important;
  color: #bbb;
}
.theme--dark.v-label {
  color: black;
  font-size: 14px;
  font-weight: 600;
}
.v-select__selection--comma {
  color: black;
  font-size: 14px;
  font-weight: 600;
}
.select_portfolio .v-select__slot .v-label,
.select_portfolio .v-select__slot .v-icon {
  color: black !important;
  font-weight: 600;
}

.theme--light.v-list {
  background: #00121e;
  border: 1px solid #00ffc3;
}

.v-slide-group__content.v-tabs-bar__content:before {
  content: "";
  width: 100%;
  position: absolute;
  bottom: -3px;
  z-index: 1;
  height: 4px;
  background: #000;
}
.positive {
  color: #00ffc3;
}

.negative {
  color: #fe4949;
}
.theme--dark.v-icon {
  color: #0e0e0e;
}
.selector
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > .v-select__selections {
  color: black;
}
.v-text-field.v-text-field--solo .v-label {
  color: black;
}
.vt_realized {
  background: #0c1a2b73;
}

.vt_realized:hover {
  background: #0c1a2b;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.select_portfolio .v-input__slot {
  margin: 0;
  border-radius: unset;
}
.selector .v-input__control {
  min-height: auto !important;
}
.neutral {
  color: #dddddd !important;
}
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #ff4848 !important;
}
</style>
