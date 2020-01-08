<template>
  <v-col class="pa-0" cols="7" sm="7" md="7">
    <v-card-title class="text-left justify-left px-0 pb-2 pt-0" :style="borderColor">
      <h6 class="font-weight-regular subtitle-2" :style="{ color: fontColor }">MONTHLY PERFORMANCE</h6>
      <v-spacer></v-spacer>
      <v-btn icon small @click.stop="showScheduleForm=true">
        <img src="/icon/journal-icons/share-icon.svg" width="15" />
      </v-btn>
    </v-card-title>
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <div id="chart">
        <apexcharts
          type="bar"
          class="monthlyperf_chart"
          height="300"
          width="90%"
          ref="monthlyPerformance"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </v-col>
    <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/share";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal
  },
  data() {
    return {
      showScheduleForm: false,
      monthlyPerformance: null,
      series: [
        {
          name: "Loss",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                  from: -100,
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
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
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
  mounted() {
    this.getMPerformance();
    this.lightSwitcher();
  },
  methods: {
    getMPerformance() {
      if (this.journalCharts != null) {
        this.monthlyPerformance = this.journalCharts.data;
        let monthlyPerformanceArr = this.monthlyPerformance.monthly_performance;
        this.$refs.monthlyPerformance.updateSeries([
          {
            data: monthlyPerformanceArr
          }
        ]);
      }
      this.componentKeys++;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  },
  watch: {
    journalCharts: function() {
      this.getMPerformance();
    },
    defaultPortfolioId: function() {
      this.getMPerformance();
    },
    lightSwitch: function() {
      this.lightSwitcher();
    }
  }
};
</script>