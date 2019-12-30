<template>
  <v-container class="pa-0">
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <div id="chart">
        <apexcharts
          ref="lossersChart"
          type="bar"
          height="230"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </v-col>
  </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'
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
            stockList: "global/getStockList",
            lightSwitch: "global/getLightSwitch"
        })
    },
    data () {
        return {
            lossersArray: [],
            series: [{
                name: 'Lossers',
                data: [ ,  ,  ,  ,  ,  ,  ]
            }],
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '60%',
                        endingShape: 'rounded',
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
                    },
                },
                colors: ['#F44336'],
                dataLabels: {
                    enabled: false,
                    offsetX: 0,
                    style: {
                    fontSize: '12px',
                    colors: ['#fff']
                    }
                },
                stroke: {
                    show: false,
                    colors: ['#fff']
                },
                grid: {
                    show: true,
                    borderColor: '#17314B',
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },   
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                },
                legend: {
                    show: false,
                     position: 'right',
                },
                xaxis: {
                    show: true,
                    type: 'category',
                    categories: [' ', ' ', ' ', ' ', ' ', ' ', ' '],
                    labels: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    }
                },
                yaxis: {
                    show: true,
                    opposite: false,
                    max: 0,
                    labels: {
                        show: true,
                        align: 'left',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            color: '#b6b6b6',
                            fontSize: '12px',
                            fontFamily: "'Nunito' !important",
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 0,
                        offsetY: 2
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    }
                },
                title: {
                    text: 'Lossers',
                    align: 'middle',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: true,
                    style: {
                        fontSize:  '14px',
                        fontFamily: "'Nunito' !important",
                        color:  '#d8d8d8'
                    },
                },
                tooltip: {
                    y: {
                        show: false,
                        formatter: function (value) {
                            let val = (value/1).toFixed(2).replace('.', '.')
                            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                    },
                    x: {
                        show: false,
                    },
                    marker: {
                        show: false,
                    },
                    theme: false,
                    style: {
                        fontFamily: "'Nunito' !important"
                    },
                    followCursor: true,
                }
            }
        }
    },
    methods: {
        getTopLossers() {
            if(this.journalCharts != null){
            
                const objLossers = this.journalCharts.meta.top_stocks
                const lossersArray = []
                const negativeArr = []
                let lastValueArray = [, , , , , , ]
                let lastSymbolArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ']
                let filteredStocks = null

                // map keys, from object make it array
                Object.keys(objLossers).forEach(function(key) {
                    lossersArray.push({stock_id: key, stock_sym: "", value: objLossers[key]});
                });
                this.lossersArray = lossersArray

                for(let i = 0; i < this.lossersArray.length; i++){
                    let toSeparate = this.lossersArray[i]

                    // filter stock_id to stock symbol
                    filteredStocks = this.stockList.data.filter((stock) => {
                        return stock.id_str == this.lossersArray[i].stock_id;
                    });
                    toSeparate.stock_sym = filteredStocks[0].symbol

                    // push negative value to array
                    if(toSeparate.value < 0 ) {
                        negativeArr.push(toSeparate)
                    }
                }
                // loop the name and value push to array
                for (let x = 0; x < negativeArr.length; x++) {
                    lastValueArray.unshift(negativeArr[x].value)
                    lastSymbolArray.unshift(negativeArr[x].stock_sym)
                }
                
                // update chart series
                this.$refs.lossersChart.updateSeries([
                    {
                        data: lastValueArray.slice(0, 7)
                    }
                ]);
                
                // update chart category symbols
                this.chartOptions = {
                    ...this.chartOptions,...{ xaxis: { categories: [...lastSymbolArray,...this.chartOptions.xaxis.categories].slice(0, 7)}}
                };

            }
            this.componentKeys++;
        },
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
    },
    mounted(){
        this.getTopLossers();
        this.lightSwitcher();
    },
    watch: {
        journalCharts: function() {
            this.getTopLossers();
        },
        defaultPortfolioId: function() {
            this.getTopLossers();
        },
        lightSwitch: function() {
            this.lightSwitcher();
        }
    }
}
</script>