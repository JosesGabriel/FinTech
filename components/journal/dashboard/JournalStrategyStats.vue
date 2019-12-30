<template>
  <v-row no-gutters>
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <v-card-title
        class="text-left justify-left px-0 pb-2 pt-5"
        :style="borderColor"
      >
        <h6 class="font-weight-regular subtitle-2" :style="{ color: fontColor }">STRATEGY STATISTICS</h6>
        <v-spacer></v-spacer>
        <v-btn icon small @click.stop="showScheduleForm=true">
          <img src="/icon/journal-icons/share-icon.svg" width="15" />
        </v-btn>
      </v-card-title>
    </v-col>
    <v-col class="pa-0" cols="7" sm="7" md="7">
      <JournalStrategyStatsLogs />
    </v-col>
    <v-col class="pa-0" cols="5" sm="5" md="5">
      <JournalWinLoss />
    </v-col>
    <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
  </v-row>
</template>

<script>
import JournalStrategyStatsLogs from "~/components/journal/dashboard/JournalStrategyStatsLogs";
import JournalWinLoss from "~/components/journal/dashboard/JournalWinLoss";
import shareModal from "~/components/modals/share";
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
    fontColor: function() {
        return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    borderColor: function() {
        return this.lightSwitch == 0
            ? "border-bottom: 1px solid #b6b6b6"
            : "border-bottom: 1px solid #535358";
    },
  },
  data() {
    return {
      showScheduleForm: false
    };
  }
};
</script>