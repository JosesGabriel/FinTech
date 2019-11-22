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
        <template v-slot:item.ProfitLoss="{ item }"><span :class="(item.ProfitLoss > 0 ? 'positive' : item.ProfitLoss < 0 ? 'negative' : '')">{{ item.ProfitLoss }}</span></template>
        <template v-slot:item.Perf="{ item }"><span :class="(item.Perf > 0 ? 'positive' : item.Perf < 0 ? 'negative' : '')">{{ item.Perf }}%</span></template>

        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions" :id="`tl_${item.id}`" @mouseover="tradelogsmenuLogsShow(item)" @mouseleave="tradelogsmenuLogsHide(item)">
            <v-btn small class="caption" text color="success">Details</v-btn>
            <v-btn small class="caption" text color="success">Edit</v-btn>
            <v-btn small class="caption" v-model="item" item-value="item" v-on:click="deleteLogs(item.action)" text color="success">Delete</v-btn>
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
            <span class="pl-1">of {{ tradeLogs.length }}</span>
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
import { mapActions, mapGetters } from "vuex";
//import RecordModal from '~/components/trade-simulator/RecordModal'
export default {
  components: {
    shareModal,
  },
  data: function() {
    return {
      showScheduleForm: false,
      itemsPerPage: 5,
      search: '',
      headers: [
        { text: 'Stocks', value: 'stock_id' , align: 'left', sortable: false },
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
   computed: {
      ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      }),
    },
  mounted() {
     if(this.simulatorPortfolioID != 0 ?  this.getTradeLogs() : ''); 
  },
  watch: {
      simulatorPortfolioID: function () {
          this.getTradeLogs();
      }
  },
  methods: {
     ...mapActions({      
            setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
    }),
    getTradeLogs(){
      const tradelogsparams = {
      user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
      fund: this.simulatorPortfolioID
    };
    this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
      function(result) {
        console.log(result);
          this.tradeLogs = result.meta.logs;       
          for(let i = 0; i < result.meta.logs.length; i++){       
            const params = {
                    "symbol-id": this.tradeLogs[i].meta.stock_id
                  };
                  this.$api.chart.stocks.list(params).then(
                    function(result) {
                      this.tradeLogs[i].stock_id = result.data.symbol;
                    }.bind(this)
                  );
            let date = result.meta.logs[i].meta.date.split(' ')[0];
            let bvalue = parseFloat(result.meta.logs[i].meta.average_price) * parseFloat(result.meta.logs[i].amount);
            let sellvalue = parseFloat(result.meta.logs[i].meta.sell_price) * parseFloat(result.meta.logs[i].amount);
            let ploss = sellvalue - bvalue;
            let perc = (ploss / bvalue) * 100;

            this.tradeLogs[i].date = date;
            this.tradeLogs[i].amount = result.meta.logs[i].amount;
            this.tradeLogs[i].AvePrice = result.meta.logs[i].meta.average_price;
            this.tradeLogs[i].BuyValue = bvalue.toFixed(2);
            this.tradeLogs[i].SellPrice = result.meta.logs[i].meta.sell_price;
            this.tradeLogs[i].SellValue = sellvalue.toFixed(2);
            this.tradeLogs[i].ProfitLoss = ploss.toFixed(2);
            this.tradeLogs[i].Perf = perc.toFixed(2);
            this.tradeLogs[i].action = result.meta.logs[i].id;

          }
      }.bind(this)
    );

    },
    deleteLogs: function(item){
        const params ={
          user_id : "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
        }
        this.$axios
        .$post(process.env.JOURNAL_API_URL + "/journal/funds/tradelog/delete/"+ item , params)
        .then(response => {      
            if (response.success) {
                console.log('delete success');
                this.getTradeLogs();
            }
        });
    },
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
   .positive{
    color: #00FFC3;
}
  .negative{
      color: #fe4949;
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