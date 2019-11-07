
<template>
    <v-dialog v-model="show" max-width="390px">
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
                </v-tab-item>
            </v-tabs>
            <!-- <v-card-actions>
            <v-btn color="primary" @click.stop="show=false">Close</v-btn>
            </v-card-actions> -->
        </v-card>
    </v-dialog>
</template>

<script>
import BuyTrade from '~/components/modals/buy'

export default {
    props: ['visible'],
    components: {
        BuyTrade
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
    .tab_menu-top {
        min-width: 65px;
    }
</style>