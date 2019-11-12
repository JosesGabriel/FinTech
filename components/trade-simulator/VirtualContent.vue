<template>
    <v-col cols="12" sm="12" md="12">
            <v-row class="ml-2 mb-3 mr-2" style="color:white;">
                <v-col class="ml-0 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-0 pl-1 caption">
                        Realized P/L
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="12" class="text-right pb-0 pl-0 pr-1">
                            <span class="font-weight-light pb-0 pl-2 pt-5 overline">PHP</span>
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-0 pl-1 caption">
                        Unrealized P/L
                    </v-row>
                    <v-row class="mt-1">
                       <v-col md="12" class="text-right pb-0 pl-0 pr-1">
                            <span class="font-weight-light pb-0 pl-2 pt-5 overline">PHP</span>
                            1,000,000.00
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-0 pl-1 caption">
                        Port Performance
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="12" class="text-right pb-0 pl-0 pr-1">
                            <span class="font-weight-light pb-0 pl-2 pt-5 overline">PHP</span>
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-0 pl-1 caption">
                        Starting Capitalize
                    </v-row>
                    <v-row class="mt-1">
                       <v-col md="12" class="text-right pb-0 pl-0 pr-1">
                            <span class="font-weight-light pb-0 pl-2 pt-5 overline">PHP</span>
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
                    <v-row class="mt-0 pl-1 caption">
                        Equity
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="12" class="text-right pb-0 pl-0 pr-1">
                            <span class="font-weight-light pb-0 pl-2 pt-5 overline">PHP</span>
                            1,000,000.00
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
                    <v-col md="3" class="text-right caption px-2 ma-0" style="position:absolute; right:0;">
                        <v-select 
                            class="selector"
                            label="Select Portfolio"
                            :items="portfolio" 
                            background-color="#00FFC3" 
                            dense
                            solo 
                            flat
                        ></v-select>
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
          portfolio: ['Virtual Portfolio','Live Portfolio']
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

.selector > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections{
    color: black;
}
.v-text-field.v-text-field--solo .v-label {
    color: black;
}
.vt_realized {
    border: 1px solid black;
    background: #0c1a2b;
}
.selector .v-input__slot {
    margin: 0;
    border-radius: unset;
}
.selector .v-input__control {
    min-height: auto !important;
}
</style>