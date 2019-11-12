<template>
    <v-col cols="12" sm="12" md="12">
            <v-row class="mt-12 ml-0 mb-3 mr-2" style="color:white;">
    
                <v-col class="ml-0 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                 
                    <v-row class="mt-2 pl-3 caption">
                        Realized P/L (PHP)
                    </v-row>
                    <v-row class="mt-1 mb-2">
                        <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                    
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-2 pl-3 caption">
                        Unrealized P/L (PHP)
                    </v-row>
                    <v-row class="mt-1">
                       <v-col md="12" class="text-right pb-0 pl-0 pr-3 negative">
                            -1,000,000.00
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-2 pl-3 caption">
                        Port Performance %
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                            100.00%
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-2 pl-3 caption">
                       Max Drawdown %
                    </v-row>
                    <v-row class="mt-1">
                       <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                            100.00%
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-2 pl-3 caption">
                        Equity
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-2 pl-3 caption">
                        Day Change
                    </v-row>
                    <v-row class="mt-0">
                        <v-col md="12" class="text-right pt-0 pb-0 pl-0 pr-3 positive">
                            <v-row class="ma-0 pa-0 overline">
                                <v-col class="ma-0 pa-0">
                                    (100.00%)
                                </v-col>
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0">
                                    1,000,000.00
                                </v-col>
                            </v-row>
                        </v-col> 
                    </v-row>
                </v-col>
            </v-row>

            <v-tabs
            color="#48FFD5"
            background-color="transparent"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Live Portfolio</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-2`">Tradelogs</v-tab>
               
                <v-row>
                    <v-col md="3" class="text-right caption px-2 ma-0" style="position:absolute; right:0; top: -5px; width: 180px;">
                        <v-select 
                            offset-y="true" 
                            class="select_portfolio mt-2 black--text" 
                            item-color="success" 
                            append-icon="mdi-chevron-down" 
                            :items="portfolio" 
                            background-color="#00FFC3" 
                            label="Virtual Portfolio" 
                            dense solo flat>
                        </v-select>
                    </v-col>
                </v-row>
                <v-tab-item
                    dark
                    color="#48FFD5"
                    background-color="black"
                    :value="'tab-' + 1"
                >
                    <v-container class="pa-0">
                        <VirtualLivePortfolio/>                
                    </v-container>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 2">
                    <v-container class="pa-0">
                        <TradelogsContent/>
                    </v-container>
                </v-tab-item>
            </v-tabs>
            <!-- <ChartTesting/> -->
    </v-col>

</template>
<script>
  import VirtualLivePortfolio from '~/components/trade-simulator/VirtualLivePortfolio'
  import TradelogsContent from '~/components/trade-simulator/VirtualTradelogs'

  export default {
    data () {
      return {
          portfolio: ['Primary Portfolio','Create Portfolio']
      }
    },
    components: {
        VirtualLivePortfolio,
        TradelogsContent,
    }
  }
</script>
<style>
.v-window.v-item-group.theme--light.v-tabs-items {
    background: none;
}
.v-select__selection--comma {
    color: black;
    font-size: 14px;
    font-weight: 600;
}
.select_portfolio .v-select__slot .v-label, .select_portfolio .v-select__slot .v-icon {
    color: black !important;
    font-weight: 600;
}

.theme--light.v-list {
    background: #00121e;
    border: 1px solid #00FFC3;
}

.v-list-item__title, .v-list-item__subtitle {
    color:#00FFC3;
}

.v-slide-group__content.v-tabs-bar__content:before {
  content: "";
  width: 100%;
  position: absolute;
  bottom: -3px;
  z-index: 1;
  height: 4px;
  background: #000;
}
.positive{
    color: #00FFC3;
}

.negative{
    color: #fe4949;
}
.theme--dark.v-icon {
    color: #0e0e0e;
}
.selector > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections{
    color: black;
}
.v-text-field.v-text-field--solo .v-label {
    color: black;
}
.vt_realized {
    border: 1px solid black;
}

.vt_realized:hover {
    background: #0c1a2b;
    box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.select_portfolio .v-input__slot {
    margin: 0;
    border-radius: unset;
}
.selector .v-input__control {
    min-height: auto !important;
}
</style>