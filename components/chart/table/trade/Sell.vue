<template>
    <v-row class="ma-0 mt-1 pa-0">
      <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-6 px-4">
          <v-text-field
            label="Normal Trade"
            class="normalTrade"
            :dark="lightSwitch == true"
            outlined
            dense
          ></v-text-field>
          <v-select
            :items="portfolio"
            v-model="portvalue"
            class="select__trade ma-0 pa-0"
            append-icon="mdi-chevron-down"
            item-value="id"
            item-text="name"
            v-on:change="getFunds"
            label="Portfolio"
            dense
            solo
          ></v-select>
        </v-content>
      </v-col>
    
     <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-6 px-4">
        <v-row style="font-size: 14px;">  
            <v-col >
                <span>Board lot</span>
            </v-col>
            <v-col class="mr-3">
                <span style="float:right;">{{ this.getBoardLot(this.stock_last) }}</span>
            </v-col>
         </v-row>
         <v-row style="font-size: 14px;" class="mt-0 pt-0">                               
            <v-col class="mr-3">
                <span> Available Funds </span> 
                <span style="float:right;">{{ this.addcomma(this.balance) }}</span>     
            </v-col>
         </v-row>
        </v-content>
      </v-col>
      <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-8 px-4">
           <v-text-field
           :dark="lightSwitch == true"
           :value="this.stock_last"
           readonly
            dense
            label="Sell Price"
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
                    <v-btn @click="minusButton" text icon color="success">
                    <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn @click="addButton" text icon color="success">
                    <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
            </v-col>
          </v-row>
        </v-content>
      </v-col>

      <v-col class="col-3">
        <v-content class="pt-3"> 
          <v-row style="font-size: 14px;" class="mt-0 pt-0">      
            <v-col class="mb-6">    
                Peso Value 
                <span style="float:right;">{{ this.totalcost }}</span>     
            </v-col>
         </v-row>
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
          :disabled="this.portfolio.length != 0 && this.portvalue != '' && this.quantity > 0 ? false : true"
          @click="showConfirm = true"
          >Continue</v-btn
        >
        </v-content>
      </v-col>
            <v-dialog v-model="showConfirm" max-width="400px">
            <v-card :dark="lightSwitch == true">
            <v-card-title
                class="text-center justify-left pa-4 success--text text-capitalize subtitle-1 font-weight-bold"
            >Sell Confirmation</v-card-title>
            <v-card-title
                class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
            >Are you sure you want to sell this stock?</v-card-title>
            <v-container class="px-5">
                <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    class="text-capitalize mt-2"
                    depressed
                    text
                    :dark="lightSwitch == true"
                    light
                    @click.stop="showConfirm = false"
                >Cancel</v-btn>
                <v-btn
                    color="success"
                    class="ml-1 text-capitalize mt-2 black--text"
                    depressed
                    light
                    @click="confirmSell"
                    @click.stop="showConfirm = false"
                >Confirm</v-btn>
                </v-row>
            </v-container>
            </v-card>
        </v-dialog>
            <v-dialog v-model="errorMsg" max-width="400px">
                <v-card :dark="lightSwitch == true">
                <v-card-title
                    class="text-center justify-left pa-4 success--text subtitle-1 font-weight-bold"
                >{{ this.errmsgsell }}</v-card-title>
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
    </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data: () => ({
        portfolio: [],
        getBalance: [],
        balance: 0,
        portvalue: '',
        dboard: 0,
        totalcost: 0,
        quantity: 0,
        position: 0,  
        avprice: 0,
        showConfirm: false,
        errorMsg: false,
        errmsgsell: '',
        errmsg: '',
    }),
    computed: {
        ...mapGetters({
        lightSwitch: "global/getLightSwitch",
        symbolid: "chart/symbolid",
        stock_last: "chart/stock_last",
        }),
    },
    props: {
        SellDate: {
            default() {
                return "";
            }
        }
    },
    watch: {
        symbolid() {
            this.getPorfolio();
        }
    },
    methods: {
        ...mapActions({
            setShowBrokers: "chart/setShowBrokers"
        }),
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
         * Get total cost if Up arrow Button is pressed
         *
         * @return  {float} Total COst
         */
        addButton() {
            
             this.quantity =
                this.position <= this.quantity
                    ? this.position
                    : (this.quantity =
                        parseInt(this.quantity) + parseInt(this.dboard));
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
           
            let dsell = buyResult * 0.006;
            let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
            return buyResult - dall;
           
        },
        addcomma(n, sep, decimals) {
            sep = sep || "."; // Default to period as decimal separator
            decimals = decimals || 2; // Default to 2 decimals
            return (
                n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
            );
            },
        keypress() {
            let press = 0;
            let pressfees = 0;
            if (this.quantity > this.position) {
                press = parseFloat(this.position) * parseFloat(this.stock_last);
                pressfees = this.fees(press);
                this.totalcost = this.addcomma(pressfees);          
                return (this.quantity = this.position);
            }
            press = parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
            pressfees = this.fees(press);    
            this.totalcost = this.addcomma(pressfees);   
        },
        /**
         * Get Available balance
         *
         * @param   {string}  selectObj  Portfolio ID
         *
         * @return  {Float}    balance
         */
        getFunds(selectObj){
            for (let index = 0; index < this.getBalance.length; index++) {
                if(selectObj == this.getBalance[index].id){
                    this.balance = parseFloat(this.getBalance[index].balance);
                    this.position = parseFloat(this.getBalance[index].position);
                    this.quantity = this.position;
                    this.avprice = parseFloat(this.getBalance[index].avprice);
                }        
            }
        },
        /**
         * Get list of Portfolios
         *
         * @return  {array}  list of portfolios
         */
        getPorfolio(){   
            this.portfolio = [];   
            this.getBalance = [];     
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
                    balance: result.data.logs[i].balance
                    };
                    //this.portfolio.push(portfolio_params);
                    //this.getBalance.push(portfolio_params);
                    const openparams = {
                            fund: result.data.logs[i].id
                        };
                    this.$api.journal.portfolio.open(openparams).then(
                        function(response) {
                                for (let index = 0; index < response.data.open.length; index++) {
                                        if(this.symbolid == response.data.open[index].stock_id){
                                            this.portfolio.push(portfolio_params);
                                            let port = {
                                                id: result.data.logs[i].id,
                                                balance: result.data.logs[i].balance,
                                                position: response.data.open[index].position,
                                                avprice: response.data.open[index].average_price
                                            };
                                            this.getBalance.push(port);
                                            this.quantity = response.data.open[index].position;
                                            this.position = response.data.open[index].position;
                                        }
                                }
                            }.bind(this)
                        );

                    }
                }            

            }.bind(this)
            );       
        },
        /**
         * Sell Confirmation
         *
         */
        confirmSell(){
            const stock_id = this.symbolid;
            let fund_id = this.portvalue;
            let d = new Date();
            let sdate = this.SellDate + " " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
           const sellparams = {
                position: this.quantity,
                stock_price: this.stock_last,
                transaction_meta: {
                    strategy: '',
                    average_price: this.avprice.toFixed(2),
                    plan: '',
                    emotion: '',
                    notes: '',
                    date: sdate
                }
                };
           
                this.$api.journal.portfolio
                .tradesell(fund_id, stock_id, sellparams)
                .then(response => {
                        if (response.success) {         
                             console.log('Sell Success');
                             this.quantity = 0;
                             this.portvalue = '';
                             this.setShowBrokers(true);
                        }
                    }).catch(error => {
                        this.errmsg = error.response.data.message;
                        //this.errmsg = 'Stock is currently closed';
                        this.errmsgsell = 'Unable to sell';
                        this.errorMsg = true;
                    });
           
        }
    },
    mounted() {
      this.getPorfolio();
    },
    
}
</script>
<style>
.normalTrade > .v-input__control > .v-input__slot {
    border-radius: unset;
}
</style>