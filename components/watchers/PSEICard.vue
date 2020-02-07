<template>
  <v-card
    class="mb-1"
    :color="lightSwitch == 0 ? 'lightcard' : '#00121e'"
    :dark="lightSwitch == 0 ? false : true"
    shaped
    flat
    max-height="245"
  >
    <v-card-title class="body-2 font-weight-bold text-left pa-0"
      >PSEI</v-card-title
    >
    <span class="psei__price caption"
      >{{ data.last }} <br />
      <span :class="data.changepercentage > 0 ? 'success--text' : 'error--text'"
        >{{ data.change ? data.change : "" }} ({{
          data.changepercentage ? data.changepercentage.toFixed(2) : ""
        }}%)</span
      ></span
    ><v-divider />
    <v-divider />
    <div class="container pa-0">
      <apexcharts
        ref="closePriceChart"
        :options="chartOptions"
        :series="series"
        type="line"
        height="150"
      />
    </div>
    <v-divider />
    <span class="overline no-wrap-text">10D 9D 8D 7D 6D 5D 4D 3D 2D 1D</span>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    data: {}
  },
  data() {
    return {
      series: [
        {
          name: "series1",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 190,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: false
          }
        },
        colors: ["#FFF"],
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
          show: false,
          borderColor: "#17314B",
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        xaxis: {
          categories: ["1"],
          labels: {
            show: false,
            style: {
              colors: "#ffffff",
              fontSize: "12px",
              fontFamily: "Karla",
              cssClass: "apexcharts-xaxis-label"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: false,
            formatter: undefined,
            offsetX: 0,
            style: {
              fontSize: 10,
              fontFamily: "Karla"
            },
            theme: false
          },
          crosshairs: {
            show: true,
            width: 1,
            position: "back",
            opacity: 0.9,
            stroke: {
              color: "#152d4a",
              width: 2,
              dashArray: 0
            }
          }
        },
        yaxis: {
          labels: {
            show: false
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
            formatter: function(val) {
              return val;
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
            fontFamily: "Karla"
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
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    /**
     * Watches changes on emitted PSEI data.
     * If change is less than 0 chart color is red
     * if greater than 0, green
     * if not use secondary color
     *
     * @return
     */
    data() {
      if (this.data.change > 0) {
        this.$refs.closePriceChart.updateOptions({
          colors: ["#00FFC3"]
        });
      } else if (this.data.change < 0) {
        this.$refs.closePriceChart.updateOptions({
          colors: ["#f44336"]
        });
      } else {
        this.$refs.closePriceChart.updateOptions({
          colors: ["#808080"]
        });
      }
    }
  },
  mounted() {
    this.watchCardMount();
  },
  methods: {
    /**
     * Get PSEI 10 day data points
     *
     * @return
     */
    watchCardMount() {
      //Get PSEI 10 day data points
      const params = {
        "symbol-id": "29235364749115392",
        resolution: "1D",
        limit: "10"
      };
      this.$api.chart.charts.latest(params).then(
        function(result) {
          this.$refs.closePriceChart.updateSeries([
            {
              data: result.data.c.reverse()
            }
          ]);
        }.bind(this)
      );
    }
  }
};
</script>

<style>
.no-wrap-text {
  white-space: nowrap;
}
.psei__price {
  position: absolute;
  right: 0;
  text-align: right;
}
.watchCard--unfocused {
  opacity: 0.5;
}
.watchlistCard__bar--green {
  background-color: #03dac5;
}
.watchlistCard__bar--red {
  background-color: #f44336;
}
.watchlistCard__text--gray {
  color: gray;
}
.watchlistCard__items {
  margin-bottom: 10px;
  display: block;
}
.watchlistCard__items,
.watchlistCard__percentbar {
  position: relative;
  bottom: 40px;
}
.watchlistCard__itemsLabel {
  position: relative;
  bottom: 5px;
}
.watchlistCard__bar {
  float: left;
  color: #fff;
  padding: 2px 0;
  text-align: center;
  line-height: 0;
  border-radius: 5px 0 0 5px;
}
.apexcharts-tooltip {
  box-shadow: none;
}
</style>
