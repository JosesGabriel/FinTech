<template>
  <v-app dark>
    <v-content class="root__template">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
      color="transparent"
    >
      <span class="overline">Arbitrage &copy; 2019</span>
    </v-footer>
  </v-app>
</template>
<style>
.root__template {
  background-image: url("/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
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
