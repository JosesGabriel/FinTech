<template>
  <v-col ref="componentWrapper" class="pa-0" cols="7" sm="7" md="7">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card
      flat
      tile
      :class="toggleSpace ? 'pa-5' : ''"
      :color="lightSwitch == 1 ? 'darkcard' : 'lightcard'"
    >
      <v-card-title class="text-left justify-left px-0 pb-2 pt-0" :style="borderColor">
        <span
          class="font-weight-bold subtitle-2"
          :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
        >MONTHLY PERFORMANCE</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
          <v-icon small color="tertiary">mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-col class="pa-0" cols="12" sm="12" md="12">
        <div id="chart">
          <client-only>
            <apexcharts
              ref="monthlyPerformance"
              type="bar"
              class="monthlyperf_chart"
              height="300"
              width="95%"
              :options="chartOptions"
              :series="series"
            />
          </client-only>
        </div>
      </v-col>
      <share-modal
        v-if="showShareForm"
        :imageid="shareLink"
        @closeModal="showShareForm = false, toggleSpace = false"
      />
    </v-card>
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/Share";

import { mapActions, mapGetters } from "vuex";
let numeral = require("numeral");

export default {
  components: {
    shareModal
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
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
      toggleSpace: false,
      monthlyPerformance: null,
      series: [
        {
          name: "Loss",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        }
      ],
      chartOptions: {
        colors: ["#03DAC5", "#F44336"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            dropShadow: {
              enabled: true,
              left: 2,
              top: 2,
              opacity: 1
            },
            colors: {
              ranges: [
                {
                  from: -1000000000000000000000000000000000000000000000,
                  to: 0,
                  color: "#F44336"
                }
              ]
            }
          }
        },
        chart: {
          toolbar: {
            show: false,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true
            },
            autoSelected: "zoom"
          },
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 2,
            left: 3,
            top: 3
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        grid: {
          show: true,
          borderColor: "transparent"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          labels: {
            show: true,
            style: {
              colors: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-xaxis-label"
            }
          },
          crosshairs: {
            show: false
          },
          lines: {
            show: false
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
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
              let val = numeral(value).format("0.00a");
              return val;
            }
          },
          lines: {
            show: false
          },
          crosshairs: {
            show: false
          }
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1
        },
        tooltip: {
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
      this.getMPerformance();
    },
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getMPerformance();
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
      this.toggleSpace = true;
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * getMPerformance will work on ploting/updating chart series
     *
     * @return  {array}  data to update chart
     */
    getMPerformance() {
      if (this.journalCharts != null) {
        this.monthlyPerformance = this.journalCharts.data;
        let monthlyPerformanceArr = this.monthlyPerformance.monthly_performance;
        for (let i = 0; i < monthlyPerformanceArr.length; i++) {
          if (monthlyPerformanceArr[i] == 0) {
            monthlyPerformanceArr[i] = null;
          }
        }
        this.$refs.monthlyPerformance.updateSeries([
          {
            data: monthlyPerformanceArr
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
