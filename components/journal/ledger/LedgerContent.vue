<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-center align-center px-0 py-3 pt-5">
          <v-col class="pa-0 pr-3 mr-n10" cols="12" sm="4" md="4">
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
          <v-btn icon small @click.stop="showScheduleForm=true"> 
              <img src="/icon/journal-icons/share-icon.svg" width="15">
          </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="ledgerContent"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          dark
          :loading="liveLedgerLoading"
          loading-text="Loading..."
          class="data_table-container pl-10 secondary--text"
        >
        <template v-slot:item.count="{ item }">{{ item.count }}</template>
        <template v-slot:item.created_at="{ item }">{{ item.created_at }}</template>
        <template v-slot:item.debit="{ item }">{{ item.debit }}</template>
        <template v-slot:item.credit="{ item }">{{ item.credit }}</template>
        <template v-slot:item.balance="{ item }">{{ formatPrice(item.balance) }}</template>
        <template slot="footer">
          <v-row no-gutters class="mt-3">
            <v-spacer></v-spacer>
            <span style="width: 190px" class="text-right subtitle-2">Total Funds:</span>
            <span style="width: 190px" class="text-right subtitle-2" :class="(totalDebit < 0 ? 'negative' : 'positive')">{{ formatPrice(totalDebit) }}</span>
            <span style="width: 190px" class="text-right subtitle-2" :class="(totalCredit < 0 ? 'negative' : 'positive')">{{ formatPrice(totalCredit) }}</span>
            <span style="width: 190px;" class="text-right subtitle-2" >  </span>
          </v-row>
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
            <span class="pl-1">of {{ ledgerContent.length }}</span>
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
import { mapActions, mapGetters } from "vuex"

export default {
  components: {
    shareModal
  },
  data () {
    return {
      liveLedgerLoading: "success",
      showScheduleForm: false,
      itemsPerPage: 10,
      search: '',
      headers: [
        { text: 'Count', value: 'count', align: 'center', sortable: false },
        { text: 'Date', value: 'created_at', align: 'center' },
        { text: 'Transaction', value: 'action', align: 'center' },
        { text: 'Debit', value: 'debit', align: 'right', width: "190px" },
        { text: 'Credit', value: 'credit', align: 'right', width: "190px" },
        { text: 'Balance', value: 'balance', align: 'right', width: "190px" },
      ],
      ledgerContent: [],
      page: 1,
      pageCount: 0,
      totalCredit: 0,
      totalDebit: 0,
      menuShow: false,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey"
    }),
  },
  mounted() {
    if(this.defaultPortfolioId != 0 ?  this.getLedgerLogs() : '');
  },
  methods: {
    getLedgerLogs() {
      const ledgerparams = {
          user_id : "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
	      fund: this.defaultPortfolioId
      }
      this.totalCredit = 0;
      this.totalDebit = 0;
      this.balance = 0;
      this.credit = 0;
      this.debit = 0;
      this.count = 0;
      this.$api.journal.portfolio.ledger(ledgerparams).then(response => {
      this.ledgerContent = response.meta.ledger
        for (let i = 0; i < this.ledgerContent.length; i++) {
          this.ledgerContent[i].created_at = this.ledgerContent[i].created_at.slice(0, 10)
          console.log(this.ledgerContent[i])
          let ledgerArray = {transaction: this.ledgerContent[i].action, balance: 0, counter: 1, count: 0}
          this.ledgerContent[i] = {...ledgerArray,...this.ledgerContent[i]}

          if(this.ledgerContent[i].action == "deposit"){
            const Depositdebit = {debit: '-', credit: parseFloat(this.ledgerContent[i].total_value).toFixed(2).replace('.', '.').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            this.ledgerContent[i] = {...Depositdebit,...this.ledgerContent[i]}
            this.ledgerContent[i].action = "Deposit Income"
          } else if(this.ledgerContent[i].action == "dividend_income") {
            const Dividenddebit = {debit: '-', credit: parseFloat(this.ledgerContent[i].total_value).toFixed(2).replace('.', '.').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            this.ledgerContent[i] = {...Dividenddebit,...this.ledgerContent[i]}
            this.ledgerContent[i].action = "Dividend Income"
          } else if(this.ledgerContent[i].action == "withdraw") {
            const debit = {debit: parseFloat(this.ledgerContent[i].total_value).toFixed(2).replace('.', '.').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), credit: '-'}
            this.ledgerContent[i] = {...debit,...this.ledgerContent[i]}
            this.ledgerContent[i].action = "Withdraw"
          }
          
          this.ledgerContent[i].count = this.count = this.count + parseFloat(this.ledgerContent[i].counter);
          this.ledgerContent[0].count = 1;
          
          if(this.ledgerContent[i].debit != '-') {
            this.totalDebit = this.debit = this.debit + parseFloat(this.ledgerContent[i].debit.replace(/,/g, ''));

            this.ledgerContent[i].balance = this.balance = this.balance - parseFloat(this.ledgerContent[i].debit.replace(/,/g, ''));
          } else if (this.ledgerContent[i].credit != '-') {
            this.totalCredit = this.credit = this.credit + parseFloat(this.ledgerContent[i].credit.replace(/,/g, ''));

            this.ledgerContent[i].balance = this.balance = this.balance + parseFloat(this.ledgerContent[i].credit.replace(/,/g, ''));
          }
          
        }
        this.liveLedgerLoading = false
      });
    },
    ledgermenuLogsShow: function(item) {
      let lt = document.getElementById(`lt_${item.id}`);

      lt.style.display = "block";
    },
    ledgermenuLogsHide: function(item) {
      let lt = document.getElementById(`lt_${item.id}`);

      lt.style.display = "none";
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
  watch: {
    renderPortfolioKey: function() {
      this.getLedgerLogs();
    },
    defaultPortfolioId: function() {
      this.getLedgerLogs();
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