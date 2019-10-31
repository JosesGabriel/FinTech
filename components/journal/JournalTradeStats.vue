<template>
    <v-col class="pa-0 pl-10" cols="4" sm="4" md="4">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">TRADE STATISTICS</h6>
        </v-card-title>
        <v-row no-gutters>
            <v-col class="pa-0">
                <div class="ts_chart-cont">
                    <chart-chart :chart-data="datacollection"></chart-chart>
                </div>
            </v-col>
            <v-col class="pa-0">
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
  import ChartChart from '~/assets/js/journal/TradeStats.js'

  export default {
    components: {
      ChartChart
    },
    data () {
      return {
        datacollection: {},
        win: 7,
        loss: 3,
        result: 3,
      }
    },
    mounted () {
        this.fillData()
    },
    computed: {
        winlossresult: function() {
            return this.result = parseInt(this.win) + parseInt(this.loss);
        },
        winrateresult: function() {
            return ((this.win * 100) / this.result).toFixed(0)
        }
    },
    methods: {
        fillData () {
        this.datacollection = {
            datasets: [
                {   
                    label: 'Data One',
                    backgroundColor: [
                        '#48FFD5',
                        '#FF4848',
                    ],
                    borderColor: 'transparent',
                    data: [60,40]
                }
                ]
            }
        }
    },
    options: {
        
    }
  }
</script>

<style>
  .ts_chart-cont {
    width: 100%;
  }
</style>