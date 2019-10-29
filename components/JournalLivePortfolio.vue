<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h1 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">LIVE PORTFOLIO (PHP)</h1>
            <v-spacer></v-spacer>
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize mr-2" height="30">Reset</v-btn>
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize mr-2" height="30">Trade</v-btn>
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize" height="30">Fund</v-btn>
        </v-card-title>
        <v-simple-table :dense="true" dark id="liveportfolio-table">
            <template v-slot:default>
            <thead>
                <tr class="headline">
                <th id="table_head_tr_port-cont" class="text-left px-1">Stocks</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Position</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Avg. Price</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Total Cost</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Market Value</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Profit</th>
                <th id="table_head_tr_port-cont" class="text-right px-1">Perf.(%)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.stocks" id="table_tr_port-cont">
                <td id="table_td_port-cont" class="px-1 py-2">{{ item.stocks }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.position }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.AvgPrice }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.TotalCost }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.MarketValue }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.Profit }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">{{ item.Perf }}</td>
                <td id="table_td_port-cont" class="text-right px-1 py-0">
                    <v-menu top :offset-x="offset" >
                        <template v-slot:activator="{ on }">
                        <v-btn
                            dark
                            icon
                            v-on="on"
                        >
                            <v-icon color="#d8d8d8">mdi-dots-horizontal</v-icon>
                        </v-btn>
                        </template>
                        <v-list color="#123" dark class="pa-0">
                            <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                                headline
                            >
                                <v-list-item-title class="body-2">{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </td>
                
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
        items: [
            { title: 'Note' },
            { title: 'Delete' },
        ],
      }
    },
}
</script>