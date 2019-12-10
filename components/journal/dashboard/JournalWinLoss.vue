<template>
    <v-container class="px-5">
        <v-row no-gutters>
        <div class="small mx-8 pt-10">
            <apexcharts height=270 type=donut :options="chartOptions" :series="series"></apexcharts>
        </div>
            <v-col class="pa-3" cols="12">
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-1"><v-icon class="pr-1 caption" color="#00ffc3">mdi-circle</v-icon>Winning Strategy</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ winStrategy }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-1"><v-icon class="pr-1 caption" color="#f44336">mdi-circle</v-icon>Lossing Strategy</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ lossStrategy }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        apexcharts: VueApexCharts
    },
    computed: {
        ...mapGetters({
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            defaultPortfolioId: "journal/getDefaultPortfolioId",
        })
    },
    props: {
        strategyStat: {
            type: Array
        }
    },
    data () {
        return {
            winStrategy: '',
            lossStrategy: '',
            series: [],
            data_strat_rev: [],
            data_strat_trend: [],
            data_strat_break: [],
            data_strat_bottom: [],
            data_strat_first: [],
            data_strat_name: [],
            data_strat_value: [],
            data_highest_value: [],
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
            labels: ['Winning', 'Lossing'],
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
    methods: {
        getStrategyStat() {
            
            this.series = []
            if(this.dataStrat[0].length != 0){
                
                if(this.dataStrat[0]['1-2-3 Reversal'] != undefined){
                    this.data_highest_value = [{...this.dataStrat[0]['1-2-3 Reversal'], name: '1-2-3 Reversal'}]
                }
                if(this.dataStrat[0]['Trend Following'] != undefined){
                    this.data_highest_value = [{...this.dataStrat[0]['Trend Following'], name: 'Trend Following'},...this.data_highest_value]
                }
                if(this.dataStrat[0]['Breakout Play'] != undefined){
                    this.data_highest_value = [{...this.dataStrat[0]['Breakout Play'], name: 'Breakout Play'},...this.data_highest_value]
                }
                if(this.dataStrat[0]['Bottom Picking'] != undefined){
                    this.data_highest_value = [{...this.dataStrat[0]['Bottom Picking'], name: 'Bottom Picking'},...this.data_highest_value]
                }
                if(this.dataStrat[0]['First Hour Breakout'] != undefined){
                    this.data_highest_value = [{...this.dataStrat[0]['First Hour Breakout'], name: 'First Hour Breakout'},...this.data_highest_value]
                }
                
                var resWin = Math.max.apply(Math,this.data_highest_value.map(function(o){return o.win;}))
                var resLoss = Math.max.apply(Math,this.data_highest_value.map(function(o){return o.loss;}))

                var objWin = this.data_highest_value.find(function(o){ return o.win == resWin; })
                var objLoss = this.data_highest_value.find(function(o){ return o.loss == resLoss; })

                this.winStrategy = objWin.name
                this.lossStrategy = objLoss.name

                this.series = [objWin.win,objLoss.loss,...this.series]

                // console.log(this.winStrategy, this.lossStrategy)
                // console.log(this.series)
                // console.log(this.dataStrat[0]['1-2-3 Reversal'], this.dataStrat[0]['Trend Following'], this.dataStrat[0]['Breakout Play'])
                // console.log(Math.max(...data_win_rev), Math.max(...data_loss_rev))
            }
            this.componentKeys++;
        }
    },
    watch: {
        strategyStat() {
            this.dataStrat = this.strategyStat
            this.getStrategyStat();    
            // console.log(this.dataStrat[0].length == 0)
        }
    },
    mounted() {
        // this.getStrategyStat();
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