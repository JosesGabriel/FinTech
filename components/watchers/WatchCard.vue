<template>
  <v-card
    class="mb-1"
    color="#142b46"
    dark
    outlined
    shaped
    max-height="245"
    :loading="watchCardLoading"
  >
    <apexcharts
      ref="closePriceChart"
      type="line"
      height="150"
      :options="chartOptions"
      :series="series"
    />
    <v-card-actions class="watchlistCard__items caption">
      <div>
        <strong>{{ stockExchange }}: {{ stockSymbol }}</strong>
        <span class="float-right">
          ₱{{ stockCurrentPrice }} |
          <span
            :class="
              stockCurrentChange > 0
                ? 'watchlistCard__text--green'
                : stockCurrentChange < 0
                ? 'watchlistCard__text--red'
                : 'watchlistCard__text--yellow'
            "
          >
            {{ stockCurrentChange }}%</span
          >
        </span>
      </div>
      <div>
        <span>Entry Price: </span>
        <span class="float-right"
          >₱{{ userWatchedStocks[data].entry_price }}</span
        >
      </div>
      <div>
        <span>Take Profit: </span>
        <span class="float-right"
          >₱{{ userWatchedStocks[data].take_profit }}</span
        >
      </div>
      <div>
        <span>Stop Loss: </span>
        <span class="float-right"
          >₱{{ userWatchedStocks[data].stop_loss }}</span
        >
      </div>
    </v-card-actions>
    <div class="watchlistCard__percentbar">
      <div
        class="watchlistCard__bar watchlistCard__bar--green"
        style="width:46%"
      ></div>
      <div
        class="watchlistCard__bar watchlistCard__bar--red"
        style="width:54%"
      ></div>
    </div>
  </v-card>
</template>
<style>
.watchlistCard__bar--green {
  background-color: #48ffd5;
}
.watchlistCard__bar--red {
  background-color: #ff4848;
}
.watchlistCard__text--green,
.watchlistCard__header--percent {
  color: #48ffd5;
}
.watchlistCard__text--red {
  color: #ff4848;
}
.watchlistCard__text--yellow {
  color: yellow;
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
</style>
<script>
import VueApexCharts from "vue-apexcharts";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    apexcharts: VueApexCharts
  },
  props: ["data"],
  data: function() {
    return {
      stockSymbol: "",
      stockCurrentPrice: "",
      stockCurrentChange: "",
      stockExchange: "",
      watchCardLoading: "primary",
      series: [
        {
          name: "series1",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 160,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 2,
            left: 3,
            top: 4
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
          tooltip: {
            enabled: false,
            formatter: undefined,
            offsetX: 0,
            style: {
              fontSize: 10,
              fontFamily: "Karla"
            },
            theme: false
          }
        },
        yaxis: {
          labels: {
            show: true,
            align: "right",
            style: {
              color: "#fff",
              fontSize: "12px",
              fontFamily: "Karla",
              cssClass: "apexcharts-yaxis-label"
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
      userWatchedStocks: "watchers/getUserWatchedStocks"
    })
  },
  watch: {
    userWatchedStocks: function() {
      this.watchCardMount();
    }
  },
  mounted() {
    this.watchCardMount();
  },
  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks"
    }),
    watchCardMount() {
      // GET Closing Price from Stock History API
      const params = {
        "symbol-id": this.userWatchedStocks[this.data].stock_id,
        resolution: "1D",
        limit: "10"
      };
      this.$api.chart.charts.latest(params).then(
        function(result) {
          this.$refs.closePriceChart.updateSeries([
            {
              data: result.data.c
            }
          ]);
        }.bind(this)
      );

      // GET Stock Symbol + Stock Exchange from Stock Info API
      const params2 = {
        "symbol-id": this.userWatchedStocks[this.data].stock_id
      };
      this.$api.chart.stocks.list(params2).then(
        function(result) {
          this.stockExchange = result.data.exchange;
          this.stockSymbol = result.data.symbol;
          this.$refs.closePriceChart.updateSeries([
            {
              name: result.data.symbol
            }
          ]);
        }.bind(this)
      );

      // GET Current Price + Current Change from Stock History API
      const params3 = {
        "symbol-id": this.userWatchedStocks[this.data].stock_id
      };
      this.$api.chart.stocks.history(params3).then(
        function(result) {
          this.stockCurrentPrice = result.data.last;
          this.stockCurrentChange = result.data.changepercentage.toFixed(2);
          if (this.stockCurrentChange > 0) {
            this.chartOptions = {
              ...this.chartOptions,
              ...{
                colors: ["#00FFC3"]
              }
            };
          } else if (this.stockCurrentChange < 0) {
            this.chartOptions = {
              ...this.chartOptions,
              ...{
                colors: ["#FF4848"]
              }
            };
          } else {
            this.chartOptions = {
              ...this.chartOptions,
              ...{
                colors: ["#FFDD00"]
              }
            };
          }
          this.watchCardLoading = false;
        }.bind(this)
      );
    }
  }
};
</script>
