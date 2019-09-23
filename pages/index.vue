<template>
    <v-container class="socialWall__container" :class="{'pa-0': $vuetify.breakpoint.xsOnly}" dark>
        <v-row class="mb-5" no-gutters>
            <v-col class="navbar__container hidden-xs-only px-3" cols="3" sm="2" md="3" lg="3">
              <Navbar/>
            </v-col>
            <Newsfeed/>
            <v-col class="px-3 hidden-sm-and-down" cols="3" sm="3" md="3">
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
import axios from '~/node_modules/axios'

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
          isOpen: true,
      }
  },
  mounted() {
    axios
      .get('https://dev-api.arbitrage.ph/api/social/posts/33937358302875648')
      .then(response => (this.info = response.data))
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