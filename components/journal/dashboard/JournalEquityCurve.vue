<template>
    <v-col class="pa-0" cols="12" sm="12" md="12">
        <v-card-title class="text-left justify-left px-0 pb-2 pt-5" style="border-bottom: 1px solid #000">
            <h6 class="font-weight-regular subtitle-2" style="color:#fff;">EQUITY CURVE</h6>
            <v-spacer></v-spacer>
            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <div id="chart">
                <apexcharts type=line height=300 :options="chartOptions" :series="series" />
            </div>
        </v-col>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'
import shareModal from '~/components/modals/share'

export default {
    components: {
        apexcharts: VueApexCharts,
        shareModal
    },
    data () {
        return {
            showScheduleForm: false,
            series: [{
                name: "Equity Curve",
                data: [30000, 35000, 25000, 20000, 5000, 10000, 15000, 40000, 30000, 35000, 25000, 20000, 5000, 10000, 15000]
            }],
            chartOptions: {
                annotations: {
                    yaxis: [{
                    y: 30000,
                    borderColor: '#00FFC3',
                    // label: {
                    //     borderColor: '#00FFC3',
                    //     style: {
                    //         color: '#fff',
                    //         background: '#00FFC3',
                    //     },
                    //     text: 'Support',
                    // }
                    }]
                },
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
                    dashArray: 0,
                },
                grid: {
                    show: true,
                    borderColor: '#002633',
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
                xaxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
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
                tooltip: {
                    followCursor: false,
                    y: {
                        show: true,
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
<style>
    .apexcharts-xcrosshairs {
        stroke-dasharray: 0;
        stroke: #002532;
    }
</style>