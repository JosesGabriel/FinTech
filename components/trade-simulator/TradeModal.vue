<template>
<v-dialog v-model="show" max-width="400px">
  <v-card dark class="card">
    <v-container fluid class="vtModal__container">
      <v-row>
          <v-col>
            <v-btn text class="v_btn" :class="buy_isclicked"  @click="order_btnbuy">Buy</v-btn>
            <v-btn text class="v_btn" :class="sell_isclicked" @click="order_btnsell">Sell</v-btn>
          </v-col>
          <div class="vtModal__closeBtn">
                <v-btn color="red" text icon @click.stop="show=false">
                  <v-icon size="15">mdi-close</v-icon>
                </v-btn>
          </div>
      </v-row>  
      <v-divider class="separator"></v-divider>
      <v-row>
          <v-col md="2" class="ml-3 pa-0 pl-3 label_stock">
              Stock
          </v-col>  
          <v-col md="4" class="ml-0 pa-0">
              <v-select
                class="ma-0 pa-0 stockbtn"
                :items="stock"
                color="#48ffd5"
                label="Stock"
                dense
                solo
                flat
              ></v-select>
          </v-col>   
      </v-row> 
      <v-row>
          <v-col md="4" class="ml-6 pa-0 pt-2" style="font-size:14px;">
              Current Price:
          </v-col>
      </v-row> 
       <v-divider class="stock_separator"></v-divider>
       <v-row>
          <v-col md="4" class="ml-3 pa-0 pt-2">
              STOCK DETAILS
          </v-col>
      </v-row> 
      <v-row>
          <v-col md="5" class="ml-6 pa-0">
            <div class="details ma-0 pa-0">
                <p class="ma-0 pa-0">Previous <span class="pdetails prev"></span></p>
                <p class="ma-0 pa-0">Low <span class="pdetails low" style="color: #e64c3c;"></span></p>
                <p class="ma-0 pa-0">52WKLow <span class="pdetails klow" style="color: #e64c3c;"></span></p>
                <p class="ma-0 pa-0">Volume <span class="pdetails vol"></span></p>
                <p class="ma-0 pa-0">Trades <span class="pdetails trade"></span></p>
            </div>
          </v-col>
           <v-col md="6" class="mr-2 pa-0">
            <div class="details ml-6 pa-0">
                <p class="ma-0 pa-0">Previous <span class="pdetails prev"></span></p>
                <p class="ma-0 pa-0">Low <span class="pdetails low" style="color: #e64c3c;"></span></p>
                <p class="ma-0 pa-0">52WKLow <span class="pdetails klow" style="color: #e64c3c;"></span></p>
                <p class="ma-0 pa-0">Volume <span class="pdetails vol"></span></p>
                <p class="ma-0 pa-0">Trades <span class="pdetails trade"></span></p>
            </div>
          </v-col>
      </v-row>
       <v-row>
          <v-col md="12" class="ma-0 pa-0 pt-2 bidask_label">
             Bid/Ask Bar
          </v-col>
      </v-row> 
      <v-row>
          <div class="bidask_bar">
            <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">      
                <div class="arb_bar_green" style="width:60%; height: 6px;"></div>
                <div class="arb_bar_red" style="width:40%; height: 6px;"></div>     
            </v-col>
          </div>
      </v-row>
       <v-row>
          <v-col md="12" class="ma-0 pa-0 pt-2 bidask_label">
             Members Sentiments
          </v-col>
      </v-row> 
      <v-row>
          <div class="mem_sents">
            <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">      
                <div class="arb_bar_green" style="width:30%; height: 6px;"></div>
                <div class="arb_bar_red" style="width:70%; height: 6px;"></div>     
            </v-col>
          </div>
      </v-row>
       <v-divider class="stock_separator"></v-divider>
       <v-row style="margin-top: 10px;">
          <v-col md="4" class="ml-3 pa-0">
              TRADE DETAILS
          </v-col>
          <v-col md="4" class="mr-3 pa-0" style="font-size:14px; text-align:right;">
              Available Funds:
          </v-col>
      </v-row> 
      <v-row style="margin-top: 10px;">
          <v-col md="2" class="ml-6 pa-0 pt-1" style="font-size:14px;color:  #48ffd5;">
              Buy Price:
          </v-col>
          <v-col md="3" class="ma-0 pa-0 buyprice">
              
          </v-col>
          <v-col md="2" class="ml-6 pa-0 pt-1" style="font-size:14px;color:  #48ffd5;">
              Quantity
          </v-col>
          <v-col md="3" class="ma-0 pa-0 quantity">
              
          </v-col>
      </v-row>
      <v-row>
          <v-col md="9" class="ma-0 pa-0 pt-1 pr-3" style="font-size:14px; text-align:right;">
              Total Cost:
          </v-col>
          <v-col md="3" class="ma-0 pa-0 pt-1 totalcost" style="font-size:14px;">
              1,000,000.00
          </v-col>
      </v-row>
      <v-row style="margin-top: -10px;" class="trade_details">
          <v-col md="5" class="ml-3 mt-0 pa-0">
              <v-row>
                  <v-col >
                    <v-select
                        class="select_strat"
                        :items="strategy"
                        label="Strategy"
                        dense
                        solo
                      ></v-select>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-select
                        class="select_tradeplan"
                        :items="tradeplan"
                        label="Trade Plan"
                        dense
                        solo
                      ></v-select>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-select
                        class="select_emotion"
                        :items="emotion"
                        label="Emotion"
                        dense
                        solo
                      ></v-select>
                  </v-col>  
              </v-row>
          </v-col>
          <v-col md="6" class="ml-3 pa-0 mt-3">
              <v-textarea
                  class="notes"
                  solo
                  name="input-7-4"
                  label="Trading Notes"
                  background-color="black"
                ></v-textarea>
          </v-col>
      </v-row> 
      <v-row>
          <v-col md="12" class="ma-0 mb-2 pb-1 pr-3 pt-0" style="text-align:right;">
            <v-btn rounded outlined color="#48FFD5" dark class="text-capitalize mr-2" style="border-width: 2px" height="27">Confirm</v-btn>
          </v-col>
      </v-row>

    </v-container>
  </v-card>
</v-dialog>
</template>

<script>

export default {
  props: ['visible'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  data: () => ({
      stock: ['2GO','PHEN','ROCK','HLCM'],
      emotion: ['Neutral','Greedy','Fearful'],
      tradeplan: ['Day Trade','Swing Trade','Investment'],
      strategy: ['Bottom Picking','Breakout Play','Trend Following'],
      buyprice: 23.12,
      tcost: 1200.50,
      avfund: 98000.56,
      buy_isclicked: 'is-click',
      sell_isclicked: 'is-not-click',
    }),
  methods:{
     order_btnbuy(){
       if(this.buy_isclicked == 'is-not-click'){
         this.buy_isclicked = 'is-click';
         this.sell_isclicked = 'is-not-click';
       }
     },
     order_btnsell(){
       if(this.sell_isclicked == 'is-not-click'){
         this.sell_isclicked = 'is-click';
         this.buy_isclicked = 'is-not-click';
       }
     }
  }

}
</script>
<style>
.theme--dark.v-card {
    background-color: #0c1f33;
    color: #FFFFFF;
}

.vtModal__container {
  padding: 0px 12px;
}

.vtModal__closeBtn{
  padding: 10px;
}
.v_btn {
  text-transform: none;
  font-size: 15px !important;
  color:#48ffd5;
  border-radius: unset;
}
.is-click{
  border-bottom: 2px solid #48ffd5;
}
.is-not-click {
  border-bottom: none;
}
.details {
  font-size: 14px;
}
.buyprice, .quantity{
  border-radius: unset;
  background: black !important;
}
.separator {
  position: relative;
  top: -12px !important;
  border-color: black !important;
}

.stock_separator{
  border-color: black !important;
}

.label_stock {
    color:  #48ffd5;
    border: 2px solid #48ffd5;
}
.bidask_label {
  text-align: center;
}
.stockbtn {
  width: 100px;
  border-radius: unset;
}

.bidask_bar {
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 0px;
}
.arb_bar_green {
   background-color: #25ae5f;
}
.arb_bar_red {
   background-color: #e64c3c;
}
.mem_sents {
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 10px;
}
.select_strat, .select_tradeplan {
  margin-bottom: -15px !important;
  border-radius: unset;
}

.select_emotion, .notes {
  border-radius: unset;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
}
.v-input__control {
    min-height: 30px !important;
}
.v-input__slot {
  margin-bottom: 0px !important;
}
v-text-field.v-text-field--enclosed .v-text-field__details, .v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
    padding: 0 6px !important;
    background: #48ffd5;
}
.theme--dark.v-select .v-select__selections {
    color: #040404 !important;
}
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 95%;
}
.theme--dark.v-label {
    color: rgb(2, 2, 2);
}

</style>