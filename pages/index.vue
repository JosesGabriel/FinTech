<template>
    <v-container class="socialWall__container" :class="{'pa-0': $vuetify.breakpoint.xsOnly}">
        <v-row class="mb-5" no-gutters>
            <v-col class="navbar__container hidden-xs-only px-3" cols="3" sm="2" md="3" lg="3">
              <Navbar/>
            </v-col>
<<<<<<< HEAD
            <v-col cols="12" sm="12" md="6" lg="6">
              <Newsfeed/>
            </v-col>
            <v-col class="px-3 hidden-xs-and-down" cols="3" sm="3" md="3">
=======
            <Newsfeed/>
            <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
>>>>>>> ac886a7ec415230731a22ae872a4be5d442f8a85
                <Trendingstocks/>
                <Whotomingle/>
                <Footersidebar/>
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
import Newsfeed from '~/components/Newsfeed'
import Trendingstocks from '~/components/Trendingstocks.vue'
import Whotomingle from '~/components/Whotomingle.vue'
import Footersidebar from '~/components/Footersidebar.vue'

export default {
  layout: 'main',
  components: {
      Navbar,
      Newsfeed,
      Trendingstocks,
      Whotomingle,
      Footersidebar
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