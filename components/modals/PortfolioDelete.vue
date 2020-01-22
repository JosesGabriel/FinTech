<template>
  <v-dialog v-model="show" persistent max-width="400px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-center justify-left pa-4 success--text text-capitalize subtitle-1 font-weight-bold"
      >Delete Confirmation</v-card-title>
      <v-card-title
        class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
      >Are you sure you want to delete this portfolio?</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            class="text-capitalize mt-2"
            depressed
            text
            :dark="lightSwitch == true"
            light
            @click.stop="show = false"
          >Cancel</v-btn>
          <v-btn
            color="success"
            class="ml-1 text-capitalize mt-2 black--text"
            depressed
            light
            @click="deleteItem()"
            @click.stop="show = false"
          >Delete</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["visible", "itemDetails"],
  data() {
    return {
      details: null,
      data: null,
      persistentActivator: true
    };
  },
  computed: {
    ...mapGetters({
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    show: {
      get() {
        if (this.visible) {
          this.data = this.itemDetails;
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setRenderEditKey: "journal/setRenderEditKey"
    }),
    /**
     * emitting 
     *
     * @param   {[type]}  event  [event description]
     *
     * @return  {[type]}         [return description]
     */
    deleteItem(event) {
      if (this.data != null) {
        const data = { ...this.data, confirm: true };

        this.$emit("clicked", data);
      }
    }
  }
};
</script>