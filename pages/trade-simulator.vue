<template>
  <v-container
    class="page__wrapper"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-6" no-gutters>
      <v-col
        class="navbar__container hidden-xs-only px-3"
        cols="1"
        sm="1"
        md="1"
      >
        <NavBar :data="navbarMiniVariantSetter" active="virtualtrade" />
      </v-col>
      <v-col cols="11">
        <VirtualContent />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import NavBar from "~/components/Navbar";
import VirtualContent from "~/components/trade-simulator/VirtualContent";

export default {
  layout: "main",
  components: {
    NavBar,
    VirtualContent
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
