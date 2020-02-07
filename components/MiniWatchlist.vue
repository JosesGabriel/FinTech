<template>
  <v-card
    class="mb-3"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
    :loading="watchCardLoading"
  >
    <div class="pa-0 pl-2">
      <div class="body-2 font-weight-black pb-2 pl-2">Watchlist</div>
      <v-divider></v-divider>
      <v-list class="transparent pt-0">
        <v-container class="pa-0">
          <v-list-item
            v-for="(n, index) in watchListObject.length"
            :key="n"
            class="px-0"
          >
            <v-row>
              <v-col cols="1" class="pr-6"
                ><span class="stockSymbol__span">{{
                  stockData[index] ? stockData[index].stockSym : ""
                }}</span></v-col
              >
              <v-col cols="8" class="no-wrap pa-0">
                <apexcharts
                  ref="closePriceChart"
                  type="line"
                  height="100"
                  width="160"
                  :options="chartOptions"
                  :series="series"
                />
              </v-col>
              <v-col cols="1" class="pa-0 stockPrices"
                ><span :id="stockData[index].stockSym" class="stockSymbol__span"
                  >₱{{
                    stockData[index] ? stockData[index].currentPrice : ""
                  }}</span
                >
                <span
                  class="stockSymbol__span"
                  :class="
                    stockData[index].change > 0
                      ? 'success--text'
                      : stockData[index].change < 0
                      ? 'error--text'
                      : 'watchlistCard__text--gray'
                  "
                  >{{ stockData[index] ? stockData[index].change : "" }}%</span
                ></v-col
              >
            </v-row>
            <!-- <div>
            <span>{{ stockData[index] ? stockData[index].stockSym : "" }}</span>
          </div>
          <div class="no-wrap">
            <apexcharts
              ref="closePriceChart"
              type="line"
              height="100"
              width="170"
              :options="chartOptions"
              :series="series"
            />
          </div>
          <div>
            <span :id="stockData[index].stockSym"
              >₱{{
                stockData[index] ? stockData[index].currentPrice : ""
              }}</span
            >
            <span
              :class="
                stockData[index].change > 0
                  ? 'success--text'
                  : stockData[index].change < 0
                  ? 'error--text'
                  : 'watchlistCard__text--gray'
              "
              >{{ stockData[index] ? stockData[index].change : "" }}%</span
            >
          </div> -->
          </v-list-item>
        </v-container>
        <router-link
          v-if="watchListObject.length == 0"
          class="d-block mWatchlist__text--noData px-5 success--text overline no-transform"
          to="/watchlist"
          >Add symbols to your watchlist.</router-link
        >
        <router-link
          v-if="watchListObject.length != 0"
          to="/watchlist"
          class="caption no-transform"
        >
          Show more
        </router-link>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      stockData: [],
      watchCardLoading: "success",
      watchListObject: "",
      isLightMode: 0,
      dataSeries: [],
      series: [
        {
          name: "series1",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 100,
          width: 160,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: false,
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
          axisTicks: {
            show: false
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
        },
        legend: {
          show: false
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      renderChartKey: "watchers/getRenderChartKey",
      lightSwitch: "global/getLightSwitch",
      sseInfo: "social/sseInfo"
    })
  },
  watch: {
    /**
     * Watches vuex value. When this value updates, that means a user has added, edited or deleted a watched stock.
     * Execute GET again to update user watchlist with new values.
     *
     * @return
     */
    renderChartKey() {
      this.watchCardMount();
    },
    sseInfo: function(data) {
      this.realTime(data);
    }
  },
  mounted() {
    this.watchCardMount();
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  },
  methods: {
    /**
     * Gets current users watched stocks
     *
     * @return
     */
    watchCardMount() {
      this.$api.watchlist.watchlists
        .index()
        .then(response => {
          this.watchListObject = response.data.watchlist;
          //If watchlist is more than 5, pop excess data from array
          if (this.watchListObject.length == 0) {
            this.watchCardLoading = false;
          }
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
                this.dataSeries[i] = result.data.c.reverse();
                this.$refs.closePriceChart[i].updateSeries([
                  {
                    data: result.data.c
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
                    colors: ["#f44336"]
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
        })
        .catch(error => {
          if (error.response.status == 404) {
            this.watchCardLoading = false;
          }
        });
    },

    realTime(data) {
      for (let index = 0; index < this.stockData.length; index++) {
        if (this.watchListObject[index].stock_id == data.sym_id) {
          let oldprice = this.stockData[index].currentPrice;
          this.stockData[index].currentPrice = data.c;
          this.stockData[index].change = data.chgpc.toFixed(2);
          if (oldprice != this.stockData[index].currentPrice) {
            this.updateEffect(this.stockData[index].stockSym);
          }
          //for (let i = 0; i < 5; i++) {
          //this.dataSeries[index][i] = this.dataSeries[index][i+1];
          //}
          this.dataSeries[index][4] = this.stockData[index].currentPrice;
          this.$refs.closePriceChart[index].updateSeries([
            {
              data: this.dataSeries[index]
            }
          ]);
        }
      }
    },

    updateEffect: dom => {
      const item = document.getElementById(dom);
      if (item == null) return;
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(function() {
        item.style.background = "";
      }, 800);
    }
  }
};
</script>

<style>
.mWatchlist__text--noData {
  padding-top: 45px;
  padding-bottom: 45px;
}
.stockSymbol__span {
  white-space: nowrap;
}
.stockPrices {
  position: relative;
  right: 20px;
}
</style>
