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
        <!-- <v-card-title class="pa-0">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            class="pa-0"
            color="success"
            label="Search"
            hide-details
            dark
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title> -->
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
        <template v-slot:item.average_price="{ item }" >{{ formatPrice(item.average_price) }}</template>
        <template v-slot:item.total_value="{ item }" >{{ formatPrice(item.total_value) }}</template>
        <template v-slot:item.total_value="{ item }" >{{ formatPrice(item.total_value) }}</template>
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions mt-n1" :id="`pl_${item.id}`" @mouseover="menuLogsShow(item)" @mouseleave="menuLogsHide(item)">
            <v-btn small class="caption" text color="success">Details</v-btn>
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

import { mapActions, mapGetters } from "vuex";

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
      
      itemsPerPage: 5,
      search: '',
      headers: [
        { text: 'Stocks', value: 'stock_id', align: 'left', sortable: false },
        { text: 'Position', value: 'position', align: 'right' },
        { text: 'Avg. Price', value: 'average_price', align: 'right' },
        { text: 'Total Cost', value: 'total_value', align: 'right' },
        { text: 'Market Value', value: 'MarketValue', align: 'right' },
        { text: 'Profit', value: 'Profit', align: 'right' },
        { text: 'Perf. (%)', value: 'Perf', align: 'right' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      portfolioLogs: [],
      page: 1,
      pageCount: 0,
      menuShow: false,
      componentKeys: 0
    }
  },
  mounted() {
    this.getOpenPositions();
    // console.log(this.defaultPortfolioId);
    // console.log(this.renderPortfolioKey);
  },
  methods: {
    menuLogsShow: function(item) {
      let pl = document.getElementById(`pl_${item.id}`);

      pl.style.display = "block";
    },
    menuLogsHide: function(item) {
      let pl = document.getElementById(`pl_${item.id}`);

      pl.style.display = "none";
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    getOpenPositions() {
      const openparams = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        fund: this.defaultPortfolioId,
      };
      this.$api.journal.portfolio.open(openparams).then(
        function(result) {
          this.portfolioLogs = result.meta.open;
          for (let i = 0; i < this.portfolioLogs.length; i++) {
            const params = {
              "symbol-id": this.portfolioLogs[i].stock_id
            };
            this.$api.chart.stocks.list(params).then(
              function(result) {
                // console.log(result)
                this.portfolioLogs[i].stock_id = result.data.symbol;
              }.bind(this)
            );
            this.componentKeys++;
          }
        }.bind(this)
      );
    }
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey"
    })
  },
  watch: {
    renderPortfolioKey: function() {
      this.getOpenPositions();
    }
  }
}
</script>
<style scoped>
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
</style>
<style>
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
  /* -------Pagination-------- */
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