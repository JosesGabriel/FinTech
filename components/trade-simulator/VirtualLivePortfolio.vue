<template>
  <v-col class="pa-0" ref="componentWrapper">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card-title class="text-left justify-left px-0 py-3 pt-5">
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="success"
        dark
        class="text-capitalize mr-2 resetbtn"
        @click.stop="showResetForm=true"
        height="23"
      >Reset</v-btn>
      <v-btn
        outlined
        color="success"
        @click.stop="EnterTradeModal=true"
        dark
        class="text-capitalize mr-2 resetbtn"
        height="23"
      >Trade</v-btn>

      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="portfolioLogs"
      :page.sync="page"
      hide-default-footer
      @page-count="pageCount = $event"
      :dark="lightSwitch == true"
      :style="{ background: cardBackground }"
      class="data_table-container pl-10 secondary--text"
    >  
        
            <template v-slot:item.stock_id="{ item }" >
              <span class="pl-3" :style="{ color: secondaryColor }">{{ item.stock_id }}</span>
            </template>
            <template v-slot:item.Position="{ item }">
              <span class="pl-3" :style="{ color: secondaryColor }">{{ item.Position }}</span>
            </template>
            <template v-slot:item.AvgPrice="{ item }">
              <span class="pl-3" :style="{ color: secondaryColor }">{{ item.AvgPrice }}</span>
            </template>
            <template v-slot:item.TotalCost="{ item }">
              <span class="pl-3" :style="{ color: secondaryColor }">{{ item.TotalCost }}</span>
            </template>

            <template v-slot:item.MarketValue="{ item }" >
              <span class="pl-3" :id="item.stock_id" :style="{ color: secondaryColor }">{{ item.MarketValue }}</span>
            </template>
            <template v-slot:item.Profit="{ item }">
              <span
                :class="(parseFloat(item.Profit) > 0 ? 'positive' : parseFloat(item.Profit) < 0 ? 'negative' : '')"
              >{{ item.Profit }}</span>
            </template>
            <template v-slot:item.Perf="{ item }">
              <span    
                :class="(parseFloat(item.Perf) > 0 ? 'positive' : parseFloat(item.Perf) < 0 ? 'negative' : '')"
              >{{ item.Perf }}%</span>
            </template>
            <template v-slot:item.action="{ item }">
              <div
                v-show="menuShow"
                class="sidemenu_actions"
                :dark="lightSwitch == true"
                :style="{ background: cardBackground }"
                :id="`pl_${item.id}`"
                @mouseover="menuLogsShow(item)"
                @mouseleave="menuLogsHide(item)"
              >
                <v-btn
                  small
                  class="caption btn_sidemenu"
                  @click.stop="showEditForm=true"
                  v-on:click="details(item.action, 'details')"
                  text
                >Details</v-btn>
                <v-btn
                  small
                  class="caption btn_sidemenu"
                  v-on:click="details(item.action, 'edit')"
                  @click.stop="showEditForm=true"
                  text
                >Edit</v-btn>
                <v-btn small class="caption btn_sidemenu"  @click.stop="showDelete=true" v-on:click="deleteLive(item.action)" text>Delete</v-btn>
              </div>
              <v-icon small class="mr-2" @mouseover="menuLogsShow(item)">mdi-dots-horizontal</v-icon>
            </template> 

    </v-data-table>

    <v-row>
      <v-col
        style="font-size: 12px;"
        class="text-right font-weight-regular mr-10"
        width="100%"
        :style="{ color: primaryColor }"
      >
        Total Profit/Loss as of {{ this.dateformat }}:
        <span
          class="ml-3 mr-4"
          :class="(this.totalProfitLoss < 0 ? 'negative' : 'positive')"
        >{{ this.addcomma(this.totalProfitLoss) }}</span>
        <span
          class="ml-12 mr-5"
          :class="(this.totalPerf < 0 ? 'negative' : 'positive')"
        >{{ this.addcomma(this.totalPerf) }}%</span>
      </v-col>
    </v-row>
    
    <v-dialog
      v-model="showEditForm"
      max-width="290"
      dark
      :dark="lightSwitch == true"
      :style="{ background: cardBackground }"
    >
      <v-card>
        <v-card-title class="success--text" style="font-size: 16px;" >{{ (this.editDetails == 'edit' ? 'EDIT' : 'TRADE DETAILS') }}</v-card-title>
        <v-card-text>
          <v-col sm="12" md="12" class="my-0">
            <div>
              <v-select
                offset-y="true"
                :readonly="(this.editDetails == 'edit' ? false : true)"
                item-color="success"
                :append-icon="(this.editDetails == 'edit' ? 'mdi-chevron-down' : '')"
                class="mb-5"
                :items="strategy"
                v-model="selectedstrategy"
                :label="(this.editDetails == 'edit' ? 'Enter Strategy' : 'Strategy')"
                dense
                flat
              >
                 <template slot="item" slot-scope="data">
                    <v-list-item-content
                      :dark="lightSwitch == true"
                      :style="{ background: cardBackground }"
                      style="padding: 21px 12px; margin: -16px;"
                    >
                      <v-list-item-title v-html="data.item"></v-list-item-title>
                    </v-list-item-content>
                  </template>
              </v-select>
            </div>
            <div>
              <v-select
                offset-y="true"
                :readonly="(this.editDetails == 'edit' ? false : true)"
                item-color="success"
                :append-icon="(this.editDetails == 'edit' ? 'mdi-chevron-down' : '')"
                class="mb-5"
                :items="tradeplan"
                v-model="selectedtradeplan"
                :label="(this.editDetails == 'edit' ? 'Enter Trade Plan' : 'Trade Plan')"
                dense
                flat
              >
                  <template slot="item" slot-scope="data">
                    <v-list-item-content
                      :dark="lightSwitch == true"
                      :style="{ background: cardBackground }"
                      style="padding: 21px 12px; margin: -16px;"
                    >
                      <v-list-item-title v-html="data.item"></v-list-item-title>
                    </v-list-item-content>
                  </template>
              </v-select>
            </div>
            <div>
              <v-select
                offset-y="true"
                :readonly="(this.editDetails == 'edit' ? false : true)"
                item-color="success"
                :append-icon="(this.editDetails == 'edit' ? 'mdi-chevron-down' : '')"
                :items="emotions"
                v-model="selectedemotions"
                :label="(this.editDetails == 'edit' ? 'Enter Emotions' : 'Emotions')"
                class="mb-1"
                dense
                flat
              >
                  <template slot="item" slot-scope="data">
                    <v-list-item-content
                      :dark="lightSwitch == true"
                      :style="{ background: cardBackground }"
                      style="padding: 21px 12px; margin: -16px;"
                    >
                      <v-list-item-title v-html="data.item"></v-list-item-title>
                    </v-list-item-content>
                  </template>
              </v-select>
            </div>
          </v-col>
          <v-col style="color: #03dac5; font-size: 12px; padding-top:0px; padding-bottom:0px;">
            Notes
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="pa-0 mt-3 justify-right d-flex align-center text-right"
          >
            <v-textarea
              color="white"
              class="white--text trading_notes-textarea body-2 mb-0 pb-0"
              v-model="notes"
              :readonly="(this.editDetails == 'edit' ? false : true)"
              filled
            ></v-textarea>
          </v-col>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="success"
            class="text-capitalize mt-0 mb-2"
            light
            @click="showEditForm = false"
          >{{ (this.editDetails == 'edit' ? 'Cancel' : 'Close') }}</v-btn>

          <v-btn
            text
            color="success"
            class="text-capitalize mt-0 mb-2"
            light
            @click="editLive"
            :class="(this.editDetails == 'edit' ? '' : 'nodisplay')"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <TradeModal
      :visible="EnterTradeModal"
      :OpenPosition="openposition"
      :Trade_Modal="trade_modal"
      @close="EnterTradeModal=false"
    />
    <reset-modal :visible="showResetForm" @close="showResetForm=false" />
    <trade-delete :visible="showDelete" v-on:confirmedDelete="deleteConfirm" :itemDetails="itemDetails" @close="showDelete=false" />
    <share-modal
      v-if="showShareForm"
      :imageid="shareLink"
      @closeModal="showShareForm = false"
    />
  </v-col>
</template>
<script>
import TradeModal from "~/components/trade-simulator/TradeModal";
import resetModal from "~/components/trade-simulator/reset";
import shareModal from "~/components/modals/Share";
import tradeDelete from "~/components/modals/TradeDelete";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      itemsPerPage: 5,
      search: "",
      page: 1,
      pageCount: 0,
      menuShow: false,
      sse: null,
      counter: 0,
      headers: [
        { text: "Stocks", value: "stock_id", align: "left", sortable: false },
        { text: "Position", value: "Position", align: "right" },
        { text: "Avg. Price", value: "AvgPrice", align: "right" },
        { text: "Total Cost", value: "TotalCost", align: "right" },
        { text: "Market Value", value: "MarketValue", align: "right" },
        { text: "Profit", value: "Profit", align: "right" },
        { text: "Perf. (%)", value: "Perf", align: "right" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      portfolioLogs: [],
      openposition: [],
      stockSym: [],
      itemDetails: null,
      portfolioLogsrealtime: [],
      realtime: false,
      items: [{ title: "Note" }, { title: "Delete" }],
      EnterTradeModal: false,
      trade_modal: false,
      showResetForm: false,
      showEditForm: false,
      showScheduleForm: false,
      strategy: [
        "Bottom Picking",
        "Breakout Play",
        "Trend Following",
        "1-2-3 Reversal"
      ],
      tradeplan: ["Day Trade", "Swing Trade", "Investments"],
      emotions: ["Neutral", "Greedy", "Fearful"],
      notes: "",
      selectedstrategy: "",
      selectedtradeplan: "",
      selectedemotions: "",
      edit_id: "",
      editDetails: "",
      totalProfitLoss: 0,
      totalPerf: 0,
      totalmvalue: 0,
      dayprior: 0,
      priorProfitLoss: 0,
      totalPriorProfitLoss: 0,
      date: new Date().toISOString().substr(0, 10),
      filtered: '',
      lastprice: 0,
      showDelete: false,
      confirmdelete: false,
      itemToDelete: '',
      monthNames: [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ],
      dateformat: '',
    };
  },
  components: {
    TradeModal,
    resetModal,
    shareModal,
    tradeDelete
  },
  props: {
    Capital: {
      default() {
        return "";
      }
    }
  },
  watch: {
    simulatorOpenPosition() {
      this.getOpenPositions();
    },
    simulatorPortfolioID() {
      this.getOpenPositions();
    },
    EnterTradeModal() {
      this.trade_modal = this.EnterTradeModal;
    },
    confirmdelete(){
      this.execute(this.itemToDelete);
    }  

  },
  methods: {
    ...mapActions({
      setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
      setSimulatorOpenPosition: "tradesimulator/setSimulatorOpenPosition",
      setSimulatorConfirmedBuySell:
        "tradesimulator/setSimulatorConfirmedBuySell"
    }),
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    
    /**
     * Get Live Portfolio Data
     *
     */
    getOpenPositions() {
      const openparams2 = {
        fund: this.simulatorPortfolioID
      };
      let d = new Date();
      this.dateformat = this.monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); 
      this.totalProfitLoss = 0;
      this.totalPerf = 0;
      this.openposition = [];
      this.stockSym = [];
      this.totalmvalue = 0;
      this.$api.journal.portfolio.open(openparams2).then(
        function(result) {
          this.portfolioLogs = result.data.open;
         
          for (let i = 0; i < result.data.open.length; i++) {
              this.openposition[i] = this.portfolioLogs[i].metas.stock_id;
              this.stockSym[i] = this.portfolioLogs[i].metas.stock_id;
              this.portfolioLogs[i].stock_id = this.portfolioLogs[i].stock_symbol;
              this.portfolioLogs[i].Position = this.portfolioLogs[i].position;
              this.portfolioLogs[i].AvgPrice = this.portfolioLogs[i].average_price.toFixed(3);
              this.portfolioLogs[i].TotalCost = this.addcomma(this.portfolioLogs[i].total_value);
              this.portfolioLogs[i].MarketValue = this.addcomma(this.portfolioLogs[i].market_value);
              this.portfolioLogs[i].Profit = this.addcomma(this.portfolioLogs[i].profit_loss);
              this.portfolioLogs[i].Perf = this.portfolioLogs[i].pl_percentage.toFixed(2);
              this.portfolioLogs[i].action = {
                  id: this.portfolioLogs[i].metas.stock_id,
                  strategy: this.portfolioLogs[i].metas.strategy,
                  tradeplan: this.portfolioLogs[i].metas.plan,
                  emotion: this.portfolioLogs[i].metas.emotion,
                  notes: this.portfolioLogs[i].metas.notes,
                  fund: this.simulatorPortfolioID,
                  action: this.portfolioLogs[i].metas.stock_id
                };
              this.totalmvalue =
                  parseFloat(this.totalmvalue) + parseFloat(this.portfolioLogs[i].market_value);
              this.totalProfitLoss =
                    parseFloat(this.totalProfitLoss) + parseFloat(this.portfolioLogs[i].profit_loss);
              this.totalPerf =
                    parseFloat(this.totalPerf) + parseFloat(this.portfolioLogs[i].pl_percentage);
              this.$emit("totalUnrealized", this.totalProfitLoss);
              this.$emit("totalMarketValue", this.totalmvalue.toFixed(2));
          }
           this.getDayChange();
           
        }.bind(this)
      );
   

    },
    /**
     * delete confirmation
     *
     * @param   {boolean}  value  true/false
     *
     */
    deleteConfirm(value){
      this.confirmdelete = value;
    },

    /**
     * Execute Live Delete
     *
     * @param   {[type]}  item  Stock ID
     *
     */
    execute(item){
      if(this.confirmdelete){
        let profit = 0;
        let perc = 0;
        for (let index = 0; index < this.portfolioLogs.length; index++) {
          if(this.portfolioLogs[index].metas.stock_id == item){            
            profit = this.portfolioLogs[index].Profit;
            perc = this.portfolioLogs[index].Perf;
            this.openposition.splice(index,1);
            this.portfolioLogs.splice(index, 1);
            this.totalProfitLoss = parseFloat(this.totalProfitLoss) - parseFloat(profit);
            this.totalPerf = parseFloat(this.totalPerf) - parseFloat(perc);   
            this.$emit("totalUnrealized", this.totalProfitLoss);
          }
        }
      }
    },
    /**
     * Delete initialization
     *
     * @param   {object}  item  item details
     *
     */
    deleteLive(item) {    
      this.confirmdelete = false;
      this.itemDetails = item;
      this.itemToDelete = item.id;
    },
    /**
     * Edit Initialization
     *
     * @param   {[type]}  item  Edit details
     * @param   {[type]}  edit  [edit description]
     *
     */
    details(item, edit) {
      this.editDetails = edit;
      this.selectedstrategy = item.strategy;
      this.selectedtradeplan = item.tradeplan;
      this.selectedemotions = item.emotion;
      this.notes = item.notes;
      this.edit_id = item.id;
    },
    /**
     * Execute Edit 
     *
     */
    editLive() {
      if (confirm("Save changes?")) {
          const editparams = {
            strategy: this.selectedstrategy,
            plan: this.selectedtradeplan,
            emotion: this.selectedemotions,
            notes: this.notes
          };
          
        this.$api.journal.portfolio
        .tradeedit(this.simulatorPortfolioID, this.edit_id, editparams)
        .then(response => {
              if (response.success) {
                this.showEditForm = false;
                this.getOpenPositions();
              }
            });
      }
    },

    /**
     * Blink effect in Real Time changes
     *
     */
    updateEffect: dom => {
      const item = document.getElementById(dom);
      if (item == null) return;
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(function() {
        item.style.background = "";
      }, 400);
    },
    menuLogsShow(item) {
      let pl = document.getElementById(`pl_${item.id}`);
      pl.style.display = "block";
    },
    menuLogsHide(item) {
      let pl = document.getElementById(`pl_${item.id}`);

      pl.style.display = "none";
    },

    /**
     * Add comma separator
     *
     * @param   {int}  n            number
     * @param   {char}  sep         separator character
     * @param   {int}  decimals     number of decimals
     *
     */
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },

    /**
     * Calculate Day Change
     *
     */
    getDayChange() {
      let currentProfitLoss = 0;
      this.priorProfitLoss = 0;
      let daychangeperf = 0;
      let mvalueprior = 0;
      let dChange = [];
      let pNum = 0;
      let saveData = false;
      let d = new Date();
      let dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/"); ///"mm/dd/yyyy"

      for (let index = 0; index < this.portfolioLogs.length; index++) {
           
           let pdate = this.portfolioLogs[index].metas.date.split(" ")[0];     
                  const params = {
                    "symbol-id": this.portfolioLogs[index].metas.stock_id,
                    resolution: "1D",
                    limit: 2
                  };
                  this.$api.chart.charts.latest(params).then(
                    function(result) {                          
                      let prior_date = new Date(result.data.t[1]*1000);
                      let dformat_prior = [prior_date.getMonth() + 1, prior_date.getDate(), prior_date.getFullYear()].join("/");
                      let tcost =
                        this.portfolioLogs[index].position *
                        this.portfolioLogs[index].average_price;   

                      //let retrievedObject = localStorage.getItem('SAMPLE7');
                      //let priorDaychange = JSON.parse(retrievedObject);

                     if (pdate != dformat) {      
                        pNum++;                  
                        let priorPrice = result.data.c[1];
                        console.log('Prior Price -'+ priorPrice);
                        let priorbuyResult =
                          this.portfolioLogs[index].position *
                          parseFloat(priorPrice).toFixed(2);
                        let priormvalue = this.fees(priorbuyResult);

                        mvalueprior = mvalueprior + priorbuyResult;
                        //console.log('Prior Market Value -'+ mvalueprior);

                        let priorprofit = parseFloat(priormvalue) - parseFloat(tcost);
                        this.priorProfitLoss =
                          parseFloat(this.priorProfitLoss) + parseFloat(priorprofit); 
                                    
                      } 
                      

                      let currentPrice = result.data.c[0];
                      let currentbuyResult =
                        this.portfolioLogs[index].position *
                        parseFloat(currentPrice).toFixed(2);
                      let currentmvalue = this.fees(currentbuyResult);
                      let currentprofit = parseFloat(currentmvalue) - parseFloat(tcost);
                      currentProfitLoss =
                        parseFloat(currentProfitLoss) + parseFloat(currentprofit);
                        console.log('Total Prior Profitssss -', this.priorProfitLoss);
                        let daychange =
                           parseFloat(currentProfitLoss) - parseFloat(this.priorProfitLoss);
                        if(this.priorProfitLoss != 0 ){                          
                          let dperf = parseFloat(this.Capital) + this.priorProfitLoss;                        
                          daychangeperf = (daychange / dperf) * 100;
                        }             
                            
                      this.$emit("DayChange", daychange);
                      this.$emit("DayChangePerc", daychangeperf);

                    }.bind(this)
                  );

      }

            
    },

    /**
     * Calculate the fees based on Price
     *
     * @param   {float}  buyResult   (Position * Last Price)
     *
     * @return  {float}  total fees
     */
    fees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      let dsell = buyResult * 0.006;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
      return buyResult - dall;
    },
     
    /**
     * SSE initialization
     *
     */
    initSSE() {
      if (this.sse !== null) {
        this.sse.close();
        this.counter = 0;
      }

      this.sse = new EventSource(
        //"http://localhost:8021/sse/market-data/pse/all"
        process.env.SSE_STREAM + "market-data/pse/all"
      );

      this.sse.onopen = function() {
        console.log("open sse"); //
      };

      this.sse.onerror = function(err) {
        console.log("error");
        //console.log(err);
      };
      let len = this.stockSym.length;
      const that = this;
      
      this.sse.addEventListener("trade",function(e) {
           const data = JSON.parse(e.data);  
           
          for(let i =0; i< that.stockSym.length; i++){ 
            if(that.stockSym[i] == data.sym_id){
                that.trigger(data.sym_id, data.exp);
            }
          }
      });
     
    },
    /**
     * Real time calculations
     *
     * @param   {[type]}  symbol  incoming symbol ID
     * @param   {[type]}  lprice  incoming last price
     *
     */
    trigger(symbol, lprice){
              
        let profit = 0;
        let perf = 0;
        let tploss = 0;
        let tplossperf = 0;
        let tmvalue = 0;
       
        for (let i = 0; i < this.portfolioLogs.length; i++) {
            if(this.portfolioLogs[i].metas.stock_id == symbol){
                let oldvalue = this.portfolioLogs[i].MarketValue;
                let buyResult = this.portfolioLogs[i].position * parseFloat(lprice);
                let mvalue = this.fees(buyResult);
                let tcost = this.portfolioLogs[i].position *
                            this.portfolioLogs[i].average_price; //this.portfolioLogs[i].TotalCost;
                profit = parseFloat(mvalue) - parseFloat(tcost);
                perf = (profit / tcost) * 100;

                this.filtered = mvalue;
                this.portfolioLogs[i].MarketValue = this.addcomma(mvalue);
                this.portfolioLogs[i].Profit = this.addcomma(profit);
                this.portfolioLogs[i].Perf = this.addcomma(perf);
                tmvalue = parseFloat(tmvalue) + parseFloat(mvalue);   
                
                let updatedItem = {...this.portfolioLogs[i], ...{ MarketValue: this.portfolioLogs[i].MarketValue }};
                this.portfolioLogs.splice(i, 1, updatedItem);

                if(oldvalue != this.portfolioLogs[i].MarketValue){
                  this.updateEffect(this.portfolioLogs[i].stock_id);
                }

            }else{
                profit = parseFloat(this.portfolioLogs[i].Profit);
                perf = parseFloat(this.portfolioLogs[i].Perf);
                tmvalue = parseFloat(tmvalue) + parseFloat(this.portfolioLogs[i].MarketValue);
            }
                tploss = parseFloat(tploss) + parseFloat(profit);
                tplossperf = parseFloat(tplossperf) + parseFloat(perf);  
                
                this.totalProfitLoss = tploss;
                this.totalPerf = tplossperf;   
                this.totalmvalue = tmvalue;
                this.$emit("totalUnrealized", this.totalProfitLoss);
                this.$emit("totalMarketValue", this.totalmvalue.toFixed(2)); 
              //========================================================================
                let daychangeperf = 0;
                let daychange =
                    parseFloat(tploss) - parseFloat(this.priorProfitLoss);
                  if(this.priorProfitLoss != 0 ){  
                    //daychangeperf = (daychange / this.priorProfitLoss) * 100;
                    let dperf = parseFloat(this.Capital) + this.priorProfitLoss;
                      daychangeperf = (daychange / dperf) * 100;
                  }                     
                this.$emit("DayChange", daychange);
                this.$emit("DayChangePerc", daychangeperf);
        } 
       
    },

  },
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      simulatorConfirmedBuySell: "tradesimulator/getSimulatorConfirmedBuySell",
      simulatorOpenPosition: "tradesimulator/getSimulatorOpenPosition",
      lightSwitch: "global/getLightSwitch",
      stock: "chart/stock"
    }),

    /**
     * Toggle background color (Dark/light Theme)
     *
     * @return  {String}  hex code
     */
   
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },

    /**
     * Toggle primary Color
     *
     */
    primaryColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5"; // #eae8e8
    },
    /**
     * Toggle secondary Color
     *
     */
    secondaryColor() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    },
   
  },

  mounted() {
    if (this.simulatorPortfolioID != 0 ? this.getOpenPositions() : "");
    this.initSSE();
  },
  beforeDestroy() {
     this.sse.close();
  }
    
};
</script>
<style scoped>
.theme--dark.v-icon {
  color: #fdfcfc;
}

.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
.v-window.v-item-group.theme--light.v-tabs-items {
  background: none;
}
.item_position-prop {
  color: #b6b6b6;
}

.data_table-container {
  background: transparent;
}
.sidemenu_actions {
  position: absolute;
  width: auto;
  right: 0;
  background: #00121e;
  border: 1px solid #03dac5;
  border-radius: 4px;
  margin-top: -6px;
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
  transition: background-color 0.3s;
  border-radius: 20px;
}

.pagination a.active {
  background-color: #03dac5;
  color: #00121e;
}

.pagination a:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
.show_rows-select {
  background: #03dac5;
  color: #00121e;
}
.show_rows-cont {
  border: 2px solid #03dac5;
  color: #03dac5;
  outline-color: none !important;
  height: 18px;
  line-height: 1;
}
</style>
<style>
.v-application .pl-4 {
  height: 24px;
}
.v-data-table thead tr th {
    padding-left: 10px !important;
}
.v-data-table td {
  font-size: 12px;
}
.v-input__control > .v-text-field__details {
  display: none;
}

.v-data-table.data_table-container .v-data-footer {
  border: none;
}
.v-data-table.data_table-container td,
.v-data-table.data_table-container th {
  height: 36px;
}
.v-data-table.data_table-container
  tbody
  tr:hover:not(.v-data-table__expand-row) {
  background: transparent;
}
.show_rows {
  border: 2px solid #03dac5;
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
  color: #03dac5;
}
.v-pagination.lp_data_table-pagination .v-pagination__item--active {
  color: #03dac5;
  font-size: 12px;
}
.lp_data_table-pagination i.v-icon {
  font-size: 11px;
}
.v-pagination.lp_data_table-pagination .v-pagination__item {
  background: none;
  box-shadow: none;
  margin: 0;
  outline-color: transparent;
}
.positive {
  color: #03dac5;
}
.negative {
  color: #fe4949;
}
.nodisplay {
  display: none;
}

.resetbtn > .v-btn__content {
  padding-top: 2px !important;
  font-size: 12px !important;
}

.resetbtn:hover {
  background: #03dac5;
  color: #00121e !important;
  border: unset !important;
}

.theme--light.v-data-table thead tr th {
  color: #494949;
}

.btn_sidemenu:hover {
  color: #03dac5;
}
</style>
