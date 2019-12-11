<template>
    <v-col class="pa-0">
        <div id="chart">
            <apexcharts ref="stratStatsChart" type=bar height=240 :options="chartOptions" :series="series" />
        </div>
        <v-simple-table :dense="true" dark id="liveportfolio-table">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="item_position-prop white--text caption text-left px-1">Strategy</th>
                <th class="item_position-prop white--text caption text-right px-1">Trades</th>
                <th class="item_position-prop white--text caption text-right px-1">Wins</th>
                <th class="item_position-prop white--text caption text-right px-1">Losses</th>
                <th class="item_position-prop white--text caption text-right px-1">Win Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr id="table_tr_port-cont">
                    <td class="item_position-prop caption px-1 py-1">1-2-3 Reversal</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ reversal.trades }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ reversal.win }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ reversal.loss }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ reversal.rate }}%</td>
                </tr>
                <tr id="table_tr_port-cont">
                    <td class="item_position-prop caption px-1 py-1">Trend Following</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ trend_following.trades }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ trend_following.win }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ trend_following.loss }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ trend_following.rate }}%</td>
                </tr>
                <tr id="table_tr_port-cont">
                    <td class="item_position-prop caption px-1 py-1">Breakout Play</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ breakout.trades }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ breakout.win }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ breakout.loss }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ breakout.rate }}%</td>
                </tr>
                <tr id="table_tr_port-cont">
                    <td class="item_position-prop caption px-1 py-1">Bottom Picking</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ bottom_picking.trades }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ bottom_picking.win }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ bottom_picking.loss }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ bottom_picking.rate }}%</td>
                </tr>
                <tr id="table_tr_port-cont">
                    <td class="item_position-prop caption px-1 py-1">First Hour Breakout</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ first_breakout.trades }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ first_breakout.win }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ first_breakout.loss }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ first_breakout.rate }}%</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-col>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

import { mapActions, mapGetters } from "vuex";

export default {
    created() {
        // console.log(this.strategyStat) //undefined;
    },
    props: {
        strategyStat: {
            type: Array
        }
    },
    components: {
        apexcharts: VueApexCharts,
    },
    computed: {
        ...mapGetters({
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            defaultPortfolioId: "journal/getDefaultPortfolioId",
        })
    },
    data () {
        return {
            reversal: {
                trades: 0,
                win: 0,
                loss: 0,
                rate: 0,
            },
            trend_following: {
                trades: 0,
                win: 0,
                loss: 0,
                rate: 0,
            },
            breakout: {
                trades: 0,
                win: 0,
                loss: 0,
                rate: 0,
            },
            bottom_picking: {
                trades: 0,
                win: 0,
                loss: 0,
                rate: 0,
            },
            first_breakout: {
                trades: 0,
                win: 0,
                loss: 0,
                rate: 0,
            },
            data_strat_rev: [],
            data_strat_trend: [],
            data_strat_break: [],
            data_strat_bottom: [],
            data_strat_first: [],
            data_strat_name: [],
            data_strat_value: [],
            data_highest_value: [],
            series: [{
                name: 'Win',
                data: [0,0,0,0]
            }, {
                name: 'loss',
                data: [0,0,0,0]
            }],
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '50',
                        endingShape: 'rounded',
                        dropShadow: {
                            enabled: true,
                            opacity: 0.3,
                            blur: 2,
                            left: 3,
                            top: 10
                        }
                    }
                },
                chart: {
                    toolbar: {
                        show: false
                    },
                },
                colors: ['#00FFC3','#f44336'],
                dataLabels: {
                    enabled: false,
                    offsetX: 0,
                    style: {
                    fontSize: '12px',
                    colors: ['#fff']
                    }
                },
                stroke: {
                    show: false,
                    colors: ['#fff']
                },
                grid: {
                    show: false,
                    borderColor: '#b6b6b6',
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },   
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                },
                legend: {
                    show: false,
                     position: 'right',
                },
                xaxis: {
                    show: true,
                    categories: ['', '', '', ''],
                    labels: {
                        show: false,
                        style: {
                            colors: '#b6b6b6',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-xaxis-label',
                        }
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    }
                },
                yaxis: {
                    show: true,
                    labels: {
                        show: true,
                        align: 'left',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            color: '#b6b6b6',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 102,
                        offsetY: -17
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    }
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
                    theme: false,
                    style: {
                        fontFamily: 'Karla'
                    }
                }
            },
            dataStrat: null
        }
    },
    mounted() {
        
    },
    methods: {
        getStrategyStat() {
            this.data_strat_name = []
            if(this.dataStrat[0].length != 0){
                for (let [key, value] of Object.entries(this.dataStrat[0])) {
                    let arr_name = `${key}`
                    let arr_value = `${value}`
                    
                    this.data_strat_name.push(arr_name)
                    // this.data_strat_value.push(arr_name, arr_value)
                }
                
                this.data_strat = []
                this.series[0].data = [0, 0, 0, 0]
                this.series[1].data = [0, 0, 0, 0]
                this.chartOptions.xaxis.categories = ['', '', '', '']
                if(this.dataStrat[0]['1-2-3 Reversal'] != undefined){
                    for (let [key, value] of Object.entries(this.dataStrat[0]['1-2-3 Reversal'])) {
                        let arr1 = `${value}`
                        this.data_strat_rev.push(parseFloat(arr1))


                    }
                    this.data_highest_value = [{...this.dataStrat[0]['1-2-3 Reversal'], name: '1-2-3 Reversal'}]
                    this.reversal.win = this.data_strat_rev[0]
                    this.reversal.loss = this.data_strat_rev[1]
                    this.reversal.trades = this.reversal.loss + this.reversal.win
                    this.reversal.rate = ((this.reversal.win * 100) / this.reversal.trades).toFixed(0)
                } else {
                    this.data_strat_rev = [0, 0]
                }
                if(this.dataStrat[0]['Trend Following'] != undefined){
                    for (let [key, value] of Object.entries(this.dataStrat[0]['Trend Following'])) {
                        let arr = `${value}`
                        this.data_strat_trend.push(parseFloat(arr))
                    }
                    this.data_highest_value = [{...this.dataStrat[0]['Trend Following'], name: 'Trend Following'},...this.data_highest_value]
                    this.trend_following.win = this.data_strat_trend[0]
                    this.trend_following.loss = this.data_strat_trend[1]
                    this.trend_following.trades = this.trend_following.loss + this.trend_following.win
                    this.trend_following.rate = ((this.trend_following.win * 100) / this.trend_following.trades).toFixed(0)
                } else {
                    this.data_strat_trend = [0, 0]
                }
                if(this.dataStrat[0]['Breakout Play'] != undefined){
                    for (let [key, value] of Object.entries(this.dataStrat[0]['Breakout Play'])) {
                        let arr = `${value}`
                        this.data_strat_break.push(parseFloat(arr))
                    }
                    this.data_highest_value = [{...this.dataStrat[0]['Breakout Play'], name: 'Breakout Play'},...this.data_highest_value]
                    this.breakout.win = this.data_strat_break[0]
                    this.breakout.loss = this.data_strat_break[1]
                    this.breakout.trades = this.breakout.loss + this.breakout.win
                    this.breakout.rate = ((this.breakout.win * 100) / this.breakout.trades).toFixed(0)
                } else {
                    this.data_strat_break = [0, 0]
                }
                if(this.dataStrat[0]['Bottom Picking'] != undefined){
                    for (let [key, value] of Object.entries(this.dataStrat[0]['Bottom Picking'])) {
                        let arr = `${value}`
                        this.data_strat_bottom.push(parseFloat(arr))
                    }
                    this.data_highest_value = [{...this.dataStrat[0]['Bottom Picking'], name: 'Bottom Picking'},...this.data_highest_value]
                    this.bottom_picking.win = this.data_strat_bottom[0]
                    this.bottom_picking.loss = this.data_strat_bottom[1]
                    this.bottom_picking.trades = this.bottom_picking.loss + this.bottom_picking.win
                    this.bottom_picking.rate = ((this.bottom_picking.win * 100) / this.bottom_picking.trades).toFixed(0)
                } else {
                    this.data_strat_bottom = [0, 0]
                }
                if(this.dataStrat[0]['First Hour Breakout'] != undefined){
                    for (let [key, value] of Object.entries(this.dataStrat[0]['First Hour Breakout'])) {
                        let arr = `${value}`
                        this.data_strat_first.push(parseFloat(arr))
                    }
                    this.data_highest_value = [{...this.dataStrat[0]['First Hour Breakout'], name: 'First Hour Breakout'},...this.data_highest_value]
                    this.first_breakout.win = this.data_strat_first[0]
                    this.first_breakout.loss = this.data_strat_first[1]
                    this.first_breakout.trades = this.first_breakout.loss + this.first_breakout.win
                    this.first_breakout.rate = ((this.first_breakout.win * 100) / this.first_breakout.trades).toFixed(0)
                } else {
                    this.data_strat_first = [0, 0]
                }

                    let data_win_rev = [this.data_strat_rev[0],this.data_strat_trend[0], this.data_strat_break[0], this.data_strat_bottom[0], this.data_strat_first[0],...this.series[0].data].slice(0, 4);
                    let data_loss_rev = [this.data_strat_rev[1],this.data_strat_trend[1], this.data_strat_break[1], this.data_strat_bottom[1], this.data_strat_first[1],...this.series[1].data].slice(0, 4);

                    this.$refs.stratStatsChart.updateSeries([
                        {
                            data: data_win_rev
                        },{
                            data: data_loss_rev
                        },
                    ]);
                    this.chartOptions = {
                        ...this.chartOptions,...{ xaxis: { categories: [...this.data_strat_name,...this.chartOptions.xaxis.categories].slice(0, 4)}}
                    };
                    var res = Math.max.apply(Math,this.data_highest_value.map(function(o){return o.win;}))

                    var obj = this.data_highest_value.find(function(o){ return o.win == res; })

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
    }
}
</script>
<style scoped>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6
}
</style>