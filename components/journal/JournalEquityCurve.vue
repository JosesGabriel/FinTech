<template>
    <v-col class="pa-0" cols="12" sm="12" md="12">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">EQUITY CURVE</h6>
        </v-card-title>
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <div id="chart">
                <apexcharts type=line height=300 :options="chartOptions" :series="series" />
            </div>
        </v-col>
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
            series: [{
                name: "Equity Curve",
                data: [30000, 35000, 25000, 20000, 5000, 10000, 15000, 40000, 30000, 35000, 25000, 20000, 5000, 10000, 15000]
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                    },
                    dropShadow: {
                        enabled: true,
                        opacity: 0.3,
                        blur: 2,
                        left: 3,
                        top: 4
                    },
                },
                colors: ['#00FFC3'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                    shadow: {
                        enabled: false,
                        color: '#bbb',
                        top: 3,
                        left: 2,
                        blur: 5,
                        opacity: 1
                    },
                },
                grid: {
                    show: true,
                    borderColor: '#17314B',
                    xaxis: {
                        lines: {
                            show: true
                        }
                    },   
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                },
                xaxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                    labels: {
                        show: true,
                        style: {
                            colors: '#ffffff',
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
                    },
                    tooltip: {
                        enabled: false,
                        formatter: undefined,
                        offsetX: 0,
                        style: {
                            fontSize: 10,
                            fontFamily: 'Karla',
                        },
                        theme: false,
                    },
                },
                yaxis: {
                    labels: {
                        show: true,
                        align: 'right',
                        style: {
                            color: '#fff',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-yaxis-label',
                        }
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                        color: '#17314B'

                    }
                },
                tooltip: {
                    followCursor: false,
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
                    onDatasetHover: {
                        highlightDataSeries: false
                    },
                    theme: false,
                    style: {
                        fontFamily: 'Karla'
                    },
                    items: {
                        display: 'flex',
                    },
                    fixed: {
                        position: 'topRight',
                        offsetX: 20,
                        offsetY: -10,
                    },
                }
            }
        }
    }
}
</script>>