<template>
  <v-col class="pa-0">
    <div id="chart">
      <client-only>
        <apexcharts
          ref="stratStatsChart"
          type="bar"
          height="240"
          :options="chartOptions"
          :series="series"
        />
      </client-only>
    </div>
    <v-simple-table :dense="true" :dark="lightSwitch == true" id="liveportfolio-table">
      <template v-slot:default>
        <thead>
          <tr class="caption font-weight-bold">
            <th class="text-left px-1">Strategy</th>
            <th class="text-right px-1">Trades</th>
            <th class="text-right px-1">Wins</th>
            <th class="text-right px-1">Losses</th>
            <th class="text-right px-1">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in strategyArr.slice(0, 4)" :key="item.name" id="table_tr_port-cont">
            <td class="caption px-1 py-1">{{ item.name }}</td>
            <td class="caption text-right px-1 py-0">{{ item.win + item.loss }}</td>
            <td class="caption text-right px-1 py-0">{{ item.win }}</td>
            <td class="caption text-right px-1 py-0">{{ item.loss }}</td>
            <td
              class="caption text-right px-1 py-0"
            >{{ ((item.win * 100) / (item.win + item.loss)).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
      strategyArr: [],
      series: [
        {
          name: "Win",
          data: [null, null, null, null]
        },
        {
          name: "loss",
          data: [null, null, null, null]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50",
            endingShape: "rounded",
            dropShadow: {
              enabled: true,
              opacity: 0.3,
              blur: 2,
              left: 3,
              top: 10
            }
          }
        },
        chart: {
          toolbar: {
            show: false
          }
        },
        colors: ["#03DAC5", "#F44336"],
        dataLabels: {
          enabled: false,
          offsetX: 0,
          style: {
            fontSize: "12px",
            colors: ["#fff"]
          }
        },
        stroke: {
          show: false,
          colors: ["#fff"]
        },
        grid: {
          show: false,
          borderColor: "#b6b6b6",
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
        legend: {
          show: false,
          position: "right"
        },
        xaxis: {
          show: true,
          categories: ["", "", "", ""],
          labels: {
            show: false,
            style: {
              colors: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-xaxis-label"
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            align: "left",
            minWidth: 0,
            maxWidth: 160,
            style: {
              color: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-yaxis-label"
            }
            // offsetX: 102,
            // offsetY: -17
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          crosshairs: {
            show: false
          }
        },
        tooltip: {
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
          theme: false,
          style: {
            fontFamily: "'Nunito' !important"
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
     * Watch journalCharts vuex if data changed execute function inside
     *
     * @return  {array}  getting buy value data from journalCharts vuex
     */
    journalCharts() {
      this.getStrategyStat();
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
     * getStrategyStat will work on ploting/updating chart using refs and
     * iterating.
     *
     * @return  {array}  data to update chart
     */
    getStrategyStat() {
      this.strategyArr = []
      if (this.journalCharts != null) {
        const objStrategy = this.journalCharts.data.strategy_statistics;

        let strategyArray = [];
        if (objStrategy.length != 0) {
          Object.keys(objStrategy).forEach(function(key) {
            strategyArray.push({ ...objStrategy[key], name: key });
          });
          this.strategyArr = strategyArray;
        }
        let winStrategy = [null, null, null, null];
        let lossStrategy = [null, null, null, null];
        let nameStrategy = [" ", " ", " ", " "];
        for (let i = 0; i < this.strategyArr.length; i++) {
          winStrategy.push(this.strategyArr[i].win);
          lossStrategy.push(this.strategyArr[i].loss);
          nameStrategy.push(this.strategyArr[i].name);
        }

        // load data series on bar graph
        this.$refs.stratStatsChart.updateSeries([
          {
            data: winStrategy.reverse().slice(0, 4)
          },
          {
            data: lossStrategy.reverse().slice(0, 4)
          }
        ]);

        // load data names on bar graph
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: [
                ...nameStrategy.reverse().slice(0, 4),
                ...this.chartOptions.xaxis.categories
              ].slice(0, 4)
            }
          }
        };
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
<style scoped>
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
.theme--light.v-data-table thead tr th {
  color: #494949;
}
</style>