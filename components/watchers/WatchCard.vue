<template>
  <v-card
    class="mb-1"
    color="#142b46"
    dark
    outlined
    shaped
    max-height="320"
    :loading="watchCardLoading"
  >
    <v-list-item class="watchlistCard">
      <v-btn
        outlined
        fab
        small
        :color="stockCurrentChange > 0 ? '#34ad9e' : '#f45532'"
        class="mr-3"
        >{{ stockSymbol }}</v-btn
      >
      <v-list-item-content>
        <v-list-item-title class="caption"
          ><strong>{{ stockDescription }}</strong></v-list-item-title
        >
        <v-list-item-subtitle class="overline"
          >₱{{ stockCurrentPrice }} |
          <span
            :class="
              stockCurrentChange > 0
                ? 'watchlistCard__text--green'
                : 'watchlistCard__text--red'
            "
            >{{ stockCurrentChange }}%</span
          ></v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <apexcharts
      ref="closePriceChart"
      type="area"
      height="180"
      :options="chartOptions"
      :series="series"
    />
    <v-card-actions class="watchlistCard__items body-2 mt-3">
      <div>
        <span>Entry Price: </span>
        <span class="float-right">₱{{ data.entry_price }}</span>
      </div>
      <div>
        <span>Take Profit: </span>
        <span class="float-right">₱{{ data.take_profit }}</span>
      </div>
      <div>
        <span>Stop Loss: </span>
        <span class="float-right">₱{{ data.stop_loss }}</span>
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
      <!-- <v-btn @click="chartColor()">Hahah</v-btn> -->
    </div>
  </v-card>
</template>
<style>
.watchlistCard {
  /* position: absolute; */
}
.watchlistCard__header--percent {
  color: #48ffd5;
}
.watchlistCard__text--green {
  color: #48ffd5;
}
.watchlistCard__text--red {
  color: #ff4848;
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
.watchlistCard__itemsContainer {
  position: absolute;
  bottom: 40px;
}
.watchlistCard__bar {
  float: left;
  color: #fff;
  padding: 2px 0;
  text-align: center;
  line-height: 0;
  border-radius: 5px 0 0 5px;
}
.watchlistCard__bar--green {
  background-color: #34ad9e;
}
.watchlistCard__bar--red {
  background-color: #f45532;
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
      stockSymbol: "",
      stockDescription: "~",
      stockCurrentPrice: "",
      stockCurrentChange: "",
      watchCardLoading: "primary",
      series: [
        {
          name: "series1",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 180,
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
          show: true,
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
  mounted() {
    // GET Closing Price from Stock History API
    const params = {
      "symbol-id": this.data.stock_id,
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
    // GET Stock Symbol + Stock Description from Stock Info API
    const params2 = {
      "symbol-id": this.data.stock_id
    };
    this.$api.chart.stocks.list(params2).then(
      function(result) {
        (this.stockSymbol = result.data.symbol),
          (this.stockDescription = result.data.description);
        this.$refs.closePriceChart.updateSeries([
          {
            name: result.data.symbol
          }
        ]);
        // GET Current Price + Current Change from Stock History API
        const params3 = {
          exchange: "PSE",
          symbol: this.stockSymbol
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
            } else {
              this.chartOptions = {
                ...this.chartOptions,
                ...{
                  colors: ["#FF4848"]
                }
              };
            }
            this.watchCardLoading = false;
          }.bind(this)
        );
      }.bind(this)
    );
  },
  methods: {}
};
</script>
