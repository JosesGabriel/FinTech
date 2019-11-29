<template>
    <v-col class="pa-0" cols="4" sm="4" md="4">
        <v-card-title class="text-left justify-left px-0 pb-2 pt-5">
            <h6 class="font-weight-regular white--text subtitle-2" style="color:#fff;">PORTFOLIO SNAPSHOT</h6>
            <v-spacer></v-spacer>
            <v-btn icon small @click.stop="showScheduleForm=true"> 
                <img src="/icon/journal-icons/share-icon.svg" width="15">
            </v-btn>
        </v-card-title>
        <v-col class="pa-0">
            <v-card color="#00121E" elevation="0" dark class="pb-2" style="border: 1px solid #000">
                <v-card-title class="text-left justify-left py-2 px-3">
                    <h6 class="font-weight-regular caption text-capitalize" style="color:#fff;">Trading Result (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop px-3 py-1 caption">Starting Capital</td>
                                <td class="item_position-prop text-right px-3 py-1 caption">{{ formatPrice(parseFloat(startingCapital)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop px-3 py-1 caption">Year to Date P/L</td>
                                <td class="item_position-prop text-right px-3 py-1 caption">{{ formatPrice(parseFloat(yearTDPL)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop px-3 py-1 caption">Portfolio YTD %</td>
                                <td class="item_position-prop text-right px-3 py-1 caption">{{ formatPrice(parseFloat(portfolioTDPL)) }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-card color="#00121E" elevation="0" dark class="mt-3 pb-2" style="border: 1px solid #000">
                <v-card-title class="text-left justify-left py-2 px-3">
                    <h6 class="font-weight-regular caption text-capitalize" style="color:#fff;">Funds Transfers (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop px-3 py-1 caption">Deposits</td>
                                <td class="item_position-prop text-right px-3 py-1 caption">{{ formatPrice(parseFloat(Deposits)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop px-3 py-1 caption">Withdrawals</td>
                                <td class="item_position-prop text-right px-3 py-1 caption">{{ formatPrice(parseFloat(Withdrawals)) }}</td>
                            </tr>
                            <tr id="table_tr_snap-cont">
                                <td class="item_position-prop px-3 py-1 caption">Equity</td>
                                <td class="item_position-prop text-right px-3 py-1 caption">{{ formatPrice(parseFloat(Equity)) }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-col>
        <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
    </v-col>
</template>
<script>
import shareModal from '~/components/modals/share'

import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        shareModal
    },
    data () {
      return {
        showScheduleForm: false,
        startingCapital: 0,
        yearTDPL: 0,
        portfolioTDPL: 0,
        Deposits: 0,
        Withdrawals: 0,
        Equity: 0,
      }
    },
    computed: {
        ...mapGetters({
            defaultPortfolioId: "journal/getDefaultPortfolioId",
            renderPortfolioKey: "journal/getRenderPortfolioKey"
        })
    },
    methods: {
        getSnapshot() {
            const snapshotparams = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
                fund: this.defaultPortfolioId,
            };
            this.$api.journal.portfolio.snapshot(snapshotparams).then(response => {
                let snapshot = response.meta.snapshot
                this.startingCapital = snapshot.capital
                this.yearTDPL = snapshot.PL
                this.portfolioTDPL = snapshot.PL_percentage
                this.Deposits = snapshot.deposits
                this.Withdrawals = snapshot.withdraw
            });
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
    },
    watch: {
        renderPortfolioKey: function() {
            this.getSnapshot();
        },
        renderEditKey: function() {
            this.getSnapshot();
        }
    }
}
</script>
<style scoped>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6
}
</style>