<template>
  <v-content>
    <v-content class="mt-1">
      <span class="caption ml-4 font-weight-bold white--text">All Stock</span>
    </v-content>
    <v-simple-table
      dense
      dark
      fixed-header
      class="ml-4"
      height="calc(100vh - 415px)"
      style="background:#00121e"
    >
      <thead>
        <tr>
          <th :class="header">SYMBOL</th>
          <th :class="header" class="text-right">LAST</th>
          <th :class="header" class="text-right">%CHANGE</th>
          <th :class="header" class="text-right">VALUE</th>
          <th :class="header" class="text-right">TRADES</th>
          <th :class="header"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td :class="column" style="width:20%">{{ item.symbol }}</td>
          <td :class="column" style="width:15%" class="text-right">
            <span class="decrease">{{ item.last }}</span>
          </td>
          <td :class="column" style="width:23%" class="text-right">
            <span class="increase">{{ item.change }}</span>
          </td>
          <td :class="column" style="width:18%" class="text-right">
            <span class="">{{ item.value }}</span>
          </td>
          <td :class="column" style="width:18%" class="text-right">
            <span class="">{{ item.trades }}</span>
          </td>
          <td :class="column"></td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-content>
</template>

<script>
export default {
  name: "AllStock",
  data() {
    return {
      header: "caption header white--text font-weight-bold",
      column: "caption column white--text",
      items: [
        {
          id: 1,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 2,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 3,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 4,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 5,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 6,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 7,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 8,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 9,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 10,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 11,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 12,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 13,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 14,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 15,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 16,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 17,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 18,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 19,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        },
        {
          id: 20,
          symbol: "ICT",
          last: "101.90",
          last_status: 1,
          change: 7.8,
          change_status: 2,
          value: "189M",
          trades: "193"
        }
      ]
    };
  }
};
</script>

<style scoped>
.theme--dark.v-data-table thead tr:last-child th {
  border: none;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
.v-data-table--dense td {
  height: 20px;
}
</style>
