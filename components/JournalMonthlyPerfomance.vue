<template>
    <v-col class="pa-0" cols="8" sm="8" md="8">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">MONTHLY PERFORMANCE</h6>
        </v-card-title>
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <div class="mp_chart-cont">
                <chart-chart :chart-data="datacollection" :height="200"></chart-chart>
            </div>
        </v-col>
    </v-col>
</template>
<script>
  import ChartChart from '~/MonthlyPerformance.js'

  export default {
    components: {
      ChartChart
    },
    data () {
      return {
        datacollection: {},
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                backgroundColor: "#03ba96",
                data: [2478,5267,734,784,433,2478,5267,734,784,433,784,433]
                }
            ]
        }
      },
    }
  }
</script>