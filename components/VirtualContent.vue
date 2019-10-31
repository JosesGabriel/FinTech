<template>
<div class="container">
    
        Live Portfolio     
            <div class="vtbtn">
                <v-btn text icon color="blue">
                    <v-icon>mdi-share</v-icon>
                </v-btn>               
                 <v-btn text small dark @click.stop="EnterTradeModal=true">Trade</v-btn>
                 <TradeModal :visible="EnterTradeModal" @close="EnterTradeModal=false" />
                 <v-btn text icon color="pink">
                    <v-icon>mdi-autorenew</v-icon>
                </v-btn>
            </div>
          <v-simple-table dark class="vtable">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-center">Stocks</th>
                    <th class="text-center">Curr. Price</th>
                    <th class="text-center">Position</th>
                    <th class="text-center">Avg. Price</th>
                    <th class="text-center">Total Cost</th>
                    <th class="text-center">Market Value</th>
                    <th class="text-center">Profit</th>
                    <th class="text-center">Perf.</th>
                    <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in vtrades" :key="item.stocks">
                    <td class="text-center">{{ item.stocks }}</td>
                    <td class="text-center">{{ item.cprice }}</td>
                    <td class="text-center">{{ item.position }}</td>
                    <td class="text-center">{{ item.avprice }}</td>
                    <td class="text-center">{{ item.tcost }}</td>
                    <td class="text-center">{{ item.mvalue }}</td>
                    <td class="text-center">{{ item.profit }}</td>
                    <td class="text-center">{{ item.perf }}</td>
                    <td class="text-center">
                        <v-btn text icon color="blue">
                            <v-icon size="15">mdi-menu</v-icon>
                        </v-btn>
                        <v-btn text icon color="red">
                            <v-icon size="15">mdi-close</v-icon>
                        </v-btn>
                    </td>
                    </tr>
                </tbody>
                </template>
          </v-simple-table>
          Tradelogs
            <v-simple-table dark class="tlogstable">
                <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-center">Stocks</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">Volume</th>
                        <th class="text-center">Avg. Price</th>
                        <th class="text-center">Buy Value</th>
                        <th class="text-center">Sell Price</th>
                        <th class="text-center">Sell Value</th>
                        <th class="text-center">Profit/Loss</th>
                        <th class="text-center">%</th>
                        <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tlogstable" :key="item.stocks">
                        <td>{{ item.stocks }}</td>
                        <td>{{ item.cprice }}</td>
                        <td>{{ item.position }}</td>
                        <td>{{ item.avprice }}</td>
                        <td>{{ item.tcost }}</td>
                        <td>{{ item.mvalue }}</td>
                        <td>{{ item.profit }}</td>
                        <td>{{ item.perf }}</td>
                       
                        </tr>
                    </tbody>
                </template>
          </v-simple-table>
</div> 
</template>
<script>
  import TradeModal from '~/components/TradeModal'

  export default {
    data () {
      return {
        vtrades: [
          {
            stocks: 'BDO',
            cprice: 159,
            position: 159,
            avprice: 159,
            tcost: 159,
            mvalue: 159,
            profit: 159,
            perf: 159,
          },
          {
            stocks: '2GO',
            cprice: 237,
            position: 159,
            avprice: 159,
            tcost: 159,
            mvalue: 159,
            profit: 159,
            perf: 159,
          },
        ],
        tlogstable: [],
        EnterTradeModal: false,
      }
    },
    components: {
        TradeModal
    }
  }
</script>
<style scoped>
.vtbtn{
    float: right;
}
.vtable, .tlogstable {
    margin-top: 20px;
    background: transparent;
    margin-bottom: 20px;
}

.tlogs {
    margin-top: 10px;
    padding: 16px !important;
}

.container {
    color: #d8d8d8;
}

</style>