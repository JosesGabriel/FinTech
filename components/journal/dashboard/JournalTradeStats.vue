<template>
  <v-col ref="componentWrapper" class="pa-0 pl-10" cols="5" sm="5" md="5">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card-title class="text-left justify-left px-0 pb-2 pt-0" :style="borderColor">
      <span
        class="font-weight-bold subtitle-2"
        :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
      >TRADE STATISTICS</span>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon small color="tertiary">mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-row no-gutters>
      <v-col class="pa-0 pt-5" cols="12">
        <div class="small">
          <client-only>
            <apexcharts type="donut" height="245" :options="chartOptions" :series="series" />
          </client-only>
        </div>
      </v-col>
      <v-col class="pa-0" cols="12">
        <v-simple-table id="liveportfolio-table" :dense="true" :dark="lightSwitch == true">
          <template v-slot:default>
            <tbody>
              <tr class="caption">
                <td class="px-1 py-1">
                  <v-icon class="pr-1 caption" color="success">mdi-circle</v-icon>Win
                </td>
                <td class="px-1 py-1 pr-8">{{ win }}</td>

                <td class="px-1 py-1 pl-8">
                  <v-icon class="pr-1 caption" color="#F44336">mdi-circle</v-icon>Loss
                </td>
                <td class="px-1 py-1">{{ loss }}</td>
              </tr>
              <tr class="caption">
                <td class="pa-1 font-weight-bold">Total Trades</td>
                <td class="pa-1 pr-8">{{ winlossresult }}</td>

                <td class="pa-1 font-weight-bold pl-8">Win Rate</td>
                <td class="pa-1">{{ winrateresult }}%</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
  </v-col>
</template>

<script>
import shareModal from "~/components/modals/Share";

import { mapGetters } from "vuex";

export default {
  components: {
    shareModal
  },
  computed: {
    ...mapGetters({
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      journalCharts: "journal/getJournalCharts",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns attribute border bottom
     *
     * @return  {string}  returns string
     */
    borderColor() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #dadada"
        : "border-bottom: 1px solid #172431";
    },
    /**
     * returns computed value once win or loss changes value
     *
     * @return  {number}  returns result number
     */
    winlossresult() {
      return (this.result = parseInt(this.win) + parseInt(this.loss));
    },
    /**
     * returns computed value once win or loss changes value
     *
     * @return  {number}  returns percentage number
     */
    winrateresult() {
      let NaNcon = ((this.win * 100) / this.result).toFixed(0);
      if (NaNcon == "NaN") {
        return 0;
      } else {
        return ((this.win * 100) / this.result).toFixed(0);
      }
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      tradeStaticsArr: null,
      journalchart: [],
      win: 0,
      loss: 0,
      result: 0,
      series: [],
      chartOptions: {
        chart: {
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 2,
            left: 3,
            top: 3
          }
        },
        labels: ["Win", "Loss"],
        colors: ["#03DAC5", "#F44336"],
        legend: {
          show: false
        },
        stroke: {
          show: false,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        value: {
          show: false
        },
        responsive: [
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "left"
              }
            }
          }
        ],
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: "55%"
            }
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          colors: "#03DAC5",
          theme: true,
          style: {
            fontSize: "12px",
            fontFamily: "'Karla', sans-serif"
          },
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0
          }
        },
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 20,
          color: "#fff",
          opacity: 0.9
        }
      }
    };
  },
  watch: {
    /**
     * Watch journalCharts vuex if data changed execute function inside
     *
     * @return  {array}  getting buy value data from journalCharts vuex
     */
    journalCharts() {
      this.getTradeStats();
    },
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getTradeStats();
    },
    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getTradeStats();
    }
  },
  methods: {
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * getTradeStats will work on ploting/updating chart series
     *
     * @return  {array}  data to update chart
     */
    getTradeStats() {
      this.journalchart = [];
      if (this.journalCharts != null) {
        this.tradeStaticsArr = this.journalCharts.data;
        if (
          this.tradeStaticsArr != undefined ||
          this.tradeStaticsArr.trade_statistics != undefined
        ) {
          for (let [key, value] of Object.entries(
            this.tradeStaticsArr.trade_statistics
          ).slice(0, 2)) {
            let arr = `${value}`;
            this.journalchart.push(parseFloat(arr));
          }

          this.win = this.journalchart[0];
          this.loss = this.journalchart[1];
          this.series = [...this.journalchart];
        }
      }
      this.componentKeys++;
    }
  }
};
</script>

<style scoped>
.ts_chart-cont {
  width: 100%;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6;
}
</style>
