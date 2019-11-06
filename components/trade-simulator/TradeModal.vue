<template>
<v-dialog v-model="show" max-width="400px">
  <v-card dark class="card">
    
      <v-card-text class="header">
      <v-card-actions class="header__btnBuySell">
          <v-btn text class="v_btn" :class="buy_isclicked"  @click="order_btnbuy">Buy</v-btn>
          <v-btn text class="v_btn" :class="sell_isclicked" @click="order_btnsell">Sell</v-btn>         
      </v-card-actions>
      
        <div class="closeBtn">
              <v-btn color="red" text icon @click.stop="show=false">
                <v-icon size="15">mdi-close</v-icon>
              </v-btn>
        </div>
      </v-card-text>
      <v-divider class="separator"></v-divider>
  
      <v-row align="center">
          <v-col class="d-flex label_stock" cols="3" sm="3"> 
            Stock
          </v-col>
         <v-col class="d-flex" cols="12" sm="6"> 
           <v-select
              class="pa-0 ma-0 stockbtn"
              :items="stock"
              color="#48ffd5"
              label="Stock"
              dense
              solo
              flat
            ></v-select>
         </v-col>
         <v-col class="d-flex drp_stocks" cols="12" sm="6">
            Banco De Oro
         </v-col>
         
      </v-row>
       <v-divider></v-divider>
       
      <v-row align="center">
         <v-col class="d-flex" cols="12" sm="6" style="padding-top: 0px;">
           STOCK DETAILS
         </v-col>
         <v-col class="d-flex" cols="12" sm="6">
           
         </v-col>
      </v-row>
      <v-row align="center">
         <v-col class="d-flex" cols="12" sm="6" style="padding-bottom: 0px;">
            <div class="details">
                <p>Previous <span class="pdetails prev"></span></p>
                <p>Low <span class="pdetails low" style="color: #e64c3c;"></span></p>
                <p>52WKLow <span class="pdetails klow" style="color: #e64c3c;"></span></p>
                <p>Volume <span class="pdetails vol"></span></p>
                <p>Trades <span class="pdetails trade"></span></p>
            </div>
         </v-col>
         <v-col class="d-flex" cols="12" sm="6" style="padding-bottom: 0px;">
            <div class="details">
                <p>Open <span class="pdetails open"></span></p>
                <p>High <span class="pdetails high" style="color: #25ae5f"></span></p>
                <p>52WKHigh <span class="pdetails khigh" style="color: #25ae5f"></span></p>
                <p>Value <span class="pdetails val"></span></p>
                <p>Average <span class="pdetails av"></span></p>
            </div>
         </v-col>
      </v-row>
      <v-row align="center">
          <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">
              <v-card-text class="justify-center" style="text-align: center;padding-top: 0px; padding-bottom:5px;">Bid/Ask Bar</v-card-text>
          </v-col>
      </v-row>
      <v-row align="center">
        <div class="bidask_bar">
          <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">      
              <div class="arb_bar_green" style="width:60%; height: 6px;"></div>
              <div class="arb_bar_red" style="width:40%; height: 6px;"></div>     
          </v-col>
        </div>
      </v-row>
      <v-row align="center">
          <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">
              <v-card-text class="justify-center" style="text-align: center;padding-top: 0px; padding-bottom:5px;">Members Sentiments</v-card-text>
          </v-col>
      </v-row>
      <v-row align="center">
        <div class="mem_sents">
          <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">      
              <div class="arb_bar_green" style="width:30%; height: 6px;"></div>
              <div class="arb_bar_red" style="width:70%; height: 6px;"></div>     
          </v-col>
        </div>
      </v-row>
       <v-divider></v-divider>
      <v-row align="center">
         <v-col class="d-flex tdetails" cols="12" sm="6">
           TRADE DETAILS
         </v-col>
         <v-col class="d-flex" cols="12" sm="6">
           
         </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="6" md="3" style="padding-top:0px; padding-bottom: 0px;">
          <v-text-field
            v-model="buyprice"
            label="Buy Price"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" style="padding-top:0px;padding-bottom: 0px;">
          <v-text-field
            label="Quantity"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" style="padding-top:0px;padding-bottom: 0px;">
          <v-text-field
            v-model="tcost"
            label="Total Cost"
            type="number"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" style="padding-top:0px;padding-bottom: 0px;">
          <v-text-field
            v-model="avfund"
            label="Available Funds"
            type="number"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
       <v-divider></v-divider>
      <div class="dtails">
          <v-row align="center">
              <v-col cols="12" sm="6" md="4" style="padding-top:0px;">
                <v-select
                    :items="strategy"
                    label="Strategy"
                    dense
                  ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" style="padding-top:0px;">
                <v-select
                    :items="tradeplan"
                    label="Trade Plan"
                    dense
                  ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" style="padding-top:0px;">
                <v-select
                    :items="emotion"
                    label="Emotion"
                    dense
                  ></v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="6" md="9" style="padding-top:0px;">
                <v-textarea
                  label="Trading Notes"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="3" style="padding-top:0px;">
                <v-btn outlined rounded small color="warning">Confirm</v-btn>
              </v-col>
            </v-row>
      </div>
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

.v-dialog > .v-card > .v-card__text {
    padding: 10px 20px 0px;
}
.theme--dark.v-card {
    background-color: #0c1f33;
    color: #FFFFFF;
}
.header__btnBuySell {
  position: relative;
  top: -10px;
  margin-left: -13px;
}
.header {
  display: flex;
  padding-top: 20px !important;
}
.closeBtn{
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px 10px;
}
.row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-right: 0px; 
    margin-left: 0px; 
}
.drp_stocks { 
  padding: 4px 0px;
}
.details {
  line-height: 5px;
  font-size: 15px;
  margin-top: -15px;
  margin-left: 10px;
  padding-bottom: 0px;
}
.bidask_bar {
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 5px;
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
  margin-bottom: 20px;
}
.tdetails {
  padding-top: 0px;
  padding-bottom: 0px;
}
.v-text-field {
    margin-bottom: -10px;
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
.separator {
  position: inherit;
  top: -18px !important;
}
.stockbtn {
  width: 100px;
  border-radius: unset;
  position: absolute;
  top: 70px;
  left: 80px;
 
}
.label_stock {
    position: absolute;
    top: 70px;
    left: 14px;
    color:  #48ffd5;
    border: 2px solid #48ffd5;
    padding: 2px 10px;
    width: 70px;
}
.v-text-field.v-text-field--solo .v-input__control {
    min-height: 30px !important;
}

.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
    background: #48ffd5;
}
.v-select__selection--comma{
    color: black;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
}

</style>