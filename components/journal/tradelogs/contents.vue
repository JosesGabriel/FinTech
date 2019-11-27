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
          <v-btn rounded outlined color="#48FFD5" dark class="rtf_top-btn text-capitalize mr-2" style="border-width: 2px" height="23">Record</v-btn>

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
        <template v-slot:item.stock_id="{ item }" >{{ item.stock_id }}</template>
        <template v-slot:item.date="{ item }" >{{ item.meta.date }}</template>
        <template v-slot:item.average_price="{ item }" >{{ formatPrice(item.meta.average_price) }}</template>
        <template v-slot:item.buy_value="{ item }" >{{ formatPrice(item.meta.buy_value) }}</template>
        <template v-slot:item.sell_price="{ item }" >{{ formatPrice(item.meta.sell_price) }}</template>
        <template v-slot:item.total_value="{ item }" >{{ formatPrice(item.total_value) }}</template>
        <template v-slot:item.profit_loss="{ item }" >{{ formatPrice(item.meta.profit_loss) }}</template>
        <template v-slot:item.profit_loss_percentage="{ item }" >{{ formatPrice(item.meta.profit_loss_percentage) }}%</template>
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions mt-n1" :id="`tl_${item.id}`" @mouseover="tradelogsmenuLogsShow(item)" @mouseleave="tradelogsmenuLogsHide(item)">
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

export default {
  components: {
    shareModal
  },
  data () {
    return {
      showScheduleForm: false,
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

      selectedProfile: null
    }
  },
  mounted() {
    console.log(this.defaultPortfolioId)
    console.log(this.renderPortfolioKey)
    const tradelogsparams = {
      user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
      fund: this.defaultPortfolioId,
    };
    this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
      function(result) {
          this.tradeLogs = result.meta.logs;
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

              // console.log(this.tradeLogs[i].meta.profit_loss, this.tradeLogs[i].buy_value)
              // this.tradeLogs[i].meta = {profit_loss: profit_loss}
              }.bind(this)
            );
          }
      }.bind(this)
    )
    this.componentKeys++;
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey"
    }),
    
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      // setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    getTradeLogs() {
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
        let val = (value/1).toFixed(3).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  watch: {
    renderPortfolioKey: function() {
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