<template>
  <v-container class="px-5">
    <v-row no-gutters>
      <v-col class="pa-0" cols="12">
        <div class="small pt-5">
          <apexcharts height="270" type="donut" :options="chartOptions" :series="series"></apexcharts>
        </div>
      </v-col>
      <v-col class="pa-3" cols="12">
        <v-simple-table :dense="true" :dark="lightSwitch == true" id="liveportfolio-table">
          <template v-slot:default>
            <tbody>
              <tr id="table_tr_snap-cont">
                <td class="caption px-1 py-1">
                  <v-icon class="pr-1 caption" color="#03DAC5">mdi-circle</v-icon>Winning Strategy
                </td>
                <td class="caption text-right px-1 py-1">{{ winStrategy }}</td>
              </tr>
              <tr id="table_tr_snap-cont">
                <td class="caption px-1 py-1">
                  <v-icon class="pr-1 caption" color="#F44336">mdi-circle</v-icon>Lossing Strategy
                </td>
                <td class="caption text-right px-1 py-1">{{ lossStrategy }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VueApexCharts from "vue-apexcharts";

import { mapGetters } from "vuex";

export default {
  components: {
    apexcharts: VueApexCharts
  },
  computed: {
    ...mapGetters({
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      journalCharts: "journal/getJournalCharts",
      lightSwitch: "global/getLightSwitch"
    })
  },
  data() {
    return {
      winStrategy: "",
      lossStrategy: "",
      series: [0, 0],
      strategyArr: [],
      chartOptions: {
        chart: {
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 2,
            left: 3,
            top: 3
          }
        },
        labels: ["Winning", "Lossing"],
        colors: ["#03DAC5", "#f44336"],
        legend: {
          show: false
        },
        stroke: {
          show: false,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        value: {
          show: false
        },
        responsive: [
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "left"
              }
            }
          }
        ],
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: "55%"
            }
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          colors: "#00FFC3",
          theme: true,
          style: {
            fontSize: "12px",
            fontFamily: "'Karla', sans-serif"
          },
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0
          }
        },
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 20,
          color: "#fff",
          opacity: 0.9
        }
      }
    };
  },
  methods: {
    getStrategyStat() {
      if (this.journalCharts != null) {
        const objStrategy = this.journalCharts.meta.strategy_statistics;
        const strategyArray = [];
        if (objStrategy.length != 0) {
          this.series = [];

          Object.keys(objStrategy).forEach(function(key) {
            strategyArray.push({ ...objStrategy[key], name: key });
          });
          this.strategyArr = strategyArray;

          // load data series on donut
          const winResult = Math.max.apply(
            Math,
            this.strategyArr.map(function(o) {
              return o.win;
            })
          );
          const lossResult = Math.max.apply(
            Math,
            this.strategyArr.map(function(o) {
              return o.loss;
            })
          );
          // return obj
          const objWinResult = this.strategyArr.find(function(o) {
            return o.win == winResult;
          });
          const objLossResult = this.strategyArr.find(function(o) {
            return o.loss == lossResult;
          });
          this.series.push(objWinResult.win, objLossResult.loss);

          this.winStrategy = objWinResult.name;
          this.lossStrategy = objLossResult.name;
        }
      }
      this.componentKeys++;
    }
  },
  mounted() {
    this.getStrategyStat();
  },
  watch: {
    journalCharts: function() {
      this.getStrategyStat();
    },
    defaultPortfolioId: function() {
      this.getStrategyStat();
    }
  }
};
</script>
<style scoped>
.ts_chart-cont {
  width: 100%;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6;
}
</style>