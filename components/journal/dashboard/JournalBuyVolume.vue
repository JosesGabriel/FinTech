<template>
  <v-container ref="componentWrapper" class="pa-0">
    <!-- Don't remove ref value. Used for sharing -->
    <v-col class="pa-0" cols="12">
      <v-card-title class="text-left justify-left mr-3 px-0 pb-2 pt-0" :style="borderColor">
        <span class="font-weight-bold subtitle-2" :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }">BUY VOLUME</span>
        <v-spacer></v-spacer>
        <v-btn icon small :dark="lightSwitch == 0 ? false : true" @click="showShareModal()">
          <v-icon small color="tertiary">mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-col>
    <div id="chart" class="pt-3">
      <client-only>
        <apexcharts
          ref="BuyVolume"
          type="bar"
          height="300"
          :options="chartOptions"
          :series="series"
        />
      </client-only>
    </div>
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
  </v-container>
</template>

<script>
import shareModal from "~/components/modals/Share";

import { mapGetters } from "vuex";
let numeral = require("numeral")

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
     * changes the border color if you are in a dark or light mode
     *
     * @return  {string}   returns border attributes
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
            columnWidth: "60%",
            endingShape: "rounded",
            dropShadow: {
              enabled: true,
              left: 2,
              top: 2,
              opacity: 1
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
            "1",
            "",
            "",
            "4",
            "",
            "",
            "",
            "8",
            "",
            "",
            "",
            "12",
            "",
            "",
            "",
            "16"
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
          }
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1
        },
        title: {
          text: "Last 16 Trades",
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
  watch: {
    /**
     * Watch journalCharts vuex if data changed execute function inside
     *
     * @return  {array}  getting buy value data from journalCharts vuex
     */
    journalCharts() {
      this.getBuyVolume();
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
  mounted() {
    this.lightSwitcher();
  },
  methods: {
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  [return description]
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
     * Get data from array the update series chart
     *
     * @return  {array}  series of numbers with null values
     */
    getBuyVolume() {
      let volumeArray = [
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
        null,
        null,
        null,
        null,
        null
      ];
      if (this.journalCharts != null) {
        const buyVolumeArray = this.journalCharts.data.buy_volume;

        if (buyVolumeArray.length != 0) {
          for (let i = 0; i < buyVolumeArray.length; i++) {
            buyVolumeArray[i] = parseFloat(buyVolumeArray[i]);
          }
        }
        volumeArray.unshift(...buyVolumeArray);
        // load data series on column chart
        this.$refs.BuyVolume.updateSeries([
          {
            data: volumeArray.slice(0, 16)
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
