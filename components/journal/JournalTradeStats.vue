<template>
    <v-col class="pa-0 pl-10" cols="5" sm="5" md="5">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">TRADE STATISTICS</h6>
        </v-card-title>
        <v-row no-gutters>
            <v-col class="pa-0" cols="12">
                <div class="small">
                    <apexcharts type=donut :options="chartOptions" :series="series"></apexcharts>
                </div>
            </v-col>
            <v-col class="pa-0" cols="12">
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr id="table_tr_snap-cont">
                                <td id="table_td_snap-cont" class="px-1 py-1"><v-icon class="pr-1 caption" color="#00ffc3">mdi-circle</v-icon>Win</td>
                                <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ win }}</td>
                                
                                <td id="table_td_snap-cont" class="px-1 py-1"><v-icon class="pr-1 caption" color="#FF4848">mdi-circle</v-icon>Loss</td>
                                <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ loss }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td id="table_td_snap-cont" class="px-1 py-1">Total Trades</td>
                                <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ winlossresult }}</td>
                                
                                <td id="table_td_snap-cont" class="px-1 py-1">Win Rate</td>
                                <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ winrateresult }}%</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
    components: {
      apexcharts: VueApexCharts,
    },
    data () {
        return {        
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
          colors: ['#00FFC3','#FF4848'],
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

<style>
  .ts_chart-cont {
    width: 100%;
  }
</style>