<template>
    <v-col class="pa-0">

         <v-tabs
            color="#48FFD5"
            background-color="transparent"
            dark
            class="mt-3"
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Jockey</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-2`">Activity</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-3`">VirtualTrade</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-4`">RealTrade</v-tab>

                <v-tab-item
                    dark
                    color="#48FFD5"
                    background-color="black"
                    :value="'tab-' + 1"
                    style="background: #00122e;"
                >
                    <v-container class="pa-0">
                        <Jockey/>     
                    </v-container>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 2">
                    <v-container class="pa-0">
                     
                    </v-container>
                </v-tab-item>
                 <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 3">
                    <v-container class="pa-0">
                     
                    </v-container>
                </v-tab-item>
                 <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 4">
                    <v-container class="pa-0">
                     
                    </v-container>
                </v-tab-item>
            </v-tabs>      
    </v-col>
</template>
<script>
    import Jockey from '~/components/chart/Jockey'
    export default {
    data () {
      return {
          
      }
    },
    components: {
       Jockey,
    }
  }
</script>