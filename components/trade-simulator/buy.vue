<template>
    <v-container class="pa-0">
        <!--<div class="separator"></div>-->
        <v-row no-gutters class="pa-3 pb-0">
            <v-col cols="12" sm="12" md="12">
                <v-row no-gutters class="px-0 py-0">
                    <v-col sm="12" md="12" class="pa-0">
                        <v-select offset-y="true" :class="(this.simulatorConfirmedBuySell == 'sell' ? 'no_display' : '')" v-model="item" item-color="success" item-value="item" v-on:change="getBalance(item)" append-icon="mdi-chevron-down" color="success" class="mt-0 py-3 pb-0" :items="portfolio" label="Portfolio" dense flat dark></v-select>
                        <v-text-field
                            label="Available Funds"
                            :class="(this.simulatorConfirmedBuySell == 'sell' ? 'no_display' : '')"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="body-2 buy_selector quantity-input py-3"
                            v-model="availableFunds"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                        <v-text-field
                            :label="(this.simulatorConfirmedBuySell == 'sell' ? 'Sell Price' : 'Buy Price')"
                            :placeholder="(this.simulatorConfirmedBuySell == 'sell' ? 'Enter Sell Price' : 'Enter Buy Price')"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="body-2 buy_selector quantity-input py-3"
                            readonly
                            :value= this.simulatorBuyPrice
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                        <v-text-field
                            label="Quantity"
                            placeholder="Enter Quantity"
                            v-on:keyup="keypress"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            flat
                            dark
                            class="body-2 buy_selector buy_price-input py-3 pb-0"
                            v-model="quantity"
                        ></v-text-field>
                        <v-btn 
                            @click="minusButton"
                            text 
                            icon 
                            color="primary"
                        ><v-icon>mdi-minus</v-icon></v-btn>
                        <v-btn 
                            @click="addButton"
                            text 
                            icon 
                            color="primary"
                        ><v-icon>mdi-plus</v-icon></v-btn>
                    </v-col>
                    <v-col class="ma-0 pa-0 boardlot" :class="(this.simulatorConfirmedBuySell == 'sell' ? 'boardlotsell' : 'boardlotbuy')">
                        BoardLot : <span>{{ this.simulatorBoardLot }}</span>
                    </v-col>
                    <v-text-field
                        :label="(this.simulatorConfirmedBuySell == 'sell' ? 'Market Value' : 'Total Cost')"
                        color="#00FFC3"
                        style="color: #00FFC3"
                        dark
                        class="body-2 buy_selector quantity-input py-3"
                        v-model="totalCost"
                        :value = this.totalCost
                        readonly
                    ></v-text-field>
                </v-row>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            quantity: '0.00',
            availableFunds: '0.00',
            totalCost: 0,
            portfolio: [],
            item: '',
            fund_id: ''
        }
    },
    computed: {
    ...mapGetters({
      simulatorBuyPrice: "tradesimulator/getSimulatorBuyPrice",
      simulatorBoardLot: "tradesimulator/getSimulatorBoardLot",
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      simulatorPositions: "tradesimulator/getSimulatorPositions",
      simulatorConfirmedBuySell: "tradesimulator/getSimulatorConfirmedBuySell"
    })
  },
    mounted() {
        const portfolioparams = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58"
            };
            this.$api.journal.portfolio.portfolio(portfolioparams).then(
                function(result) {
                    console.log(result.meta.logs);
                    for(let i=0; i< result.meta.logs.length; i++){
                        if(result.meta.logs[i].name == 'Default Virtual Portfolio'){
                            let avfunds = parseFloat(result.meta.logs[i].balance);    
                            this.availableFunds = this.addcomma(avfunds);
                            this.setSimulatorPortfolioID(result.meta.logs[i].id);
                        }
                        if(result.meta.logs[i].type == 'virtual'){                    
                            this.portfolio.push(result.meta.logs[i].name);
                        }

                    }
                  
                }.bind(this)
            );

    },
    methods: {
    ...mapActions({
        setSimulatorBuyPrice: "tradesimulator/setSimulatorBuyPrice",
        setSimulatorBoardLot: "tradesimulator/setSimulatorBoardLot",
        setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
        setSimulatorPositions: "tradesimulator/setSimulatorPositions"
    }),
    addButton(){
        this.quantity = parseInt(this.quantity) + parseInt(this.simulatorBoardLot);
        let add = parseFloat(this.quantity).toFixed(2) * parseFloat(this.simulatorBuyPrice);
        //this.setSimulatorPositions('buy-'+this.quantity);
        this.setSimulatorPositions(this.quantity);
        this.totalCost = this.addcomma(add);
    },
    minusButton(){
        this.quantity = (this.quantity <= 0 || this.quantity < parseInt(this.simulatorBoardLot) ? 0 : this.quantity = parseInt(this.quantity) - parseInt(this.simulatorBoardLot));  
        let min = parseFloat(this.quantity).toFixed(2) * parseFloat(this.simulatorBuyPrice);
        //this.setSimulatorPositions('buy-'+this.quantity);
        this.setSimulatorPositions(this.quantity);
        this.totalCost = this.addcomma(min);
    },
    addcomma(n, sep, decimals) {
	    sep = sep || "."; // Default to period as decimal separator
	    decimals = decimals || 2; // Default to 2 decimals
	    return n.toLocaleString().split(sep)[0]
	        + sep
	        + n.toFixed(2).split(sep)[1];
    },
    keypress: function(){
        let press = parseFloat(this.quantity).toFixed(2) * parseFloat(this.simulatorBuyPrice);
        //this.setSimulatorPositions('buy-'+this.quantity);
        this.setSimulatorPositions(this.quantity);
        this.totalCost = this.addcomma(press);
    },
    getBalance: function(item){
        console.log(item);
                const portfolioparams = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58"
            };
            this.$api.journal.portfolio.portfolio(portfolioparams).then(
                function(result) {
                    console.log(result.meta.logs);
                    for(let i=0; i< result.meta.logs.length; i++){
                        if(result.meta.logs[i].name == item){
                            this.setSimulatorPortfolioID(result.meta.logs[i].id);
                            let avfunds = parseFloat(result.meta.logs[i].balance);    
                            this.availableFunds = this.addcomma(avfunds);
                            //this.fund_id = result.meta.logs[i].id;                     
                        }
                    }                
                }.bind(this)
            );
           
            console.log('Portfolio ID - ' + this.simulatorPortfolioID); 
    }
  },
}
</script>
<style scoped>
    .no_display{
        display: none;
    }
    .highnum{
        color: #00FFC3;
    }
    .lownum {
        color: #F44336;
    }
    .equalnum {
        color: #b6b6b6;
    }
    .buy_selector .v-select__slot .v-label,
    .buy_selector .v-select__slot .v-icon {
        color: #00FFC3 !important;
    }
    .buy_selector .v-input__slot {
        margin: 0;
    }
    .buy_selector .v-select__selection--comma {
        color: #00FFC3;
        font-size: 14px;
    }
    .buy_selector .v-input__control {
        min-height: auto !important;
    }
    .buy_selector-font-size .v-label {
        font-size: 14px
    }
    .separator {
        display: block;
        height: 1px;
        background: #000;
    }
    .confirmation_message-confirm input {
        text-align: right;
    }
    .v-textarea.trading_notes-textarea .v-text-field__slot textarea {
        margin: 0;
    }
    .buy_price-input input,
    .quantity-input input {
        text-align: right
    }
    .boardlot {
        color: rgb(144, 152, 157);
        position: absolute;
        font-size: 12px;
        left: 180px;
        width: 95px;
    }
    .boardlotsell {
        top: 155px;
    }
    .boardlotbuy {
        top: 306px;
    }
</style>