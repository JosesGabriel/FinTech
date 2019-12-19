<template>
    <v-container class="pa-0">
        <v-col class="pa-0" cols="12">
            <v-card-title class="text-left justify-left ml-2 px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
              <h6 class="font-weight-regular subtitle-2" style="color:#fff;">BUY VALUE</h6>
              <v-spacer></v-spacer>
                  <v-btn icon small @click.stop="showScheduleForm=true"> 
                      <img src="/icon/journal-icons/share-icon.svg" width="15">
                  </v-btn>
            </v-card-title>
        </v-col>
        <div class="pt-3" id="chart">
            <apexcharts ref="BuyValue" type=bar height=300 :options="chartOptions" :series="series" />
        </div>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-container>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import shareModal from '~/components/modals/share'
  
  import { mapGetters } from "vuex";
  
  export default {
    components: {
      apexcharts: VueApexCharts,
      shareModal
    },
    computed: { 
      ...mapGetters({
          renderPortfolioKey: "journal/getRenderPortfolioKey",
          defaultPortfolioId: "journal/getDefaultPortfolioId",
          journalCharts: "journal/getJournalCharts",
      })
    },
    data () {
      return {
        showScheduleForm: false,
        series: [{
          name: 'Loss',
          data: [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
        }],
        chartOptions: {
          colors: ['#03DAC5','#f44336'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              endingShape: 'rounded',
              dropShadow: {
                  enabled: true,
                  left: 2,
                  top: 2,
                  opacity: 1
              }
            },
          },
          chart: {
            toolbar: {
              show: false,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true
              },
              autoSelected: 'zoom' 
            },
            dropShadow: {
              enabled: true,
              opacity: 0.1,
              blur: 2,
              left: 3,
              top: 3
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          grid: {
            show: true,
            borderColor: 'transparent',
          },
          xaxis: {
            categories: ['1','','','4','','','','8','','','','12','','','','16'],
            labels: {
              show: true,
              style: {
                colors: '#b6b6b6',
                fontSize: '12px',
                fontFamily: "'Nunito' !important",
                cssClass: 'apexcharts-xaxis-label',
              }
            },
            crosshairs: {
              show: false,
            },
            lines: {
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
            labels: {
              show: true,
              align: 'right',
              style: {
                  color: '#b6b6b6',
                  fontSize: '12px',
                  fontFamily: "'Nunito' !important",
                  cssClass: 'apexcharts-yaxis-label',
              },
              formatter: function (value) {
                let val = (value/1).toFixed(2).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            },
            lines: {
                show: false
            }
          },
          legend: {
            show: false,
          },
          fill: {
            opacity: 1
          },
          title: {
                text: 'Last 16 Trades',
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: true,
                style: {
                    fontSize:  '14px',
                    fontFamily: "'Nunito' !important",
                    color:  '#b6b6b6'
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
            onDatasetHover: {
              highlightDataSeries: false
            },
            theme: false,
            style: {
              fontFamily: "'Nunito' !important"
            }
          }
        }
      }
    },
    mounted() {
        this.getBuyValue();
    },
    methods: {
      getBuyValue() {
        if(this.journalCharts != null){
          const buyValue = this.journalCharts.meta.buy_value
          const valueArray = [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
          if(buyValue.length != 0){
            for ( let i = 0; i < buyValue.length; i++) {
              buyValue[i] = parseFloat(buyValue[i])
            }
  
            valueArray.unshift(...buyValue)
            // load data series on column chart
            this.$refs.BuyValue.updateSeries([
                {
                  data: valueArray.slice(0, 16)
                }
            ]);
          }
        }
        this.componentKeys++;
      }
    },
    watch: {
        journalCharts: function() {
            this.getBuyValue();
        },
        defaultPortfolioId: function() {
            this.getBuyValue();
        }
    }
  }
</script>