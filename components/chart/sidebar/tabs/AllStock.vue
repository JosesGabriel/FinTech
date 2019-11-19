<template>
  <v-content>
      <v-card class="pa-0 ma-0" color="#00121e" dark :loading="loading">  
    <v-content class="mt-1">
      <span class="caption ml-4 font-weight-bold white--text">All Stock</span>
    </v-content>
    <v-simple-table
      dense
      dark
      fixed-header
      class="ml-4"
      height="calc(100vh - 415px)"
      style="background:#00121e"
    >
      <thead>
        <tr>
          <th :class="header">SYMBOL</th>
          <th :class="header" class="text-right">LAST</th>
          <th :class="header" class="text-right">%CHANGE</th>
          <th :class="header" class="text-right">VALUE</th>
          <th :class="header" class="text-right">TRADES</th>
          <th :class="header"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in stocks" :key="item.id">
          <td :class="column" class="font-weight-bold" style="width:10%">{{ item.symbol }}</td>
          <td :class="column" style="width:12%" class="text-right">
            <span :class="[{ increase: item.change > 0 },{ decrease: item.change < 0 },{ neutral: item.change == 0 }]">
                {{ item.last }}
            </span>
          </td>
          <td :class="column" style="width:20%" class="text-right">
            <span :class="[{ increase: item.change > 0 },{ decrease: item.change < 0 },{ neutral: item.change == 0 }]">
                {{ item.change }}
            </span>
          </td>
          <td :class="column" style="width:23%" class="text-right">
            <span class="">{{ formatPrice(item.value) }}</span>
          </td>
          <td :class="column" style="width:20%" class="text-right">
            <span class="">{{ formatPrice(item.trades) }}</span>
          </td>
          <td :class="column"></td>
        </tr>
      </tbody>
    </v-simple-table>
     </v-card>
  </v-content>
</template>

<script>
export default {
  name: "AllStock",
  data() {
    return {
      stocks: [],
      loading: '#48FFD5',
      header: "caption header white--text font-weight-bold",
      column: "caption column white--text"
    };
  },
  mounted(){
    this.$api.chart.stocks.history({
      exchange: "PSE"
    }).then(response => {
     // console.log("all stock");
     // console.log(response.data);
      this.stocks = response.data;
      this.loading = false;
    });
  },
  methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
};
</script>

<style scoped>
.theme--dark.v-data-table thead tr:last-child th {
  border: none !important;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
.v-data-table--dense td {
  height: 20px;
}
.neutral{
  color: gold !important;
}
</style>
