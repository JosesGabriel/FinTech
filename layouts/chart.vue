<template>
  <v-app dark>    
    <v-container>
        <nuxt />
    </v-container>
  </v-app>
</template>

<style>

</style>

<script>
export default {
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
