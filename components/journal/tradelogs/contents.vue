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
        <template v-slot:item.action="{ item }">
          <div v-show="menuShow" class="sidemenu_actions" :id="`tl_${item.id}`" @mouseover="tradelogsmenuLogsShow(item)" @mouseleave="tradelogsmenuLogsHide(item)">
            <v-btn small class="caption" text color="success">Trade Details</v-btn>
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
        { text: 'Stocks', value: 'Stocks', align: 'left', sortable: false },
        { text: 'Position', value: 'Position', align: 'right' },
        { text: 'Avg. Price', value: 'AvgPrice', align: 'right' },
        { text: 'Total Cost', value: 'TotalCost', align: 'right' },
        { text: 'Market Value', value: 'MarketValue', align: 'right' },
        { text: 'Profit', value: 'Profit', align: 'right' },
        { text: 'Perf. (%)', value: 'Perf', align: 'right' },
        { text: '', value: 'action', sortable: false, align: 'right' },
      ],
      tradeLogs: [
        {
          id: 1,
          Stocks: 'Frozen Yogurt',
          Position: 159,
          AvgPrice: 6.0,
          TotalCost: 24,
          MarketValue: 4.0,
          Profit: '1%',
          Perf: '1%',
        },
        {
          id: 2,
          Stocks: 'Ice cream sandwich',
          Position: 237,
          AvgPrice: 9.0,
          TotalCost: 37,
          MarketValue: 4.3,
          Profit: '1%',
          Perf: '1%',
        },
        {
          id: 3,
          Stocks: 'Eclair',
          Position: 262,
          AvgPrice: 16.0,
          TotalCost: 23,
          MarketValue: 6.0,
          Profit: '7%',
          Perf: '7%',
        },
        {
          id: 4,
          Stocks: 'Cupcake',
          Position: 305,
          AvgPrice: 3.7,
          TotalCost: 67,
          MarketValue: 4.3,
          Profit: '8%',
          Perf: '8%',
        },
        {
          id: 5,
          Stocks: 'Gingerbread',
          Position: 356,
          AvgPrice: 16.0,
          TotalCost: 49,
          MarketValue: 3.9,
          Profit: '16%',
          Perf: '16%',
        },
        {
          id: 6,
          Stocks: 'Jelly bean',
          Position: 375,
          AvgPrice: 0.0,
          TotalCost: 94,
          MarketValue: 0.0,
          Profit: '0%',
          Perf: '0%',
        },
        {
          id: 7,
          Stocks: 'Lollipop',
          Position: 392,
          AvgPrice: 0.2,
          TotalCost: 98,
          MarketValue: 0,
          Profit: '2%',
          Perf: '2%',
        },
        {
          id: 8,
          Stocks: 'Honeycomb',
          Position: 408,
          AvgPrice: 3.2,
          TotalCost: 87,
          MarketValue: 6.5,
          Profit: '45%',
          Perf: '45%',
        },
        {
          id: 9,
          Stocks: 'Donut',
          Position: 452,
          AvgPrice: 25.0,
          TotalCost: 51,
          MarketValue: 4.9,
          Profit: '22%',
          Perf: '22%',
        },
        {
          id: 10,
          Stocks: 'KitKat',
          Position: 518,
          AvgPrice: 26.0,
          TotalCost: 65,
          MarketValue: 7,
          Profit: '6%',
          Perf: '6%',
        },
      ],
      page: 1,
      pageCount: 0,
      menuShow: false
    }
  },
  methods: {
    tradelogsmenuLogsShow: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);

      tl.style.display = "block";
    },
    tradelogsmenuLogsHide: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);

      tl.style.display = "none";
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