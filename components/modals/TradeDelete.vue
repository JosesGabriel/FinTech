<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-center justify-left pa-4 success--text text-capitalize subtitle-1 font-weight-bold"
      >Delete Confirmation</v-card-title>
      <v-card-title
        class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
      >Are you sure you want to delete this trade?</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn
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
    /**
     * deleteNow function, trigger delete once user confirmed only openposition
     *
     * @return  {object}  returns deleted info
     */
    deleteNow() {
      let confirmed = true;
      this.$emit("confirmedDelete", confirmed);
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