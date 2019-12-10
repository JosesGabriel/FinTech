<template>
    <v-container class="py-0">
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <div id="chart">
                <apexcharts ref="lossersChart" type=bar height=230 :options="chartOptions" :series="series" />
            </div>
        </v-col>
    </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        apexcharts: VueApexCharts
    },
    computed: {
        ...mapGetters({
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            defaultPortfolioId: "journal/getDefaultPortfolioId",
        })
    },
    props: {
        negaArr: {
            type: Array
        }
    },
    data () {
        return {
            losserArr: [],
            series: [{
                name: 'Lossers',
                data: [ 0, 0, 0, 0, 0, 0, 0]
            }],
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '60%',
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
                colors: ['#F44336'],
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
                    opposite: false,
                    max: 0,
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
                        offsetX: 0,
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
                    text: 'Lossers',
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
    },
    methods: {
        getTopLossers() {
            this.losserArr = []
            if(this.negaArr.length != 0){
                
                for (let i = 0; i < this.negaArr.length; i++) {
                    this.losserArr.push(parseFloat(this.negaArr[i].value))
                }
                
                let data_loss = [...this.losserArr,...this.series[0].data].slice(0, 7);
                this.$refs.lossersChart.updateSeries([
                    {
                        data: data_loss
                    }
                ]);

                console.log(data_loss)
                console.log(this.losserArr)
                console.log(this.series)
            }
        }
    },
    watch: {
        negaArr() {
            this.getTopLossers();
        }
    }
}
</script>