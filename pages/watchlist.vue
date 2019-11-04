<template>
    <v-container class="socialWall__container" :class="{'pa-0': $vuetify.breakpoint.xsOnly}">
        <v-row class="mb-5" no-gutters>
            <v-col class="navbar__container hidden-xs-only px-3" cols="3" sm="2" md="3" lg="3">
              <Navbar/>
            </v-col>
            <v-col xs="12" sm="10" md="6" lg="6">
              <v-container class="pt-0" fluid>
                <v-row dense>
                  <v-col cols='6' v-for="n in 4" :key="n" class="pt-0">
                    <WatchCard/>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
                <TrendingStocks/>
                <TrendingStocks/>
                <FooterSidebar/>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
    .socialWall__container {
        max-width: 1080px;
        margin-top: 40px;
    }
</style>
<script>
import Navbar from '~/components/Navbar'
import FooterSidebar from '~/components/FooterSidebar.vue'
import TrendingStocks from '~/components/TrendingStocks.vue'
import WatchCard from '~/components/WatchCard.vue'

export default {
  layout: 'main',
  components: {
      Navbar,
      TrendingStocks,
      FooterSidebar,
      WatchCard
  },
  data() {
      return {
          isOpen: true
      }
  },
  head () {
    return {
      title: 'Arbitrage',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
