<template>
    <v-col cols="12" sm="12" md="12">
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Live Portfolio</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1">Tradelogs</v-tab>

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
            </v-tabs>
            <!-- <ChartTesting/> -->
    </v-col>


</template>
<script>
  import VirtualLivePortfolio from '~/components/trade-simulator/VirtualLivePortfolio'

  export default {
    data () {
      return {

      }
    },
    components: {
        VirtualLivePortfolio,
    }
  }
</script>
<style scoped>


</style>