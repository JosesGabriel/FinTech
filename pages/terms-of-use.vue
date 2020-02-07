<template>
  <v-container
    class="page__wrapper"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-6" no-gutters>
      <v-col cols="12">
        <TermsOfUse />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TermsOfUse from "~/components/TermsOfUse";

export default {
  layout: "main",
  components: {
    TermsOfUse
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
