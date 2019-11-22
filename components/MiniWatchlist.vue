<template>
  <v-card
    class="mb-3"
    color="transparent"
    dark
    outlined
    :loading="watchCardLoading"
  >
    <v-card-text class="pa-0 pl-2">
      <div class="body-2 font-weight-black">Watchlist</div>
      <v-divider></v-divider>
      <v-list class="transparent pt-0">
        <v-list-item
          v-for="(n, index) in watchListObject.length"
          :key="n"
          class="px-0"
        >
          <div>
            <span>{{ stockData[index] ? stockData[index].stockSym : "" }}</span>
          </div>
          <div class="no-wrap">
            <apexcharts
              ref="closePriceChart"
              type="line"
              height="100"
              :options="chartOptions"
              :series="series"
            />
          </div>
          <div>
            <span
              >₱{{
                stockData[index] ? stockData[index].currentPrice : ""
              }}</span
            >
            <span
              :class="
                stockData[index].change > 0
                  ? 'watchlistCard__text--green'
                  : stockData[index].change < 0
                  ? 'watchlistCard__text--red'
                  : 'watchlistCard__text--gray'
              "
              >{{ stockData[index] ? stockData[index].change : "" }}%</span
            >
          </div>
        </v-list-item>
        <router-link
          to="/watchlist"
          class="caption"
          style="text-decoration: none;"
        >
          Show more
        </router-link>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<style>
.watchlistCard__text--green,
.watchlistCard__header--percent {
  color: #48ffd5;
}
.watchlistCard__text--red {
  color: #ff4848;
}
.watchlistCard__text--gray {
  color: gray;
}
</style>
<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexcharts: VueApexCharts
  },
  props: ["data"],
  data: function() {
    return {
      stockData: [],
      watchCardLoading: "primary",
      watchListObject: "",
      isLightMode: 0,
      series: [
        {
          name: "series1",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 100,
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
  computed: {},
  watch: {
    userWatchedStocks: function() {
      this.watchCardMount();
    }
  },
  mounted() {
    this.watchCardMount();
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    watchCardMount() {
      let userData = {
        user_id: this.$auth.loggedIn ? this.$auth.user.data.user.uuid : "000"
      };
      this.$axios
        .$get(process.env.DEV_API_URL + "/journal/watchlist", userData)
        .then(response => {
          this.watchListObject = response.data.watchlist;
          //If watchlist is more than 5, pop excess data from array
          if (this.watchListObject.length > 5) {
            let popAmount = this.watchListObject.length - 5;
            for (let i = 0; i < popAmount; i++) this.watchListObject.pop();
          }
          for (let i = 0; i < this.watchListObject.length; i++) {
            this.stockData.push({
              stockSym: "",
              data: [],
              currentPrice: "",
              change: ""
            });
            // GET Closing Price from Stock History API
            const params = {
              "symbol-id": this.watchListObject[i].stock_id,
              resolution: "1D",
              limit: "5"
            };
            this.$api.chart.charts.latest(params).then(
              function(result) {
                this.$refs.closePriceChart[i].updateSeries([
                  {
                    data: result.data.c.reverse()
                  }
                ]);
              }.bind(this)
            );

            // GET Stock Symbol + Stock Exchange from Stock Info API
            const params2 = {
              "symbol-id": this.watchListObject[i].stock_id
            };
            this.$api.chart.stocks.list(params2).then(
              function(result) {
                this.stockData[i].stockSym = result.data.symbol;
                this.$refs.closePriceChart[i].updateSeries([
                  {
                    name: result.data.symbol
                  }
                ]);
              }.bind(this)
            );

            // GET Current Price + Current Change from Stock History API
            const params3 = {
              "symbol-id": this.watchListObject[i].stock_id
            };
            this.$api.chart.stocks.history(params3).then(
              function(result) {
                this.stockData[i].currentPrice = result.data.last;
                this.stockData[i].change = result.data.changepercentage.toFixed(
                  2
                );
                if (this.stockData[i].change > 0) {
                  this.$refs.closePriceChart[i].updateOptions({
                    colors: ["#00FFC3"]
                  });
                } else if (this.stockData[i].change < 0) {
                  this.$refs.closePriceChart[i].updateOptions({
                    colors: ["#FF4848"]
                  });
                } else {
                  this.$refs.closePriceChart[i].updateOptions({
                    colors: ["#808080"]
                  });
                }
              }.bind(this)
            );
            this.watchCardLoading = false;
          }
        });
    }
  }
};
</script>