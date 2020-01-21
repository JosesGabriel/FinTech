<template>
  <v-container ref="componentWrapper" class="pa-0">
    <!-- Don't remove ref value. Used for sharing -->
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <v-card-title class="text-left justify-left px-0 pb-2 pt-5" :style="borderColor">
        <h6 class="font-weight-regular subtitle-2" :style="{ color: fontColor }">TOP STOCKS</h6>
        <v-spacer></v-spacer>
        <v-btn icon small :dark="lightSwitch == 0 ? false : true" @click="showShareModal()">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-row no-gutters class="pt-3">
        <v-col class="pa-0" cols="6" sm="6" md="6">
          <JournalLossers />
        </v-col>
        <v-col class="pa-0" cols="6" sm="6" md="6">
          <JournalWinners />
        </v-col>
      </v-row>
      <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
    </v-col>
  </v-container>
</template>
<script>
import JournalLossers from "~/components/journal/dashboard/JournalLossers";
import JournalWinners from "~/components/journal/dashboard/JournalWinners";
import shareModal from "~/components/modals/Share";
import { mapGetters } from "vuex";

export default {
  components: {
    JournalLossers,
    JournalWinners,
    shareModal
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    borderColor() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #b6b6b6"
        : "border-bottom: 1px solid #535358";
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false
    };
  },
  methods: {
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    }
  }
};
</script>

<style>
.apexcharts-canvas.dark .apexcharts-title-text {
  fill: #e5e5e5;
}
.apexcharts-canvas.light .apexcharts-title-text {
  fill: #494949;
}
.apexcharts-canvas.dark .apexcharts-yaxis-label {
  fill: #e5e5e5;
}
.apexcharts-canvas.light .apexcharts-yaxis-label {
  fill: #494949;
}
</style>
