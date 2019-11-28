<template>
  <v-container class="py-0">
    <v-row class="rankTable__row">
      <v-col cols="12" class="">
        <v-simple-table
          :dark="lightSwitch == 0 ? false : true"
          class="rankingTable rankingTable--color"
          dense
        >
          <template v-slot:default>
            <thead class="text-center">
              <tr>
                <th class="text-left"></th>
                <th class="text-left">Standing</th>
                <th class="text-center">Trades</th>
                <th class="text-center">Charts</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, counter) in desserts" :key="item.name">
                <td>{{ (counter += 1) }}</td>
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.trades }}</td>
                <td class="text-center">{{ item.charts }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.rankingTable {
}
.rankTable__row {
  border: 2px solid #0c1a2b;
  border-top: 0px;
}
.rankingTable.rankingTable--color {
  background-color: transparent;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  layout: "main",
  data() {
    return {
      desserts: [
        {
          name: "Orange",
          trades: 159,
          charts: 5
        },
        {
          name: "Kureyri",
          trades: 237,
          charts: 1
        },

        {
          name: "aimeumemura",
          trades: 262,
          charts: 1
        },
        {
          name: "Kring-Krungchao",
          trades: 305,
          charts: 1
        },
        {
          name: "Gingerbread",
          trades: 356,
          charts: 3
        },
        {
          name: "JellyBean",
          trades: 375,
          charts: 2
        },
        {
          name: "IceCream",
          trades: 375,
          charts: 2
        },
        {
          name: "IcePop",
          trades: 375,
          charts: 3
        },
        {
          name: "Purple",
          trades: 375,
          charts: 1
        },
        {
          name: "Starfire",
          trades: 375,
          charts: 2
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
