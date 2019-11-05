<template>
    <v-col cols="12" sm="12" md="12">
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Dashboard</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1">Tradelogs</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1">Ledger</v-tab>

                <v-tab-item
                    dark
                    color="#48FFD5"
                    background-color="#0c1f33"
                    :value="'tab-' + 1"
                >
                    <v-container class="pa-0">
                        <JournalLivePortfolio/>
                        <v-row no-gutters>
                            <JournalPortfolioSnapshot/>
                            <JournalCurrentAllocation/>
                        </v-row>
                        <v-row no-gutters>
                            <JournalEquityCurve/>
                        </v-row>
                        <v-row no-gutters>
                            <JournalMonthlyPerfomance/>
                            <JournalTradeStats/>
                        </v-row>
                        <JournalStrategyStats/>
                        <v-row no-gutters>
                            <JournalTopStocks/>
                        </v-row>
                        <v-row no-gutters>
                            <JournalEmotionalStats/>
                        </v-row>
                        <v-row no-gutters>
                            <JournalExpenseReport/>
                        </v-row>
                        <v-row no-gutters>
                            <v-col class="pa-0" cols="6" sm="6" md="6">
                                <JournalBuyVolume/>
                            </v-col>
                            <v-col class="pa-0" cols="6" sm="6" md="6">
                                <JournalBuyValue/>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col class="pa-0" cols="4" sm="4" md="4">
                                <JournalPerformance/>
                            </v-col>
                            <v-col class="pa-0" cols="8" sm="8" md="8">
                                <JournalGrossPL/>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
            </v-tabs>
            <!-- <ChartTesting/> -->
    </v-col>
</template>
<script>
import JournalLivePortfolio from '~/components/journal/JournalLivePortfolio'
import JournalPortfolioSnapshot from '~/components/journal/JournalPortfolioSnapshot'
import JournalCurrentAllocation from '~/components/journal/JournalCurrentAllocation'
import JournalMonthlyPerfomance from '~/components/journal/JournalMonthlyPerfomance'
import JournalTradeStats from '~/components/journal/JournalTradeStats'
import JournalEquityCurve from '~/components/journal/JournalEquityCurve'
import JournalStrategyStats from '~/components/journal/JournalStrategyStats'
import JournalTopStocks from '~/components/journal/JournalTopStocks'
import JournalEmotionalStats from '~/components/journal/JournalEmotionalStats'
import JournalExpenseReport from '~/components/journal/JournalExpenseReport'
import JournalBuyVolume from '~/components/journal/JournalBuyVolume'
import JournalBuyValue from '~/components/journal/JournalBuyValue'
import JournalPerformance from '~/components/journal/JournalPerformance'
import JournalGrossPL from '~/components/journal/JournalGrossPL'
// import ChartTesting from '~/components/journal/ChartTesting'

export default {
  layout: 'main',
  components: {
      JournalLivePortfolio,
      JournalPortfolioSnapshot,
      JournalCurrentAllocation,
      JournalMonthlyPerfomance,
      JournalTradeStats,
      JournalEquityCurve,
      JournalStrategyStats,
      JournalTopStocks,
      JournalEmotionalStats,
      JournalExpenseReport,
      JournalBuyVolume,
      JournalBuyValue,
      JournalPerformance,
      JournalGrossPL,
    //   ChartTesting
  },
  data () {
    return {
      tab: null,
      tabs: 3
    }
  }
}
</script>