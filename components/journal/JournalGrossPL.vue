<template>
    <v-container class="pa-0">
        <v-col class="pa-0" cols="12">
            <v-card-title class="text-left justify-left ml-2 px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">GROSS PROFIT AND LOSS</h6>
                <v-spacer></v-spacer>
                <router-link to="/" class="social__router">
                    <v-btn icon small> 
                        <img src="/icon/journal-icons/share-icon.svg" width="15">
                    </v-btn>
                </router-link>
            </v-card-title>
        </v-col>
        <div class="pt-3" id="chart">
            <apexcharts type=line height=300 :options="chartOptions" :series="series" />
        </div>
    </v-container>
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
                name: "Gross PL",
                data: [30000, 35000, 25000, 20000, 5000, 10000, 15000, 40000, 30000, 35000, 25000, 20000, 5000, 10000, 15000, 13000]
            }],
            chartOptions: {
                annotations: {
                    yaxis: [{
                    y: 30000,
                    borderColor: '#00FFC3',
                    label: {
                        borderColor: '#00FFC3',
                        style: {
                            color: '#fff',
                            background: '#00FFC3',
                        },
                        text: 'Support',
                    }
                    }]
                },
                plotOptions: {
                    line: {
                        colors: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 50000,
                                    color: '#FEB019'
                                }
                            ]
                        },
                        columnWidth: '80%',
                    }
                },
                chart: {
                    height: 350,
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
                    line: {
                        colors: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 50000,
                                    color: '#FEB019'
                                }
                            ]
                        },
                        columnWidth: '80%',
                    }
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
                    borderColor: '#002633',
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
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
                    labels: {
                        show: true,
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
                            color: '#b6b6b6',
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
                title: {
                    text: 'Last 16 Trades',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: true,
                    style: {
                        fontSize:  '14px',
                        fontFamily: 'Karla',
                        color:  '#b6b6b6'
                    },
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
</script>