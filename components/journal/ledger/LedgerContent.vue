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
          class="data_table-container pl-10 secondary--text"
        >
        <template v-slot:item.count="{ item }">{{ item.count }}</template>
        <template v-slot:item.created_at="{ item }">{{ item.created_at }}</template>
        <template v-slot:item.total_value="{ item }">{{ formatPrice(item.total_value) }}</template>
        <template v-slot:item.balance="{ item }">{{ formatPrice(item.balance) }}</template>
        <template slot="footer">
          <tr class='grey lighten-2'>
            <td colspan="3" ><strong>Mean:</strong></td>
          </tr>
        </template>
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions mt-n1" :id="`lt_${item.id}`" @mouseover="ledgermenuLogsShow(item)" @mouseleave="ledgermenuLogsHide(item)">
            <v-btn small class="caption" text color="success">Details</v-btn>
            <v-btn small class="caption" text color="success">Edit</v-btn>
            <v-btn small class="caption" text color="success">Delete</v-btn>
          </div>
          <v-icon
            small
            class="mr-2"
            @mouseover="ledgermenuLogsShow(item)"
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
      showScheduleForm: false,
      itemsPerPage: 5,
      search: '',
      headers: [
        { text: 'Count', value: 'count', align: 'center', sortable: false },
        { text: 'Date', value: 'created_at', align: 'center' },
        { text: 'Transaction', value: 'transaction', align: 'center' },
        { text: 'Debit', value: 'Debit', align: 'right' },
        { text: 'Credit', value: 'total_value', align: 'right' },
        { text: 'Balance', value: 'balance', align: 'right' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      ledgerContent: [],
      page: 1,
      pageCount: 0,
      balance: 0,
      menuShow: false
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
      this.balance = 0;
      this.count = 0;
      this.$api.journal.portfolio.ledger(ledgerparams).then(response => {
      this.ledgerContent = response.meta.ledger
        for (let i = 0; i < this.ledgerContent.length; i++) {
          let created_at_date = new Date(this.ledgerContent[i].created_at).toISOString().substr(0, 10)
          this.ledgerContent[i].created_at = created_at_date

          if(this.ledgerContent[i].action == "deposit"){
            this.ledgerContent[i].action = "Deposit Income"
          } else if(this.ledgerContent[i].action == "dividend_income") {
            this.ledgerContent[i].action = "Dividend Income"
          }
        
          let ledgerArray = {transaction: this.ledgerContent[i].action, balance: 0, counter: 1, count: 0}
          this.ledgerContent[i] = {...ledgerArray,...this.ledgerContent[i]}
          
          this.ledgerContent[i].balance = this.balance = this.balance + parseFloat(this.ledgerContent[i].total_value);
          this.ledgerContent[i].count = this.count = this.count + parseFloat(this.ledgerContent[i].counter);
          console.log(this.ledgerContent[i])
        }
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