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
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions" :id="`lt_${item.id}`" @mouseover="ledgermenuLogsShow(item)" @mouseleave="ledgermenuLogsHide(item)">
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
        { text: 'Count', value: 'Count', align: 'center', sortable: false },
        { text: 'Date', value: 'Date', align: 'center' },
        { text: 'Transaction', value: 'Transaction', align: 'center' },
        { text: 'Debit', value: 'Debit', align: 'center' },
        { text: 'Credit', value: 'Credit', align: 'center' },
        { text: 'Balance', value: 'Balance', align: 'center' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      ledgerContent: [
        {
          id: 1,
          Count: 'BDO',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 2,
          Count: '2GO',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 3,
          Count: '8990P',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 4,
          Count: 'AB',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 5,
          Count: 'ABA',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 6,
          Count: 'ABG',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 7,
          Count: 'ABS',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 8,
          Count: 'ABSP',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 9,
          Count: 'AC',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
        {
          id: 10,
          Count: 'ACE',
          Date: 159,
          Transaction: 6.0,
          Debit: 24,
          Credit: 4.0,
          Balance: '1%',
        },
      ],
      page: 1,
      pageCount: 0,
      menuShow: false
    }
  },
  methods: {
    ledgermenuLogsShow: function(item) {
      let lt = document.getElementById(`lt_${item.id}`);

      lt.style.display = "block";
    },
    ledgermenuLogsHide: function(item) {
      let lt = document.getElementById(`lt_${item.id}`);

      lt.style.display = "none";
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