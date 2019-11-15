<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h1 class="font-weight-regular subtitle-2" style="color:#fff;">
              OPEN POSITION/S (PHP)
            </h1>
            <v-spacer></v-spacer>
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize mr-2" @click.stop="showResetForm=true" style="border-width: 2px" height="23">Reset</v-btn>
            <v-btn rounded outlined color="#48FFD5" @click.stop="EnterTradeModal=true" dark class="text-capitalize mr-2" style="border-width: 2px" height="23">Trade</v-btn>
                     
              <v-btn icon small @click.stop="showScheduleForm=true"> 
                  <img src="/icon/journal-icons/share-icon.svg" width="15">
              </v-btn>
              
        </v-card-title>
        <v-data-table
              :headers="headers"
              :items="portfolioLogs"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              dark
              class="data_table-container pl-10 secondary--text"
            >
            <template v-slot:item.action="{ item }">
                  <div v-show="menuShow" class="sidemenu_actions" :id="`pl_${item.id}`" @mouseover="menuLogsShow(item)" @mouseleave="menuLogsHide(item)">
                    <v-btn small class="caption" text color="success">Trade Details</v-btn>
                    <v-btn small class="caption" text color="success">Edit</v-btn>
                    <v-btn small class="caption" text color="success">Delete</v-btn>
                  </div>
                  <v-icon
                    small
                    class="mr-2"
                    @mouseover="menuLogsShow(item)"
                  >
                    mdi-dots-horizontal
                  </v-icon>
            </template>
        </v-data-table>
        <v-card class="d-flex justify-space-between align-center my-5" color="transparent" elevation="0">
            <v-card color="transparent" class="justify-center" elevation="0">
                  <v-card-title class="white--text caption pa-0"><span>Show Rows</span>
                  <v-spacer></v-spacer>
                  <v-text-field
                    :value="itemsPerPage"
                    type="number"
                    min="5"
                    max="10"
                    @input="itemsPerPage = parseInt($event, 10)"
                    dark
                    class="pt-0 pl-4 mt-0 ml-1 show_rows caption"
                    color="success"
                    dense
                  ></v-text-field>
                  <span class="pl-1">of {{ portfolioLogs.length }}</span>
                  </v-card-title>
                </v-card>
                <v-card color="transparent" elevation="0">
              <v-pagination class="d-flex flex-end lp_data_table-pagination" color="transparent" dark v-model="page" :length="pageCount"></v-pagination>
            </v-card>
        </v-card>

            <TradeModal :visible="EnterTradeModal" @close="EnterTradeModal=false" />
            <reset-modal :visible="showResetForm" @close="showResetForm=false" />
            <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
</template>
<script>
import TradeModal from '~/components/trade-simulator/TradeModal'
import resetModal from '~/components/modals/reset'
import shareModal from '~/components/modals/share'

export default {
    data () {
      return {
        itemsPerPage: 5,
        search: '',
        page: 1,
        pageCount: 0,
        menuShow: false,
        headers: [
          { text: 'Stocks', value: 'Stocks', align: 'left', sortable: false },
          { text: 'Position', value: 'Position', align: 'right' },
          { text: 'Avg. Price', value: 'AvgPrice', align: 'right' },
          { text: 'Total Cost', value: 'TotalCost', align: 'right' },
          { text: 'Market Value', value: 'MarketValue', align: 'right' },
          { text: 'Profit', value: 'Profit', align: 'right' },
          { text: 'Perf. (%)', value: 'Perf', align: 'right' },
          { text: '', value: 'action', sortable: false, align: 'right' },
        ],
        portfolioLogs: [
          {
            id: 1,
            Stocks: 'BDO',
            Position: 159,
            AvgPrice: 6.0,
            TotalCost: 24,
            MarketValue: 4.0,
            Profit: '1%',
            Perf: '1%',
          },
          {
            id: 2,
            Stocks: 'HLCM',
            Position: 237,
            AvgPrice: 9.0,
            TotalCost: 37,
            MarketValue: 4.3,
            Profit: '1%',
            Perf: '1%',
          },
          {
            id: 3,
            Stocks: 'KPPI',
            Position: 262,
            AvgPrice: 16.0,
            TotalCost: 23,
            MarketValue: 6.0,
            Profit: '7%',
            Perf: '7%',
          },
          {
            id: 4,
            Stocks: '2GO',
            Position: 305,
            AvgPrice: 3.7,
            TotalCost: 67,
            MarketValue: 4.3,
            Profit: '8%',
            Perf: '8%',
          },
          {
            id: 5,
            Stocks: 'ROCK',
            Position: 356,
            AvgPrice: 16.0,
            TotalCost: 49,
            MarketValue: 3.9,
            Profit: '16%',
            Perf: '16%',
          },
          {
            id: 6,
            Stocks: 'APL',
            Position: 375,
            AvgPrice: 0.0,
            TotalCost: 94,
            MarketValue: 0.0,
            Profit: '0%',
            Perf: '0%',
          },
          {
            id: 7,
            Stocks: 'IRC',
            Position: 392,
            AvgPrice: 0.2,
            TotalCost: 98,
            MarketValue: 0,
            Profit: '2%',
            Perf: '2%',
          },
          {
            id: 8,
            Stocks: 'APL',
            Position: 408,
            AvgPrice: 3.2,
            TotalCost: 87,
            MarketValue: 6.5,
            Profit: '45%',
            Perf: '45%',
          },
          {
            id: 9,
            Stocks: 'BDO',
            Position: 452,
            AvgPrice: 25.0,
            TotalCost: 51,
            MarketValue: 4.9,
            Profit: '22%',
            Perf: '22%',
          },
          {
            id: 10,
            Stocks: 'SUN',
            Position: 518,
            AvgPrice: 26.0,
            TotalCost: 65,
            MarketValue: 7,
            Profit: '6%',
            Perf: '6%',
          }
        ],
        items: [
            { title: 'Note' },
            { title: 'Delete' },
        ],
        page: 1,
        EnterTradeModal: false,
        showResetForm: false,
        showScheduleForm: false,
      }
    },
     components: {
        TradeModal,
        resetModal,
        shareModal,
    },
    methods: {
      menuLogsShow: function(item) {
        let pl = document.getElementById(`pl_${item.id}`);

        pl.style.display = "block";
      },
      menuLogsHide: function(item) {
        let pl = document.getElementById(`pl_${item.id}`);

        pl.style.display = "none";
      }
    }

}
</script>
<style scoped>
.theme--dark.v-icon {
    color: #fdfcfc;
}

.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.v-window.v-item-group.theme--light.v-tabs-items {
    background: none;
}
.item_position-prop {
  color: #b6b6b6
}

.data_table-container {
    background: transparent
}
.sidemenu_actions {
  position: absolute;
  width: auto;
  right: 0;
  background: #00121e;
  border: 1px solid rgb(0, 255, 195);
  border-radius: 4px;
}

.edit_icons {
  display: none;
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
<style>
  .v-application .pl-4 {
      height: 24px;
  }
.v-data-table.data_table-container .v-data-footer {
    border: none;
  }
  .v-data-table.data_table-container td, .v-data-table.data_table-container th {
    height: 36px;
  }
  .v-data-table.data_table-container tbody tr:hover:not(.v-data-table__expand-row) {
    background: transparent
  }
  .show_rows {
    border: 2px solid #00ffc3;
    width: 45px;
  }
  .show_rows .v-input__control {
    min-height: auto;
  }
  .show_rows .v-input__slot:before {
    display: none;
  }
  .show_rows .v-input__slot {
    margin: 0;
  }
  .show_rows .v-input__slot input {
    padding: 0;
  }
.v-pagination.lp_data_table-pagination li .v-pagination__navigation {
      background: transparent;
      box-shadow: none;
      margin: 0;
      width: 10px;
  }
  .lp_data_table-pagination {
    color: #00ffc3;
  }
  .v-pagination.lp_data_table-pagination .v-pagination__item--active {
    color: #00FFC3;
  }
  .lp_data_table-pagination i.v-icon {
    font-size: 11px
  }
  .v-pagination.lp_data_table-pagination .v-pagination__item {
    background: none;
    box-shadow: none;
    margin: 0;
    outline-color: transparent;
  }

</style>