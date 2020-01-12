<template>
    <v-col class="pa-0" ref="componentWrapper">
      <!-- Don't remove ref value. Used for sharing -->
        <v-card-title class="text-left justify-center align-center px-0 py-3 pt-5">
          <v-col class="pa-0 pr-3 mr-n10" cols="12" sm="4" md="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              outlined
              dense
              hide-details
              :dark="lightSwitch == true"
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
          <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon>mdi-share-variant</v-icon>
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
          :dark="lightSwitch == true"
          :loading="liveLedgerLoading"
          loading-text="Loading..."
          class="data_table-container pl-10 secondary--text"
        >
        <template v-slot:item.count="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.count }}</span>
        </template>
        <template v-slot:item.created_at="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.created_at }}</span>
        </template>
        <template v-slot:item.action="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.action }}</span>
        </template>
        <template v-slot:item.debit="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.debit }}</span>
        </template>
        <template v-slot:item.credit="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.credit }}</span>
        </template>
        <template v-slot:item.balance="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ formatPrice(item.balance) }}</span>
        </template>
        <template slot="footer">
          <v-row no-gutters class="mt-3">
            <v-spacer></v-spacer>
            <span style="width: 190px" class="text-right subtitle-2" :style="{ color: fontcolor2 }">Total Funds:</span>
            <span style="width: 190px" class="text-right subtitle-2" :class="(totalDebit < 0 ? 'negative' : 'positive')">{{ formatPrice(totalDebit) }}</span>
            <span style="width: 190px" class="text-right subtitle-2" :class="(totalCredit < 0 ? 'negative' : 'positive')">{{ formatPrice(totalCredit) }}</span>
            <span style="width: 190px;" class="text-right subtitle-2" >  </span>
          </v-row>
        </template>
        </v-data-table>
        <v-card class="d-flex justify-space-between align-center my-5" color="transparent" elevation="0">
          <v-card color="transparent" :dark="lightSwitch == true" class="justify-center" elevation="0">
            <v-card-title class="caption pa-0"><span>Show Rows</span>
            <v-spacer></v-spacer>
            <v-text-field
              :value="(ledgerContent.length <= 5 ? ledgerContent.length : 5)"
              type="number"
              min="5"
              max="10"
              @input="itemsPerPage = parseInt($event, 10)"
              :dark="lightSwitch == true"
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
        <share-modal
      v-if="showShareForm"
      :imageid="shareLink"
      @closeModal="showShareForm = false"
    />
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
      shareLink: "",
      showShareForm: false,
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
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    fontColor: function() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    fontcolor2: function() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    },
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  mounted() {
    if(this.defaultPortfolioId != 0 ?  this.getLedgerLogs() : '');
  },
  methods: {
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    getLedgerLogs() {
      const ledgerparams = {
	      fund: this.defaultPortfolioId
      }
      this.totalCredit = 0;
      this.totalDebit = 0;
      this.balance = 0;
      this.credit = 0;
      this.debit = 0;
      this.count = 0;
      this.$api.journal.portfolio.ledger(ledgerparams).then(response => {
      this.ledgerContent = response.data.ledger
        for (let i = 0; i < this.ledgerContent.length; i++) {
          this.ledgerContent[i].created_at = this.ledgerContent[i].created_at.slice(0, 10)
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
    defaultPortfolioId: function() {
      this.getLedgerLogs();
    },
    renderPortfolioKey: function() {
      this.getLedgerLogs();
    },
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