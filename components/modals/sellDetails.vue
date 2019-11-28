<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card color="#00121E">
            <v-card-title class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold">Trade Details</v-card-title>
            <v-container class="px-5">
                <v-row no-gutters>
                    <v-col cols="12" sm="12" md="6">
                        <v-card-title class="subtitle-1 pa-0 my-2 secondary--text"><span>Strategy</span></v-card-title>
                        <v-card-title class="subtitle-1 pa-0 my-2 secondary--text"><span>Trade Plan</span></v-card-title>
                        <v-card-title class="subtitle-1 pa-0 my-2 secondary--text"><span>Emotion</span></v-card-title>
                        <v-card-title class="subtitle-1 pa-0 my-2 secondary--text"><span>Outcome</span></v-card-title>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-card-title class="subtitle-1 font-weight-bold pa-0 my-2 secondary--text"><span>{{ visible ? details.meta.strategy : '' }}</span></v-card-title>
                        <v-card-title class="subtitle-1 font-weight-bold pa-0 my-2 secondary--text"><span>{{ visible ? details.meta.plan : '' }}</span></v-card-title>
                        <v-card-title class="subtitle-1 font-weight-bold pa-0 my-2 secondary--text"><span>{{ visible ? details.meta.emotion : '' }}</span></v-card-title>
                        <v-card-title class="subtitle-1 font-weight-bold pa-0 my-2 secondary--text"><span :class=" visible ? outcome > 0 ? 'positive' : outcome < 0 ? 'negative' : 'neutral' : '' ">{{ visible ? outcome > 0 ? "Gain" : outcome < 0 ? 'Loss' : '' : '' }}</span></v-card-title>
                    </v-col>
                    <v-col class="pa-2 mt-2 trading_notes" cols="12" sm="12" md="12">
                        <v-card-title class="subtitle-2 pa-0 secondary--text"><span>Trading Notes</span></v-card-title>
                        <v-card-title class="caption pa-0 secondary--text notes_text"><span>{{ visible ? details.meta.notes : '' }}</span></v-card-title>
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
export default {
    props: ['visible', 'itemDetails'],
    data() {
        return {
            details: null,
            outcome: 0
        }
    },
    computed: {
        show: {
            get () {
                if (this.visible){
                    console.log(this.itemDetails)
                    this.details = this.itemDetails
                    this.outcome = this.itemDetails.total_value - this.itemDetails.meta.buy_value
                }
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    }
}
</script>
<style scoped>
    .trading_notes {
        border: 1px solid hsla(0,0%,100%,.12);
        border-radius: 4px
    }
    .notes_text {
        max-height: 100px;
        overflow: auto;
    } 
    /* Custom Scrollbar */
    .notes_text::-webkit-scrollbar {
    width: 5px;
    }
    .notes_text::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
    }
    .notes_text::-webkit-scrollbar-thumb {
    background: #1de9b6;
    border-radius: 20px;
    }
    .notes_text::-webkit-scrollbar-thumb:hover {
    background: #1de9b6;
    }
</style>