<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card color="#00121E">
            <v-card-title class="text-left justify-left pa-5 pb-0 px-5 success--text subtitle-1 font-weight-bold">TRADE</v-card-title>
            <v-stepper v-model="e1" dark id="stepper_container" >
                <v-stepper-items >
                    <v-stepper-content step="1" class="mt-0 pt-0">
                        <!-- -----First View of Trade Modal----- -->
                        <v-container class="pa-5 pt-0 px-0">
                            <v-row no-gutters class="mb-5">
                                <v-col md="6" class="ma-0 pa-0">
                                    <div class="pa-0 ma-0">
                                        <v-btn class="text-capitalize" :class="(buySelected ? 'selected' : '')" depressed text tile width= "100%" @click="btnBuy" color="#B6B6B6">Buy</v-btn>
                                    </div>
                                </v-col>
                                <v-col md="6" class="ma-0 pa-0">
                                    <div class="pa-0 ma-0">
                                        <v-btn class="text-capitalize" :class="(sellSelected ? 'selected' : '')" depressed text tile width= "100%" @click="btnSell" color="#B6B6B6">Sell</v-btn>
                                    </div>    
                                </v-col>
                            </v-row>

                            <v-row no-gutters>
                                <v-col cols="12" sm="12" md="12">
                                    <v-card-title class="pa-0 text-right justify-end">
                                        <v-col sm="12" md="12" class="pa-0">
                                            <v-select 
                                                offset-y="true" 
                                                item-color="success" 
                                                color="success" 
                                                class="pa-0 ma-0 select_stock" 
                                                append-icon="mdi-chevron-down" 
                                                :items="stock" 
                                                item-text="symbol"    
                                                :item-value="(this.sellSelected ? 'stockidstr' : 'id_str')"                                          
                                                v-model="GetSelectStock" 
                                                v-on:change="getDetails"
                                                label="Select Stock"
                                                ></v-select>
                                        </v-col>
                                    </v-card-title>
                                        <p class="text-left ma-0 caption" style="color:#b6b6b6">Current Price</p>
                                        <v-spacer></v-spacer>
                                        <p class="text-right ma-0 body-1 current_price-field" style="color:#b6b6b6">{{ cprice }} <span :class="(change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral')" class="caption">{{ change }}</span> <span :class="(cpercentage > 0 ? 'positive' : cpercentage < 0 ? 'negative' : 'neutral')" class="caption">({{ cpercentage }}%)</span></p>
                                    <v-row no-gutters class="mt-2">
                                        <v-col class="pa-0" cols="6" sm="6" md="6">
                                            <v-simple-table :dense="true" dark id="liveportfolio-table">
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Previous</td>
                                                            <td class="item_position-prop body-2 text-right pa-0 px-1">{{ prev }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1" >Low</td>
                                                            <td class="body-2 text-right py-1 px-1" :class="valueStatusLow">{{ low }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">52WKLow</td>
                                                            <td class="body-2 text-right py-1 px-1">{{ wklow }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Volume</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ volm }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Trades</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ trades }}</td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                        <v-col class="pa-0" cols="6" sm="6" md="6">
                                            <v-simple-table :dense="true" dark id="liveportfolio-table">
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Open</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ open }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">High</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ high }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">52WKHigh</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ wkhigh }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Value</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ vole }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Average</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ ave }}</td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                    <div class="px-3">
                                        <v-card-title class="pa-0 justify-center mt-3">
                                            <h1 class="font-weight-thin caption" style="color:#fff;">Bid/ Ask Bar</h1>
                                        </v-card-title>
                                    
                                        <v-progress-linear
                                            :value="bidask"
                                            background-color="#F44336"
                                            color="#00FFC3"
                                            height="5px"
                                            class="mt-1"
                                        ></v-progress-linear>
                                        <v-card-title class="pa-0 justify-center mt-3">
                                            <h1 class="font-weight-thin caption" style="color:#fff;">Members Sentiments</h1>
                                        </v-card-title>
                                        <v-progress-linear
                                            value="50"
                                            background-color="#F44336"
                                            color="#00FFC3"
                                            height="5px"
                                            class="mt-1 mb-1"
                                        ></v-progress-linear>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-row no-gutters>
                        <v-spacer></v-spacer>
                            <v-btn text @click.stop="show=false" class="text-capitalize">Close</v-btn>
                            <v-btn
                                color="success ml-1"
                                @click="e1 = 2"
                                class="text-capitalize black--text"
                                light
                                :disabled="(GetSelectStock != '' ? false : true)"
                            >
                                Continue
                            </v-btn>
                        </v-row>
            
                    </v-stepper-content>
                    <v-stepper-content step="2" class="pt-2">
                        <!-- -----Second View of Trade Modal----- -->
                        <v-container class="pa-5 pt-0 px-0">
                           <v-row no-gutters>
                                <BuyTrade :Position="dataVolume" :BuyPrice="buyprice" :BoardLot="boardlot" :Reset="onreset" v-on:totalPosition="totalPosition"/>
                            </v-row>
                        </v-container>
                        <v-row no-gutters>
                        <v-spacer></v-spacer>
                            <v-btn text @click="e1 = 1" class="text-capitalize">Back</v-btn>
                            <v-btn
                                color="success"
                                @click="nextStep"
                                class="text-capitalize black--text ml-1"
                                light
                                :disabled="(this.totalposition > 0 ? false : true)"
                            >
                                {{ (this.simulatorConfirmedBuySell == 'sell' ? 'Confirm' : 'Continue') }}
                            </v-btn>
                        </v-row>
                    </v-stepper-content>
            
                    <v-stepper-content step="3" class="pt-2">
                        <v-container class="pt-0">
                            <v-row no-gutters class="px-0 py-0">
                                <v-col sm="12" md="12">
                                    <div><v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" class="mb-1" :items="strategy" v-model="selectedstrategy" label="Enter Strategy" dense flat></v-select></div>
                                    <div><v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" class="mb-1" :items="tradeplan" v-model="selectedtradeplan" label="Enter Trade Plan" dense flat></v-select></div>
                                    <div><v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" :items="emotions" v-model="selectedemotions" label="Enter Emotions" dense flat></v-select></div>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-0 mt-3 justify-right d-flex align-center text-right">
                                    <v-textarea
                                        color="white"
                                        class="white--text trading_notes-textarea body-2"
                                        v-model="notes"
                                        placeholder="Enter Notes"
                                        filled
                                    ></v-textarea>
                                </v-col>
                            </v-row> 
                        </v-container>
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-btn text @click="e1 = 2" class="text-capitalize">Back</v-btn>
                            <v-btn
                                color="success"
                                @click.stop="show=false"
                                @click="confirm"
                                class="text-capitalize black--text ml-1"
                                light
                            >
                                Confirm
                            </v-btn>
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
                </v-stepper>
        </v-card>
    </v-dialog>
</template>
<script>
import BuyTrade from '~/components/trade-simulator/buy'
import { mapActions, mapGetters } from "vuex";

    export default {
        props: ['visible'],
        components: {
            BuyTrade,
        },
        data() {
            return {
                e1: 1,
                cprice: 0,
                cpercentage: 0,
                change: 0,
                bidask: 50,
                dboard: 0,
                stock_id: 0,
                stock: [],
                prev: '0',
                low: 122,
                wklow: 0,
                volm: '0',
                trades: '0',
                open: '0',
                high: 121,
                wkhigh: '0',
                vole: '0',
                ave: '0',
                port: [],
                GetSelectStock: '',
                selectedTab: null,
                avprice: 0,

                selectedstrategy: '',
                selectedtradeplan: '',
                selectedemotions: '',
                strategy: ['Bottom Picking','Breakout Play','Trend Following','1-2-3 Reversal'],
                tradeplan: ['Day Trade','Swing Trade','Investments'],
                emotions: ['Neutral','Greedy','Fearful'],
                notes: '',

                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
                disabled: false,
                sellSelected: false,
                buySelected: true,
                onreset: false,
                dataVolume: 0,
                buyprice: 0,
                boardlot: 0,
                totalposition: 0,
            }
        },
        props: ['visible','OpenPosition'],
        computed: {
            ...mapGetters({
            simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
            simulatorPositions: "tradesimulator/getSimulatorPositions",
            simulatorOpenPosition: "tradesimulator/getSimulatorOpenPosition",
            simulatorConfirmedBuySell: "tradesimulator/getSimulatorConfirmedBuySell",
            }),

            show: {
                get () {
                    return this.visible
                },
                set (value) {
                    if (!value) {
                    this.$emit('close')
                    }
                }
            },
            valueStatusLow: function(){
                return {
                    highnum: this.low > this.high,
                    lownum: this.low < this.high,
                    equalnum: this.low == this.high
                }
            },
        },
        mounted() {
                console.log('Fund id = ' + this.simulatorPortfolioID);
                const params = {
                    exchange: "PSE",
                    status: "active"
                    };
                    this.$api.chart.stocks.list(params).then(
                    function(result) {
                        this.stock = result.data;                   
                    }.bind(this)
                    );
            },
        methods: {
            ...mapActions({
                setSimulatorPositions: "tradesimulator/setSimulatorPositions",
                setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
                setSimulatorOpenPosition: "tradesimulator/setSimulatorOpenPosition",
                setSimulatorConfirmedBuySell: "tradesimulator/setSimulatorConfirmedBuySell",
            }),
            nextStep(){
                if(this.sellSelected){
                    this.show = false;
                    this.confirm();
                }else{
                    this.e1 = 3;
                }
            },
            totalPosition(value){
                this.totalposition = value;
            },
            btnBuy(){
                console.log('buy');
                this.setSimulatorConfirmedBuySell('buy');
                console.log('Fund-id ' +this.simulatorPortfolioID);
                this.buySelected = true;
                this.onreset = true,
                this.sellSelected = false;
                this.stock = [];
                this.GetSelectStock = '';
                const params = {
                    exchange: "PSE",
                    status: "active"
                    };
                    this.$api.chart.stocks.list(params).then(
                    function(result) {
                        this.stock = result.data;                   
                    }.bind(this)
                    );
            },
            btnSell(){
                if(this.GetSelectStock != '' ? this.getDetails(this.GetSelectStock) : '');           
                this.setSimulatorConfirmedBuySell('sell');
                this.sellSelected = true;
                this.buySelected = false;
                this.onreset = true,
                this.stock = [];
                this.GetSelectStock = '';
                for(let i = 0; i < this.OpenPosition.length; i ++){
                    const params = {
                            'symbol-id':this.OpenPosition[i]
                    };
                    this.$api.chart.stocks.history(params).then(
                        function(result) {
                                this.stock.push(result.data);                     
                        }.bind(this)
                        );
                }
               
            },
                       
            addcomma(n, sep, decimals) {
                sep = sep || "."; // Default to period as decimal separator
                decimals = decimals || 2; // Default to 2 decimals
                return n.toLocaleString().split(sep)[0]
                    + sep
                    + n.toFixed(2).split(sep)[1];
            },
            //----Confirm Buy/Sell Button----------
            confirm() {
                console.log('confirm - ' +this.simulatorPortfolioID);
                const stock_id = this.stock_id;
                let fund_id = this.simulatorPortfolioID;
                let d = new Date,
                    dformat = [d.getMonth()+1,
                                d.getDate(),
                                d.getFullYear()].join('/')+' '+
                                [d.getHours(),
                                d.getMinutes(),
                                d.getSeconds()].join(':'); ///"mm/dd/yyyy hh:mm:ss" // 24 hour format

                if(this.simulatorPositions != 0){

                    // if Sell is selected
                if(this.sellSelected){
                     console.log('sell confirmed - ' + this.avprice);      
                        if(this.avprice != 0){ // if selected stock exist in Live Portfolio
                            const sellparams = {
                                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
                                position: this.simulatorPositions,
                                stock_price: this.cprice,
                                transaction_meta: {
                                    strategy: this.selectedstrategy,
                                    average_price: this.avprice.toFixed(2),
                                    plan: this.selectedtradeplan,
                                    emotion: this.selectedemotions,
                                    notes: this.notes,
                                    date: dformat
                                }
                            }
                        console.log('fund-id = '+this.simulatorPortfolioID);
                            this.$axios
                            .$post(process.env.JOURNAL_API_URL + "/journal/funds/"+ fund_id + "/sell/" + stock_id, sellparams)
                            .then(response => {      
                                if (response.success) {
                                    console.log('sell success');
                                    this.setSimulatorOpenPosition(this.OpenPosition);
                                    this.e1 = 1;
                                    this.onreset = false;
                                    this.buySelected = true;
                                    this.sellSelected = false;
                                    this.GetSelectStock = '';
                                }
                            });
                        }else { // if selected stock is not in the list
                            console.log('unable to sell');
                        }
                }else {  // if Buy is selected      
                
                       const buyparams = {
                            user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
                            position: this.simulatorPositions,
                            stock_price: this.cprice,
                            transaction_meta: {
                                strategy: this.selectedstrategy,
                                plan: this.selectedtradeplan,
                                emotion: this.selectedemotions,
                                notes: this.notes,
                                date: dformat
                            }
                        }      
                        
                        this.$axios
                        .$post(process.env.JOURNAL_API_URL + "/journal/funds/"+ fund_id + "/buy/" + stock_id, buyparams)
                        .then(response => {      
                            if (response.success) {
                                console.log(response.message);
                                 this.setSimulatorOpenPosition(this.OpenPosition);
                                 this.e1 = 1;
                                 this.onreset = false;
                                 this.buySelected = true;
                                 this.sellSelected = false;
                                 this.GetSelectStock = '';
                            }
                        });    
                }
            }else {
                console.log('please enter quantity');
            }

            },
            getDetails(selectObj) {
                
                const params = {
                    'symbol-id': selectObj,
                };          
                this.$api.chart.stocks.history(params).then(
                function(result) {    
                    //console.log('data -- ',result);
                    if (result.data.last >= 0.0001 && result.data.last <= 0.0099) {
			            this.dboard = 1000000;
			        } else if (result.data.last >= 0.01 && result.data.last <= 0.049) {
			            this.dboard = 100000;
			        } else if (result.data.last >= 0.05 && result.data.last <= 0.495) {
			            this.dboard = 10000;
			        } else if (result.data.last >= 0.5 && result.data.last <= 4.99) {
			            this.dboard = 1000;
			        } else if (result.data.last >= 5 && result.data.last <= 49.95) {
			            this.dboard = 100;
			        } else if (result.data.last >= 50 && result.data.last <= 999.5) {
			            this.dboard = 10;
			        } else if (result.data.last >= 1000) {
			            this.dboard = 5;
                    }

                    if(this.sellSelected){
                        const sellparams = {
                        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
                        fund: this.simulatorPortfolioID,
                        };
                        this.$api.journal.portfolio.open(sellparams).then(
                            function(results) {
                                for(let i = 0; i < results.meta.open.length; i ++){
                                    if(selectObj == results.meta.open[i].stock_id){
                                        this.volm = this.nFormatter(results.meta.open[i].position);
                                        this.dataVolume = results.meta.open[i].position;
                                        this.avprice = results.meta.open[i].average_price;
                                    }
                                }
                        }.bind(this)
                        );
                    }else {
                        this.volm = this.nFormatter(result.data.volume);
                        //this.dataVolume = result.data.volume;
                    }
                    this.buyprice = result.data.last;
                    this.boardlot = this.dboard;
                    this.stock_id = selectObj;
                    this.cprice = result.data.last;
                    this.cpercentage = result.data.changepercentage.toFixed(2); 
                    this.change = result.data.change.toFixed(2);
                    this.prev = result.data.close.toFixed(2);
                    this.open = result.data.open.toFixed(2);
                    this.low = result.data.low.toFixed(2);
                    this.high = result.data.high.toFixed(2);
                    this.wklow = result.data.weekyearlow.toFixed(2);
                    this.wkhigh = result.data.weekyearhigh.toFixed(2);
                    this.vole = this.nFormatter(result.data.value);
                    this.trades = result.data.trades;
                    this.ave = result.data.average.toFixed(2);                 
                }.bind(this)
                );

                this.$api.chart.stocks.fulldepth(params).then(
                function(result) { 
                    this.bidask = parseFloat(result.data.bid_total_percent).toFixed(2);                 
                }.bind(this)
                );

            },
             nFormatter(num) {
                if (num >= 1000000000) {
                    return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'G';
                }
                if (num >= 1000000) {
                    return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
                }
                if (num >= 1000) {
                    return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
                }
                return num;
            },
        },
    }
</script>
<style scoped>
    .select_stock > .v-input__control > .v-input__slot > .v-select__slot > label .v-select__selections > .v-select__selection--comma {
        color: #b6b6b6;
    }

    .stock_selector .v-select__slot .v-label,
    .stock_selector .v-select__slot .v-icon {
        color: #00FFC3 !important;
    }
    .stock_selector .v-input__slot {
        margin: 0;
    }
    .stock_selector .v-select__selection--comma {
        color: #00FFC3;
        font-size: 12px;
    }
    .stock_selector .v-input__control {
        min-height: auto !important;
    }
    .calendate-btn {
        margin-top: 6px;
        margin-right: 6px;
    }
    .current_price-field {
        border-bottom: 1px solid #b6b6b6;
    }
    #stepper_container {
        box-shadow: none;
        background-color: transparent;
    }
    .positive{
    color: #00FFC3;
    }
    .selected {
        border-bottom: 1px solid;
        color: #03dac5 !important;
    }
    .nonselected {
        border-bottom: none;
    }
    .negative{
        color: #fe4949;
    }
    
</style>