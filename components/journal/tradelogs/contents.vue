<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-center align-center px-0 py-3 pt-5">
          <v-col class="pa-0 pr-3" cols="12" sm="3" md="3">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              outlined
              dense
              hide-details
              dark
              color="success"
              class="tl_searchfields"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Day</v-btn>
          <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Week</v-btn>
          <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Month</v-btn>
          <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Year</v-btn>
          <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Custom</v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined color="#03dac5" dark class="rtf_top-btn text-capitalize mr-2" height="23"><span class="v-btn__content">Record</span></v-btn>

            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="tradeLogs"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          dark
          :loading="liveTradelogsLoading"
          loading-text="Loading..."
          class="data_table-container pl-10 secondary--text"
        >
        <template v-slot:item.stock_id="{ item }" ><span class="pl-2">{{ item.stock_id }}</span></template>
        <template v-slot:item.date="{ item }" >{{ item.meta.date }}</template>
        <template v-slot:item.average_price="{ item }" >{{ formatAvePrice(item.meta.average_price) }}</template>
        <template v-slot:item.buy_value="{ item }" >{{ formatPrice(item.meta.buy_value) }}</template>
        <template v-slot:item.sell_price="{ item }" >{{ formatPrice(item.meta.sell_price) }}</template>
        <template v-slot:item.total_value="{ item }" >{{ formatPrice(item.total_value) }}</template>
        <template v-slot:item.profit_loss="{ item }" ><span :class="item.meta.profit_loss > 0 ? 'positive' : item.meta.profit_loss < 0 ? 'negative' : 'neutral' ">{{ formatPrice(item.meta.profit_loss) }}</span></template>
        <template v-slot:item.profit_loss_percentage="{ item }" ><span :class="item.meta.profit_loss_percentage > 0 ? 'positive' : item.meta.profit_loss_percentage < 0 ? 'negative' : 'neutral' ">{{ formatPrice(item.meta.profit_loss_percentage) }}%</span></template>
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions mt-n1" :id="`tl_${item.id}`" @mouseover="tradelogsmenuLogsShow(item)" @mouseleave="tradelogsmenuLogsHide(item)">
            <v-btn small class="caption" text color="success" @click.stop="showSellDetails=true" v-on:click="detailsLive(item)">Details</v-btn>
            <!-- <v-btn small class="caption" text color="success" @click.stop="showSellEdit=true" v-on:click="editLive(item)">Edit</v-btn> -->
            <v-btn small class="caption" text color="success" @click.stop="showSellDelete=true" v-on:click="deleteLive(item)">Delete</v-btn>
          </div>
          <v-icon
            small
            class="mr-2 secondary--text"
            @mouseover="tradelogsmenuLogsShow(item)"
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
              :value="(tradeLogs.length <= 5 ? tradeLogs.length : 5)"
              type="number"
              min="5"
              max="10"
              @input="itemsPerPage = parseInt($event, 10)"
              dark
              class="pt-0 pl-4 mt-0 ml-1 show_rows caption"
              color="success"
              dense
            ></v-text-field>
            <span class="pl-1">of {{ tradeLogs.length }}</span>
            </v-card-title>
          </v-card>
          <v-card color="transparent" elevation="0">
            <v-pagination class="d-flex flex-end lp_data_table-pagination" color="transparent" dark v-model="page" :length="pageCount"></v-pagination>
          </v-card>
        </v-card>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
        <sell-delete :visible="showSellDelete" :itemDetails="itemDetails" @close="showSellDelete=false" />
        <sell-details :visible="showSellDetails" :itemDetails="itemDetails" @close="showSellDetails=false" />
    </v-col>
</template>
<script>
import shareModal from '~/components/modals/share'
import sellDelete from '~/components/modals/sellDelete'
import sellDetails from '~/components/modals/sellDetails'

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal,
    sellDelete,
    sellDetails
  },
  data () {
    return {
      liveTradelogsLoading: "success",
      showScheduleForm: false,
      showSellDelete: false,
      showSellDetails: false,
      itemDetails: null,

      itemsPerPage: 5,
      search: '',
      headers: [
        { text: 'Stocks', value: 'stock_id', align: 'left', sortable: false },
        { text: 'Date', value: 'date', align: 'right' },
        { text: 'Volume', value: 'amount', align: 'right' },
        { text: 'Ave. Price', value: 'average_price', align: 'right' },
        { text: 'Buy Value', value: 'buy_value', align: 'right' },
        { text: 'Sell Price', value: 'sell_price', align: 'right' },
        { text: 'Sell Value', value: 'total_value', align: 'right' },
        { text: 'Profit/Loss', value: 'profit_loss', align: 'right' },
        { text: 'Perf. (%)', value: 'profit_loss_percentage', align: 'right' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      tradeLogs: [],
      page: 1,
      pageCount: 0,
      menuShow: false,

      selectedProfile: null,
      date: new Date().toISOString().substr(0, 10),
      totalProfitLoss: 0,
      totalProfitLossPerf: 0
    }
  },
  mounted() {
    if(this.defaultPortfolioId != 0 ?  this.getTradeLogs() : ''); 
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      renderEditKey: "journal/getRenderEditKey",
    }),
    
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey"
    }),
    deleteLive: function(item) {
      this.itemDetails = item
    },
    detailsLive: function(item) {
      this.itemDetails = item
    },
    editLive: function(item) {
      this.itemDetails = item
    },
    getTradeLogs() {
      const tradelogsparams = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        fund: this.defaultPortfolioId,
      };
      this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
        function(result) {
            this.tradeLogs = result.meta.logs;
            
            this.totalProfitLoss = 0;
            this.totalProfitLossPerf = 0;
            for (let i = 0; i < this.tradeLogs.length; i++) {
              const params = {
                "symbol-id": this.tradeLogs[i].meta.stock_id
              };
              this.$api.chart.stocks.list(params).then(
                function(result) {
                this.tradeLogs[i].stock_id = result.data.symbol;
                let buyvalueResult = this.tradeLogs[i].meta.average_price * this.tradeLogs[i].amount
                let average_price = {average_price: this.tradeLogs[i].meta.average_price, date: new Date().toISOString().substr(0, 10),...this.tradeLogs[i].meta, buy_value: buyvalueResult, profit_loss: 0, profit_loss_percentage: 0}
                this.tradeLogs[i].meta = {...average_price}
                
                this.tradeLogs[i].meta.profit_loss = this.tradeLogs[i].total_value - this.tradeLogs[i].meta.buy_value
                this.tradeLogs[i].meta.profit_loss_percentage = this.tradeLogs[i].meta.profit_loss / this.tradeLogs[i].meta.buy_value * 100

                this.totalProfitLoss = this.totalProfitLoss+ parseFloat(this.tradeLogs[i].meta.profit_loss);
                this.totalProfitLossPerf = this.totalProfitLossPerf+ parseFloat(this.tradeLogs[i].meta.profit_loss_percentage);
                }.bind(this)
              );
            }
            this.liveTradelogsLoading = false
        }.bind(this)
      )
      this.componentKeys++;
    },
    tradelogsmenuLogsShow: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "block";
    },
    tradelogsmenuLogsHide: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "none";
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    formatAvePrice(value) {
        let val = (value/1).toFixed(3).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  watch: {
    renderPortfolioKey: function() {
      this.getTradeLogs();
    },
    defaultPortfolioId: function() {
      this.getTradeLogs();
    },
    renderEditKey: function() {
      this.getTradeLogs();
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
</style>
<style>
  .tl_searchfields .v-input__slot {
    margin: 0;
  }
  .tl_searchfields {
    transform: scale(0.7);
    transform-origin: left;
  }
</style>