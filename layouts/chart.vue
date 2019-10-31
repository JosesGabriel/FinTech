<template>
  <v-app>
        <Header />
            <div class="chart_spacer"></div>
            <v-content>
                <nuxt />
            </v-content>
  </v-app>
</template>

<script>
import Header from "~/components/parts/Header";

export default {
  data () {
    return {
      
    }
  },
  components: {
      Header
  }
}
</script>
    
<style scoped>
.content_app{
    background-color: #213F58;
}
.chart_spacer{
    height: 52px;
}
</style>