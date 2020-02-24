<template>
    <v-dialog v-model="show" max-width="350px">
        <v-card :dark="lightSwitch == true">
            <v-card-title class="text-left justify-left pa-3 px-5 success--text subtitle-1">DELETE PORTFOLIO</v-card-title>
            <v-divider></v-divider>
            <v-container class="px-8">
                <v-card-title 
                    class="text-left justify-left pa-0 secondary--text body-2"
                    :style="{color: toggleFontColor }" 
                >Select Portfolio</v-card-title>
                <v-select
                        offset-y="true"
                        class="select_portfolio black--text text-uppercase"
                        item-color="success"
                        append-icon="mdi-chevron-down"
                        item-text="name"
                        item-value="id"
                        :items="portfolio"
                        v-model="GetSelectStock"
                        :dark="lightSwitch == true"    
                        background-color="success"
                        dense
                        solo
                    >
                        <template slot="item" slot-scope="data">
                        <v-list-item-content
                            :dark="lightSwitch == true"
                            :style="{ background: primaryBackground }"
                            style="padding: 12px 12px; margin: -16px;"
                        >
                            <v-list-item-title 
                            :dark="lightSwitch == true"
                            v-html="data.item.name" 
                            :style="{ color: toggleFontColor }"
                            class="text-uppercase"></v-list-item-title>
                        </v-list-item-content>
                        </template>


                </v-select>
            </v-container>
            <v-card-actions class="pa-3">
                <v-spacer></v-spacer>
                <v-btn
                   :dark="lightSwitch == true"
                    class="text-capitalize"
                    text
                    light
                    @click.stop="show=false"
                    >Close</v-btn
                >
                <v-btn
                    color="success"
                    class="text-capitalize"
                    depressed
                    light
                    :disabled="(GetSelectStock != '' ? false : true )"
                    @click="confirmDelete=true"
                    >
                        <span style="color: black;"> Delete</span>
                    </v-btn
                >
            </v-card-actions>
        </v-card>
        <v-dialog v-model="confirmDelete" max-width="400px">
                <v-card :dark="lightSwitch == true">
                <v-card-title
                    class="text-center justify-left pa-4 success--text text-capitalize subtitle-1 font-weight-bold"
                >Delete Confirmation</v-card-title>
                <v-card-title
                    class="text-center justify-left pa-0 px-5 subtitle-2 font-weight-thin"
                >Are you sure you want to delete this Portfolio?</v-card-title>
                <v-container class="px-5">
                    <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        class="text-capitalize mt-2"
                        depressed
                        text
                        :dark="lightSwitch == true"
                        light
                        @click.stop="confirmDelete = false"
                    >Cancel</v-btn>
                    <v-btn
                        color="success"
                        class="ml-1 text-capitalize mt-2 black--text"
                        depressed
                        light
                        @click="deletePortfolio()"
                        @click.stop="confirmDelete = false, show=false"
                    >Delete</v-btn>
                    </v-row>
                </v-container>
                </v-card>
            </v-dialog>
    </v-dialog>
    
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    props: ['visible'],
    computed: {
        ...mapGetters({
            simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            lightSwitch: "global/getLightSwitch"
        }),
        toggleFontColor() {
            return this.lightSwitch == 0
                ? "#000000 !important"
                : "#ffffff !important";
            },
        primaryBackground() {
            return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
            },
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                this.$emit('close')
                }
            }
        },
    },
    data: () => ({
        portfolio: [],
        saveButtonDisable: true,     
        namePortfolioModel: "",
        initialCapitalModel: null,
        typePortfolioModel: null,
        keyCreateCounter: 2,
        GetSelectStock: '',
        confirmDelete: false,
    }),
    watch: {
         simulatorPortfolioID() {
             this.getPorfolio();
         }
    },
    methods: {
        ...mapActions({
            setRenderPortfolioKey: "journal/setRenderPortfolioKey",
            setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID"
        }),
        
        /**
         * Initialized Portfolio ID
         *
         */
        getPorfolio(){
            let num = 0;
            this.$api.journal.portfolio.portfolio().then(
            function(result) {             
                for (let i = 0; i < result.data.logs.length; i++) {
                if (
                    result.data.logs[i].type == "virtual"
                ) {
                    if (result.data.logs[i].name != "My Virtual Portfolio") {
                        let portfolio_params = {
                            name: result.data.logs[i].name,
                            id: result.data.logs[i].id + '|' + i,
                            capital: result.data.logs[i].capital
                            };
                            this.portfolio.push(portfolio_params);
                        }
                  }
                }
               
            }.bind(this)
            );
        },
        deletePortfolio() {
                console.log('Delete ID -' + this.GetSelectStock);
                let index = this.GetSelectStock.split('|')[1];
                const fund_id = this.GetSelectStock.split('|')[0];
                this.$api.journal.portfolio.deleteportfolio(fund_id).then(response => {
                if (response.success) {
                    this.$emit("DeleteConfirm", index);
                    this.portfolio.splice(index);
                    console.log('Delete Confirmed.');
                }
            });
        }
    },
     mounted() {
            this.getPorfolio();       
    },
}
</script>
<style>
    .portfolio_type .v-select__slot .v-label,
    .portfolio_type .v-select__slot .v-icon {
        color: #03DAC5 !important;
    }
    .portfolio_type .v-input__slot {
        margin: 0;
    }
    .portfolio_type .v-select__selection--comma {
        color: #03DAC5;
        font-size: 14px;
    }
    .portfolio_type .v-input__control {
        min-height: auto !important;
    }
    .portfolio_type-font-size .v-label {
        font-size: 14px
    }
</style>
