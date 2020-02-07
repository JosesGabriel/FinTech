<template>
  <v-card
    class="mb-1 watchCard"
    :class="lightSwitch == 0 ? 'watchCard--light' : ''"
    :color="lightSwitch == 0 ? '' : '#00121e'"
    :dark="lightSwitch == 0 ? false : true"
    max-height="295"
    :loading="watchCardLoading"
    flat
    tile
  >
    <div>
      <span class="caption font-weight-black"
        >{{ stockExchange }}: {{ stockSymbol }}</span
      ><br />
      <span class="watchlistCard__stockDescription d-block">{{
        stockDescription
      }}</span>
    </div>
    <apexcharts
      ref="closePriceChart"
      type="line"
      height="150"
      :options="chartOptions"
      :series="series"
    />
    <v-card-actions class="watchlistCard__items caption">
      <div>
        <span class="float-right">
          ₱{{ stockCurrentPrice }} <span class="tertiary--text">|</span>
          <span
            :class="
              stockCurrentChange > 0
                ? 'success--text'
                : stockCurrentChange < 0
                ? 'error--text'
                : 'watchlistCard__text--gray'
            "
          >
            {{ stockCurrentChange }}%</span
          >
        </span>
        <br />
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
      <MarketDepth :stocksym="userWatchedStocks[data].stock_id" />
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MarketDepth from "~/components/watchers/MarketDepth";
export default {
  components: {
    MarketDepth
  },
  props: ["data"],
  data() {
    return {
      stockSymbol: "",
      stockCurrentPrice: "",
      stockCurrentChange: "",
      stockExchange: "",
      stockDescription: "",
      watchCardLoading: "success",
      isLightMode: 0,
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
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false,
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
      userWatchedStocks: "watchers/getUserWatchedStocks",
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    /**
     * Watches vuex value. When this value updates, that means a user has added, edited or deleted a watched stock.
     * Execute GET for stock price data based on newly added stock
     *
     * @return
     */
    userWatchedStocks() {
      this.watchCardMount();
    }
  },
  mounted() {
    this.watchCardMount();
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks",
      setLightSwitch: "global/setLightSwitch"
    }),
    /**
     * GET Closing Price from Stock History API
     *
     * @return
     */
    watchCardMount() {
      const params = {
        "symbol-id": this.userWatchedStocks[this.data].stock_id,
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

      // GET Stock Symbol + Stock Exchange from Stock Info API
      const params2 = {
        "symbol-id": this.userWatchedStocks[this.data].stock_id
      };
      this.$api.chart.stocks.list(params2).then(
        function(result) {
          this.stockDescription = result.data.description;
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
                colors: ["#f44336"]
              }
            };
          } else {
            this.chartOptions = {
              ...this.chartOptions,
              ...{
                colors: ["#808080"]
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

<style>
.watchCard--light {
  background-color: #f2f2f2 !important;
  border: 1px solid #d3d4d5 !important;
}
.watchCard {
  padding: 0 10px;
}
.watchlistCard__stockDescription {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 8px;
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
