<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-card-title class="text-left justify-left px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">EMOTIONAL STATISTICS</h6>
                <v-spacer></v-spacer>
                <router-link to="/" class="social__router">
                <v-btn icon small> 
                    <img src="/icon/journal-icons/share-icon.svg" width="15">
                </v-btn>
                </router-link>
            </v-card-title>
        </v-col>
        <v-col class="pa-0" cols="6" sm="6" md="6">
            <div id="chart">
                <apexcharts type=bar height=200 :options="chartOptions" :series="series" />
            </div>
        </v-col>
        <v-col class="pa-0 pt-3" cols="6" sm="6" md="6">
            <v-simple-table :dense="true" dark id="liveportfolio-table">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="item_caption white--text text-left px-1">Emotions</th>
                    <th class="item_caption white--text text-right px-1">Trade</th>
                    <th class="item_caption white--text text-right px-1">Wins</th>
                    <th class="item_caption white--text text-right px-1">Losses</th>
                    <th class="item_caption white--text text-right px-1">Win Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in emo" :key="item.stats" id="table_tr_port-cont">
                    <td class="item_position-prop caption px-1 py-2">{{ item.stats }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ item.trades }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ item.wins }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ item.losses }}</td>
                    <td class="item_position-prop caption text-right px-1 py-0">{{ item.winrate }}</td>
                    
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>


<script>

import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
        apexcharts: VueApexCharts,
    },
    data () {
        return {
            emo: [
                {
                stats: 'Neutral',
                trades: 1,
                wins: 1,
                losses: 0,
                winrate: '100.00%',
                },{
                stats: 'Greedy',
                trades: 0,
                wins: 0,
                losses: 0,
                winrate: '70.00%',
                },{
                stats: 'Fearful',
                trades: 0,
                wins: 0,
                losses: 0,
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
                        barHeight: '40',
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
                    categories: ['Neutral', 'Greedy', 'Fearful'],
                    labels: {
                        show: false,
                        style: {
                            colors: '#b6b6b6',
                            fontSize: '12px',
                            fontFamily: "'Karla'",
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
                        offsetX: 60,
                        offsetY: -20
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