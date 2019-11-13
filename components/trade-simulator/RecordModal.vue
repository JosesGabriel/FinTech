<template>
    <v-dialog v-model="show" max-width="320px">
            <v-card color="#00121E">       
                <v-stepper v-model="e1" style="background:#142b46;">

                    <v-stepper-header>
                        <v-row>
                            <v-col class="ml-3" style="color:#00ffc3;">
                                RECORD
                            </v-col>
                        </v-row>
                       <!-- <v-stepper-step :complete="e1 > 1" step="1">Bought</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2">Sold</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">Strategy</v-stepper-step>-->
                    </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card
                        class="mb-1"
                        color="grey lighten-1"
                        
                        >
                            <v-row>
                                <v-col md="12" class="mt-0 mb-0 pt-0 pb-0 text-center" style="color:white;">
                                    BOUGHT
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                        <v-dialog
                                            ref="dialog"
                                            v-model="modal"
                                            :return-value.sync="date"
                                            persistent
                                            width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="date"
                                                label="Date"
                                                readonly
                                                append-icon="mdi-chevron-down"
                                                v-on="on"
                                            ><v-card-text class="pa-0" v-html="date"></v-card-text>
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" color="#00121e" dark scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                        </v-dialog>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                    <v-select
                                    label="Stock Code"
                                    :items="stockList"
                                    item-text="symbol"
                                    item-value="id_str"
                                    append-icon="mdi-chevron-down"
                                    dark
                                    standard-
                                    color="success"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                    <v-text-field
                                        label="Price"
                                        dense
                                        dark
                                        type="number"
                                        color="success"
                                        ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                    <v-text-field
                                        label="Quantity"
                                        dense
                                        dark
                                        type="number"
                                        color="success"
                                        ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col md="6" class="pt-0 pb-3" style="color:white;">
                                   Total
                                </v-col>
                                <v-col md="6" class="text-right pt-0 pb-3" style="color:white;">
                                   0.00
                                </v-col>
                            </v-row>
                              
                        </v-card>
                        <v-row>
                            <v-col md="12" class="text-right">
                                <v-btn text @click.stop="show=false" >Cancel</v-btn>

                                <v-btn
                                    color="primary"
                                    @click="e1 = 2"
                                    class="mr-3"
                                    >
                                Continue
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card
                        class="mb-1"
                        color="grey lighten-1"
                        
                        >
                            <v-row>
                                <v-col md="12" class="mt-0 mb-0 pt-0 pb-0 text-center" style="color:white;">
                                    SOLD
                                </v-col>
                            </v-row>
                                <v-row class="mx-3">
                                    <v-col cols="12" class="pt-0 pb-0">
                                            <v-dialog
                                                ref="dialog"
                                                v-model="modal"
                                                :return-value.sync="date"
                                                persistent
                                                width="290px"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="date"
                                                    label="Date"
                                                    readonly
                                                    append-icon="mdi-chevron-down"
                                                    v-on="on"
                                                ><v-card-text class="pa-0" v-html="date"></v-card-text>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" color="#00121e" dark scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                            </v-date-picker>
                                            </v-dialog>
                                    </v-col>
                                </v-row>
                                <v-row class="mx-3">
                                    <v-col cols="12" class="pt-0 pb-0">
                                        <v-text-field
                                            label="Price"
                                            dense
                                            dark
                                            type="number"
                                            color="success"
                                            ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="mx-3">
                                    <v-col cols="12" class="pt-0 pb-0">
                                        <v-text-field
                                            label="Quantity"
                                            dense
                                            dark
                                            type="number"
                                            color="success"
                                            ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="mx-3">
                                    <v-col md="6" class="pt-0 pb-3" style="color:white;">
                                    Total
                                    </v-col>
                                    <v-col md="6" class="text-right pt-0 pb-3" style="color:white;">
                                    0.00
                                    </v-col>
                                </v-row>
                                 <v-row class="mx-3">
                                    <v-col md="6" class="pt-0 pb-3" style="color:white;">
                                    Profit/Loss
                                    </v-col>
                                    <v-col md="6" class="text-right pt-0 pb-3" style="color:white;">
                                    0.00
                                    </v-col>
                                </v-row>
                        
                        </v-card>

                        <v-row>
                            <v-col md="12" class="text-right">
                                <v-btn text @click="e1 = 1" >Back</v-btn>

                                <v-btn
                                    color="primary"
                                    @click="e1 = 3"
                                    class="mr-3"
                                    >
                                Continue
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card
                        class="mb-1"
                        color="grey lighten-1"
                        
                        >
                            <v-row>
                                <v-col md="12" class="mt-0 mb-0 pt-0 pb-0 text-center" style="color:white;">
                                    
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                    <v-select
                                    label="Strategy"
                                    append-icon="mdi-chevron-down"
                                    dark
                                    standard-
                                    color="success"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                    <v-select
                                    label="Trade plan"
                                    append-icon="mdi-chevron-down"
                                    dark
                                    standard-
                                    color="success"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                    <v-select
                                    label="Emotion"
                                    append-icon="mdi-chevron-down"
                                    dark
                                    standard-
                                    color="success"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-3">
                                <v-col cols="12" class="pt-0 pb-0">
                                   <v-textarea
                                        name="input-7-1"
                                        label="Notes"
                                        ></v-textarea>
                                </v-col>
                            </v-row>
                        
                        </v-card>

                        <v-row>
                            <v-col md="12" class="text-right">
                                <v-btn text @click="e1 = 2" >Back</v-btn>

                                <v-btn
                                    color="primary"
                                    @click=""
                                    class="mr-3"
                                    >
                                Record
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
           
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props: ['visible'],
    components: {
        
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
            e1: 0,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
        }
    }
}
</script>
<style>
.theme--light.v-label {
    color: rgba(249, 243, 243, 0.54);
}
.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
    color: white;
}
.v-stepper__header {
    height: 50px;
    box-shadow: unset;
}
.v-stepper__content {
    padding: 0px 10px 10px 10px;
}
.v-application .grey.lighten-1 {
    background-color: #142b46 !important;
    border-color: unset !important;
}
.v-card {
    box-shadow: unset;
}
  
</style>