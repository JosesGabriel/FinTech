<template>
  <v-container
    class="index__container pt-0"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-6" no-gutters>
      <v-col
        class="navbar__container hidden-xs-only px-3"
        cols="1"
        sm="1"
        md="1"
      >
        <NavbarJournal :data="navbarMiniVariantSetter" active="journal" />
      </v-col>
      <v-col cols="11" class="pl-8">
        <JournalContent />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import NavbarJournal from "~/components/Navbar";
import JournalContent from "~/components/journal/JournalContent";

export default {
  layout: "main",
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
  mounted() {
    console.log('test')
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style scoped>
.index__container {
  max-width: 1080px;
  margin-top: 40px;
}
</style>
