
<template>
    <v-dialog v-model="show" max-width="350px">
        <v-card color="#00121E">
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            dark
            grow
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-1`">Deposit</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-2`">Withdraw</v-tab>

                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 1">
                    <JournalDeposit/>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 2">
                </v-tab-item>
            </v-tabs>
            <v-col class="pa-0 pt-3" cols="12" sm="12" md="12">
                <v-row no-gutters>
                    <v-col class="pa-0" cols="6" sm="6" md="6" @click.stop="show=false">
                        <v-card-title class="text-center justify-center px-5 py-5 confirmation_button-reset-ok">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">Cancel</h1>
                        </v-card-title>
                    </v-col>
                    <v-col class="pa-0" cols="6" sm="6" md="6" @click.stop="show=false">
                        <v-card-title class="text-center justify-center px-5 py-5 confirmation_button-reset-not">
                            <h1 class="font-weight-regular body-1" style="color:#00FFC3;">Confirm</h1>
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
import JournalDeposit from '~/components/journal/dashboard/JournalDeposit'

export default {
    components: {
        JournalDeposit
    },
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
    }
  }
}
</script>
<style>
    .confirmation_button-reset-ok,
    .confirmation_button-reset-not {
        background: #00080E;
    }
    .confirmation_button-reset-ok:hover,
    .confirmation_button-reset-not:hover {
        background: #00FFC3;
        cursor: pointer;
    }
    .confirmation_button-reset-ok:hover h1,
    .confirmation_button-reset-not:hover h1 {
        color: #00080E !important;
    }
</style>