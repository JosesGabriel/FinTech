<template>
  <v-container
    class="socialWall__container"
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
  },
  head() {
    return {
      title: "Arbitrage",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>

<style scoped>
.socialWall__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
