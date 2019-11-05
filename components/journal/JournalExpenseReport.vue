<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-card-title class="text-left justify-left px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">EXPENSE REPORT</h6>
                <v-spacer></v-spacer>
                <router-link to="/" class="social__router">
                <v-btn icon small> 
                    <img src="/icon/journal-icons/share-icon.svg" width="15">
                </v-btn>
                </router-link>
            </v-card-title>
        </v-col>
        <v-col class="pa-0 pt-3 pr-5" cols="4" sm="4" md="4">
            <v-card color="#00121E" elevation="0" dark>
                <v-card-title class="text-left justify-left pa-0">
                    <h6 class="font-weight-regular caption white--text text-capitalize">Trading Result (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Commisions</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ comm }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Value Added Tax</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ vadd }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Transfer Fee</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ tfee }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">SCCP</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ sccp }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Sales Tax</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ stax }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-col>
        <v-col class="pa-0 pl-5" cols="8" sm="8" md="8">
            <div id="chart">
                <apexcharts type=line height=230 :options="chartOptions" :series="series" />
            </div>
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
            comm: '100,000,000.00',
            vadd: '100,000,000.00',
            tfee: '100,000,000.00',
            sccp: '100,000,000.00',
            stax: '100,000,000.00',
        
            series: [{
                name: "Expenses",
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
                colors: ['#F44336'],
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
<style scoped>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6
}
</style>