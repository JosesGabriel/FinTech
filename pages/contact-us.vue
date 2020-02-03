<template>
  <v-container
    class="page__wrapper"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-row class="mb-6" no-gutters>
      <v-col cols="12">
        <ContactUs />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ContactUs from "~/components/ContactUs";

export default {
  layout: "main",
  components: {
   ContactUs
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

