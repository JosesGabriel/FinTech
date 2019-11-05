<template>
    <v-row no-gutters>
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <v-card-title class="text-left justify-left px-0 pb-2 pt-5"  style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">STRATEGY STATISTICS</h6>
                <v-spacer></v-spacer>
                <router-link to="/" class="social__router">
                <v-btn icon small> 
                    <img src="/icon/journal-icons/share-icon.svg" width="15">
                </v-btn>
                </router-link>
            </v-card-title>
        </v-col>
        <v-col class="pa-0" cols="7" sm="7" md="7">
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