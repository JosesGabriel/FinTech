<template>
    <v-dialog v-model="show" max-width="350px">
        <v-card :dark="lightSwitch == true" >
            <v-card-title class="text-left justify-left pa-3 px-5 success--text subtitle-1">CREATE PORTFOLIO</v-card-title>
            <v-divider></v-divider>
            <v-container class="px-8 py-6">

                <v-text-field
                    v-model="namePortfolioModel"
                    color="success"
                    :dark="lightSwitch == true"
                    class="stock_selector pa-0 pb-5 font-weight-bold body-2 white--text"
                    label="Enter Portfolio Name"
                ></v-text-field>

                <v-text-field
                    v-model="initialCapitalModel"
                    color="success"
                    :dark="lightSwitch == true"
                    class="stock_selector pa-0 pb-5 font-weight-bold body-2 white--text"
                    label="Initial Capital"
                ></v-text-field>
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
                    :dark="lightSwitch == true"
                    :disabled="(!saveButtonDisable && namePortfolioModel != '' ? false : true)"
                    @click.stop="show=false"
                    @click="createPortfolio()"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    props: ['visible'],
    computed: {
        ...mapGetters({
            renderPortfolioKey: "journal/getRenderPortfolioKey",
            lightSwitch: "global/getLightSwitch"
        }),
        toggleFontColor() {
            return this.lightSwitch == 0
                ? "#000000 !important"
                : "#ffffff !important";
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
        portfolio: ['Real Portfolio','Virtual Portfolio'],
        saveButtonDisable: true,     
        namePortfolioModel: "",
        initialCapitalModel: null,
        typePortfolioModel: null,
        keyCreateCounter: 2
    }),
    watch: {
        namePortfolioModel() {
            this.fieldsWatch();
        },
        initialCapitalModel(newValue) {
           this.fieldsWatch();
            const result = newValue
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.initialCapitalModel = result;
        },
        typePortfolioModel() {
            this.fieldsWatch();
        }
    },
    methods: {
        ...mapActions({
            setRenderPortfolioKey: "journal/setRenderPortfolioKey",
            setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID"
        }),
        /**
         * Input field validation
         *
         */
        fieldsWatch() {
            if ( this.typePortfolioModel != "" || this.initialCapital != "" || this.namePortfolioModel != "" ) {
                this.saveButtonDisable = false;
                } else {
               // this.saveButtonDisable = true;
            }
            let n = parseFloat(this.initialCapitalModel);
            if(isNaN(n)){
                this.saveButtonDisable = true;
            }else{
                this.saveButtonDisable = false;
            }
        },
        /**
         * Create Virtual Portfolio
         *
         */
        createPortfolio(){
             let convertedNumbers = this.initialCapitalModel.replace(/,/g, "");
            const createportfolioparams = {
               
                currency_code: "PHP",
                name: this.namePortfolioModel,
                description: "My Virtual Portfolio",
                type: "virtual",
                balance: parseInt(convertedNumbers)
            };
            
            this.$api.journal.portfolio.createportfolio(createportfolioparams).then(
                function(result) {
                    if (result.success) {
                        this.getPorfolio();
                        this.keyCreateCounter = this.renderPortfolioKey;
                        this.keyCreateCounter++;
                        this.setRenderPortfolioKey(this.keyCreateCounter);                
                    }
                }.bind(this)
            );
        },
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
                    if(this.namePortfolioModel == result.data.logs[i].name){
                        this.setSimulatorPortfolioID(result.data.logs[i].id); 
                    }                               
                  }
                }
               
            }.bind(this)
            );
        }
    },
     mounted() {
                 
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
