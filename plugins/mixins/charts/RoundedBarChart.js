// 1. Import Chart.js so you can use the global Chart object
import Chart from 'chart.js'

// 2. Import the `generateChart()` method to create the vue component.
import { generateChart } from 'vue-chartjs'

// 3. Extend one of the default charts
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.RoundedBarChart = Chart.defaults.bar;
Chart.controllers.RoundedBarChart = Chart.controllers.bar.extend({
  name: "RoundedBarChart",
  initialize: function (data) {
    Chart.types.Bar.prototype.initialize.apply(this, arguments);

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

// 4. Generate the vue-chartjs component
// First argument is the chart-id, second the chart type.
const RoundedBarChart = generateChart('rounded-bar-chart', 'RoundedBarChart')

// 5. Extend the CustomLine Component just like you do with the default vue-chartjs charts.

export default {
  extends: RoundedBarChart,
  mounted () {
    // ....
  }
}