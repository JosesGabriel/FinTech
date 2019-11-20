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
          <!--<v-btn rounded outlined color="#48FFD5" dark class="rtf_top-btn text-capitalize mr-2" @click ="EnterRecordModal=true" style="border-width: 2px" height="23">Record</v-btn>-->
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
          class="data_table-container pl-10 secondary--text"
        >
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions" :id="`tl_${item.id}`" @mouseover="tradelogsmenuLogsShow(item)" @mouseleave="tradelogsmenuLogsHide(item)">
            <v-btn small class="caption" text color="success">Details</v-btn>
            <v-btn small class="caption" text color="success">Edit</v-btn>
            <v-btn small class="caption" text color="success">Delete</v-btn>
          </div>
          <v-icon
            small
            class="mr-2"
            @mouseover="tradelogsmenuLogsShow(item)"
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
            <span class="pl-1">of {{  }}</span>
            </v-card-title>
          </v-card>
          <v-card color="transparent" elevation="0">
            <v-pagination class="d-flex flex-end lp_data_table-pagination" color="transparent" dark v-model="page" :length="pageCount"></v-pagination>
          </v-card>
        </v-card>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
       
    </v-col>
</template>
<script>
import shareModal from '~/components/modals/share'
//import RecordModal from '~/components/trade-simulator/RecordModal'
export default {
  components: {
    shareModal,
  },
  data: function() {
    return {
      showScheduleForm: false,
      itemsPerPage: 5,
      stockSymbol: [],
      stock_symbol: "",
      search: '',
      headers: [
        { text: 'Stocks', value: 'Stocks' , align: 'left', sortable: false },
        { text: 'Date', value: 'date', align: 'right' },
        { text: 'Volume', value: 'amount', align: 'right' },
        { text: 'Ave. Price', value: 'AvePrice', align: 'right' },
        { text: 'Buy Value', value: 'BuyValue', align: 'right' },
        { text: 'Sell Price', value: 'SellPrice', align: 'right' },
        { text: 'Sell Value', value: 'SellValue', align: 'right' },
        { text: 'Profit/Loss', value: 'ProfitLoss', align: 'right' },
        { text: 'Perf. (%)', value: 'Perf', align: 'right' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      tradeLogs: [],
      page: 1,
      pageCount: 0,
      menuShow: false,
      selectedProfile: null,
      componentKeys: 0
    }
  },
  mounted() {
    //if (localStorage.currentProfile) this.selectedProfile = localStorage.currentProfile;

    const tradelogsparams = {
      user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
      fund: 73287292558643200
    };
    this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
      function(result) {
          //this.tradeLogs = result.meta.logs.meta;
          for(let i = 0; i < result.meta.logs.length; i++){
            let date = result.meta.logs[i].meta.date.split(' ')[0];
            let bvalue = parseFloat(result.meta.logs[i].meta.average_price) * parseFloat(result.meta.logs[i].amount);
            let sellvalue = parseFloat(result.meta.logs[i].meta.sell_price) * parseFloat(result.meta.logs[i].amount);
            let ploss = sellvalue - bvalue;
            let perc = (ploss / bvalue) * 100;
           
            this.stockSymbol.push(result.meta.logs[i].meta.stock_id);   
            let tlogs = {
                  Stocks: this.stock_symbol,
                  date: date,
                  amount: result.meta.logs[i].amount,
                  AvePrice: result.meta.logs[i].meta.average_price,
                  BuyValue: this.addcomma(bvalue),
                  SellPrice: result.meta.logs[i].meta.sell_price,
                  SellValue: this.addcomma(sellvalue),
                  ProfitLoss: ploss.toFixed(2),
                  Perf: perc.toFixed(2) + '%',
                }
              this.tradeLogs.push(tlogs);
            }
            console.log(this.stockSymbol.length);
      }.bind(this)
    );

  },
  methods: {
    tradelogsmenuLogsShow: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "block";
    },
    tradelogsmenuLogsHide: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "none";
    },
    addcomma(n, sep, decimals) {
          sep = sep || "."; // Default to period as decimal separator
          decimals = decimals || 2; // Default to 2 decimals
          return n.toLocaleString().split(sep)[0]
              + sep
              + n.toFixed(2).split(sep)[1];
      },
  /* stocksymbol(){
            for(let i=0; i< this.stockSymbol.length; i++){
                const params2 = {
                  "symbol-id": this.stockSymbol[i]
                };
                this.$api.chart.stocks.list(params2).then(
                  function(result) {      
                    this.stock_symbol = result.data.symbol;
                    console.log(this.stock_symbol);
                  }.bind(this)
                );
          }
    }*/

  },
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
  .tl_searchfields .v-input__slot {
    margin: 0;
  }
  .tl_searchfields {
    transform: scale(0.7);
    transform-origin: left;
  }
</style>