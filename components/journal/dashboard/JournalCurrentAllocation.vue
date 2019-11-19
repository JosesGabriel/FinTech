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
                            <tr id="table_tr_snap-cont">
                            <!-- <v-icon class="pa-1 caption" :style="{ 'color': item.bulletcolor}">mdi-circle</v-icon> -->
                            <td class="item_position-prop caption px-1 py-1">Cash</td>
                            <td class="item_position-prop caption text-right px-1 py-1">{{ cash }}</td>
                            </tr>
                            <tr v-for="item in allodata" :key="item.stocks" id="table_tr_snap-cont">
                            <!-- <v-icon class="pa-1 caption" :style="{ 'color': item.bulletcolor}">mdi-circle</v-icon> -->
                            <td class="item_position-prop caption px-1 py-1">{{ item.stock_id }}</td>
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
        isLightMode: 0,
        darkText: '#b6b6b6',
        allodata: [],
        cash: null,
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
    },
    mounted() {
      if (localStorage.currentProfile) this.selectedProfile = localStorage.currentProfile;
      const openparams = {
      user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
      fund: this.selectedProfile,
      };
      this.$api.journal.portfolio.open(openparams).then(
        function(result) {
          this.allodata = result.meta.allocations.slice(1);
          this.cash = result.meta.allocations[0].position;
          for (let i = 0; i < this.allodata.length; i++) {
            const params = {
              "symbol-id": this.allodata[i].stock_id
            };
            this.$api.chart.stocks.list(params).then(
              function(result) {
                this.allodata[i].stock_id = result.data.symbol;
              }.bind(this)
            );
          }
        }.bind(this)
      );
    },
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