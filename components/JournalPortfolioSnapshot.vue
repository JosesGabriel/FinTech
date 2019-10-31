<template>
    <v-col class="pa-0" cols="4" sm="4" md="4">
        <v-card-title class="text-left justify-left px-0 py-3 pt-5">
            <h6 class="font-weight-regular subtitle-2" style="color:#d8d8d8;">PORTFOLIO SNAPSHOT</h6>
        </v-card-title>
        <v-col class="pa-0">
            <v-card color="#0c1f33" elevation="0" dark>
                <v-card-title class="text-left justify-left pa-0">
                    <h6 class="font-weight-regular body-2 text-capitalize" style="color:#d8d8d8;">Trading Result (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in tradingr" :key="item.name" id="table_tr_snap-cont">
                            <td id="table_td_snap-cont" class="px-1 py-2">{{ item.name }}</td>
                            <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-card color="#0c1f33" elevation="0" dark class="mt-3">
                <v-card-title class="text-left justify-left pa-0">
                    <h6 class="font-weight-regular body-2 text-capitalize" style="color:#d8d8d8;">Funds Transfers (PHP)</h6>
                </v-card-title>
                <v-simple-table :dense="true" dark id="liveportfolio-table">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in tradingr" :key="item.name" id="table_tr_snap-cont">
                            <td id="table_td_snap-cont" class="px-1 py-2">{{ item.name }}</td>
                            <td id="table_td_snap-cont" class="text-right px-1 py-1">{{ item.value }}</td>
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