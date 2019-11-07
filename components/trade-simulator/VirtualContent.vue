<template>
    <v-col cols="12" sm="12" md="12">
            <v-row class="ml-0 mb-3" style="color:white;">
                <v-col md="2" class="ml-2 mb-2 pt-0 pb-0 vt_realized">
                    <v-row class="mt-0 pl-1 caption">
                        Realized P/L
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="3" class="font-weight-light pb-0 pl-2 pt-5 overline">
                            PHP
                        </v-col> 
                        <v-col md="9" class="pb-0 pl-0">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col md="2" class="ml-3 mb-2 pt-0 pb-0 vt_realized">
                    <v-row class="mt-0 pl-1 caption">
                        Unrealized P/L
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="3" class="pb-0 pl-2 pt-5 overline">
                            PHP
                        </v-col> 
                        <v-col md="9" class="pb-0 pl-0">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col md="2" class="ml-3 mb-2 pt-0 pb-0 vt_realized">
                    <v-row class="mt-0 pl-1 caption">
                        Port Performance
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="3" class="pb-0 pl-2 pt-5 overline">
                            PHP
                        </v-col> 
                        <v-col md="9" class="pb-0 pl-0">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col md="2" class="ml-3 mb-2 pt-0 pb-0 vt_realized">
                    <v-row class="mt-0 pl-1 caption">
                        Starting Capitalize
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="3" class="pb-0 pl-2 pt-5 overline">
                            PHP
                        </v-col> 
                        <v-col md="9" class="pb-0 pl-0">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
                <v-col md="2" class="ml-3 mb-2 pt-0 pb-0 vt_realized">
                    <v-row class="mt-0 pl-1 caption">
                        Equity
                    </v-row>
                    <v-row class="mt-1">
                        <v-col md="3" class="pb-0 pl-2 pt-5 overline">
                            PHP
                        </v-col> 
                        <v-col md="9" class="pb-0 pl-0">
                            1,000,000.00
                        </v-col> 
                    </v-row>
                </v-col>
            </v-row>

            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Live Portfolio</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-2`">Tradelogs</v-tab>

                <v-tab-item
                    dark
                    color="#48FFD5"
                    background-color="#0c1f33"
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

      }
    },
    components: {
        VirtualLivePortfolio,
        TradelogsContent,
    }
  }
</script>
<style scoped>
.vt_realized {
    border: 1px solid black;
}

</style>