<template>
    <v-container class="py-0">
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <div id="chart">
                <apexcharts type=bar height=230 :options="chartOptions" :series="series" />
            </div>
        </v-col>
    </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
        apexcharts: VueApexCharts
    },
    data () {
        return {
            series: [{
                name: 'Winners',
                data: [ 80, 53, 50, 44, 41, 40, 35]
            }],
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '60%',
                        endingShape: 'rounded',
                    }
                },
                chart: {
                    toolbar: {
                        show: false
                    },
                    dropShadow: {
                        enabled: false,
                        enabledOnSeries: undefined,
                        top: 10,
                        left: 10,
                        blur: 3,
                        color: '#000',
                        opacity: 1
                    }
                },
                colors: ['#00FFC3'],
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
                    show: true,
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
                    type: 'category',
                    categories: ['DD', 'DDPR', 'DELM', 'DFNN', 'DIZ', 'DMC', 'DMW'],
                    labels: {
                        show: false
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
                    opposite: true,
                    labels: {
                        show: true,
                        align: 'right',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            color: '#b6b6b6',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 410,
                        offsetY: 2
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    }
                },
                title: {
                    text: 'Winners',
                    align: 'middle',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: true,
                    style: {
                        fontSize:  '14px',
                        fontFamily: 'Karla',
                        color:  '#d8d8d8'
                    },
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
                    },
                    followCursor: true,
                }
            }
        }
    }
}
</script>