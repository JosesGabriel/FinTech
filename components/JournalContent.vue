<template>
    <v-col cols="11" sm="11" md="11">
        <v-col cols="5" sm="5" md="5" class="pa-0">
            <v-tabs
            v-model="tab"
            color="#48FFD5"
            background-color="transparent"
            dark
            grow
            >
            <v-tab color="#fff" class="text-capitalize subtitle-1">Dashboard</v-tab>
            <v-tab color="#fff" class="text-capitalize subtitle-1">Tradelogs</v-tab>
            <v-tab color="#fff" class="text-capitalize subtitle-1">Ledger</v-tab>
            </v-tabs>
        </v-col>
        <JournalLivePortfolio/>
        <JournalPortfolioSnapshot/>
    </v-col>
</template>
<script>
import JournalLivePortfolio from '~/components/JournalLivePortfolio'
import JournalPortfolioSnapshot from '~/components/JournalPortfolioSnapshot'

export default {
  layout: 'main',
  components: {
      JournalLivePortfolio,
      JournalPortfolioSnapshot
  }
}
</script>
