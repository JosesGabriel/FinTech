<template>
  <div ref="componentWrapper">
    <v-card flat :dark="lightSwitch == 1" :color="lightSwitch == 1 ? 'darkcard' : 'lightcard'">
      <v-row :class="toggleSpace ? 'px-2' : ''" no-gutters>
        <!-- Don't remove ref value. Used for sharing -->
        <v-col class="pa-0" cols="12" sm="12" md="12">
          <v-card-title class="text-left justify-left px-0 pb-2 pt-5" :style="borderColor">
            <span
              class="font-weight-bold subtitle-2"
              :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
            >STRATEGY STATISTICS</span>
            <v-spacer></v-spacer>
            <v-btn icon small :dark="lightSwitch == 0 ? false : true" @click="showShareModal()">
              <v-icon small color="tertiary">mdi-share-variant</v-icon>
            </v-btn>
          </v-card-title>
        </v-col>
        <v-col class="pa-0" cols="7" sm="7" md="7">
          <JournalStrategyStatsLogs />
        </v-col>
        <v-col class="pa-0" cols="5" sm="5" md="5">
          <JournalWinLoss />
        </v-col>
        <share-modal
          v-if="showShareForm"
          :imageid="shareLink"
          @closeModal="showShareForm = false, toggleSpace = false"
        />
      </v-row>
    </v-card>
  </div>
</template>

<script>
import JournalStrategyStatsLogs from "~/components/journal/dashboard/JournalStrategyStatsLogs";
import JournalWinLoss from "~/components/journal/dashboard/JournalWinLoss";
import shareModal from "~/components/modals/Share";
import { mapGetters } from "vuex";

export default {
  components: {
    JournalStrategyStatsLogs,
    JournalWinLoss,
    shareModal
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns attribute border color
     *
     * @return  {string}  returns string
     */
    borderColor() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #dadada"
        : "border-bottom: 1px solid #172431";
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      toggleSpace: false
    };
  },
  methods: {
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      this.toggleSpace = true;
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
