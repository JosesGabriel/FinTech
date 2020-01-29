<template>
  <v-app dark>
    <v-content class="root__template">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app color="transparent">
      <span class="overline">Lyduz &copy; {{ date.getFullYear() }}</span>
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
  data() {
    return {
      date: new Date()
    };
  }
};
</script>
