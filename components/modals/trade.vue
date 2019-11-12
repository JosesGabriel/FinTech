
<template>
    <v-dialog v-model="show" max-width="400px">
        <v-card color="#00121E">
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" width="100" :href="`#funds-1`">Buy</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" :href="`#funds-2`">Sell</v-tab>
                <v-spacer></v-spacer>
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" flat text class="calendate-btn" color="#00FFC3">
                        <span class="text-capitalize">Date: </span>
                        <v-card-text class="pa-0" v-html="date"></v-card-text>
                    </v-btn>
                </template>
                <v-date-picker v-model="date" color="#00121e" dark scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
                </v-dialog>

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
                        <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-trade-ok">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">Cancel</h1>
                        </v-card-title>
                    </v-col>
                    <v-col class="pa-0" cols="6" sm="6" md="6" @click.stop="show=false">
                        <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-trade-not">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">Confirm</h1>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-dialog>
</template>

<script>
import BuyTrade from '~/components/modals/buy'
import SellTrade from '~/components/modals/sell'

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
    },
    data() {
        return {    
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
        }
    }
}
</script>
<style>
    .tab_menu-top {
        min-width: 65px;
    }
    .calendate-btn {
        margin-top: 6px;
        margin-right: 6px;
    }
    .confirmation_button-trade-not {
        background: #00FFC3;
    }
    .confirmation_button-trade-not h1 {
        color: #00080E !important
    }
    .confirmation_button-trade-ok {
        background: #00080E;
    }
    .confirmation_button-trade-ok:hover,
    .confirmation_button-trade-not:hover {
        background: #00FFC3;
        color: #00080E;
        cursor: pointer;
    }
    .confirmation_button-trade-ok:hover h1,
    .confirmation_button-trade-not:hover h1 {
        color: #00080E !important;
    }
</style>