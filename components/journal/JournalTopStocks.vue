<template>
    <v-container class="pa-0">
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <v-card-title class="text-left justify-left px-0 pb-2 pt-5" style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">TOP STOCKS</h6>
                <v-spacer></v-spacer>
                <router-link to="/" class="social__router">
                <v-btn icon small> 
                    <img src="/icon/journal-icons/share-icon.svg" width="15">
                </v-btn>
                </router-link>
            </v-card-title>
            <v-row no-gutters class="pt-3">
                <v-col class="pa-0" cols="6" sm="6" md="6">
                    <JournalLossers/>
                </v-col>
                <v-col class="pa-0" cols="6" sm="6" md="6">
                    <JournalWinners/>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>
<script>
import JournalLossers from '~/components/journal/JournalLossers'
import JournalWinners from '~/components/journal/JournalWinners'

export default {
    components: {
        JournalLossers,
        JournalWinners
    }
}
</script>