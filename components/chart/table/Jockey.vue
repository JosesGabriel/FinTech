<template>
  <!-- hehhee -->
  <v-col class="pa-0 mt-3">
      <v-data-table
        :headers="headers"
        :items="jockey"
        class="data_table-container jockey_table"
        dense
        dark
        fixed-header
       
        hide-default-footer
        height="calc(100vh - 415px)"
        style="background:#00121e"
      >
      <template v-slot:item.broker_code="{ item }">
          <div class="ml-1">
               {{ item.broker_code }}
          </div>
          <div class="broker_desc mr-0 pr-0 ml-1">
             {{ item.broker_description }}
          </div>
      </template>
      <template v-slot:item.buy_volume="{ item }">
        <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ addcomma(item.buying.volume) }}</span>
      </template>
      <template v-slot:item.buy_avprice="{ item }">
        <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ addcomma(item.buying.average_price) }}</span>
      </template>
      <template v-slot:item.buy_value="{ item }">
        <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ addcomma(item.buying.value) }}</span>
      </template>
      <template v-slot:item.buy_mweight="{ item }">
         <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ item.buying.market_weight_percentage.toFixed(2) }}%</span>
      </template>
      <template v-slot:item.sell_volume="{ item }">
         <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ addcomma(item.selling.volume) }}</span>
      </template>
      <template v-slot:item.sell_avprice="{ item }">
         <span class="font-regular caption item_position-prop text-left px-1 py-0"> {{ addcomma(item.selling.average_price) }}</span>
      </template>
      <template v-slot:item.sell_value="{ item }">
          <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ addcomma(item.selling.value) }}</span>
      </template>
      <template v-slot:item.sell_mweight="{ item }">
         <span class="font-regular caption item_position-prop text-left px-1 py-0"> {{ item.selling.market_weight_percentage.toFixed(2) }}%</span>
      </template>
      <template v-slot:item.net_volume="{ item }">
        <span class="font-regular caption item_position-prop text-left px-1 py-0"> {{ addcomma(item.net.volume) }}</span>
      </template>
      <template v-slot:item.net_value="{ item }">
         <span class="font-regular caption item_position-prop text-left px-1 py-0">{{ addcomma(item.net.value) }}</span>
      </template>
        
     </v-data-table>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      headers: [
        { text: 'Broker', value: 'broker_code' , align: 'left', width: "20%"},
        { text: 'Volume', value: 'buy_volume', align: 'right' },
        { text: 'Ave. Price', value: 'buy_avprice', align: 'right' },
        { text: 'Value', value: 'buy_value', align: 'right' },
        { text: 'Market Weight', value: 'buy_mweight', align: 'right' },
        { text: 'Volume', value: 'sell_volume', align: 'right' },
        { text: 'Ave. Price', value: 'sell_avprice', align: 'right' },
        { text: 'Value', value: 'sell_value', align: 'right' },
        { text: 'Market Weight', value: 'sell_mweight', align: 'right' },
        { text: 'Net Volume', value: 'net_volume', align: 'right' },
        { text: 'Net Value', value: 'net_value', align: 'right' },
      ],
      jockey: []
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index"
    })
  },
  watch: {
    symbolid(symid) {
      //   console.log("time trade");
      //   console.log('stock id - '+symid);
      this.initJockey(symid);
    }
  },
  mounted() {
    this.$api.chart.stocks
      .brokersActivity({
        'symbol-id': "29235365118214144"
      })
      .then(response => {
         this.jockey = response.data;         
      });
  },
  methods: {
    addcomma(n, sep, decimals) {
          sep = sep || "."; // Default to period as decimal separator
          decimals = decimals || 2; // Default to 2 decimals
          return n.toLocaleString().split(sep)[0]
              + sep
              + n.toFixed(2).split(sep)[1];
      },
      initJockey(id){
        this.$api.chart.stocks
          .brokersActivity({
            'symbol-id': id
          })
          .then(response => {
            console.log('data response');
            this.jockey = response.data;         
          });
      }
  }
};
</script>
<style>
.jockey_table > .v-data-table__wrapper table thead tr th {
    background: #00121e !important;
}
.theme--light.v-tabs-items {
  background: none;
}
.positive {
  color: #00ffc3;
}
.negative {
  color: #fe4949;
}
.label {
  color: #a9a8a7;
}
.highest {
  background: #00ffc329;
}
.buying:hover {
  cursor: pointer;
}
.selling:hover {
  cursor: pointer;
}
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expand-row) {
  background: rgb(20, 42, 70) !important;
}
.theme--dark.v-data-table tbody tr:hover {
  background: rgb(20, 42, 70) !important;
}
.broker_desc {
  font-size: 11px;
  font-weight: 100;
  color: grey;
}

</style>
