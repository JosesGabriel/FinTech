<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h1 class="font-weight-regular subtitle-2" style="color:#fff;">OPEN POSITION/S (PHP)</h1>
            <v-spacer></v-spacer>
            <v-btn rounded outlined color="#48FFD5" dark class="rtf_top-btn text-capitalize mr-2" @click.stop="showResetForm=true" style="border-width: 2px" height="23">Reset</v-btn>
            <v-btn rounded outlined color="#48FFD5" dark class="rtf_top-btn text-capitalize mr-2" @click.stop="showTradeViewForm=true" style="border-width: 2px" height="23">Trade</v-btn>
            <v-btn rounded outlined color="#48FFD5" dark class="rtf_top-btn text-capitalize" @click.stop="showFundsForm=true" style="border-width: 2px" height="23">Fund</v-btn>

              <v-btn icon small @click.stop="showScheduleForm=true"> 
                  <img src="/icon/journal-icons/share-icon.svg" width="15">
              </v-btn>
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
                  <v-icon>mdi-dots-horizontal</v-icon>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-card class="pt-7" color="transparent" flat tile>
            <v-card class="d-flex justify-end" color="transparent" flat tile>
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
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
        <reset-modal :visible="showResetForm" @close="showResetForm=false" />
        <funds-modal :visible="showFundsForm" @close="showFundsForm=false" />
        <trade-view :visible="showTradeViewForm" @close="showTradeViewForm=false" />
    </v-col>
</template>
<script>
import resetModal from '~/components/modals/reset'
import shareModal from '~/components/modals/share'
import fundsModal from '~/components/modals/fund'
import tradeView from '~/components/modals/tradeView'

export default {
  components: {
    shareModal,
    resetModal,
    fundsModal,
    tradeView
  },
  data () {
    return {
      showScheduleForm: false,
      showResetForm: false,
      showFundsForm: false,
      showTradeViewForm: false,
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
      page: 1,
    }
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
</style>