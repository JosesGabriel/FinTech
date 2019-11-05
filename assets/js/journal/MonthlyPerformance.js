import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData',' option'],
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
              barRoundness: 1,
              maintainAspectRatio: false
          }
      }
  },
  mounted() {
      this.renderChart(this.chartdata, this.options)
  }

}