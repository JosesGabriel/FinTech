<template>
    <v-col class="pa-0 pl-10" cols="5" sm="5" md="5">
        <v-card-title class="text-left justify-left px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
            <h6 class="font-weight-regular subtitle-2" style="color:#fff;">TRADE STATISTICS</h6>
            <v-spacer></v-spacer>
            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-row no-gutters>
            <v-col class="pa-0 pt-5" cols="12">
                <div class="small">
                    <apexcharts type=donut height=245 :options="chartOptions" :series="series"></apexcharts>
                </div>
            </v-col>
            <v-col class="pa-0" cols="12">
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="item_position-prop caption px-1 py-1"><v-icon class="pr-1 caption" color="#00ffc3">mdi-circle</v-icon>Win</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ win }}</td>
                                
                                <td class="item_position-prop caption px-1 py-1"><v-icon class="pr-1 caption" color="#f44336">mdi-circle</v-icon>Loss</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ loss }}</td>
                            </tr>
                            <tr>
                                <td class="item_position-prop caption px-1 py-1">Total Trades</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ winlossresult }}</td>
                                
                                <td class="item_position-prop caption px-1 py-1">Win Rate</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ winrateresult }}%</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
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
          win: 7,
          loss: 3,
          result: 3,
          series: [7,3],
          chartOptions: {
            chart: {
              dropShadow: {
                  enabled: true,
                  opacity: 0.1,
                  blur: 2,
                  left: 3,
                  top: 3
              },
            },
            labels: ['Win', 'Loss'],
            colors: ['#00FFC3','#f44336'],
            legend: {
              show: false
            },
            stroke: {
              show: false,
              curve: 'smooth',
              lineCap: 'butt',
              colors: undefined,
              width: 1,
              dashArray: 0, 
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
            responsive: [{
              breakpoint: 450,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'left'
                }
              }
            }],
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '55%'
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
              colors: '#00FFC3',
              theme: true,
              style: {
                fontSize: '12px',
                fontFamily: "'Karla', sans-serif",
              },
              fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
              },
            },
            dropShadow: {
              enabled: false,
              enabledOnSeries: undefined,
              top: 0,
              left: 0,
              blur: 20,
              color: '#fff',
              opacity: 0.9
            }
          }
      }
    },
    computed: {
      winlossresult: function() {
          return this.result = parseInt(this.win) + parseInt(this.loss);
      },
      winrateresult: function() {
          return ((this.win * 100) / this.result).toFixed(0)
      }
    }
  }
</script>

<style scoped>
.ts_chart-cont {
  width: 100%;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6
}
</style>