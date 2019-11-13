<template>
    <v-dialog v-model="show" max-width="350px">
        <v-card color="#00121E">
            <v-card-title class="text-left justify-left pa-3 px-5 success--text subtitle-1">CREATE PORTFOLIO</v-card-title>
            <v-container class="px-8">
                <v-card-title class="text-left justify-left px-0 secondary--text body-2">Enter Portfolio Name</v-card-title>
                <v-text-field
                    v-model="takeProfitModel"
                    color="success"
                    dark
                    class="stock_selector pa-0 pb-5 font-weight-bold body-2 white--text"
                ></v-text-field>
                <v-card-title class="text-left justify-left px-0 secondary--text body-2">Initial Capital</v-card-title>
                <v-text-field
                    v-model="entryPriceModel"
                    color="success"
                    dark
                    class="stock_selector pa-0 pb-5 font-weight-bold body-2 white--text"
                ></v-text-field>
                <v-select
                    v-model="stocksDropdownModel"
                    :items="portfolio"
                    label="Fund Source"
                    color="success"
                    item-color="success"
                    dense
                    dark
                    append-icon="mdi-chevron-down"
                ></v-select>
            </v-container>
            <v-card-actions class="pa-3">
                <v-spacer></v-spacer>
                <v-btn
                    color="white"
                    class="text-capitalize"
                    text
                    light
                    @click.stop="show=false"
                    >Close</v-btn
                >
                <v-btn
                    color="#48FFD5"
                    class="text-capitalize"
                    depressed
                    light
                    :disabled="saveButtonDisable"
                    @click.stop="show=false"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['visible'],
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
        },
    },
    data: () => ({
        portfolio: ['Real Portfolio','Virtual Portfolio'],
        saveButtonDisable: true,     
        entryPriceModel: "",
        takeProfitModel: "",
        stocksDropdownModel: "",
    }),
    watch: {
        entryPriceModel: function() {
            this.fieldsWatch();
        },
        takeProfitModel: function() {
            this.fieldsWatch();
        }
    },
    methods: {
        fieldsWatch() {
            if ( this.stocksDropdownModel != "" || this.entryPriceModel != "" || this.takeProfitModel != "" ) {
                this.saveButtonDisable = false;
                } else {
                this.saveButtonDisable = true;
            }
        },
    }
}
</script>
<style>
    .portfolio_type .v-select__slot .v-label,
    .portfolio_type .v-select__slot .v-icon {
        color: #00FFC3 !important;
    }
    .portfolio_type .v-input__slot {
        margin: 0;
    }
    .portfolio_type .v-select__selection--comma {
        color: #00FFC3;
        font-size: 14px;
    }
    .portfolio_type .v-input__control {
        min-height: auto !important;
    }
    .portfolio_type-font-size .v-label {
        font-size: 14px
    }
</style>