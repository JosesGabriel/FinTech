<template>
  <v-container
    class="page__wrapper __privacyPolicy"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-6" no-gutters>
      <v-col cols="12">
        <PrivacyPolicy />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PrivacyPolicy from "~/components/PrivacyPolicy";

export default {
  layout: "main",
  components: {

    PrivacyPolicy
  },
  data() {
    return {
      isOpen: true,
      navbarMiniVariantSetter: true
    };
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style>
html {
  overflow-y: unset !important;
}
</style>