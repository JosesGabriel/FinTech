import Chart from 'chart.js'
import { generateChart, mixins } from 'vue-chartjs'

// Chart.defaults.Bar = Chart.defaults.Bar;
// var originalBarController = Chart.controllers.bar;
// var originalBarControllers = Chart.controllers;

Chart.controllers.Bar =  Chart.controllers.bar.extend({ 
    name: "generateChart",
    draw: function () {
        Chart.controllers.bar.prototype.draw.apply(this, arguments);
        console.log(Chart.controllers.bar.prototype.draw)

        if (this.options.curvature !== undefined && this.options.curvature <= 1) {
            var rectangleDraw = this.datasets[0].bars[0].draw;
            var self = this;
            var radius = this.datasets[0].bars[0].width * this.options.curvature * 0.5;
            
            // override the rectangle draw with ours
            this.datasets.forEach(function (dataset) {
                dataset.bars.forEach(function (bar) {
                    bar.draw = function () {
                        // draw the original bar a little down (so that our curve brings it to its original position)
                        var y = bar.y;
                        // the min is required so animation does not start from below the axes
                        bar.y = Math.min(bar.y + radius, self.scale.endPoint - 1);
                        // adjust the bar radius depending on how much of a curve we can draw
                        var barRadius = (bar.y - y);
                        rectangleDraw.apply(bar, arguments);
                        
                        // draw a rounded rectangle on top
                        Chart.helpers.drawRoundedRectangle(self.chart.ctx, bar.x - bar.width / 2, bar.y - barRadius + 1, bar.width, bar.height, barRadius);
                        ctx.fill();
                        
                        // restore the y value
                        bar.y = y;
                    }
                })
            })
        }
    }
})

const CustomBar = generateChart('custom-bar', 'Bar')

export default {
    extends: CustomBar,
    mixins: [mixins.reactiveProp],
    props: ['chartData',' option'],
    data() {
        return {
            options: { //Chart.js options
                curvature: 1,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                barRoundness: 1,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
  }