<template>
    <v-col class="pa-0" cols="12" sm="12" md="12">
        <v-card-title class="text-left justify-left px-0 pb-2 pt-5" style="border-bottom: 1px solid #000">
            <h6 class="font-weight-regular subtitle-2" style="color:#fff;">EQUITY CURVE</h6>
            <v-spacer></v-spacer>
            <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Day</v-btn>
            <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Week</v-btn>
            <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Month</v-btn>
            <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Year</v-btn>
            <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Custom</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-col class="pa-0 pt-5" cols="12" sm="12" md="12">
            <div id="chart">
                <apexcharts ref="equityCurveChart" type=line height=300 :options="chartOptions" :series="series" />
            </div>
        </v-col>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
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
        }),
    },
    data () {
        return {
            showScheduleForm: false,
            selection: 'one_year',
            series: [{
                data: []
            }],
            chartOptions: {
                dataLabels: {
                    enabled: false
                },
                annotations: {
                    yaxis: [{
                    y: 0,
                    borderColor: '#03DAC5',
                    }]
                },
                chart: {
                    height: 350,
                    dropShadow: {
                        enabled: true,
                        opacity: 0.3,
                        blur: 2,
                        left: 3,
                        top: 4
                    },
                    toolbar: {
                        show: true,
                        tools: {
                            download: false,
                            selection: true,
                            zoom: false,
                            zoomin: '<img src="/icon/journal-icons/search-plus-solid.svg" width="20">',
                            zoomout: '<img src="/icon/journal-icons/search-minus-solid.svg" width="20">',
                            pan: false,
                            reset: '<img src="/icon/journal-icons/home-solid.svg" width="20">',
                            customIcons: []
                        },
                        autoSelected: 'zoom' 
                        },
                },
                colors: ['#03DAC5'],
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
                    type: 'datetime',
                    tickAmount: 6,
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
                            fontSize: '12px',
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
                        show: true,
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
    mounted() {
        this.getEquityCurve();
    },
    methods: {
        getEquityCurve() {
            this.equityCurveArr = []
            if (this.defaultPortfolioId != null) {
                const equitycurveparams = {
                    user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
                    fund: this.defaultPortfolioId,
                }
                this.$api.journal.portfolio.equitycurve(equitycurveparams)
                .then(response => {
                    for (let [key, value] of Object.entries(response.data.curve)) {
                        let arr = `${value}`
                        let name = `${key}`

                        const dataarr = new Date(name).getTime();
                        const valuearr = parseFloat(arr);
                        
                        this.equityCurveArr.push([dataarr, valuearr])
                        
                    }
                    this.$refs.equityCurveChart.updateSeries([
                        {
                            data: this.equityCurveArr
                        }
                    ]);
                    this.chartOptions = {
                        ...this.chartOptions,
                            ...{
                                annotations: {yaxis: [{ y: this.equityCurveArr[0][1], borderColor: '#03DAC5'}]}
                            }
                    };
                });
            }
            this.componentKeys++;
        }
    },
    watch: {
        renderPortfolioKey: function() {
            this.getEquityCurve();
        }
    }
}
</script>
<style>
    .apexcharts-xcrosshairs {
        stroke-dasharray: 0;
        stroke: #002532;
    }
    .apexcharts-reset-zoom-icon {
        margin: 0;
    }
</style>