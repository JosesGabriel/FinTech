<template>
  <v-content>
  
   <!-- <span class="mx-3 mb-3 body-2 _backBtn" style="float:right;" @click="setShowBrokers(true)">Back</span>-->
    <v-row class="ma-0 mt-4 pa-0">
      <v-col class="col___left col-12 pa-0">
        <v-container class="d-flex flex-row pa-0">

    <v-tabs
      color="success"
      background-color="transparent"
      :dark="lightSwitch == true"
      class="my-0 ml-4 py-0 paperTab"
    >
      <v-tab           
        class="tab_menu-top text-capitalize"
        :dark="lightSwitch == true"
        :href="`#tab-1`"
      >Buy</v-tab>
      <v-tab
        class="tab_menu-top text-capitalize"
        :dark="lightSwitch == true"
        :href="`#tab-2`"  
      >Sell</v-tab>

      <v-row>
        <v-col cols="6" class="pr-0 mr-0" style="text-align:center;">
          <v-radio-group 
            :dark="lightSwitch == true"
            dense 
            v-model="row" 
            class="mt-0 pt-0 pr-0 mr-0"
            style="float: right;"
            row>
            <v-radio disabled :dark="lightSwitch == true" label="GTC" value="radio-1"></v-radio>
            <v-radio :dark="lightSwitch == true" label="Day(default)" value="radio-2"></v-radio>
            <v-radio disabled :dark="lightSwitch == true" label="GTD" value="radio-3"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6" class="mt-0 pt-0">

              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
                :dark="lightSwitch == true"
                :style="{ background: cardBackground }"
                class="mt-0 pt-0"
              >
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text class="px-0 mt-0 pt-0" color="success">
                    <v-text-field
                      label="mm/dd/yy"
                      solo
                      dense
                      background-color="transparent"
                      outlined
                      v-model="computedDateFormatted"
                    ></v-text-field>
                  </v-btn>
                </template>
                <v-date-picker
                  v-model="date"
                  color="#00121e"
                  :dark="lightSwitch == true"
                  :style="{ background: cardBackground }"
                  class="datepicker-container"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="success" @click="modal = false">Cancel</v-btn>
                  <v-btn text color="success" @click.stop="modal = false" @click="$refs.dialog.save(date)">Confirm</v-btn>
                </v-date-picker>
             </v-dialog>
               <span 
                style="font-size:14px;float:right;padding-top: 16px;"   
                :style="{ color: toggleFontColor }"   
                >Broker: Paper Trade</span>
        </v-col>
      </v-row>

      <v-tab-item
        dark
        color="success"
        background-color="black"
        :value="'tab-' + 1"
        :style="(this.lightSwitch == 0 ? 'background:transparent; border-top: 1px solid #dadada' : 'background:transparent; border-top: 1px solid #172431')"
      >
        <v-container class="pa-0">
          <BuyTab  
            :BuyDate="computedDateFormatted"     
          />
        </v-container>
      </v-tab-item>
      <v-tab-item
        dark
        color="success"
        background-color="transparent"
        :value="'tab-' + 2"
        :style="(this.lightSwitch == 0 ? 'background:transparent; border-top: 1px solid #b6b6b6' : 'background:transparent; border-top: 1px solid #535358')"
      >
        <v-container class="pa-0">
          <SellTab
            :SellDate="computedDateFormatted"
          />
        </v-container>
      </v-tab-item>
    </v-tabs>
        </v-container>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import BuyTab from "~/components/chart/table/trade/Buy";
import SellTab from "~/components/chart/table/trade/Sell";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TradeView",
  data: () => ({
    cardContent: [
      { id: 1, title: "Price", amount: "10,000.00", php: true },
      { id: 2, title: "Quantity", amount: "10,000", php: false },
      { id: 3, title: "Total", amount: "1,000,000.00", php: true }
    ],
    items: ["test 1", "test 2"],
    modal: false,
    date: new Date().toISOString().substr(0, 10),
    row: 'radio-2',
  }),
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Toggle between dark/light
     *
     * @return
     */
    cardBackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
    computedDateFormatted () {
        return this.formatDate(this.date)
      },
  },
  methods: {
    ...mapActions({
      setShowBrokers: "chart/setShowBrokers"
    }),
    formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
  },
   components: {
      BuyTab,
      SellTab
   },
};
</script>

<style scoped>
._backBtn:hover{
  cursor: pointer;
}
</style>
<style>
.paperTab > .v-tabs-bar {
 /* height: 30px;*/
}
.v-label {
    font-size: 14px;
  }
</style>
