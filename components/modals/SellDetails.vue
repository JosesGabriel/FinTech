<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold"
      >Trade Details</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="6">
            <v-card-title class="subtitle-2 pa-0 my-2 tertiary--text">
              <span>Strategy</span>
            </v-card-title>
            <v-card-title class="subtitle-2 pa-0 my-2 tertiary--text">
              <span>Trade Plan</span>
            </v-card-title>
            <v-card-title class="subtitle-2 pa-0 my-2 tertiary--text">
              <span>Emotion</span>
            </v-card-title>
            <v-card-title class="subtitle-2 pa-0 my-2 tertiary--text">
              <span>Outcome</span>
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card-title class="subtitle-2 font-weight-medium pa-0 my-2 tertiary--text">
              <span>{{ visible ? details.meta.strategy ? details.meta.strategy : "-" : "" }}</span>
            </v-card-title>
            <v-card-title class="subtitle-2 font-weight-medium pa-0 my-2 tertiary--text">
              <span>{{ visible ? details.meta.plan ? details.meta.plan : "-" : "" }}</span>
            </v-card-title>
            <v-card-title class="subtitle-2 font-weight-medium pa-0 my-2 tertiary--text">
              <span>{{ visible ? details.meta.emotion ? details.meta.emotion : "-" : "" }}</span>
            </v-card-title>
            <v-card-title class="subtitle-2 font-weight-medium pa-0 my-2 tertiary--text">
              <span
                :class=" visible ? outcome > 0 ? 'positive' : outcome < 0 ? 'negative' : 'neutral' : '' "
              >{{ visible ? outcome > 0 ? "Gain" : outcome < 0 ? 'Loss' : '' : '' }}</span>
            </v-card-title>
          </v-col>
          <v-col class="pa-2 mt-2 trading_notes" cols="12" sm="12" md="12">
            <v-card-title class="subtitle-2 pa-0 tertiary--text">
              <span>Trading Notes</span>
            </v-card-title>
            <v-card-title class="caption pa-0 tertiary--text notes_text">
              <span>{{ visible ? details.meta.notes ? details.meta.notes : "..." : '' }}</span>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row no-gutters>
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
      details: null,
      outcome: 0
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
          this.outcome =
            parseFloat(this.itemDetails.total_value) -
            parseFloat(this.itemDetails.buy_value);
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