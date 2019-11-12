
<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card color="#00121E">
            <v-card-title class="text-left justify-left pa-3 px-5 success--text subtitle-1 font-weight-bold">FUND</v-card-title>
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            class="px-7"
            dark
            grow
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-1`">Deposit</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-2`">Withdraw</v-tab>

                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 1">
                    <JournalDeposit/>
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 2">
                    <JournalWithdraw/>
                </v-tab-item>
            </v-tabs>
            <v-card-actions class="pa-5">
                <v-spacer></v-spacer>
                <v-btn
                    color="white"
                    class="text-capitalize"
                    text
                    @click.stop="show=false"
                    >Close</v-btn
                >
                <v-btn
                    color="#48FFD5"
                    class="text-capitalize"
                    depressed
                    light
                    @click.stop="show=false"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import JournalDeposit from '~/components/journal/dashboard/JournalDeposit'
import JournalWithdraw from '~/components/journal/dashboard/JournalWithdraw'

export default {
    components: {
        JournalDeposit,
        JournalWithdraw
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