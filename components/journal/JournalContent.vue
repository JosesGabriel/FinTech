<template>
    <v-col cols="11" sm="11" md="11">
        <v-col cols="5" sm="5" md="5" class="pa-0">
            <v-tabs
            color="#48FFD5"
            background-color="#0c1f33"
            dark
            grow
            >
            <v-tab color="#fff" class="text-capitalize subtitle-1">Dashboard</v-tab>
            <v-tab color="#fff" class="text-capitalize subtitle-1">Tradelogs</v-tab>
            <v-tab color="#fff" class="text-capitalize subtitle-1">Ledger</v-tab>
            </v-tabs>
        </v-col>
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
            <!-- <JournalTopStocks/> -->
        </v-row>
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
// import JournalTopStocks from '~/components/journal/JournalTopStocks'
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
    //   JournalTopStocks,
    //   ChartTesting
  }
}
</script>
