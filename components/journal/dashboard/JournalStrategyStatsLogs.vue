<template>
    <v-col class="pa-0">
        <div id="chart">
            <apexcharts type=bar height=240 :options="chartOptions" :series="series" />
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
                <tr v-for="item in strategy" :key="item.stocks" id="table_tr_port-cont">
                <td class="item_position-prop caption px-1 py-1">{{ item.stats }}</td>
                <td class="item_position-prop caption text-right px-1 py-0">{{ item.trades }}</td>
                <td class="item_position-prop caption text-right px-1 py-0">{{ item.wins }}</td>
                <td class="item_position-prop caption text-right px-1 py-0">{{ item.losses }}</td>
                <td class="item_position-prop caption text-right px-1 py-0">{{ item.winrate }}</td>
                
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
                data: [44, 55, 41, 20]
            }, {
                name: 'loss',
                data: [53, 32, 33, 20]
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
                    categories: ['Bottom Picking', 'Breakout Play', 'Trend Following', 'Others'],
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
            }
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