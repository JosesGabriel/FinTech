<template>
    <v-container class="pa-0">
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <v-card-title class="text-left justify-left px-0 pb-2 pt-5" style="border-bottom: 1px solid #000">
                <h6 class="font-weight-regular subtitle-2" style="color:#fff;">TOP STOCKS</h6>
                <v-spacer></v-spacer>
                <v-btn icon small @click.stop="showScheduleForm=true"> 
                    <img src="/icon/journal-icons/share-icon.svg" width="15">
                </v-btn>
            </v-card-title>
            <v-row no-gutters class="pt-3">
                <v-col class="pa-0" cols="6" sm="6" md="6">
                    <JournalLossers  :negaArr="negaArr"/>
                </v-col>
                <v-col class="pa-0" cols="6" sm="6" md="6">
                    <JournalWinners :posArr="posArr"/>
                </v-col>
            </v-row>
            <share-modal :visible="showScheduleForm" @close="showScheduleForm=false" />
        </v-col>
    </v-container>
</template>
<script>
import JournalLossers from '~/components/journal/dashboard/JournalLossers'
import JournalWinners from '~/components/journal/dashboard/JournalWinners'
import shareModal from '~/components/modals/share'

import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        JournalLossers,
        JournalWinners,
        shareModal
    },
    data () {
        return {
            showScheduleForm: false,
            topStock: null,
            topStockArr: [],
            posArr: [],
            negaArr: [],
        }
    },
    computed: {
        ...mapGetters({
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            defaultPortfolioId: "journal/getDefaultPortfolioId",
        }),
    },
    methods: {
        getTopStocks(){
            // this.topStockArr = []
            // const journalchartsparams = {
            //     user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
            //     fund: this.defaultPortfolioId,
            // };
            // this.$api.journal.portfolio.journalcharts(journalchartsparams).then(
            //     function(result) {
            //         if(result.success){
            //             this.topStock = [result.meta.top_stocks]
                        
            //             for (let [key, value] of Object.entries(this.topStock[0])) {
            //                 let arr = `${value}`
            //                 let arr_name = `${key}`

            //                 this.topStockArr.push({key: arr_name, value: parseFloat(arr)})
            //             }
            //             for (let i = 0; i < this.topStockArr.length; i++) {
            //                 let toSeparate = this.topStockArr[i]

            //                 const params = {
            //                     "symbol-id": this.topStockArr[i].key
            //                 };
            //                 this.$api.chart.stocks.list(params).then(response => {
            //                         this.topStockArr[i].key = response.data.symbol
            //                     }
            //                 );

            //                 if(toSeparate.value >= 0 ) {
            //                     this.posArr.push(this.topStockArr[i])
            //                 } else if(toSeparate.value < 0 ) {
            //                     this.negaArr.push(this.topStockArr[i])
            //                 }
            //             }
            //             // console.log(this.posArr, "pos")
            //             // console.log(this.negaArr, "nega")
            //             // console.log(this.topStockArr)
            //             // var resWin = Math.max.apply(Math,this.topStock.map(function(o){return o.win;}))
            //             // var objWin = this.data_highest_value.find(function(o){ return o.win == resWin; })

            //         }
            //     }.bind(this)
            // )
            
            // this.componentKeys++;
        }
    },
    watch: {
        renderPortfolioKey: function() {
            this.getTopStocks();
        }
    },
    mounted() {
      this.getTopStocks();
    }
}
</script>