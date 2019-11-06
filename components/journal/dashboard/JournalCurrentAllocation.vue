<template>
    <v-col class="pa-0" cols="8" sm="8" md="8">
        <v-card-title class="text-left justify-left mx-3 px-0 pb-2 pt-5" style="border-bottom: 1px solid #000">
            <h6 class="font-weight-regular white--text subtitle-2" style="color:#fff;">CURRENT ALLOCATION</h6>
            <v-spacer></v-spacer>
            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-row no-gutters>
            <v-col class="pa-0 pt-3 px-5" cols="6" sm="6" md="6">
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in allodata" :key="item.stocks" id="table_tr_snap-cont">
                            <v-icon class="pa-1 caption" :style="{ 'color': item.bulletcolor}">mdi-circle</v-icon>
                            <td class="item_position-prop caption px-1 py-1">{{ item.stocks }}</td>
                            <td class="item_position-prop caption text-right px-1 py-1">{{ item.position }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col class="pa-0 pt-5" cols="6" sm="6" md="6">
                <div class="small">
                    <apexcharts width="280" height="280" type="donut" :options="chartOptions" :series="series"></apexcharts>
                </div>
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
        allodata: [
          {
            stocks: 'BDO',
            position: '10,000.00',
            bulletcolor: '#00FFC3',
          },
          {
            stocks: 'BDO1',
            position: '10,000.00',
            bulletcolor: '#00F2BA',
          },
          {
            stocks: 'HLCM',
            position: '10,000.00',
            bulletcolor: '#00CC9C',
          },
          {
            stocks: '2GO',
            position: '10,000.00',
            bulletcolor: '#00BF93'
          },
          {
            stocks: 'KPPI1',
            position: '10,000.00',
            bulletcolor: '#00A67F'
          },
          {
            stocks: 'HOME',
            position: '10,000.00',
            bulletcolor: '#009975'
          },
          {
            stocks: 'KPPI2',
            position: '10,000.00',
            bulletcolor: '#008C6C'
          },
          {
            stocks: 'KPPI3',
            position: '10,000.00',
            bulletcolor: '#008062'
          },
          {
            stocks: 'KPPI4',
            position: '10,000.00',
            bulletcolor: '#008062'
          }
        ],
        series: [70, 60, 50, 40, 30, 20, 10],
        chartOptions: {
          labels: ['BDO', 'KPPI', 'HLCM', '2GO', 'HOME', 'HLCM', 'HOUSE'],
          colors: ['#00FFC3', '#00F2BA', '#00CC9C', '#00BF93', '#00A67F', '#008C6C', '#009975'],
          legend: {
            show: false
          },
          chart: {
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
                size: '55%',
                background: 'transparent',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '12px',
                    fontFamily: 'Karla',
                    color: "#d8d8d8",
                    offsetY: -5
                  },
                  value: {
                    show: true,
                    fontSize: '12px',
                    fontFamily: 'Karla',
                    color: "#d8d8d8",
                    offsetY: -5,
                    formatter: function (val) {
                      return val + ".00"
                    }
                  },
                  total: {
                    show: true,
                    label: 'Total Allocation',
                    fontSize: '12px',
                    fontFamily: 'Karla',
                    color: '#d8d8d8',
                  }
                }
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
    }
  }
</script>

<style scoped>
  .small {
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