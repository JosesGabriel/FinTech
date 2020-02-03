<template>
  <v-container class="pa-0">
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <div id="chart">
        <client-only>
          <apexcharts
            ref="winnersChart"
            type="bar"
            height="230"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      journalCharts: "journal/getJournalCharts",
      stockList: "global/getStockList",
      lightSwitch: "global/getLightSwitch"
    })
  },
  data() {
    return {
      winnersArray: [],
      series: [
        {
          name: "Winners",
          data: [null, null, null, null, null, null, null]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "60%",
            endingShape: "rounded"
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 10,
            left: 10,
            blur: 3,
            color: "#000",
            opacity: 1
          }
        },
        colors: ["#03DAC5"],
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
          show: true,
          borderColor: "#17314B",
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
          type: "category",
          categories: [" ", " ", " ", " ", " ", " ", " "],
          labels: {
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
          show: true,
          opposite: true,
          labels: {
            show: true,
            align: "right",
            minWidth: 0,
            maxWidth: 160,
            style: {
              color: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-yaxis-label"
            },
            offsetX: 410,
            offsetY: 2
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        title: {
          text: "Winners",
          align: "middle",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: true,
          style: {
            fontSize: "14px",
            fontFamily: "'Nunito' !important",
            color: "#d8d8d8"
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
          theme: false,
          style: {
            fontFamily: "'Nunito' !important"
          },
          followCursor: true
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
      this.getTopWinners();
    },
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getTopWinners();
    },
    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getTopWinners();
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
     * getTopWinners will work on ploting/updating chart series and iterating
     *
     * @return  {array}  data to update chart
     */
    getTopWinners() {
      if (this.journalCharts != null) {
        const objLossers = this.journalCharts.data.top_stocks;
        const winnersArray = [];
        const positiveArr = [];
        let lastValueArray = [null, null, null, null, null, null, null];
        let lastSymbolArray = [" ", " ", " ", " ", " ", " ", " "];
        let filteredStocks = null;

        // map keys, from object make it array
        Object.keys(objLossers).forEach(function(key) {
          winnersArray.push({
            stock_id: key,
            stock_sym: "",
            value: objLossers[key]
          });
          winnersArray.sort(function(a, b) {
            return a.value - b.value;
          });
          return winnersArray;
        });
        this.winnersArray = winnersArray;
        for (let i = 0; i < this.winnersArray.length; i++) {
          let toSeparate = this.winnersArray[i];

          // filter stock_id to stock symbol
          filteredStocks = this.stockList.data.filter(stock => {
            return stock.id_str == this.winnersArray[i].stock_id;
          });
          toSeparate.stock_sym = filteredStocks[0].symbol;

          // push positive value to array
          if (toSeparate.value > 0) {
            positiveArr.push(toSeparate);
          }
        }

        // loop the name and value push then to array
        for (let x = 0; x < positiveArr.length; x++) {
          lastValueArray.unshift(positiveArr[x].value);
          lastSymbolArray.unshift(positiveArr[x].stock_sym);
        }

        // update chart series
        this.$refs.winnersChart.updateSeries([
          {
            data: lastValueArray.slice(0, 7)
          }
        ]);

        // update chart category symbols
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: [
                ...lastSymbolArray,
                ...this.chartOptions.xaxis.categories
              ].slice(0, 7)
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