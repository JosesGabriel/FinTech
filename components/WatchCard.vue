<template>
  <v-card class="mb-3" color="#142b46" dark outlined shaped max-height="250">
      <v-list-item class="watchlistCard">
        <v-btn outlined fab small color="#48ffd5" class="mr-3">JFC</v-btn>
        <v-list-item-content>
            <v-list-item-title class="caption"><strong>Philippine Infradev Holdings</strong></v-list-item-title>
            <v-list-item-subtitle class="overline">₱3.42 | <span class="watchlistCard__header--percent">0.59%</span></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <GChart
       type="AreaChart"
       :data="chartData"
       :options="chartOptions"
       @ready="onChartReady"
      />
        <v-card-actions class="watchlistCard__items caption">
            <div>
              <span>Entry Price: </span>
              <span class="float-right">₱1.34</span>
            </div>
            <div>
              <span>Take Profit: </span>
              <span class="float-right">₱1.40</span>
            </div>
            <div>
              <span>Stop Loss: </span>
              <span class="float-right">₱1.30</span>
            </div>
        </v-card-actions>
        <div class="watchlistCard__percentbar">
          <div class="watchlistCard__bar watchlistCard__bar--green" style="width:46%"></div>
          <div class="watchlistCard__bar watchlistCard__bar--red" style="width:54%"></div>
          <!-- <v-btn @click="chartColor()">Hahah</v-btn> -->
        </div>
  </v-card>
</template>
<style>
.watchlistCard {
  position: absolute;
}
.watchlistCard__header--percent {
  color: #48ffd5;
}
.watchlistCard__items {
  margin-bottom: 10px;
  display: block;
}
.watchlistCard__items, .watchlistCard__percentbar {
  position: relative;
  bottom: 40px;
}
.watchlistCard__itemsLabel {
  position: relative;
  bottom: 5px;
}
.watchlistCard__itemsContainer {
  position: absolute;
  bottom: 40px;
}
.watchlistCard__bar {
  float: left;
  color: #fff;
  padding: 2px 0;
  text-align: center;
  line-height: 0;
  border-radius: 5px 0 0 5px;
}
.watchlistCard__bar--green {
  background-color: #34AD9E;
}
.watchlistCard__bar--red {
  background-color: #F45532;
}
</style>
<script>
import { GChart } from 'vue-google-charts'

export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      counter: 0,
      chartData: [
        ['', 'AXLM'],
        ['', 1.0],
        ['', 1.2],
        ['', 1.4],
        ['', 1.3],
        ['', 0.9],
        ['', 1.5],
        ['', 1.0],
        ['', 0.6],
        ['', 0.7],
        ['', 0.9],
        ['', 1.0],
        ['', 1.3]
      ],
      chartOptions: {
        vAxis: {
          gridlines: {color:'#37474f', count:1}
        },
        colors: ["#fff"],
        areaOpacity: 0.2,
        lineWidth: 1,
        backgroundColor: 'transparent',
        chartArea: {
          width: '100%',
          height: '50%'
        }
      }
    }
  },
  components: {
    GChart
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    },
    chartColor (){
      this.chartData = [
        ['', 'AXLM'],
        ['', 10],
        ['', 6]
      ];
      this.chartOptions.colors = ['#F45532'];
    }
  }
}
</script>