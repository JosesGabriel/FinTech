<template>
    <v-container class="user__container pt-0" :class="{'pa-0': $vuetify.breakpoint.xsOnly}">
        <v-row>
            <v-col class="pt-0" cols="12" sm="12" md="12">
                <Profile/>
            </v-col>
        </v-row>
        <v-row class="mb-6" no-gutters>
            <v-col class="pr-3 hidden-sm-and-down" cols="4" sm="4" md="4">
                <Info/>
                <Gallery/>
                <FooterSidebar/>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="8" lg="8">
                <Newsfeed/>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
    .user__container {
        max-width: 1080px;
        margin-top: 40px;
    }
</style>
<script>
import Profile from '~/components/Profile'
import Navbar from '~/components/Navbar'
import Newsfeed from '~/components/Newsfeed'
import Info from '~/components/Info'
import Gallery from '~/components/Gallery'
import FooterSidebar from '~/components/FooterSidebar'

export default {
  layout: 'main',
  components: {
      Profile,
      Navbar,
      Newsfeed,
      Info,
      Gallery,
      FooterSidebar
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