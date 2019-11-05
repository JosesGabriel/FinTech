<template>
    <v-col class="pa-0">
        <div id="chart">
            <apexcharts type=bar :options="chartOptions" :series="series" />
        </div>
        <v-simple-table :dense="true" dark id="liveportfolio-table">
            <template v-slot:default>
            <thead>
                <tr class="headline">
                <th id="table_head_tr_port-cont" class="text-left px-1">Strategy</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Trades</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Wins</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Losses</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Win Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in strategy" :key="item.stocks" id="table_tr_port-cont">
                <td id="table_td_port-cont" class="px-1 py-2">{{ item.stats }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.trades }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.wins }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.losses }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.winrate }}</td>
                
                </tr>
            </tbody>
            </template>
        </v-simple-table>
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
            strategy: [
                {
                stats: 'Bottom Picking',
                trades: 10,
                wins: 7,
                losses: 3,
                winrate: '70.00%',
                },{
                stats: 'Breakout Play',
                trades: 10,
                wins: 7,
                losses: 3,
                winrate: '70.00%',
                },{
                stats: 'Trend Following',
                trades: 10,
                wins: 7,
                losses: 3,
                winrate: '70.00%',
                },{
                stats: '1-2-3 Reversal',
                trades: 10,
                wins: 7,
                losses: 3,
                winrate: '70.00%',
                },{
                stats: 'First Hour Breakout',
                trades: 10,
                wins: 7,
                losses: 3,
                winrate: '70.00%',
                }
            ],
            series: [{
                name: 'Win',
                data: [44, 55, 41]
            }, {
                name: 'loss',
                data: [53, 32, 33]
            }],
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '30',
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
                colors: ['#00FFC3','#FF4848'],
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
                    borderColor: '#17314B',
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
                    categories: ['Bottom Picking', 'Breakout Play', 'Trend Following'],
                    labels: {
                        show: true,
                        style: {
                            colors: '#d8d8d8',
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
                            color: '#ffffff',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 105,
                        offsetY: -23
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
            }
        }
    }
}
</script>
