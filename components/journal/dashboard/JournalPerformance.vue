<template>
  <v-container class="pa-0" ref="componentWrapper">
    <v-card
      flat
      tile
      :dark="lightSwitch == 1"
      :class="toggleSpace ? 'px-3 pt-2' : ''"
      :color="lightSwitch == 1 ? 'darkcard' : 'lightcard'"
    >
      <!-- Don't remove ref value. Used for sharing -->
      <v-col class="pa-0" cols="12">
        <v-card-title class="text-left justify-left mr-3 px-0 pb-2 pt-0" :style="borderColor">
          <span
            class="font-weight-bold subtitle-2"
            :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
          >PERFORMANCE</span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
            <v-icon small color="tertiary">mdi-share-variant</v-icon>
          </v-btn>
        </v-card-title>
      </v-col>
      <div id="chart" class="pt-3">
        <client-only>
          <apexcharts
            ref="Performance"
            type="bar"
            height="300"
            width="95%"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </div>
      <share-modal
        v-if="showShareForm"
        :imageid="shareLink"
        @closeModal="showShareForm = false, toggleSpace = false"
      />
    </v-card>
  </v-container>
</template>

<script>
import shareModal from "~/components/modals/Share";

import { mapGetters } from "vuex";
let numeral = require("numeral");

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
     * returns attribute border bottom
     *
     * @return  {string}  returns string
     */
    borderColor() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #535358"
        : "border-bottom: 1px solid #172431";
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      toggleSpace: false,
      performanceArray: [],
      series: [
        {
          name: "Loss",
          data: [0, 0, 0, 0, 0]
        }
      ],
      chartOptions: {
        colors: ["#03DAC5", "#F44336"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "35",
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
                  from: -10000000000000000000000000,
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
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
        title: {
          text: "By day of the week",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: true,
          style: {
            fontSize: "14px",
            fontFamily: "'Nunito' !important",
            color: "#b6b6b6"
          }
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
      this.getPerformance();
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
     * getPerformance will work on ploting/updating chart using refs
     *
     * @return  {array}  data to update chart
     */
    getPerformance() {
      if (this.journalCharts != null) {
        const objPerformance = this.journalCharts.data.performance;
        const performanceArray = [];
        let lastArray = [null, null, null, null, null];

        Object.keys(objPerformance).forEach(function(key) {
          performanceArray.push({ value: objPerformance[key], name: key });
        });

        for (let i = 0; i < performanceArray.length; i++) {
          if (performanceArray[i].value == 0) {
            performanceArray[i].value = null;
          }
          lastArray.unshift(performanceArray[i].value);
        }
        this.$refs.Performance.updateSeries([
          {
            data: lastArray.slice(0, 5).reverse()
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
