<template>
    <v-col class="pt-10 mt-5" cols="12" sm="12" md="12">
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Dashboard</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-2`">Tradelogs</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-3`">Ledger</v-tab>
                <!-- <v-spacer></v-spacer>
                <v-col class="pa-0" cols="3" sm="3" md="3">
                    <v-select
                    :items="items"
                    label="Primary Portfolio"
                    filled
                    dense
                    class="ma-0 portfolio_selector-btn"
                    height="15px"
                    ></v-select>
                </v-col> -->
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 1">
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
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 2">
                    <v-container class="pa-0">
                        <TradelogsContent/>
                    </v-container>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 3">
                    <v-container class="pa-0">
                        <LedgerContent/>
                    </v-container>
                </v-tab-item>
            </v-tabs>
            <!-- <ChartTesting/> -->
    </v-col>
</template>
<script>
//Dashboard tab
import JournalLivePortfolio from '~/components/journal/dashboard/JournalLivePortfolio'
import JournalPortfolioSnapshot from '~/components/journal/dashboard/JournalPortfolioSnapshot'
import JournalCurrentAllocation from '~/components/journal/dashboard/JournalCurrentAllocation'
import JournalMonthlyPerfomance from '~/components/journal/dashboard/JournalMonthlyPerfomance'
import JournalTradeStats from '~/components/journal/dashboard/JournalTradeStats'
import JournalEquityCurve from '~/components/journal/dashboard/JournalEquityCurve'
import JournalStrategyStats from '~/components/journal/dashboard/JournalStrategyStats'
import JournalTopStocks from '~/components/journal/dashboard/JournalTopStocks'
import JournalEmotionalStats from '~/components/journal/dashboard/JournalEmotionalStats'
import JournalExpenseReport from '~/components/journal/dashboard/JournalExpenseReport'
import JournalBuyVolume from '~/components/journal/dashboard/JournalBuyVolume'
import JournalBuyValue from '~/components/journal/dashboard/JournalBuyValue'
import JournalPerformance from '~/components/journal/dashboard/JournalPerformance'
import JournalGrossPL from '~/components/journal/dashboard/JournalGrossPL'

//Ledger tab
import TradelogsContent from '~/components/journal/tradelogs/contents'

//Ledger tab
import LedgerContent from '~/components/journal/ledger/LedgerContent'

export default {
  layout: 'main',
  components: {
      //Dashboard tab
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
      //Ledger tab
      TradelogsContent,
      //Ledger tab
      LedgerContent
  },
  data () {
    return {
      tab: null,
      tabs: 3
    }
  }
}
</script>