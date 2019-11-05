<template>
    <v-col class="pa-0" cols="4" sm="4" md="4">
        <v-card-title class="text-left justify-left px-0 pb-2 pt-5">
            <h6 class="font-weight-regular white--text subtitle-2" style="color:#fff;">PORTFOLIO SNAPSHOT</h6>
            <v-spacer></v-spacer>
            <router-link to="/" class="social__router">
              <v-btn icon small> 
                  <img src="/icon/journal-icons/share-icon.svg" width="15">
              </v-btn>
            </router-link>
        </v-card-title>
        <v-col class="pa-0">
            <v-card color="#00121E" elevation="0" dark class="pb-2" style="border: 1px solid #000">
                <v-card-title class="text-left justify-left py-2 px-3">
                    <h6 class="font-weight-regular caption text-capitalize" style="color:#fff;">Trading Result (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in tradingr" :key="item.name" id="table_tr_snap-cont">
                            <td class="item_position-prop px-3 caption">{{ item.name }}</td>
                            <td class="item_position-prop text-right px-3 caption">{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-card color="#00121E" elevation="0" dark class="mt-3 pb-2" style="border: 1px solid #000">
                <v-card-title class="text-left justify-left py-2 px-3">
                    <h6 class="font-weight-regular caption text-capitalize" style="color:#fff;">Funds Transfers (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in tradingr" :key="item.name" id="table_tr_snap-cont">
                            <td class="item_position-prop px-3 caption">{{ item.name }}</td>
                            <td class="item_position-prop text-right px-3 caption">{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-col>
    </v-col>
</template>
<script>
export default {
    data () {
      return {
        tradingr: [
          {
            name: 'Starting Capital',
            value: '10,000.00',
          },
          {
            name: 'Year to Date P/L',
            value: '10,000.00',
          },
          {
            name: 'Portfolio YTD %',
            value: '10,000.00',
          }
        ]
      }
    },
}
</script>
<style scoped>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6
}
</style>