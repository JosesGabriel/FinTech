<template>
  <v-container class="pa-0">
    <v-col class="pa-0" cols="12">
      <v-card-title
        class="text-left justify-left mr-3 px-0 pb-2 pt-0"
        :style="borderColor"
      >
        <h6
          class="font-weight-regular subtitle-2"
          :style="{ color: fontColor }"
        >
          PERFORMANCE
        </h6>
        <v-spacer></v-spacer>
        <v-btn icon small @click.stop="showScheduleForm = true">
          <img src="/icon/journal-icons/share-icon.svg" width="15" />
        </v-btn>
      </v-card-title>
    </v-col>
    <div id="chart" class="pt-3">
      <apexcharts
        ref="Performance"
        type="bar"
        height="300"
        :options="chartOptions"
        :series="series"
      />
    </div>
    <share-modal
      :visible="showScheduleForm"
      @close="showScheduleForm = false"
    />
  </v-container>
</template>

<script>
import shareModal from "~/components/modals/share";

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
    fontColor: function() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    borderColor: function() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #b6b6b6"
        : "border-bottom: 1px solid #535358";
    }
  },
  data() {
    return {
      showScheduleForm: false,
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
              let val = (value / 1).toFixed(2).replace(".", ".");
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  watch: {
    journalCharts: function() {
      this.getPerformance();
    },
    defaultPortfolioId: function() {
      this.getPerformance();
    },
    lightSwitch: function() {
      this.lightSwitcher();
    }
  },
  mounted() {
    this.getPerformance();
    this.lightSwitcher();
  },
  methods: {
    getPerformance() {
      if (this.journalCharts != null) {
        const objPerformance = this.journalCharts.data.performance;
        const performanceArray = [];
        const lastArray = [0, 0, 0, 0, 0];

        Object.keys(objPerformance).forEach(function(key) {
          performanceArray.push({ value: objPerformance[key], name: key });
        });

        for (let i = 0; i < performanceArray.length; i++) {
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
