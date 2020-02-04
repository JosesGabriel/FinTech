<template>
    <v-row class="ma-0 mt-1 pa-0">
      <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-3 px-4">
          <v-text-field
            label="Normal Trade"
            class="normalTrade"
            :dark="lightSwitch == true"
            outlined
            dense
          ></v-text-field>
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
                    <v-btn @click="minusButton" text icon color="success">
                    <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn @click="addButton" text icon color="success">
                    <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
            </v-col>
          </v-row>
          <v-row style="font-size: 14px;" class="mt-0 pt-0">      
            <v-col class="mt-0 pt-0">    
                Total Cost 
                <span style="float:right;">{{ this.totalcost }}</span>     
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
            :dark="lightSwitch == 1"
            full-width
            v-model="notes"
            height="110px"
            label="Notes"
          ></v-textarea    
        >
        <v-btn
            class="ml-12 mt-2 text-capitalize"
            text
            :dark="lightSwitch == true"
            dense
            @click="setShowBrokers(true)"
          >
           Cancel
          </v-btn>
        <v-btn
          small
          :dark="lightSwitch == 1"
          class="mt-2 text-capitalize"
          @click="confirmBuy"
          >Continue</v-btn
        >
        </v-content>
      </v-col>
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
    notes: '',
    strat: '',
    tplan: '',
    emot: '',
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
    watch: {
        stock_last() {
            this.getBoardLot(this.stock_last);
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
                    balance: result.data.logs[i].balance
                    };
                    this.portfolio.push(portfolio_params);
                    this.getBalance.push(portfolio_params);
                    }
                }
            
            }.bind(this)
            );
            
        },
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
    getFunds(selectObj){
        for (let index = 0; index < this.getBalance.length; index++) {
            if(selectObj == this.getBalance[index].id){
                this.balance = parseFloat(this.getBalance[index].balance);
            }        
        }
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
      press = parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      pressfees = this.fees(press);    
      this.totalcost = this.addcomma(pressfees);   
    },
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
    confirmBuy(){
      const stock_id = this.symbolid;
      let fund_id = this.portvalue;
      let d = new Date(),
                dformat =
                [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
                " " +
                [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"); ///"mm/dd/yyyy hh:mm:ss" // 24 hour format      
      const buyparams = {
          position: this.quantity,
          stock_price: this.stock_last,
          transaction_meta: {
            strategy: this.strat,
            plan: this.tplan,
            emotion: this.emot,
            notes: this.notes,
            date: dformat
          }
        }; 
      console.log('Buy Params -', buyparams);
      console.log('Stock ID -' + stock_id);
      console.log('Fund ID -' + fund_id);

        this.$api.journal.portfolio
        .tradebuy(fund_id, stock_id, buyparams)
        .then(response => {
            if (response.success) {          
                console.log('Buy Success');
                this.setShowBrokers(true);
            }else{
               console.log(response); 
            }
          });


    },
    addButton() {
      this.quantity = parseInt(this.quantity) + parseInt(this.dboard);
      let add =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.stock_last);
      let addfees = this.fees(add);
      /*let convertedNumbers = this.availableFunds.replace(/,/g, "");
        if(parseFloat(addfees) > parseFloat(convertedNumbers)){
          this.errorShow = true;
          this.quantity = 0;
          this.totalCost = 0;
        }*/
        this.totalcost = this.addcomma(addfees);
    },
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
}

    
}
</script>

<style>
.normalTrade > .v-input__control > .v-input__slot {
    border-radius: unset;
}
</style>