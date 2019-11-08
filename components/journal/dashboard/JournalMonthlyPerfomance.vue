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
            <apexcharts type=bar height=300 width=90% :options="chartOptions" :series="series" />
          </div>
        </v-col>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
</template>
<script>
  import VueApexCharts from 'vue-apexcharts'
  import shareModal from '~/components/modals/share'
  
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
          data: [1,2,-3,-4,5,4,1,2,3,4,5,4]
        }],
        chartOptions: {
          colors: ['#00FFC3','#FF4848'],
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
    }
  }
</script>