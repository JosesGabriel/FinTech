
<template>
    <v-dialog v-model="show" max-width="450px">
        <v-card color="#00121E">
            <v-card-title class="text-center justify-center px-5 pt-10">
                <h1 class="font-weight-regular body-1" style="color:#fff;">This action is final and cannot be undone.<br>Give me <span style="color:#00FFC3;">HELL YEAH</span> to confirm.</h1>
            </v-card-title>
            <v-card color="transparent" class="d-flex justify-center" elevation="0">
            </v-card>
            <v-container class="pb-0">
                <v-row>
                    <v-col class="px-8 pb-0" cols="12" sm="12" md="12">
                        <v-text-field
                            label="Solo"
                            placeholder="HELL YEAH"
                            v-model="confirmResetModel"
                            solo
                            dark
                            class="align-center justify-center headline font-weight-regular text-center white--text confirmation_message-reset"
                            background-color="#000"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-col class="pa-0 pt-3" cols="12" sm="12" md="12">
                <v-row no-gutters>
                    <v-col class="pa-0" cols="5" sm="5" md="5" @click.stop="show=false">
                        <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-reset-ok">
                            <h1 class="font-weight-regular body-1" style="color:#00080E;">I THINK NOT</h1>
                        </v-card-title>
                    </v-col>
                    <v-col class="pa-0" cols="7" sm="7" md="7" @click.stop="show=false" @click="resetNow">
                        <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-reset-not">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">I UNDERSTAND, DO IT</h1>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-col>

            <!-- <v-card-actions>
            <v-btn color="primary" @click.stop="show=false">Close</v-btn>
            </v-card-actions> -->
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters({
        defaultPortfolioId: "journal/getDefaultPortfolioId",
        renderPortfolioKey: "journal/getRenderPortfolioKey"
    }),
  },
  data() {
    return {
        confirmResetModel: null
    }
  },
  mounted() {
    //   console.log(this.defaultPortfolioId)
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    resetNow() {
        if(this.confirmResetModel == "HELL YEAH" || this.defaultPortfolioId != null) {
            const resetparams  = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58"
            };
            this.$axios
            .$post("https://dev-api.arbitrage.ph/api/journal/funds/"+this.defaultPortfolioId+"/reset",resetparams)
            .then(response => {
                if (response.success) {
                    this.keyCreateCounter = this.renderPortfolioKey;
                    this.keyCreateCounter++;
                    this.setRenderPortfolioKey(this.keyCreateCounter);
                }
            });
        }
    }
  }
}
</script>
<style>
    .confirmation_message-reset input {
        text-align: center;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
    .confirmation_button-reset-ok {
        background: #00FFC3;
    }
    .confirmation_button-reset-not {
        background: #00080E;
    }
    .confirmation_button-reset-ok:hover {
        background: #00FFC3;
        cursor: pointer;
    }
    .confirmation_button-reset-not:hover {
        background: #00FFC3;
        cursor: pointer;
    }
    .confirmation_button-reset-ok:hover h1,
    .confirmation_button-reset-not:hover h1 {
        color: #00080E !important;
    }
</style>