<template>
    <v-col cols="11" sm="11" md="11">
        <v-col cols="5" sm="5" md="5" class="pa-0">
            <v-tabs
            v-model="tab"
            color="#48FFD5"
            background-color="transparent"
            dark
            grow
            >
            <v-tab color="#fff" class="text-capitalize subtitle-1">Dashboard</v-tab>
            <v-tab color="#fff" class="text-capitalize subtitle-1">Tradelogs</v-tab>
            <v-tab color="#fff" class="text-capitalize subtitle-1">Ledger</v-tab>
            </v-tabs>
        </v-col>
        <v-card-title class="text-left justify-left px-0 py-0 pt-2">
            <h1 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">LIVE PORTFOLIO (PHP)</h1>
        </v-card-title>
        <v-simple-table :dense="true" dark id="liveportfolio-table">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left px-1">Stocks</th>
                <th class="text-right px-1">Position</th>
                <th class="text-right px-1">Avg. Price</th>
                <th class="text-right px-1">Total Cost</th>
                <th class="text-right px-1">Market Value</th>
                <th class="text-right px-1">Profit</th>
                <th class="text-right px-1">Perf.(%)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.stocks" id="table_tr_port-cont">
                <td id="table_td_port-cont" class="px-1 py-2">{{ item.stocks }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2">{{ item.position }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2">{{ item.AvgPrice }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2">{{ item.TotalCost }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2">{{ item.MarketValue }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2">{{ item.Profit }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2">{{ item.Perf }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-2"><v-button><v-list-item-icon class="ma-0"><v-icon color="#d8d8d8">mdi-dots-horizontal</v-icon></v-list-item-icon></v-button></td>
                
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-col>
</template>
<script>
export default {
    data () {
      return {
        desserts: [
          {
            stocks: 'BDO',
            position: '10,000.00',
            AvgPrice: '16.04',
            TotalCost: '16,047.20',
            MarketValue: '16,709.10',
            Profit: '661.90',
            Perf: '4.12',
          },
          {
            stocks: 'HLCM',
            position: '10,000.00',
            AvgPrice: '16.04',
            TotalCost: '16,047.20',
            MarketValue: '16,709.10',
            Profit: '661.90',
            Perf: '4.12',
          },
          {
            stocks: '2GO',
            position: '10,000.00',
            AvgPrice: '16.04',
            TotalCost: '16,047.20',
            MarketValue: '16,709.10',
            Profit: '661.90',
            Perf: '4.12',
          },
          {
            stocks: 'KPPI',
            position: '10,000.00',
            AvgPrice: '16.04',
            TotalCost: '16,047.20',
            MarketValue: '16,709.10',
            Profit: '661.90',
            Perf: '4.12',
          },
          {
            stocks: 'HOME',
            position: '10,000.00',
            AvgPrice: '16.04',
            TotalCost: '16,047.20',
            MarketValue: '16,709.10',
            Profit: '661.90',
            Perf: '4.12',
          }
        ],
      }
    },
}
</script>