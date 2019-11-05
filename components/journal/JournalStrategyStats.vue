<template>
    <v-row no-gutters>
        <v-col class="pa-0" cols="7" sm="7" md="7">
            <v-card-title class="text-left justify-left px-0 py-3 pt-5">
                <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">STRATEGY STATISTICS</h6>
            </v-card-title>
            <JournalStrategyStatsLogs/>
        </v-col>
        <v-col class="pa-0" cols="5" sm="5" md="5">
            <JournalWinLoss/>
        </v-col>
    </v-row>
</template>

<script>

import JournalStrategyStatsLogs from '~/components/journal/JournalStrategyStatsLogs'
import JournalWinLoss from '~/components/journal/JournalWinLoss'

export default {
    components: {
        JournalStrategyStatsLogs,
        JournalWinLoss
    }
}
</script>