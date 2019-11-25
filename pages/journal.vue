<template>
  <v-container
    class="index__container pt-0"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-6" no-gutters>
      <v-col class="hidden-xs-and-down" cols="1" sm="1" md="1">
        <NavbarJournal :data="navbarMiniVariantSetter" active="journal" />
      </v-col>
      <v-col cols="11">
        <JournalContent />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.index__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
<script>
import NavbarJournal from "~/components/Navbar";
import JournalContent from "~/components/journal/JournalContent";

export default {
  layout: "main",
  middleware: ["auth"],
  components: {
    NavbarJournal,
    JournalContent
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