<template>
    <v-col class="pa-0 pl-10" cols="8" sm="8" md="8">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">CURRENT ALLOCATION</h6>
        </v-card-title>
        <v-row no-gutters>
            <v-col class="pa-0 px-5 pr-10" cols="6" sm="6" md="6">
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in allodata" :key="item.stocks" id="table_tr_snap-cont">
                            <v-icon class="pa-1 caption" :style="{ 'color': item.bulletcolor}">mdi-circle</v-icon>
                            <td id="table_td_snap-cont" class="px-1 py-1">{{ item.stocks }}</td>
                            <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ item.position }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col class="pa-0" cols="6" sm="6" md="6">
                <div class="small">
                    <chart-chart :chart-data="datacollection"></chart-chart>
                </div>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
  import ChartChart from '~/assets/js/journal/AllocationChart.js'

  export default {
    components: {
      ChartChart
    },
    data () {
      return {
        datacollection: {},
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
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          datasets: [
            {   
              label: 'Data One',
              backgroundColor: [
                '#008062',
                '#008C6C',
                '#009975',
                '#00A67F',
                '#00BF93',
                '#00CC9C',
                '#00D9A6',
                '#00F2BA',
                '#00FFC3',
            ],
              borderColor: 'transparent',
              data: [21, 37, 43, 28, 17, 25, 17, 25, 30]
            }
          ]
        }
      },
    },
    options: {
        
    }
  }
</script>

<style>
  .small {
    width: 100%;
  }
</style>