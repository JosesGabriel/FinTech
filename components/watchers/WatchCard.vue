<template>
  <v-card class="mb-3" color="#142b46" dark outlined shaped max-height="250">
    <v-list-item class="watchlistCard">
      <!-- <v-btn outlined fab small color="#48ffd5" class="mr-3">JFC</v-btn> -->
      <!-- <v-list-item-content>
            <v-list-item-title class="caption"><strong>Philippine Infradev Holdings</strong></v-list-item-title>
            <v-list-item-subtitle class="overline">₱3.42 | <span class="watchlistCard__header--percent">0.59%</span></v-list-item-subtitle>
        </v-list-item-content> -->
    </v-list-item>
    <apexcharts
      type="area"
      height="180"
      :options="chartOptions"
      :series="series"
    />
    <v-card-actions class="watchlistCard__items caption">
      <div>
        <span>Entry Price: </span>
        <span class="float-right">₱1.34</span>
      </div>
      <div>
        <span>Take Profit: </span>
        <span class="float-right">₱1.40</span>
      </div>
      <div>
        <span>Stop Loss: </span>
        <span class="float-right">₱1.30</span>
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
  position: absolute;
}
.watchlistCard__header--percent {
  color: #48ffd5;
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
  data: function() {
    return {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
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
        colors: ["#00FFC3"],
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
  }
};
</script>
