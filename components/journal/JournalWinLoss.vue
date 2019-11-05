<template>
    <v-container class="px-5">
        <v-row no-gutters>
        <div class="small mt-10 pt-5">
            <apexcharts height=270 type=donut :options="chartOptions" :series="series"></apexcharts>
        </div>
            <v-col class="pa-3" cols="12">
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr id="table_tr_snap-cont">
                                <td id="table_td_snap-cont" class="px-1 py-1"><v-icon class="pr-1 caption" color="#00ffc3">mdi-circle</v-icon>Winning Strategy</td>
                                <td id="table_td_snap-cont" class="text-right px-1 py-1">Bottom Picking</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="px-1 py-1"><v-icon class="pr-1 caption" color="#FF4848">mdi-circle</v-icon>Lossing Strategy</td>
                                <td class="text-right px-1 py-1">Trend Following</td>
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

    export default {
        components: {
            apexcharts: VueApexCharts
        },
        data () {
            return {
                win: 7,
                loss: 3,
                result: 3,
                series: [7,3],
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
                colors: ['#00FFC3','#FF4848'],
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
    }
}
</script>