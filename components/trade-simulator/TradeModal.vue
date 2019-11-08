
<template>
    <v-dialog v-model="show" width="60%">
        <v-card color="#00121E">
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" width="100" :href="`#funds-1`">Buy</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" :href="`#funds-2`">Sell</v-tab>

                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 1">
                    <BuyTrade/>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 2">
                    <SellTrade/>
                </v-tab-item>
            </v-tabs>
            <!-- <v-card-actions>
            <v-btn color="primary" @click.stop="show=false">Close</v-btn>
            </v-card-actions> -->
            <v-col class="pa-0" cols="12" sm="12" md="12">
                <v-row no-gutters>
                    <v-col class="pa-0" cols="6" sm="6" md="6" @click.stop="show=false">
                        <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-reset-ok">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">Cancel</h1>
                        </v-card-title>
                    </v-col>
                    <v-col class="pa-0" cols="6" sm="6" md="6" @click.stop="show=false">
                        <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-reset-not">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">Confirm</h1>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-dialog>
</template>

<script>
import BuyTrade from '~/components/trade-simulator/buy'
import SellTrade from '~/components/trade-simulator/sell'

export default {
    props: ['visible'],
    components: {
        BuyTrade,
        SellTrade
    },
    computed: {
        show: {
        get () {
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
<style>
    .confirmation_button-reset-ok,
    .confirmation_button-reset-not {
        background: #00080E;
    }
    .confirmation_button-reset-ok:hover,
    .confirmation_button-reset-not:hover {
        background: #00FFC3;
        cursor: pointer;
    }
    .confirmation_button-reset-ok:hover h1,
    .confirmation_button-reset-not:hover h1 {
        color: #00080E !important;
    }
    .tab_menu-top {
        min-width: 65px;
    }
</style>