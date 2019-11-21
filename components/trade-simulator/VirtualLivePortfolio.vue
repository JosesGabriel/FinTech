<template>
    <v-col class="pa-0">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h1 class="font-weight-regular subtitle-2" style="color:#fff;">
              OPEN POSITION/S (PHP)
            </h1>
            <v-spacer></v-spacer>
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize mr-2" @click.stop="showResetForm=true" style="border-width: 2px" height="23">Reset</v-btn>
            <v-btn rounded outlined color="#48FFD5" @click.stop="EnterTradeModal=true" dark class="text-capitalize mr-2" style="border-width: 2px" height="23">Trade</v-btn>
                     
              <v-btn icon small @click.stop="showScheduleForm=true"> 
                  <img src="/icon/journal-icons/share-icon.svg" width="15">
              </v-btn>
              
        </v-card-title>
        <v-data-table
              :headers="headers"
              :items="portfolioLogs"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              dark
              class="data_table-container pl-10 secondary--text"
            >
            <template v-slot:item.Profit="{ item }"><span :class="(item.Profit > 0 ? 'positive' : item.Profit < 0 ? 'negative' : '')">{{ item.Profit }}</span></template>
            <template v-slot:item.Perf="{ item }"><span :class="(item.Perf > 0 ? 'positive' : item.Perf < 0 ? 'negative' : '')">{{ item.Perf }}%</span></template>
            <template v-slot:item.action="{ item }">
                  <div v-show="menuShow" class="sidemenu_actions" :id="`pl_${item.id}`" @mouseover="menuLogsShow(item)" @mouseleave="menuLogsHide(item)">
                    <v-btn small class="caption" text color="success">Details</v-btn>
                    <v-btn small class="caption" text color="success">Edit</v-btn>
                    <v-btn small class="caption" v-model="item" item-value="item" v-on:click="deleteLive(item.action)" text color="success">Delete</v-btn>
                  </div>
                  <v-icon
                    small
                    class="mr-2"
                    @mouseover="menuLogsShow(item)"
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
                  <span class="pl-1">of {{ portfolioLogs.length }}</span>
                  </v-card-title>
                </v-card>
                <v-card color="transparent" elevation="0">
              <v-pagination class="d-flex flex-end lp_data_table-pagination" color="transparent" dark v-model="page" :length="pageCount"></v-pagination>
            </v-card>
        </v-card>

            <TradeModal :visible="EnterTradeModal" @close="EnterTradeModal=false" />
            <reset-modal :visible="showResetForm" @close="showResetForm=false" />
            <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
</template>
<script>
import TradeModal from '~/components/trade-simulator/TradeModal'
import resetModal from '~/components/modals/reset'
import shareModal from '~/components/modals/share'
import { mapActions, mapGetters } from "vuex";

export default {
    data () {
      return {
        itemsPerPage: 5,
        search: '',
        page: 1,
        pageCount: 0,
        menuShow: false,
        headers: [
          { text: 'Stocks', value: 'stock_id', align: 'left', sortable: false },
          { text: 'Position', value: 'Position', align: 'right' },
          { text: 'Avg. Price', value: 'AvgPrice', align: 'right' },
          { text: 'Total Cost', value: 'TotalCost', align: 'right' },
          { text: 'Market Value', value: 'MarketValue', align: 'right' },
          { text: 'Profit', value: 'Profit', align: 'right' },
          { text: 'Perf. (%)', value: 'Perf', align: 'right' },
          { text: '', value: 'action', sortable: false, align: 'right' },
        ],
        portfolioLogs: [],
        items: [
            { title: 'Note' },
            { title: 'Delete' },
        ],
        EnterTradeModal: false,
        showResetForm: false,
        showScheduleForm: false,
      }
      
    },
     components: {
        TradeModal,
        resetModal,
        shareModal,
    },
    watch: {
      simulatorPortfolioID: function () {
        this.getOpenPositions();
      }
    },
    methods: {
          ...mapActions({      
            setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
        }),
          getOpenPositions() {
            this.setSimulatorPortfolioID(73287292558643200);
            const openparams = {
              user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
              fund: 73287292558643200,
            };
            this.$api.journal.portfolio.open(openparams).then(
              function(result) {
                this.portfolioLogs = result.meta.open;
                for (let i = 0; i < this.portfolioLogs.length; i++) {
                  const params = {
                    "symbol-id": this.portfolioLogs[i].stock_id
                  };
                  this.$api.chart.stocks.list(params).then(
                    function(result) {
                      this.portfolioLogs[i].stock_id = result.data.symbol;
                    }.bind(this)
                  );
                  let mvalue = result.meta.open[i].position * parseFloat(result.meta.open[i].metas.buy_price).toFixed(2);
                  let profit = parseFloat(mvalue) - parseFloat(result.meta.open[i].total_value);
                  let tcost = result.meta.open[i].position * result.meta.open[i].average_price;
                  let perf = (profit / tcost) * 100;

                  this.portfolioLogs[i].Position = result.meta.open[i].position;
                  this.portfolioLogs[i].AvgPrice = result.meta.open[i].average_price.toFixed(2);
                  this.portfolioLogs[i].TotalCost = this.addcomma(tcost);
                  this.portfolioLogs[i].MarketValue = this.addcomma(mvalue);
                  this.portfolioLogs[i].Profit = profit.toFixed(2);
                  this.portfolioLogs[i].Perf = perf.toFixed(2);
                  this.portfolioLogs[i].action = this.portfolioLogs[i].stock_id;
                }
              }.bind(this)
            );
      },
      deleteLive: function (item) {
        console.log('delete-' + item);
          const params ={
                user_id : "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
              }
            if(confirm("Do you really want to delete?")){
                  this.$axios
                  .$post(process.env.JOURNAL_API_URL + "/journal/funds/73287292558643200/delete/" + item, params)
                  .then(response => {      
                      if (response.success) {
                          console.log('delete success');
                          this.getOpenPositions();
                      }
                  });
            }

      },
      menuLogsShow: function(item) {
        let pl = document.getElementById(`pl_${item.id}`);

        pl.style.display = "block";
      },
      menuLogsHide: function(item) {
        let pl = document.getElementById(`pl_${item.id}`);

        pl.style.display = "none";
      },
       addcomma(n, sep, decimals) {
          sep = sep || "."; // Default to period as decimal separator
          decimals = decimals || 2; // Default to 2 decimals
          return n.toLocaleString().split(sep)[0]
              + sep
              + n.toFixed(2).split(sep)[1];
      },
    },
    computed: {
            ...mapGetters({
            simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
            }),
    },
     mounted() {
        this.getOpenPositions();        
      },

}
</script>
<style scoped>
.theme--dark.v-icon {
    color: #fdfcfc;
}

.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.v-window.v-item-group.theme--light.v-tabs-items {
    background: none;
}
.item_position-prop {
  color: #b6b6b6
}

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

.edit_icons {
  display: none;
}
.pagination {
  display: inline-block;
}

.pagination a {
  color: #b6b6b6;
  float: left;
  width: 20px;
  width: 20px;
  text-align: center;
  text-decoration: none;
  transition: background-color .3s;
  border-radius: 20px;
}

.pagination a.active {
  background-color: #00FFC3;
  color: #00121E;
}

.pagination a:hover:not(.active) {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px
}
.show_rows-select {
    background: #00FFC3;
    color: #00121E;
}
.show_rows-cont {
    border: 2px solid #00FFC3;
    color: #00FFC3;
    outline-color: none !important;
    height: 18px;
    line-height: 1;
}
</style>
<style>
  .v-application .pl-4 {
      height: 24px;
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
    border: 2px solid #00ffc3;
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
.v-pagination.lp_data_table-pagination li .v-pagination__navigation {
      background: transparent;
      box-shadow: none;
      margin: 0;
      width: 10px;
  }
  .lp_data_table-pagination {
    color: #00ffc3;
  }
  .v-pagination.lp_data_table-pagination .v-pagination__item--active {
    color: #00FFC3;
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
  .positive{
    color: #00FFC3;
}
  .negative{
      color: #fe4949;
  }

</style>