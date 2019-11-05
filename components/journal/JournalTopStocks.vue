<template>
    <v-container>
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <v-card-title class="text-left justify-left px-0 py-3 pt-5">
                <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">TOP STOCKS</h6>
            </v-card-title>
            <v-col class="pa-0" cols="12" sm="12" md="12">
                <div id="chart">
                    <apexcharts type=bar height=300 :options="chartOptions" :series="series" />
                </div>
            </v-col>
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
                data: [-20000, -19000, -18000, -17000, -16000, -15000, -14000, -13000, -12000, -11000]
            }],
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        }
                },
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    show: true,
                    borderColor: 'transparent'
                },
                xaxis: {
                    categories: ['United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                    ],
                    labels: {
                        position: 'bottom',
                        style: {
                            colors: '#fff',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-xaxis-label',
                        }
                    }
                },
                yaxis: {
                    show: false,
                    reversed: true,
                    labels: {
                        position: 'bottom',
                        style: {
                            colors: '#ffffff',
                            fontSize: '12px',
                            fontFamily: 'Karla',
                            cssClass: 'apexcharts-xaxis-label',
                        }
                    }
                }
            }
        }
    }
}
</script>