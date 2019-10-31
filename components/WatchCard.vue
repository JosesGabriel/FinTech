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
       :data="chartData0"
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
        <div class="arb_bar fullbar watchlistCard__percentbar">
          <div class="arb_bar_green" style="width:46%">&nbsp;</div>
          <div class="arb_bar_red" style="width:54%">&nbsp;</div>
          <div class="arb_clear"></div>
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
.arb_bar_green {
  float: left;
    background-color: #34AD9E;
    color: #fff;
    padding: 2px 0;
    text-align: center;
    line-height: 0;
    border-radius: 5px 0 0 5px;
}
.arb_bar_red {
  float: left;
    background-color: #F45532;
    color: #fff;
    padding: 2px 0;
    text-align: center;
    line-height: 0;
    border-radius: 5px 0 0 5px;
}
</style>
<script>
import { GChart } from 'vue-google-charts'

export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      counter: 0,
      chartData0: [
        ['', 'AXLM'],
        ['', 10],
        ['', 12],
        ['', 14],
        ['', 13],
        ['', 9],
        ['', 15],
        ['', 10],
        ['', 6],
        ['', 7],
        ['', 9],
        ['', 10],
        ['', 13]
      ],
      chartData1: [
        ['', 'IRC'],
        ['', 10],
        ['', 12],
        ['', 14],
        ['', 13],
        ['', 9],
        ['', 15],
        ['', 10],
        ['', 6],
        ['', 7],
        ['', 9],
        ['', 10],
        ['', 13]
      ],
      chartData2: [
        ['', 'AAPL'],
        ['', 10],
        ['', 12],
        ['', 14],
        ['', 13],
        ['', 9],
        ['', 15],
        ['', 10],
        ['', 6],
        ['', 7],
        ['', 9],
        ['', 10],
        ['', 13]
      ],
      chartOptions: { 
        hAxis: {
        titleTextStyle: {color: '#607d8b'}, 
        gridlines: { count:0}, 
        textStyle: { color: '#b0bec5', fontName: 'Roboto', fontSize: '12', bold: true}
      },
      vAxis: {
        minValue: 0, 
        gridlines: {color:'#37474f', count:1}, 
        baselineColor: 'transparent'
      },
      legend: {position: 'none', alignment: 'center', textStyle: {color:'#607d8b', fontName: 'Roboto', fontSize: '12'} },
      colors: ["#48ffd5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39"],
      areaOpacity: 0.24,
      lineWidth: 1,
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: "transparent",
        width: '100%',
        height: '50%'
      },
      pieSliceBorderColor: '#263238',
      pieSliceTextStyle:  {color:'#607d8b' },
      pieHole: 0.9,
      bar: {groupWidth: "40" },
      colorAxis: {colors: ["#3f51b5","#2196f3","#03a9f4","#00bcd4"] },
      backgroundColor: 'transparent',
      datalessRegionColor: '#37474f',
      displayMode: 'regions'
      }
    }
  },
  components: {
    GChart
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    }
  }
}
</script>