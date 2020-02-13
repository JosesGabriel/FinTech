<template>
  <v-row ref="componentWrapper" no-gutters>
    <!-- Don't remove ref value. Used for sharing -->
    <v-col cols="12">
      <v-card-title class="text-left justify-left px-0 pb-2 pt-0" :style="borderColor">
        <h6
          class="font-weight-bold subtitle-2"
          :style="{ color: this.lightSwitch == 0 ? '#000000' : '#FFFFFF' }"
        >EXPENSE REPORT</h6>
        <v-spacer></v-spacer>
        <v-btn icon small @click="showShareModal()">
          <v-icon small color="tertiary">mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-col>
    <v-col class="pa-0 pt-3" cols="3" sm="3" md="3">
      <v-card-title class="text-left justify-left pa-0">
        <h6
          class="font-weight-regular caption text-capitalize"
          :style="{ color: fontColor }"
        >Trading Result (PHP)</h6>
      </v-card-title>
      <v-simple-table id="liveportfolio-table" :dense="true" :dark="lightSwitch == true">
        <template v-slot:default>
          <tbody>
            <tr id="table_tr_snap-cont">
              <td class="item_position-prop caption px-1 py-2">Commisions</td>
              <td
                class="item_position-prop caption text-right px-1 py-1"
              >{{ comm | numeral("0,0.00") }}</td>
            </tr>
            <tr id="table_tr_snap-cont">
              <td class="item_position-prop caption px-1 py-2">Value Added Tax</td>
              <td
                class="item_position-prop caption text-right px-1 py-1"
              >{{ vadd | numeral("0,0.00") }}</td>
            </tr>
            <tr id="table_tr_snap-cont">
              <td class="item_position-prop caption px-1 py-2">Transfer Fee</td>
              <td
                class="item_position-prop caption text-right px-1 py-1"
              >{{ tfee | numeral("0,0.00") }}</td>
            </tr>
            <tr id="table_tr_snap-cont">
              <td class="item_position-prop caption px-1 py-2">SCCP</td>
              <td
                class="item_position-prop caption text-right px-1 py-1"
              >{{ sccp | numeral("0,0.00") }}</td>
            </tr>
            <tr id="table_tr_snap-cont">
              <td class="item_position-prop caption px-1 py-2">Sales Tax</td>
              <td
                class="item_position-prop caption text-right px-1 py-1"
              >{{ stax | numeral("0,0.00") }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col class="pa-0 pl-5" cols="9" sm="9" md="9">
      <div id="chart">
        <client-only>
          <apexcharts
            ref="ExpenseReportTrades"
            height="230"
            type="line"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </div>
    </v-col>
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
  </v-row>
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
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      expenseReportArray: [],
      objExpenseReportTrades: [],
      comm: "0.00",
      vadd: "0.00",
      tfee: "0.00",
      sccp: "0.00",
      stax: "0.00",

      series: [
        {
          name: "Expenses",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chartOptions: {
        chart: {
          height: 230,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 1,
            left: 0,
            top: 2
          }
        },
        colors: ["#F44336"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2,
          curve: "smooth",
          shadow: {
            enabled: false,
            color: "#bbb",
            top: 3,
            left: 2,
            blur: 5,
            opacity: 1
          }
        },
        grid: {
          show: true,
          borderColor: "#002633",
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              colors: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-xaxis-label"
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          tooltip: {
            enabled: false,
            formatter: undefined,
            offsetX: 0,
            style: {
              fontSize: 10,
              fontFamily: "'Nunito' !important"
            },
            theme: false
          }
        },
        yaxis: {
          labels: {
            show: true,
            align: "right",
            style: {
              color: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-yaxis-label"
            },
            formatter: function(value) {
              let val = (value / 1).toFixed(2).replace(".", ".");
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: "#17314B"
          }
        },
        tooltip: {
          followCursor: false,
          y: {
            show: false,
            formatter: function(value) {
              let val = (value / 1).toFixed(2).replace(".", ".");
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
          x: {
            show: false
          },
          marker: {
            show: false
          },
          onDatasetHover: {
            highlightDataSeries: false
          },
          theme: false,
          style: {
            fontFamily: "'Nunito' !important"
          },
          items: {
            display: "flex"
          },
          fixed: {
            position: "topRight",
            offsetX: 20,
            offsetY: -10
          }
        }
      }
    };
  },
  mounted() {
    this.lightSwitcher();
  },
  watch: {
    /**
     * Watch journalCharts vuex if data changed execute function inside
     *
     * @return  {array}  getting buy value data from journalCharts vuex
     */
    journalCharts() {
      this.getExpenseReport();
    },
    /**
     * Watch lightSwitch if number changed light=0 dark=1
     *
     * @return  {number}  current number 0/1 for theme mode
     */
    lightSwitch() {
      this.lightSwitcher();
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
     * getExpenseReport update chart series
     *
     * @return  {[array]} updating series with this array
     */
    getExpenseReport() {
      this.objExpenseReportTrades = [];
      if (this.journalCharts != null) {
        const objExpenseReport = this.journalCharts.data.expense_report;
        this.objExpenseReportTrades = this.journalCharts.data.expense_report_trades;

        const expenseReportArray = [];
        Object.keys(objExpenseReport).forEach(function(key) {
          expenseReportArray.push({ value: objExpenseReport[key], name: key });
        });
        this.expenseReportArray = expenseReportArray;

        for (let i = 0; i < this.expenseReportArray.length; i++) {
          if (this.expenseReportArray[i].name == "commission") {
            this.comm = this.expenseReportArray[i].value;
          } else if (this.expenseReportArray[i].name == "tax") {
            this.vadd = this.expenseReportArray[i].value;
          } else if (this.expenseReportArray[i].name == "transfer_fee") {
            this.tfee = this.expenseReportArray[i].value;
          } else if (this.expenseReportArray[i].name == "sccp") {
            this.sccp = this.expenseReportArray[i].value;
          } else if (this.expenseReportArray[i].name == "sell_fee") {
            this.stax = this.expenseReportArray[i].value;
          }
        }

        this.$refs.ExpenseReportTrades.updateSeries([
          {
            data: this.objExpenseReportTrades.slice(0, 10)
          }
        ]);
      }
      this.componentKeys++;
    },
    /**
     * Light mode and dark on chart
     *
     * @return  {object}  iterate to update chart theme mode
     */
    lightSwitcher() {
      if (this.lightSwitch == 0) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            theme: {
              mode: "light"
            }
          }
        };
      } else if (this.lightSwitch == 1) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            theme: {
              mode: "dark"
            }
          }
        };
      }
    }
  }
};
</script>
<style>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
</style>
