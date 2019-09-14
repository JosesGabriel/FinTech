<template>
  <v-app>
    <v-content class="social__container">
      <rbHeader/>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>
<style>
.social__container {
  background-color: #e9ebee;
}
.header--rainbow {
  height: 4px;
  background-image: linear-gradient(to right, #894b9d, #eb8023, #c2b819, #49ba6f, #2581bc);
}
</style>

<script>
import rbHeader from '~/components/Header'
export default {
  components: {
      rbHeader
  },
  data () {
    return {
      
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
