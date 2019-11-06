<template>
    <v-container class="socialWall__container" :class="{'pa-0': $vuetify.breakpoint.xsOnly}">
        <v-row class="mb-6" no-gutters>
            <v-col class="px-3 hidden-md-and-down" cols="2" sm="3" md="3">
              <vNavBar/>
            </v-col>
            <v-col cols="9">
                <VirtualContent/>
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
import vNavBar from '~/components/trade-simulator/vNavBar'
import VirtualContent from '~/components/trade-simulator/VirtualContent'

export default {
  layout: 'main',
  components: {
      vNavBar,
      VirtualContent
  },
  data() {
      return {
          isOpen: true
      }
  },
  methods: {
    toggle: function(){
        this.isOpen = !this.isOpen
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
