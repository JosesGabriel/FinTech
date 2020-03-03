<template>
  <v-col ref="componentWrapper" class="pa-0" cols="12" sm="12" md="12">
    <v-card flat tile class="pr-5" :color="lightSwitch == 1 ? 'darkcard' : 'lightcard'">
      <v-card-title
        class="text-left justify-left px-0 pb-2 pt-5"
        :class="toggleSpace ? 'pl-3' : ''"
        :style="borderColor"
      >
        <span
          class="font-weight-bold subtitle-2"
          :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
        >EQUITY CURVE</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
          <v-icon small color="tertiary">mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-col class="pa-0 pt-5" cols="12" sm="12" md="12">
        <div id="chart">
          <client-only>
            <apexcharts
              ref="equityCurveChart"
              type="line"
              height="300"
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
      selection: "one_year",
      series: [
        {
          data: []
        }
      ],
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        annotations: {
          yaxis: [
            {
              y: 0,
              borderColor: "#03DAC5"
            }
          ]
        },
        chart: {
          height: 350,
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 1,
            left: 0,
            top: 2
          },
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: true,
              zoom: false,
              zoomin:
                '<img src="/icon/journal-icons/search-plus-solid.svg" width="20">',
              zoomout:
                '<img src="/icon/journal-icons/search-minus-solid.svg" width="20">',
              pan: false,
              reset:
                '<img src="/icon/journal-icons/home-solid.svg" width="20">',
              customIcons: []
            },
            autoSelected: "zoom"
          }
        },
        colors: ["#03DAC5"],
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
          },
          dashArray: 0
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
          type: "datetime",
          tickAmount: 6,
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
            show: true,
            position: "back",
            stroke: {
              color: "#002532",
              width: 1,
              dashArray: 0
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
              fontSize: "12px",
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
              let val = numeral(value).format("0.00a");
              return val;
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: "#17314B"
          },
          crosshairs: {
            show: false
          }
        },
        tooltip: {
          followCursor: false,
          y: {
            show: true,
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
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getEquityCurve();
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
     * getEquityCurve update chart series
     *
     * @return  {[array]} updating series with this array
     */
    getEquityCurve() {
      this.equityCurveArr = [];
      if (this.defaultPortfolioId != null) {
        const equitycurveparams = {
          fund: this.defaultPortfolioId
        };
        this.$api.journal.portfolio
          .equitycurve(equitycurveparams)
          .then(response => {
            if (typeof response.data != "undefined") {
              for (let [key, value] of Object.entries(response.data.curve)) {
                let arr = `${value}`;
                let name = `${key}`;

                const dataarr = new Date(name).getTime();
                const valuearr = parseFloat(arr);

                this.equityCurveArr.push([dataarr, valuearr]);
              }
              this.$refs.equityCurveChart.updateSeries([
                {
                  data: this.equityCurveArr
                }
              ]);
              this.chartOptions = {
                ...this.chartOptions,
                ...{
                  annotations: {
                    yaxis: [
                      { y: this.equityCurveArr[0][1], borderColor: "#03DAC5" }
                    ]
                  }
                }
              };
            }
          });
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
/* .apexcharts-xcrosshairs {
  stroke-dasharray: 0 !important;
  stroke: #002532 !important;
  fill: unset !important;
}
.apexcharts-ycrosshairs {
  stroke: unset !important;
  fill: unset !important;
}
.apexcharts-ycrosshairs-hidden,
.apexcharts-ycrosshairs,
.apexcharts-grid,
.apexcharts-xaxis-annotations,
.apexcharts-point-annotations {
  display: none !important;
} */
.apexcharts-reset-zoom-icon {
  margin: 0;
}
</style>
