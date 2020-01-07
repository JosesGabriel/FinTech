<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-center justify-center pa-5 pt-8 success--text text-uppercase subtitle-1 font-weight-bold"
      >THIS IS PERMANENT</v-card-title>
      <v-card-title
        class="text-center justify-center pa-0 subtitle-1 font-weight-thin"
      >Are you sure you want to delete?</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            class="text-capitalize mt-2"
            depressed
            text
            light
            @click.stop="show = false"
          >Close</v-btn>
          <v-btn
            color="success"
            class="ml-1 text-capitalize mt-2 black--text"
            depressed
            light
            @click="deleteNow"
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
      details: null
    };
  },
  computed: {
    ...mapGetters({
      renderEditKey: "journal/getRenderEditKey",
      lightSwitch: "global/getLightSwitch"
    }),
    show: {
      get() {
        if (this.visible) {
          this.details = this.itemDetails;
          this.fund = this.itemDetails.fund;
          this.stockid = this.itemDetails.action;
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
    deleteNow() {
      let fund_id = this.fund;
      let stock_id = this.stockid;
      this.$api.journal.portfolio
        .buydelete(fund_id, stock_id)
        .then(response => {
          if (response.success) {
            this.keyCreateCounter = this.renderEditKey;
            this.keyCreateCounter++;
            this.setRenderEditKey(this.keyCreateCounter);
          }
        });
    }
  }
};
</script>