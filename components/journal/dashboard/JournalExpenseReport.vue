<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-card-title class="text-left justify-left px-0 pb-2 pt-0" style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">EXPENSE REPORT</h6>
                <v-spacer></v-spacer>
                <v-btn icon small @click.stop="showScheduleForm=true"> 
                    <img src="/icon/journal-icons/share-icon.svg" width="15">
                </v-btn>
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
                                <td class="item_position-prop caption text-right px-1 py-1">{{ formatPrice(parseFloat(comm)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Value Added Tax</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ formatPrice(parseFloat(vadd)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Transfer Fee</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ formatPrice(parseFloat(tfee)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">SCCP</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ formatPrice(parseFloat(sccp)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop caption px-1 py-2">Sales Tax</td>
                                <td class="item_position-prop caption text-right px-1 py-1">{{ formatPrice(parseFloat(stax)) }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-col>
        <v-col class="pa-0 pl-5" cols="8" sm="8" md="8">
            <div id="chart">
                <apexcharts ref="ExpenseReportTrades" type=line height=230 :options="chartOptions" :series="series" />
            </div>
        </v-col>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-row>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import shareModal from '~/components/modals/share'

import { mapGetters } from "vuex";

export default {
    components: {
        apexcharts: VueApexCharts,
        shareModal
    },
    computed: { 
        ...mapGetters({
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            defaultPortfolioId: "journal/getDefaultPortfolioId",
            journalCharts: "journal/getJournalCharts",
        })
    },
    data () {
        return {
            showScheduleForm: false,
            expenseReportArray: [],
            comm: '0.00',
            vadd: '0.00',
            tfee: '0.00',
            sccp: '0.00',
            stax: '0.00',
        
            series: [{
                name: "Expenses",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                    // categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                    labels: {
                        show: true,
                        style: {
                            colors: '#b6b6b6',
                            fontSize: '12px',
                            fontFamily: "'Nunito' !important",
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
                            fontFamily: "'Nunito' !important",
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
                            fontFamily: "'Nunito' !important",
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        formatter: function (value) {
                            let val = (value/1).toFixed(2).replace('.', '.')
                            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                        formatter: function (value) {
                            let val = (value/1).toFixed(2).replace('.', '.')
                            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                        fontFamily: "'Nunito' !important"
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
    },
    methods: {
        getExpenseReport() {
            if (this.journalCharts != null) {
                const objExpenseReport = this.journalCharts.meta.expense_report
                const objExpenseReportTrades = this.journalCharts.meta.expense_report_trades
                const expenseReportArray = []
                    Object.keys(objExpenseReport).forEach(function(key) {
                        expenseReportArray.push({value: objExpenseReport[key], name: key});
                        
                    });
                    this.expenseReportArray = expenseReportArray

                    for( let i = 0; i < this.expenseReportArray.length; i++) {
                        if(this.expenseReportArray[i].name == "commission"){
                            this.comm = this.expenseReportArray[i].value
                        } else if(this.expenseReportArray[i].name == "tax") {
                            this.vadd = this.expenseReportArray[i].value
                        } else if(this.expenseReportArray[i].name == "transfer_fee") {
                            this.tfee = this.expenseReportArray[i].value
                        } else if(this.expenseReportArray[i].name == "sccp") {
                            this.sccp = this.expenseReportArray[i].value
                        } else if(this.expenseReportArray[i].name == "sell_fee") {
                            this.stax = this.expenseReportArray[i].value
                        }

                    }
                    
                    if(objExpenseReportTrades.length != 0) {
                        // load data series on line chart
                        this.$refs.ExpenseReportTrades.updateSeries([
                            {
                                data: objExpenseReportTrades.slice(0, 10)
                            }
                        ]);
                    }
            }
            this.componentKeys++;
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
    },
    mounted() {
        this.getExpenseReport();
    },
    watch: {
        journalCharts: function() {
            this.getExpenseReport();
        },
        renderPortfolioKey: function() {
            this.getExpenseReport();
        }
    }
}
</script>
<style>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
</style>