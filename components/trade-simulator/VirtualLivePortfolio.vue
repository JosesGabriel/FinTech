<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h1 class="font-weight-regular subtitle-2" style="color:#fff;">
              OPEN POSITION/S (PHP)
            </h1>
            <v-spacer></v-spacer>
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize mr-2" style="border-width: 2px" height="23">Reset</v-btn>
            <v-btn rounded outlined color="#48FFD5" @click.stop="EnterTradeModal=true" dark class="text-capitalize mr-2" style="border-width: 2px" height="23">Trade</v-btn>
            <TradeModal :visible="EnterTradeModal" @close="EnterTradeModal=false" />
                
            <router-link to="/" class="social__router">
              <v-btn icon small> 
                  <img src="/icon/journal-icons/share-icon.svg" width="15">
              </v-btn>
            </router-link>
        </v-card-title>
        <v-simple-table :dense="true" dark id="liveportfolio-table" class="pl-10">
            <template v-slot:default>
            <thead>
                <tr class="">
                <th class="font-regular caption white--text text-left px-1">Stocks</th>
                <th class="font-regular caption white--text text-right px-1">Position</th>
                <th class="font-regular caption white--text text-right px-1">Avg. Price</th>
                <th class="font-regular caption white--text text-right px-1">Total Cost</th>
                <th class="font-regular caption white--text text-right px-1">Market Value</th>
                <th class="font-regular caption white--text text-right px-1">Profit</th>
                <th class="font-regular caption white--text text-right px-1">Perf.(%)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.stocks" id="table_tr_port-cont">
                <td class="font-regular caption item_position-prop px-1 py-2">{{ item.stocks }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">{{ item.AvgPrice }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">{{ item.position }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">{{ item.TotalCost }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">{{ item.MarketValue }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">{{ item.Profit }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">{{ item.Perf }}</td>
                <td class="font-regular caption item_position-prop text-right px-1 py-0">
                    <v-menu top>
                        <template v-slot:activator="{ on }">
                        <v-btn
                            dark
                            icon
                            v-on="on"
                        >
                            <v-icon color="#B6B6B6">mdi-dots-horizontal</v-icon>
                        </v-btn>
                        </template>
                        <v-list color="#123" dark class="pa-0">
                            <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                                headline
                                background="#0c1f33"
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
         <v-card class="pt-7" color="transparent" flat tile>
            <v-card class="d-flex justify-start" color="transparent" flat tile>
                <v-card-title class="text-left justify-left pa-0">
                    <h1 class="font-weight-regular caption" style="color:#fff;">Show Rows
                    </h1>
                    <select class="text-center justify-center font-weight-regular caption show_rows-cont px-3 ml-1">
                        <option class="font-weight-bold caption show_rows-select" value="0">0</option>
                        <option class="font-weight-bold caption show_rows-select" value="1">1</option>
                        <option class="font-weight-bold caption show_rows-select" value="2">2</option>
                        <option class="font-weight-bold caption show_rows-select" value="3">3</option>
                        <option class="font-weight-bold caption show_rows-select" value="4">4</option>
                        <option class="font-weight-bold caption show_rows-select" value="5">5</option>
                    </select>
                    <h1 class="font-weight-regular caption ml-1" style="color:#fff;">of 100
                    </h1>
                </v-card-title>
                <v-spacer></v-spacer>
                <div class="pagination">
                    <a href="#" class="font-weight-bold caption active">1</a>
                    <a href="#" class="font-weight-bold caption">2</a>
                    <a href="#" class="font-weight-bold caption">3</a>
                    <a href="#" class="font-weight-bold caption">4</a>
                    <a href="#" class="font-weight-bold caption">5</a>
                    <a href="#" class="font-weight-bold caption">6</a>
                    <a href="#" class="font-weight-bold caption">&rsaquo;</a>
                </div>
            </v-card>
        </v-card>
      
    </v-col>
</template>
<script>
import TradeModal from '~/components/trade-simulator/TradeModal'

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
        page: 1,
        EnterTradeModal: false,
      }
    },
     components: {
        TradeModal
    }
}
</script>
<style scoped>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6
}
.pagination {
  display: inline-block;
}

.pagination a {
  color: #b6b6b6;
  float: left;
  width: 20px;
  width: 20px;
  text-align: center;
  text-decoration: none;
  transition: background-color .3s;
  border-radius: 20px;
}

.pagination a.active {
  background-color: #00FFC3;
  color: #00121E;
}

.pagination a:hover:not(.active) {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px
}
.show_rows-select {
    background: #00FFC3;
    color: #00121E;
}
.show_rows-cont {
    border: 2px solid #00FFC3;
    color: #00FFC3;
    outline-color: none !important;
    height: 18px;
    line-height: 1;
}
</style>