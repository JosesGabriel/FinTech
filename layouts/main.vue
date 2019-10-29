<template>
  <v-app>
    <v-content class="social__container">
      <rbHeader/>
      <v-container :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>
<style>
.social__container {
  /* background-color: #fcfbfe; light mode color, add to vuex state soon */
  background-color: #0c1f33;
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
  }
}
</script>
