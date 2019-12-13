<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h1 class="font-weight-regular subtitle-2" style="color:#fff;">OPEN POSITION/S (PHP)</h1>
            <v-spacer></v-spacer>
            <v-btn outlined color="#03dac5" dark class="rtf_top-btn text-capitalize mr-2" @click.stop="showResetForm=true" height="23"><span class="v-btn__content">Reset</span></v-btn>
            <v-btn outlined color="#03dac5" dark class="rtf_top-btn text-capitalize mr-2" @click.stop="showTradeViewForm=true" :disabled="ifVirtualShow" height="23"><span class="v-btn__content">Trade</span></v-btn>
            <v-btn outlined color="#03dac5" dark class="rtf_top-btn text-capitalize" @click.stop="showFundsForm=true" :disabled="fundsShow" height="23"><span class="v-btn__content">Fund</span></v-btn>

              <v-btn icon small @click.stop="showScheduleForm=true"> 
                  <img src="/icon/journal-icons/share-icon.svg" width="15">
              </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="portfolioLogsStock"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          dark
          :loading="livePortfolioLoading"
          loading-text="Loading..."
          class="data_table-container pl-10 secondary--text"
        >
        <template v-slot:item.stock_id="{ item }" ><span class="pl-2">{{ item.stock_id }}</span></template>
        <template v-slot:item.average_price="{ item }" >{{ item.average_price.toFixed(3) }}</template>
        <template v-slot:item.total_value="{ item }" >{{ formatPrice(item.total_value) }}</template>
        <template v-slot:item.market_value="{ item }" >{{ formatPrice(item.market_value) }}</template>
        <template v-slot:item.profit="{ item }" ><span :class="item.profit > 0 ? 'positive' : item.profit < 0 ? 'negative' : 'neutral' ">{{ formatPrice(item.profit) }}</span></template>
        <template v-slot:item.perf_percentage="{ item }" ><span :class="item.profit > 0 ? 'positive' : item.profit < 0 ? 'negative' : 'neutral' ">{{ formatPrice(item.perf_percentage) }}%</span></template>
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions mt-n1" :id="`pl_${item.id}`" @mouseover="menuLogsShow(item)" @mouseleave="menuLogsHide(item)">
            <v-btn small class="caption" text color="success" @click.stop="showTradeDetails=true" v-on:click="detailsLive(item)">Details</v-btn>
            <v-btn small class="caption" text color="success" @click.stop="showEditDetails=true" v-on:click="editLive(item)">Edit</v-btn>
            <v-btn small class="caption" text color="success" @click.stop="showDelete=true" v-on:click="deleteLive(item)">Delete</v-btn>
          </div>
          <v-icon
            small
            class="mr-2 secondary--text"
            @mouseover="menuLogsShow(item)"
          >
            mdi-dots-horizontal
          </v-icon>
        </template>
        </v-data-table>
        <v-row>
          <v-col class="text-right font-weight-regular subtitle-2" width="100%" style="color:#fff;">
          Total Profit/Loss as of {{date}}:<span class="ml-3" :class="(totalProfitLoss < 0 ? 'negative' : 'positive')">{{ totalProfitLoss.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span><span class="ml-2" :class="(totalProfitLoss < 0 ? 'negative' : 'positive')">{{ totalProfitLossPerf.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}%</span>
          </v-col>
        </v-row>
        <v-card class="d-flex justify-space-between align-center" color="transparent" elevation="0">
          <v-card color="transparent" class="justify-center" elevation="0">
            <v-card-title class="white--text caption pa-0"><span>Show Rows</span>
            <v-spacer></v-spacer>
            <v-text-field
              :value="(portfolioLogs.length <= 5 ? portfolioLogs.length : 5)"
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
        <v-snackbar v-model="snackbar" class="black--text font-weight-bold" color="success" :timeout="timeoutNotification">
          You can only add Virtual Trade via the Trade Simulator Page.
          <v-btn color="black" class="text-capitalize font-weight-bold" text href="/trade-simulator">
            Bring me there
          </v-btn>
        </v-snackbar>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
        <reset-modal :visible="showResetForm" @close="showResetForm=false" />
        <funds-modal :visible="showFundsForm" @close="showFundsForm=false" />
        <trade-view :visible="showTradeViewForm" @close="showTradeViewForm=false" />
        <trade-details :visible="showTradeDetails" :itemDetails="itemDetails" @close="showTradeDetails=false" />
        <trade-edits :visible="showEditDetails" :itemDetails="itemDetails" @close="showEditDetails=false" />
        <trade-delete :visible="showDelete" :itemDetails="itemDetails" @close="showDelete=false" />
        <!-- @click.stop="showResetForm=true" -->
    </v-col>
</template>
<script>
import resetModal from '~/components/modals/reset'
import shareModal from '~/components/modals/share'
import fundsModal from '~/components/modals/fund'
import tradeView from '~/components/modals/tradeView'
import tradeDetails from '~/components/modals/tradeDetails'
import tradeEdits from '~/components/modals/tradeEdits'
import tradeDelete from '~/components/modals/tradeDelete'

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal,
    resetModal,
    fundsModal,
    tradeView,
    tradeDetails,
    tradeEdits,
    tradeDelete,
  },
  data () {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      },
      livePortfolioLoading: "success",
      showScheduleForm: false,
      showResetForm: false,
      showFundsForm: false,
      showTradeViewForm: false,
      showTradeDetails: false,
      showEditDetails: false,
      showDelete: false,
      itemDetails: null,

      ifVirtualShow: false,
      fundsShow: false,
      snackbar: false,
      timeoutNotification: 10000,
      
      itemsPerPage: 5,
      search: '',
      headers: [
        { text: 'Stocks', value: 'stock_id', align: 'left', sortable: false },
        { text: 'Position', value: 'position', align: 'right' },
        { text: 'Avg. Price', value: 'average_price', align: 'right' },
        { text: 'Total Cost', value: 'total_value', align: 'right' },
        { text: 'Market Value', value: 'market_value', align: 'right' },
        { text: 'Profit', value: 'profit', align: 'right' },
        { text: 'Perf. (%)', value: 'perf_percentage', align: 'right' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      portfolioLogs: [],
      portfolioLogsStock: [],
      page: 1,
      pageCount: 0,
      menuShow: false,
      componentKeys: 0,

      totalProfitLoss: 0,
      totalProfitLossPerf: 0,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  mounted() {
    if(this.defaultPortfolioId != 0 ?  this.getOpenPositions() : ''); 
  },
  methods: {
    ...mapActions({
        setRenderPortfolioKey: "journal/setRenderPortfolioKey",
        setOpenPosition: "journal/setOpenPosition",
        setJournalCharts: "journal/setJournalCharts",
    }),
    menuLogsShow: function(item) {
      let pl = document.getElementById(`pl_${item.id}`);

      pl.style.display = "block";
    },
    menuLogsHide: function(item) {
      let pl = document.getElementById(`pl_${item.id}`);
      
      pl.style.display = "none";
    },
    deleteLive: function(item) {
      this.itemDetails = item
    },
    detailsLive: function(item) {
      this.itemDetails = item
    },
    editLive: function(item) {
      this.itemDetails = item
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    getOpenPositions() {
      this.portfolioLogsStock = []
      const openparams = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        fund: this.defaultPortfolioId,
      };
      this.totalProfitLoss = 0;
      this.totalProfitLossPerf = 0;
      this.$api.journal.portfolio.open(openparams).then(
        function(result) {
          this.portfolioLogs = result.meta.open;
          for (let i = 0; i < this.portfolioLogs.length; i++) {
            this.portfolioLogs[i].action = this.portfolioLogs[i].stock_id;
            
            const historyparams  = {
              "symbol-id": this.portfolioLogs[i].stock_id
            };
            this.$api.journal.portfolio.history(historyparams).then(
              function(result) {
                let portfolioLogsfinal = result.data

                let market_value = {market_value: 0}
                let profit = {profit: 0}
                let perf_percentage = {perf_percentage: 0, id_str: null}
                this.portfolioLogs[i] = {...this.portfolioLogs[i],...portfolioLogsfinal,...market_value,...profit,...perf_percentage}
                
                let buyResult = parseFloat(this.portfolioLogs[i].last) * parseFloat(this.portfolioLogs[i].position)
                let dpartcommission = buyResult * 0.0025;
                let dcommission = (dpartcommission > 20 ? dpartcommission : 20);
                // TAX
                let dtax = dcommission * 0.12;
                // Transfer Fee
                let dtransferfee = buyResult * 0.00005;
                // SCCP
                let dsccp = buyResult * 0.0001;
                let dsell = buyResult * 0.006;
                let dall =  dcommission + dtax + dtransferfee + dsccp + dsell;
                let dbuyall =  dcommission + dtax + dtransferfee + dsccp;
                let results = buyResult - dall;
                let resultsBuy = buyResult + dbuyall;

                this.portfolioLogs[i].market_value = results

                this.portfolioLogs[i].total_value = resultsBuy
                this.portfolioLogs[i].fund = this.defaultPortfolioId
                // console.log(this.portfolioLogs[i].fund)
                this.portfolioLogs[i].profit = this.portfolioLogs[i].market_value - this.portfolioLogs[i].total_value
                this.portfolioLogs[i].perf_percentage = this.portfolioLogs[i].profit / this.portfolioLogs[i].total_value * 100
                this.portfolioLogs[i].stock_id = result.data.symbol
                this.portfolioLogs[i].id_str = result.data.stockidstr
                this.totalProfitLoss = this.totalProfitLoss+ parseFloat(this.portfolioLogs[i].profit);
                this.totalProfitLossPerf = this.totalProfitLossPerf+ parseFloat(this.portfolioLogs[i].perf_percentage);
                this.portfolioLogsStock.push(this.portfolioLogs[i])
                // this.portfolioLogsStock
                this.setOpenPosition(this.portfolioLogs)

                this.livePortfolioLoading = false
              }.bind(this)
            );
          }
        }.bind(this)
      );
      this.componentKeys++;
    }
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      renderEditKey: "journal/getRenderEditKey",
      userPortfolio: "journal/getUserPortfolio",
    })
  },
  watch: {
    renderPortfolioKey: function() {
      this.getOpenPositions();
    },
    renderEditKey: function() {
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
  .rtf_top-btn .v-btn__content {
    font-size: 12px!important;
  }
  .v-data-table.data_table-container tbody tr:hover:not(.v-data-table__expand-row) {
    background: rgba(182, 182, 182, .20) !important;
  }
</style>
<style>
  .data_table-container i.v-icon.v-data-table-header__icon.mdi.mdi-arrow-up {
      float: left;
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
    border: 2px solid #03DAC5;
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
    color: #03DAC5;
  }
  .v-pagination.lp_data_table-pagination .v-pagination__item--active {
    color: #03DAC5;
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
  .v-data-table.data_table-container th:first-child {
    padding-left: 8px !important;
  }
</style>