<template>
    <v-row class="ma-0 mt-1 pa-0">
      <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-3 px-4">
          <v-select
            v-model="portvalue"
            :items="portfolio"
            item-text="name"
            item-value="id"
            class="select__trade ma-0 pa-0"
            append-icon="mdi-chevron-down"
            label="Portfolio"
            v-on:change="getFunds"
            dense
            solo
          ></v-select>
          <v-btn small>Normal</v-btn>
          <v-btn small 
            @click="quickTrade"
            :disabled="this.portvalue == '' ? true : false"
            >Quick Trade</v-btn>
          <v-icon 
            small 
            @click="modalQuickTrade=true" 
            :disabled="this.portvalue != '' ? false : true"
            class="quickSettings"
            >mdi-settings-outline</v-icon>
          <!--<v-select
              v-model="nmTrade"
              :items="normalTrade"
              class="select__trade mt-2 pa-0"
              append-icon="mdi-chevron-down"
              label="Select Trade"
              dense
              solo
            ></v-select>-->
         <v-row style="font-size: 14px;">  
            <v-col class="ml-3">
                <span>Board lot</span>
            </v-col>
            <v-col class="mr-3">
                <span style="float:right;">{{ this.getBoardLot(this.stock_last) }}</span>
            </v-col>
         </v-row>
        </v-content>
      </v-col>
    
     <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-3 px-4">
         <v-row style="font-size: 14px;" class="mt-0 pt-0">      
            <v-col class="mt-0 pt-0">    
                Available Funds  
                <span style="float:right;">{{ this.addcomma(this.balance) }}</span>     
            </v-col>
         </v-row>
          <v-text-field
            dense
            readonly
            :value="this.stock_last"
            :dark="lightSwitch == true"
            label="Buy Price"
          ></v-text-field>
          <v-row class="my-0 py-0">
            <v-col cols="8" class="mb-0 pb-0">
                <v-text-field
                    dense
                    :dark="lightSwitch == true"
                    label="Quantity"
                    v-model="quantity"
                    @keyup="keypress"
                ></v-text-field>
            </v-col>    
            <v-col cols="4" class="mx-0 mb-0 px-0 pb-0">
                    <v-btn @click="minusButton" text icon :dark="lightSwitch == true">
                    <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn @click="addButton" text icon :dark="lightSwitch == true">
                    <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
            </v-col>
          </v-row>
          <v-row style="font-size: 14px;" class="mt-0 pt-0">      
            <v-col class="mt-0 pb-1 pt-0">    
                Total Cost 
                <span style="float:right;">{{ this.addcomma(this.totalcost) }}</span>     
            </v-col>
         </v-row>
        </v-content>
      </v-col>
      <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-3 px-4">
          <v-select
            :items="strategy"
            v-model="strat"
            class="select__trade ma-0 pa-0"
            item-color="success"
            append-icon="mdi-chevron-down"
            label="Select Strategy"     
            dense
            solo
          ></v-select>
          <v-select
            :items="tradeplan"
             v-model="tplan"
            class="select__trade ma-0 pa-0"
            item-color="success"
            append-icon="mdi-chevron-down"
            label="Select Trade Plan"
            dense
            solo
          ></v-select>
          <v-select
            :items="emotion"
            v-model="emot"
            class="select__trade ma-0 pa-0"
            item-color="success"
            append-icon="mdi-chevron-down"
            label="Select Emotion"
            dense
            solo
          ></v-select>
        </v-content>
      </v-col>

      <v-col class="col-3">
        <v-content
          ><v-textarea
            outlined
            no-resize
            color="success"
            class="__tradenotes"
            :dark="lightSwitch == 1"
            full-width
            v-model="notes"
            height="123px"
            label="Notes"
          ></v-textarea    
        >
        <v-btn
            class="ml-11 text-capitalize"
            text
            :dark="lightSwitch == true"
            dense
            @click="setShowBrokers(true)"
          >
           Cancel
          </v-btn>
        <v-btn
          :dark="lightSwitch == 1"
          class="text-capitalize mr-0"
          :disabled="this.portvalue != '' && this.quantity > 0 ? false : true"
          @click="showConfirm = true"
          >Continue</v-btn
        >
        </v-content>
      </v-col>
       <v-dialog v-model="showConfirm" max-width="330px">
                <v-card :dark="lightSwitch == true">
                <v-card-title
                    class="text-center justify-left pa-4 text-capitalize font-weight-bold"
                    style="font-size: 16px;"
                >Review Order</v-card-title>
                <v-spacer></v-spacer>

               <v-container class="px-5" style="font-size: 14px; line-height:.5;">
                <v-row>
                  <v-col class="pl-6 mb-6">
                    Fill Type
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                    Day
                  </v-col>  
                </v-row>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col class="pl-6"> 
                   Buy Price
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                    {{ this.stock_last.toFixed(2) }}
                  </v-col>  
                </v-row>
                <v-row >
                  <v-col class="pl-6">
                   Quantity
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                    {{ this.addcomma(this.quantity) }}
                  </v-col>  
                </v-row>
                <v-row>
                  <v-col class="pl-6 mb-6">
                   Total Cost
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                    {{ this.addcomma(this.totalcost) }}
                  </v-col>  
                </v-row>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col class="pl-6">
                   Strategy
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                    {{ this.strat }}
                  </v-col>  
                </v-row>
                <v-row>
                  <v-col class="pl-6">
                   Trade Plan
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                     {{ this.tplan }}
                  </v-col>  
                </v-row>
                <v-row>
                  <v-col class="pl-6 mb-6">
                  Emotions
                  </v-col>
                  <v-col class="mr-6 font-weight-bold" style="text-align: right;">
                    {{ this.emot }}
                  </v-col>  
                </v-row>              
                    <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="text-capitalize mt-2"
                        text
                        :dark="lightSwitch == true"
                        light
                        @click.stop="showConfirm = false"
                    >Cancel</v-btn>
                    <v-btn
                        color="success"
                        class="ml-1 mb-6 text-capitalize mt-2 black--text"
                        light
                        @click="confirmBuy"
                        @click.stop="showConfirm = false"
                        :disabled="parseFloat(this.totalcost) > parseFloat(this.balance) ? true : false"
                    >Confirm</v-btn>
                    </v-row>
                </v-container>
                </v-card>
            </v-dialog>

            <v-dialog v-model="errorMsg" max-width="400px">
                <v-card :dark="lightSwitch == true">
                <v-card-title
                    class="text-center justify-left pa-4 success--text subtitle-1 font-weight-bold"
                >{{ this.errmsgbuy }}</v-card-title>
                <v-card-title
                    class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
                >{{ this.errmsg }}</v-card-title>
                <v-container class="px-5">
                    <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        class="text-capitalize mt-2"
                        text
                        :dark="lightSwitch == true"
                        light
                        @click.stop="errorMsg = false"
                    >Close</v-btn>
                    </v-row>
                </v-container>
                </v-card>
            </v-dialog>

            <v-dialog v-model="modalQuickTrade" max-width="400px">
                <v-card :dark="lightSwitch == true">
                <v-card-title
                    class="text-center justify-left pa-4 subtitle-1 font-weight-bold"
                >Quick Trade Setting</v-card-title>
                <v-spacer></v-spacer>
                <v-container class="px-5">
                    <v-row class="ml-3 pb-3">
                        Portfolio Allocations (%)
                    </v-row>
                    <v-row class="ml-3 pb-0 mb-0">
                      <v-col cols="9" class="mx-0 px-0 pb-0 mb-0">
                        <v-radio-group 
                          :dark="lightSwitch == true"
                          dense 
                          v-model="setting" 
                          class="mt-0 pt-0 px-0 mx-0"
                          row>
                          <v-radio :dark="lightSwitch == true" label="10%" value="10"></v-radio>
                          <v-radio :dark="lightSwitch == true" label="30%" value="30"></v-radio>
                          <v-radio :dark="lightSwitch == true" class="mr-0 pr-0" label="Custom" value="custom"></v-radio>                
                        </v-radio-group>
                      </v-col>
                      <v-col cols="3" class="mx-0 px-0">
                         <v-text-field     
                            type="number"
                            v-model="customVal"
                            :disabled="this.setting == 'custom' ? false : true"
                            flat
                            class="customNum mx-0 px-0"
                          ></v-text-field>
                      </v-col>                      
                    </v-row>
                    <v-row>
                      <v-col style="font-size: 12px;">
                      NOTE: Quick Trade automaticaly place buy and sell orders based on best available price.
                      </v-col>

                    </v-row>
                    <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="text-capitalize mt-2"
                        text
                        :dark="lightSwitch == true"
                        @click="modalQuickTrade=false"
                      >Close</v-btn>
                    <v-btn
                        class="text-capitalize mt-2"
                        :dark="lightSwitch == true"
                        @click.stop="modalQuickTrade=false"
                        @click="quickConfirm"
                    >Save</v-btn>
                    </v-row>
                </v-container>
                </v-card>
            </v-dialog>
    </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data: () => ({
    portfolio: [],
    getBalance: [],
    balance: 0,
    setting_val: 0,
    customVal: 0,
    portvalue: '',
    quicksetting: false,
    showConfirm: false,
    modalQuickTrade: false,
    dboard: 0,
    setting: '10',
    notes: '',
    strat: '',
    tplan: '',
    emot: '',
    errorMsg: false,
    errmsgbuy: '',
    errmsg: '',
    capital: 0,
    shares: 0,
    unrealized: 0,
    realized: 0,
    equity: 0,
    normalTrade: ["Normal Trade",
        "Quick Trade"],
    strategy: [
        "Bottom Picking",
        "Breakout Play",
        "Trend Following",
        "1-2-3 Reversal"
    ],
    tradeplan: ["Day Trade", "Swing Trade", "Investments"],
    emotion: ["Neutral", "Greedy", "Fearful"],
    totalcost: 0,
    quantity: 0,
  }),
    computed: {
    ...mapGetters({
        lightSwitch: "global/getLightSwitch",
        symbolid: "chart/symbolid",
        stock_last: "chart/stock_last",
        }),
    },
    props: {
      /**
       * Get Buy Date
       *
       * @return  {string}  date value
       */
        BuyDate: {
            default() {
                return "";
            }
        }
    },
    watch: {
      /**
       * 
       * if last price is changed
       * get latest Board Lot
       */
        stock_last() {
            this.getBoardLot(this.stock_last);
            this.quantity = 0;
        }
    },
    mounted() {
      this.getPorfolio();
      this.getBoardLot(this.stock_last);   
    },
    methods: { 
        ...mapActions({
            setShowBrokers: "chart/setShowBrokers"
        }), 
        /**
         * Get list of Portfolios
         *
         * @return  {array}  list of portfolios
         */
        getPorfolio(){             
            this.$api.journal.portfolio.portfolio().then(
            function(result) {
                let defaultPort = false;
                for (let i = 0; i < result.data.logs.length; i++) {
                if (
                    result.data.logs[i].type == "virtual"
                ) {
                    let portfolio_params = {
                    name: result.data.logs[i].name,
                    id: result.data.logs[i].id,
                    balance: result.data.logs[i].balance,
                    capital: result.data.logs[i].capital
                    };
                    this.portfolio.push(portfolio_params);
                    this.getBalance.push(portfolio_params);
                    }
                }
            
            }.bind(this)
            );
            
        },
        /**
         * Get Board Lot value
         *
         * @param   {int}  lastprice  latest price
         *
         * @return  {int}  board lot value
         */
        getBoardLot(lastprice){
            if (lastprice >= 0.0001 && lastprice <= 0.0099) {
            this.dboard = 1000000;
            } else if (lastprice >= 0.01 && lastprice <= 0.049) {
            this.dboard = 100000;
            } else if (lastprice >= 0.05 && lastprice <= 0.495) {
            this.dboard = 10000;
            } else if (lastprice >= 0.5 && lastprice <= 4.99) {
            this.dboard = 1000;
            } else if (lastprice >= 5 && lastprice <= 49.95) {
            this.dboard = 100;
            } else if (lastprice >= 50 && lastprice <= 999.5) {
            this.dboard = 10;
            } else if (lastprice >= 1000) {
            this.dboard = 5;
            }
            return this.dboard;
        },
    /**
     * Get Available balance
     *
     * @param   {string}  selectObj  Portfolio ID
     *
     * @return  {Float}    balance
     */
    getFunds(selectObj){
      this.quantity = 0;
        for (let index = 0; index < this.getBalance.length; index++) {
            if(selectObj == this.getBalance[index].id){
                this.balance = parseFloat(this.getBalance[index].balance);
                this.capital = parseFloat(this.getBalance[index].capital);
            }        
        }
        this.getUnrealized(selectObj);
        this.getRealized(selectObj);
    },
    /**
     * add comma function
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
     * Change Total Cost if quantity is pressed
     *
     * @return  {int}  total cost
     */
    keypress() {
      let press = 0;
      let pressfees = 0;
      press = parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      pressfees = this.fees(press);    
      this.totalcost = pressfees;  
    },
    /**
     * Buy/Sell Fees
     *
     * @param   {float}  buyResult  buy result
     *
     * @return  {float}   total fees
     */
    fees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = dcommission + dtax + dtransferfee + dsccp;
      return buyResult + dall;
    },
    getUnrealized(portID){
        this.unrealized = 0;
        const openparams2 = {
          fund: portID
        };
        this.$api.journal.portfolio.open(openparams2).then(
        function(result) {
               for (let i = 0; i < result.data.open.length; i++) {
                 this.unrealized = parseFloat(this.unrealized) + parseFloat(result.data.open[i].profit_loss);
               }
          }.bind(this)
        );
    },
    getRealized(portID){
        this.realized = 0;
        const tradelogsparams = {
          fund: portID
        };
        this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
        function(result) {
                 for (let i = 0; i < result.data.logs.length; i++) {
                      let buyvalue = parseFloat(result.data.logs[i].amount) * parseFloat(result.data.logs[i].meta.average_price);
                      let ploss = parseFloat(result.data.logs[i].total_value) - buyvalue;
                      this.realized = this.realized + ploss;
                 }  
          }.bind(this)
        );
    },
    /**
     * Buy Confirmation
     *
     */
    confirmBuy(){
      const stock_id = this.symbolid;
      let fund_id = this.portvalue;
      let d = new Date();
      let bdate = this.BuyDate + " " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
      const buyparams = {
          position: this.quantity,
          stock_price: this.stock_last,
          transaction_meta: {
            strategy: this.strat,
            plan: this.tplan,
            emotion: this.emot,
            notes: this.notes,
            date: bdate
          }
        }; 
     
            this.$api.journal.portfolio
            .tradebuy(fund_id, stock_id, buyparams)
            .then(response => {
                if (response.success) {          
                    console.log('Buy Success');
                    this.quantity = 0;
                    this.portvalue = '';
                    this.notes = '';
                    this.setShowBrokers(true);

                }
            }).catch(error => {
                this.errmsg = error.response.data.message;
                //this.errmsg = 'Stock is currently closed';
                this.errmsgbuy = 'Unable to buy';
                this.errorMsg = true;
              });
       
    },
    /**
     * Get total cost if Up arrow Button is pressed
     *
     * @return  {float} Total COst
     */
    addButton() {
      this.quantity = parseInt(this.quantity) + parseInt(this.dboard);
      let add =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      let addfees = this.fees(add);
      this.totalcost = this.addcomma(addfees);
    },
    /**
     * Get total cost if Up down Button is pressed
     *
     * @return  {float} Total COst
     */
    minusButton() {
      this.quantity =
        this.quantity <= 0 || this.quantity < parseInt(this.dboard)
          ? 0
          : (this.quantity = parseInt(this.quantity) - parseInt(this.dboard));
      let min =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      let minfees = this.fees(min);
      this.totalcost = this.addcomma(minfees);
    },
    quickConfirm(){
        this.setting_val = 0;
        if(this.setting == 'custom'){
          this.setting_val = parseFloat(this.customVal);
        }else{
          this.setting_val = parseFloat(this.setting);
        } 
        this.quicksetting = true;
        this.equity =  this.unrealized + this.realized + this.capital;
        let totalperc = (this.equity / 100) * this.setting_val;
        this.shares = totalperc / parseFloat(this.getBoardLot(this.stock_last));
        this.quantity = this.shares;
        this.totalcost = this.shares * parseFloat(this.stock_last);
        //this.totalcost = this.addcomma(this.totalcost);
        this.showConfirm = true;
    },
    quickTrade(){
        if(this.quantity == 0){
            this.equity =  this.unrealized + this.realized + this.capital;
            let totalperc = (this.equity / 100) * 10;
            this.shares = totalperc / parseFloat(this.getBoardLot(this.stock_last));
            this.quantity = this.shares;
            this.totalcost = this.shares * parseFloat(this.stock_last);
            //this.totalcost = this.addcomma(this.totalcost);
            this.showConfirm = true;
        }else{
            this.quantity = this.shares;
            this.totalcost = this.shares * parseFloat(this.stock_last);
            //this.totalcost = this.addcomma(this.totalcost);
            this.showConfirm = true;
        }
       console.log('Total Cost -' + parseFloat(this.totalcost) );
       console.log('Calance -' + this.balance );

    }
}

    
}
</script>

<style>
.normalTrade > .v-input__control > .v-input__slot {
    border-radius: unset;
}
.select__trade > .v-input__control > .v-input__slot {
  border: 1px solid;
  box-shadow: unset !important;
}
.__tradenotes > .v-input__control > .v-input__slot {
  border-radius: unset !important;
}

.quickSettings {
  cursor: pointer;
}
.customNum {
  position: absolute;
  width: 62px;
  top: 100px;
}

</style>