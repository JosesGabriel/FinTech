import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'

Chart.defaults.Bar = Chart.defaults.Bar;
Chart.controllers.Bar = Chart.controllers.Bar.extend({ 

})

const CustomBar = generateChart('custom-bar', 'Bar')

export default {
    extends: CustomBar,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    data() {
        return {
            options: { //Chart.js options
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }

}