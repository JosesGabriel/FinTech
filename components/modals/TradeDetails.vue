<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold"
      >Trade Details</v-card-title>
      <v-container class="px-5 pb-5">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="6">
            <v-card-title class="subtitle-2 tertiary--text pa-0 my-2">
              <span>Strategy</span>
            </v-card-title>
            <v-card-title class="subtitle-2 tertiary--text pa-0 my-2">
              <span>Trade Plan</span>
            </v-card-title>
            <v-card-title class="subtitle-2 tertiary--text pa-0 my-2">
              <span>Emotion</span>
            </v-card-title>
            <v-card-title class="subtitle-2 tertiary--text pa-0 my-2">
              <span>Outcome</span>
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card-title class="subtitle-2 tertiary--text font-weight-semi-medium pa-0 my-2">
              <span>{{ visible ? details.metas.strategy ? details.metas.strategy : "-" : "" }}</span>
            </v-card-title>
            <v-card-title class="subtitle-2 tertiary--text font-weight-semi-medium pa-0 my-2">
              <span>{{ visible ? details.metas.plan ? details.metas.plan : "-" : "" }}</span>
            </v-card-title>
            <v-card-title class="subtitle-2 tertiary--text font-weight-semi-medium pa-0 my-2">
              <span>{{ visible ? details.metas.emotion ? details.metas.emotion : "-" : "" }}</span>
            </v-card-title>
            <v-card-title class="subtitle-2 tertiary--text font-weight-semi-medium pa-0 my-2">
              <span
                :class=" visible ? details.profit_loss > 0 ? 'positive' : details.profit_loss < 0 ? 'negative' : 'neutral' : '' "
              >{{ visible ? details.profit_loss > 0 ? "Gain" : details.profit_loss < 0 ? 'Loss' : '' : "" }}</span>
            </v-card-title>
          </v-col>
          <v-col class="pa-2 mt-2 trading_notes" cols="12" sm="12" md="12">
            <v-card-title class="subtitle-2 tertiary--text pa-0">
              <span>Trading Notes</span>
            </v-card-title>
            <v-card-title class="caption pa-0 tertiary--text notes_text">
              <span>{{ visible ? details.metas.notes ? details.metas.notes : "..." : '' }}</span>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-3">
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            class="text-capitalize mt-2 ml-1 black--text"
            depressed
            light
            @click.stop="show = false"
          >Close</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["visible", "itemDetails"],
  data() {
    return {
      details: null
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    show: {
      get() {
        if (this.visible) {
          this.details = this.itemDetails;
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  }
};
</script>
<style scoped>
.trading_notes {
  background: hsla(0, 0%, 100%, 0.12);
  border-radius: 4px;
}
.notes_text {
  max-height: 100px;
  overflow: auto;
}
</style>