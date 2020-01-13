<template>
  <v-container ref="componentWrapper" class="pa-0">
    <!-- Don't remove ref value. Used for sharing -->
    <v-col class="pa-0" cols="12">
      <v-card-title
        class="text-left justify-left ml-2 px-0 pb-2 pt-0"
        :style="borderColor"
      >
        <h6
          class="font-weight-regular subtitle-2"
          :style="{ color: fontColor }"
        >
          BUY VALUE
        </h6>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          :dark="lightSwitch == 0 ? false : true"
          @click="showShareModal()"
        >
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-col>
    <div id="chart" class="pt-3">
      <apexcharts
        ref="BuyValue"
        type="bar"
        height="300"
        :options="chartOptions"
        :series="series"
      />
    </div>
    <share-modal
      v-if="showShareForm"
      :imageid="shareLink"
      @closeModal="showShareForm = false"
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
  watch: {
    journalCharts: function() {
      this.getBuyValue();
    },
    defaultPortfolioId: function() {
      this.getBuyValue();
    },
    lightSwitch: function() {
      this.lightSwitcher();
    }
  },
  mounted() {
    this.getBuyValue();
    this.lightSwitcher();
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
        colors: ["#03DAC5", "#f44336"],
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
  methods: {
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    getBuyValue() {
      if (this.journalCharts != null) {
        const buyValue = this.journalCharts.data.buy_value;
        const valueArray = [
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
        if (buyValue.length != 0) {
          for (let i = 0; i < buyValue.length; i++) {
            buyValue[i] = parseFloat(buyValue[i]);
          }

          valueArray.unshift(...buyValue);
          // load data series on column chart
          this.$refs.BuyValue.updateSeries([
            {
              data: valueArray.slice(0, 16)
            }
          ]);
        }
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
