<template>
  <v-content>
    <span class="caption ml-4 font-weight-bold white--text">All Stock</span>
    <v-simple-table dense dark fixed-header height="300">
      <thead>
        <tr>
          <th :class="header">#</th>
          <th :class="header">VOL</th>
          <th :class="header">BID</th>
          <th :class="header">ASK</th>
          <th :class="header">VOL</th>
          <th :class="header">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td :class="column">{{ item.bidnum }}</td>
          <td :class="column">{{ item.bidvol }}</td>
          <td :class="column">{{ item.bid }}</td>
          <td :class="column">{{ item.ask }}</td>
          <td :class="column">{{ item.askvol }}</td>
          <td :class="column">{{ item.asknum }}</td>
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
      header: "text-left overline header white--text font-weight-bold",
      column: "text-right overline column white--text",
      items: [
        {
          id: 1,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 2,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 3,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 4,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 5,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 11,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 211,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 311,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 411,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 511,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 5111,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 2111,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 3111,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 4111,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        }
      ]
    };
  }
};
</script>

<style></style>
