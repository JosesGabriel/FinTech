<template>
  <div class="footer-main">
    <router-link class="no-transform" to="/privacy-policy">
      <span class="caption tertiary--text">Privacy Policy •</span>
    </router-link>
    <router-link class="no-transform" to="/terms-of-use">
      <span class="caption tertiary--text">Terms of Use •</span>
    </router-link>
    <router-link class="no-transform" to="/contact-us">
      <span class="caption tertiary--text">Contact Us •</span>
    </router-link>
    <router-link class="no-transform" to="/about-us">
      <span class="caption tertiary--text">About Us •</span>
    </router-link>
    <a class="caption success--text">Lyduz © 2020</a>
    <v-icon small color="tertiary">mdi-facebook</v-icon>
    <v-icon small color="tertiary">mdi-twitter</v-icon>
  </div>
</template>
<style scoped>
.footer-main {
  line-height: 1;
}
</style>
