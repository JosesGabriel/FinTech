<template>
    <v-col class="pt-10 mt-5" cols="12" sm="12" md="12">
            <v-tabs
            color="#48FFD5"
            background-color="transparent"
            dark
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-1`">Dashboard</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-2`">Tradelogs</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#tab-3`">Ledger</v-tab>
                <v-spacer></v-spacer>
                <v-col sm="3" md="2" class="pa-0">
                    <v-select
                    offset-y="true"
                    class="select_portfolio mt-2 success--text"
                    item-color="success"
                    append-icon="mdi-chevron-down"
                    background-color="#00FFC3"
                    label="Select Portfolio"
                    color="grey"
                    dense
                    solo
                    flat
                    light
                    :items="portfolioListPush"
                    v-on:change="changePortfolio"
                    v-model="portfolioDropdownModel"
                    item-text="name"
                    item-value="id"
                    return-object
                    :menu-props="{closeOnContentClick: true}"
                    >
                        <template v-slot:append-item>
                            <v-list-item @click="" class="sumportfolio_real mt-1">
                                <v-list-item-content>
                                    <v-list-item-title>Sum of Real Portfolio</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="">
                                <v-list-item-content>
                                    <v-list-item-title>Sum of Virtual Portfolio</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                            ripple
                            @click.stop="showCreatePortForm=true"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Create Portfolio <v-icon color="success" class="body-2">mdi-plus-circle-outline</v-icon></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-select>
                </v-col>
                <v-tab-item color="#48FFD5" background-color="black" :value="'tab-' + 1">
                    <v-container class="pa-0">
                        <div class="separator"></div>
                        <JournalLivePortfolio/>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <JournalPortfolioSnapshot/>
                            <JournalCurrentAllocation/>
                        </v-row>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <JournalEquityCurve/>
                        </v-row>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <JournalMonthlyPerfomance/>
                            <JournalTradeStats/>
                        </v-row>
                        <div class="component_spacer"></div>
                        <JournalStrategyStats/>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <JournalTopStocks/>
                        </v-row>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <JournalEmotionalStats/>
                        </v-row>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <JournalExpenseReport/>
                        </v-row>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <v-col class="pa-0" cols="6" sm="6" md="6">
                                <JournalBuyVolume/>
                            </v-col>
                            <v-col class="pa-0" cols="6" sm="6" md="6">
                                <JournalBuyValue/>
                            </v-col>
                        </v-row>
                        <div class="component_spacer"></div>
                        <v-row no-gutters>
                            <v-col class="pa-0" cols="4" sm="4" md="4">
                                <JournalPerformance/>
                            </v-col>
                            <v-col class="pa-0" cols="8" sm="8" md="8">
                                <JournalGrossPL/>
                            </v-col>
                        </v-row>
                        <div class="component_spacer"></div>
                    </v-container>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 2">
                    <v-container class="pa-0">
                        <div class="separator"></div>
                        <TradelogsContent/>
                    </v-container>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'tab-' + 3">
                    <v-container class="pa-0">
                        <div class="separator"></div>
                        <LedgerContent/>
                    </v-container>
                </v-tab-item>
            </v-tabs>
            <create-modal :visible="showCreatePortForm" @close="showCreatePortForm=false" />
            <!-- <ChartTesting/> -->
    </v-col>
</template>
<script>
//Dashboard tab
import JournalLivePortfolio from "~/components/journal/dashboard/JournalLivePortfolio";
import JournalPortfolioSnapshot from "~/components/journal/dashboard/JournalPortfolioSnapshot";
import JournalCurrentAllocation from "~/components/journal/dashboard/JournalCurrentAllocation";
import JournalMonthlyPerfomance from "~/components/journal/dashboard/JournalMonthlyPerfomance";
import JournalTradeStats from "~/components/journal/dashboard/JournalTradeStats";
import JournalEquityCurve from "~/components/journal/dashboard/JournalEquityCurve";
import JournalStrategyStats from "~/components/journal/dashboard/JournalStrategyStats";
import JournalTopStocks from "~/components/journal/dashboard/JournalTopStocks";
import JournalEmotionalStats from "~/components/journal/dashboard/JournalEmotionalStats";
import JournalExpenseReport from "~/components/journal/dashboard/JournalExpenseReport";
import JournalBuyVolume from "~/components/journal/dashboard/JournalBuyVolume";
import JournalBuyValue from "~/components/journal/dashboard/JournalBuyValue";
import JournalPerformance from "~/components/journal/dashboard/JournalPerformance";
import JournalGrossPL from "~/components/journal/dashboard/JournalGrossPL";

//Ledger tab
import TradelogsContent from "~/components/journal/tradelogs/contents";

//Ledger tab
import LedgerContent from "~/components/journal/ledger/LedgerContent";
import createModal from '~/components/journal/dashboard/JournalCreatePortfolio'

import { mapActions, mapGetters } from "vuex";

export default {
    layout: "main",
    components: {
        //Dashboard tab
        JournalLivePortfolio,
        JournalPortfolioSnapshot,
        JournalCurrentAllocation,
        JournalMonthlyPerfomance,
        JournalTradeStats,
        JournalEquityCurve,
        JournalStrategyStats,
        JournalTopStocks,
        JournalEmotionalStats,
        JournalExpenseReport,
        JournalBuyVolume,
        JournalBuyValue,
        JournalPerformance,
        JournalGrossPL,
        //Ledger tab
        TradelogsContent,
        //Ledger tab
        LedgerContent,
        createModal
    },
    data() {
        return {
            tab: null,
            tabs: 3,
            portfolioListPush: [],
            portfolioDropdownModel: null,
            selectedProfile: null,
            showCreatePortForm: false,
            componentKey: 0,
            showSelect: false
        }
    },
    mounted() {
        if (localStorage.currentProfile) this.selectedProfile = localStorage.currentProfile;
        const openparams = {
            user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
            fund: this.selectedProfile,
        };
        this.$api.journal.portfolio.open(openparams).then(
            function(result) {
            }.bind(this)
        );
        if( this.portfolio == 0) {
            this.showCreatePortForm = true
        };
        this.getUserPortfolioList();
        // console.log(this.defaultPortfolioId)
        // console.log(this.userPortfolio)
    },
    methods: {
        ...mapActions({
            setUserPortfolio: "journal/setUserPortfolio",
            setRenderPortfolioKey: "journal/setRenderPortfolioKey",
            setDefaultPortfolioId: "journal/setDefaultPortfolioId",
        }),
        changePortfolio: function(){
            const openparams = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
                fund: this.selectedProfile,
            };
            this.$api.journal.portfolio.open(openparams).then(
                function(result) {
                    if(result.success) {
                        this.keyCreateCounter = this.renderPortfolioKey;
                        this.keyCreateCounter++;
                        this.setRenderPortfolioKey(this.keyCreateCounter);
                        
                        this.selectedProfile = this.portfolioDropdownModel.id;
                        this.setDefaultPortfolioId(this.selectedProfile);
                    }
                }.bind(this)
            );
        },
        getUserPortfolioList() {
            const params = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
            };
            this.$api.journal.portfolio.portfolio(params).then(
                function(result) {
                    this.portfolioList = result.meta.logs;
                    this.portfolioList = this.portfolioList.reverse();
                    this.setUserPortfolio(result.meta.logs);
                    // this.setDefaultPortfolioId(this.portfolioList[0].id);
                    this.portfolioListPush = []
                    if(this.portfolioList.length != 0) {
                        this.portfolioListPush.push({header: 'Real Portfolio'});
                        const toFindReal = "real" // what we want to count
                        for (let i = 0; i < this.portfolioList.length; i++ ) {
                            let portfolioListPush1 = this.portfolioList[i]
                            if (portfolioListPush1.type === toFindReal) {
                                this.portfolioListPush.push(portfolioListPush1);
                            }
                        }
                    }
                    if(this.portfolioList.length != 0) {
                        
                        this.portfolioListPush.push({ divider: true });
                        this.portfolioListPush.push({header: 'Virtual Portfolio'});
                        const toFindVirtual = "virtual" // what we want to count
                        for (let i = 0; i < this.portfolioList.length; i++ ) {
                            let portfolioListPush2 = this.portfolioList[i]
                            if (portfolioListPush2.type === toFindVirtual) {
                                this.portfolioListPush.push(portfolioListPush2);
                            }
                        }
                    }
                }.bind(this)
            );
            this.componentKey++;
        }
    },
    computed: {
        ...mapGetters({
            userPortfolio: "journal/getUserPortfolio",
            defaultPortfolioId: "journal/getDefaultPortfolioId",
            renderPortfolioKey: "journal/getRenderPortfolioKey"
        })
    },
    watch: {
        renderPortfolioKey: function() {
            this.getUserPortfolioList();
        }
    },
};
</script>
<style scoped>
    .component_spacer {
        height: 50px;
    }
    .sumportfolio_real {
        border-top: 1px solid;
    }
</style>
<style>
    /* .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: #00FFC3;
    } */
    .theme--light.v-list {
        background: #00121e;
        border: 1px solid #00FFC3;
    }
    .v-window.v-item-group.theme--light.v-tabs-items {
    background: none;
    }
    /* .v-slide-group__content.v-tabs-bar__content:before {
    content: "";
    width: 100%;
    position: absolute;
    bottom: -3px;
    z-index: 1;
    height: 4px;
    background: #000;
    } */
    .rtf_top-btn.v-btn--outlined:hover,
    .rtf_top-btn.v-btn--outlined:active,
    .rtf_top-btn.v-btn--outlined:focus {
    background-color: #48ffd5;
    border: 2px solid #48ffd5;
    color: #00121e !important;
    font-weight: 600 !important;
    }
    .rtf_top-btn.v-btn--outlined {
    letter-spacing: 0.1px !important;
    }

    .navbarDrawer__card-journal .v-navigation-drawer__border {
    background: #000 !important;
    }
    /* .tab_menu-top:not(.v-tab--active):not(.v-tab--disabled) {
        opacity: 1 !important;
        color: #fff !important;
    } */
    .apexcharts-tooltip-series-group {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5) !important;
    }
    .apexcharts-svg {
    /* overflow: visible !important; */
    }
    #table_tr_port-cont:hover {
    background: rgb(9, 26, 43);
    }
    #table_td_port-cont {
    border: none;
    cursor: pointer;
    }
    #table_head_tr_port-cont {
    border: none;
    }
    #table_tr_snap-cont:hover {
    background: rgb(9, 26, 43);
    }
    #table_td_snap-cont {
    border: none;
    cursor: pointer;
    }
    #table_head_tr_snap-cont {
    border: none;
    }
    .select_portfolio .v-label {
        font-size: 14px;
        font-weight: 600
    }
    .select_portfolio .v-select__selection--comma {
        color: black;
        font-size: 14px;
        font-weight: 600
    }
    .select_portfolio .v-select__slot .v-label,
    .select_portfolio .v-select__slot .v-icon {
        color: black !important;
    }
    .select_portfolio .v-input__slot {
        margin: 0;
    }
    .select_portfolio .v-input__control {
        min-height: auto !important;
        border-radius: unset
    }
    .apexcharts-tooltip {
        box-shadow: none;
    }
    span.apexcharts-tooltip-text-label {
        display: none;
    }

    .v-subheader.theme--light {
        color: #b6b6b6;
        font-weight: 600;
        padding-left: 16px;
    }
    .theme--light.v-divider {
        border-color: rgb(0, 215, 164);
    }
</style>
