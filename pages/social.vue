<template>
    <v-container fluid class="socialWall__container">
        <v-row class="mb-6" no-gutters>
            <Navbar/>
            <Newsfeed/>
            <v-col class="px-1">
                <Trendingstocks/>
                <Whotomingle/>
                <Footersidebar/>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
    .socialWall__container {
        max-width: 1120px;
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
  layout: 'social',
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