<template>
    <v-col class="pa-0" cols="7" sm="7" md="7">
        <v-card-title class="text-left justify-left px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
            <h6 class="font-weight-regular subtitle-2" style="color:#fff;">MONTHLY PERFORMANCE</h6>
            <v-spacer></v-spacer>
            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-col class="pa-0" cols="12" sm="12" md="12">
          <div id="chart">
            <apexcharts type=bar class="monthlyperf_chart" height=300 width=90%  ref="monthlyPerformance" :options="chartOptions" :series="series" />
          </div>
        </v-col>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
</template>
<script>
  import VueApexCharts from 'vue-apexcharts'
  import shareModal from '~/components/modals/share'
  
  import { mapActions, mapGetters } from "vuex";

  export default {
    components: {
      apexcharts: VueApexCharts,
      shareModal
    },
    data () {
      return {
        showScheduleForm: false,
        series: [{
          name: 'Loss',
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }],
        chartOptions: {
          colors: ['#00FFC3','#f44336'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
              dropShadow: {
                  enabled: true,
                  left: 2,
                  top: 2,
                  opacity: 1
              },
              colors: {
                ranges: [{
                  from: -100,
                  to: 0,
                  color: '#F44336'
                }]
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
            categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
              show: true,
              style: {
                colors: '#b6b6b6',
                fontSize: '12px',
                fontFamily: 'Karla',
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
                  fontFamily: 'Karla',
                  cssClass: 'apexcharts-yaxis-label',
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
          tooltip: {
            y: {
              show: false,
              formatter: function (val) {
                return val
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
              fontFamily: 'Karla'
            }
          }
        }
      }
    },
    computed: {
        ...mapGetters({
            defaultPortfolioId: "journal/getDefaultPortfolioId",
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            journalCharts: "journal/getJournalCharts"
        })
    },
    methods: {
      getMPerformance() {
          // console.log(this.defaultPortfolioId, "monthyP")
          // if(this.renderPortfolioKey > 0){
          //   
          // }
          // const journalchartsparams = {
          //   user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
          //   fund: this.defaultPortfolioId,
          // };
          // this.$api.journal.portfolio.journalcharts(journalchartsparams).then(
          //   function(result) {
          //       if(result.success) {
          //         console.log(result.meta)
          //         let mPerf = result.meta.monthly_performance
          //         this.$refs.monthlyPerformance.updateSeries([
          //           {
          //             data: mPerf
          //           }
          //         ]);
          //       }
          //   }.bind(this)
          // )
      // GET Closing Price from Stock History API
        // const journalchartsparams = {
        //   user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        //   fund: this.defaultPortfolioId,
        // };
        // this.$api.journal.portfolio.journalcharts(journalchartsparams).then(
        //   function(result) {
        //     console.log(result.meta.monthly_performance, "test");
        //     this.$refs.monthlyPerformance.updateSeries([
        //       {
        //         data: result.meta.monthly_performance
        //       }
        //     ]);
        //   }.bind(this)
        // )
        this.componentKeys++;
      },
      formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', '.')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    },
    watch: {
      renderPortfolioKey: function() {
        this.getMPerformance();
      }
    }
  }
</script>