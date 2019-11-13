<template>
    <v-col class="pa-0 mt-3">
       <!-- <v-data-table
            :headers="headers"
            :items="jockey"
            dark
            disable-pagination
            hide-default-footer
            class="elevation-1 ml-3"
            style="background: transparent;"
        >
        </v-data-table>-->
        <v-simple-table dense dark height="300" class="pl-3" style="background-color:transparent;">
             
            <template v-slot:default>
              <thead style="">
                <tr class="header">
                <th class="font-regular white--text text-left px-1" style="border-bottom: 1px solid black; width:200px;"></th>
                <th class="font-regular white--text text-left px-1"></th>
                <th colspan="4" style="color:#00FFC3 !important; font-size: 16px; font-weight: unset; border-bottom: 1px solid black;" class="font-regular white--text text-left px-1 buying">Buying</th>
                <th class="font-regular white--text text-left px-1"></th>
                <th colspan="4" style="color:#00FFC3 !important; font-size: 16px; font-weight: unset; border-bottom: 1px solid black;" class="font-regular white--text text-left px-1 selling">Selling</th>
                <th class="font-regular white--text text-left px-1"></th>
                <th colspan="2" style="color:#00FFC3 !important; font-size: 16px; font-weight: unset; border-bottom: 1px solid black;" class="font-regular white--text text-left px-1 net">Net</th>
                </tr>
                <tr class="header">
                <th class="font-regular caption white--text text-left px-1">Broker</th>
                <th class="font-regular caption white--text text-left px-1"></th>
                <th class="font-regular caption white--text text-left px-1">Volume</th>
                <th class="font-regular caption white--text text-left px-1">Ave. Price</th>
                <th class="font-regular caption white--text text-left px-1">Value</th>
                <th class="font-regular caption white--text text-left px-1">Market Weight</th>
                <th class="font-regular caption white--text text-left px-1"></th>
                <th class="font-regular caption white--text text-left px-1">Volume</th>
                <th class="font-regular caption white--text text-left px-1">Ave. Price</th>
                <th class="font-regular caption white--text text-left px-1">Value</th>
                <th class="font-regular caption white--text text-left px-1">Market Weight</th>
                <th class="font-regular caption white--text text-left px-1"></th>
                <th class="font-regular caption white--text text-left px-1">Net Volume</th>
                <th class="font-regular caption white--text text-left px-1">Net Value</th>
                </tr>
              </thead>
            <tbody>
                <tr v-for="(item, index) in jockey" id="table_tr_port-cont">
                <td class="font-regular caption item_position-prop text-left px-1 py-0">
                  <v-row>
                    <v-col class="ml-3 pa-0">
                    {{ item.broker }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="ml-3 pa-0" style="color:#a9a8a7;">
                    {{ item.broker_desc }}
                    </v-col>
                  </v-row>
                </td>
                <td class="font-regular caption item_position-prop text-left px-1 py-0 label"> </td>
                <td :class="(index == 0 ? 'highest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.buy_volume }}</td>
                <td :class="(index == 0 ? 'highest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 positive">{{ item.buy_avprice }}</td>
                <td :class="(index == 0 ? 'highest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.buy_value }}</td>
                <td :class="(index == 0 ? 'highest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.buy_mweight }}%</td>
                <td class="font-regular caption item_position-prop text-left px-1 py-0 label"> </td>
                <td :class="(index == 9 ? 'lowest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.sell_volume }}</td>
                <td :class="(index == 9 ? 'lowest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 positive">{{ item.sell_avprice }}</td>
                <td :class="(index == 9 ? 'lowest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.sell_value }}</td>
                <td :class="(index == 9 ? 'lowest' : '')" class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.sell_mweight }}%</td>
                <td class="font-regular caption item_position-prop text-left px-1 py-0 label"> </td>
                <td class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.net_volume }}</td>
                <td class="font-regular caption item_position-prop text-left px-1 py-0 label">{{ item.net_value }}</td>
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
       /* headers: [
          {
            text: 'Broker',
            align: 'left',      
            value: 'broker',
          },
          { text: 'Volume', value: 'buy_volume' },
          { text: 'Ave. Price', value: 'buy_avprice' },
          { text: 'Value', value: 'buy_value' },
          { text: 'Market Weight', value: 'buy_mweight' },
          { text: 'Volume', value: 'sell_volume' },
          { text: 'Ave. Price', value: 'sell_avprice' },
          { text: 'Value', value: 'sell_value' },
          { text: 'Market Weight', value: 'sell_mweight' },
          { text: 'Net Volume', value: 'net_volume' },
          { text: 'Net Value', value: 'net_value' },
        ],*/
        jockey: [
          {
            broker: 'COL',
            broker_desc: 'COL Financial Group Inc.',
            buy_volume: '1,999,876.00',
            buy_avprice: '1.6352',
            buy_value: '1,993.00',
            buy_mweight: '27.24',
            sell_volume: '1,997,876.00',
            sell_avprice: '1.604',
            sell_value: '1,499.00',
            sell_mweight: '27.24',
            net_volume: '611,470.16',
            net_value: '999,876.00',
          },
           {
            broker: 'BPI',
            broker_desc: 'Bank of the Phil. Islands',
            buy_volume: '899,876.00',
            buy_avprice: '1.6152',
            buy_value: '899.00',
            buy_mweight: '24.21',
            sell_volume: '899,876.00',
            sell_avprice: '1.6152',
            sell_value: '1,199.00',
            sell_mweight: '24.21',
            net_volume: '711,470.16',
            net_value: '899,876.00',
          },
           {
            broker: 'CITISEC',
            broker_desc: 'Citisecurities Inc.',
            buy_volume: '799,876.00',
            buy_avprice: '1.5952',
            buy_value: '799.00',
            buy_mweight: '16.24',
            sell_volume: '797,876.00',
            sell_avprice: '1.5952',
            sell_value: '2,949.00',
            sell_mweight: '16.24',
            net_volume: '511,470.16',
            net_value: '699,876.00',
          },
           {
            broker: 'ABACUS',
            broker_desc: 'Abacus Securities Corp.',
            buy_volume: '523,876.00',
            buy_avprice: '1.5752',
            buy_value: '1,999.00',
            buy_mweight: '14.24',
            sell_volume: '523,876.00',
            sell_avprice: '1.5752',
            sell_value: '1,799.00',
            sell_mweight: '14.24',
            net_volume: '691,470.16',
            net_value: '513,876.00',
          },
           {
            broker: 'NOMURA',
            broker_desc: 'Nomura Holdings',
            buy_volume: '423,876.00',
            buy_avprice: '1.5552',
            buy_value: '1,999.00',
            buy_mweight: '11.24',
            sell_volume: '423,876.00',
            sell_avprice: '1.5552',
            sell_value: '1,899.00',
            sell_mweight: '11.24',
            net_volume: '613,470.16',
            net_value: '723,876.00',
          },
          {
            broker: 'BDO',
            broker_desc: 'BDO Securites Corp.',
            buy_volume: '1,999,876.00',
            buy_avprice: '1.6352',
            buy_value: '1,993.00',
            buy_mweight: '27.24',
            sell_volume: '1,997,876.00',
            sell_avprice: '1.604',
            sell_value: '1,499.00',
            sell_mweight: '27.24',
            net_volume: '611,470.16',
            net_value: '999,876.00',
          },
           {
            broker: 'CLSA',
            broker_desc: 'CLSA Philippines Inc.',
            buy_volume: '899,876.00',
            buy_avprice: '1.6152',
            buy_value: '899.00',
            buy_mweight: '24.21',
            sell_volume: '899,876.00',
            sell_avprice: '1.6152',
            sell_value: '1,199.00',
            sell_mweight: '24.21',
            net_volume: '711,470.16',
            net_value: '899,876.00',
          },
           {
            broker: 'COL',
            broker_desc: 'COL Financial Group Inc.',
            buy_volume: '799,876.00',
            buy_avprice: '1.5952',
            buy_value: '799.00',
            buy_mweight: '16.24',
            sell_volume: '797,876.00',
            sell_avprice: '1.5952',
            sell_value: '2,949.00',
            sell_mweight: '16.24',
            net_volume: '511,470.16',
            net_value: '699,876.00',
          },
           {
            broker: 'DA',
            broker_desc: 'DA Market Securities Inc.',
            buy_volume: '523,876.00',
            buy_avprice: '1.5752',
            buy_value: '1,999.00',
            buy_mweight: '14.24',
            sell_volume: '523,876.00',
            sell_avprice: '1.5752',
            sell_value: '1,799.00',
            sell_mweight: '14.24',
            net_volume: '691,470.16',
            net_value: '513,876.00',
          },
           {
            broker: 'IGC',
            broker_desc: 'IGC Securities Inc.',
            buy_volume: '423,876.00',
            buy_avprice: '1.5552',
            buy_value: '1,999.00',
            buy_mweight: '11.24',
            sell_volume: '423,876.00',
            sell_avprice: '1.5552',
            sell_value: '1,899.00',
            sell_mweight: '11.24',
            net_volume: '613,470.16',
            net_value: '723,876.00',
          }
        ]
          
      }
    },
    components: {
      
    }
  }
</script>
<style>
  .theme--dark.v-data-table.v-data-table--fixed-header thead th {
    background: #00122e;
  }

  .v-data-table thead th{
    top: 0px !important;
    background: #00121e;
    position: sticky;
  }

  .theme--light.v-tabs-items {
    background: none;
  }
  .positive {
    color:#00FFC3;
  }
  .negative {
    color: #fe4949;
  }
  .label {
    color:#a9a8a7;
  }
  .highest {
    background: #00ffc329;
  }

  .lowest {
    background: #ff484842;
  }
  .buying:hover {
    cursor: pointer;
  }
  .selling:hover {
    cursor: pointer;
  }

</style>