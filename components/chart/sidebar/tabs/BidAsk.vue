<template>
  <v-content>
    <v-row class="py-0">
      <!-- bid and ask -->
      <v-col class="py-0 mt-1">
        <span class="caption ml-4 font-weight-bold white--text"
          >Bid and Ask</span
        >
        <v-simple-table dense dark fixed-header height="110">
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
      </v-col>
    </v-row>
    <v-row>
      <!-- toggle bid and ask -->
      <v-col class="py-0 mt-2">
        <v-content>
          <v-row>
            <v-col class="col-5 text-right pa-0">
              <span class="overline white--text font-weight-bold"
                >Top Five</span
              >
            </v-col>
            <v-col class="col-2 text-center pa-0">
              <v-icon color="#48FFD5">toggle_off</v-icon>
            </v-col>
            <v-col class="col-5 text-left pa-0">
              <span class="overline">Full Depth</span>
            </v-col>
          </v-row>
        </v-content>
        <v-content class="px-12">
          <v-progress-linear
            background-color="error"
            color="#48FFD5"
            value="50"
            height="5"
          ></v-progress-linear>
        </v-content>
      </v-col>
    </v-row>

    <v-row class="py-0">
      <!-- time and trades -->
      <v-col class="py-0 mt-3">
        <span class="caption ml-4 font-weight-bold white--text"
          >Time and Trade</span
        >
        <v-simple-table dense dark fixed-header height="110">
          <thead>
            <tr>
              <th :class="header">TIME</th>
              <th :class="header">VOL</th>
              <th :class="header">PRICE</th>
              <th :class="header">BUYER</th>
              <th :class="header">SELLER</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td :class="column">{{ item.bidnum }}</td>
              <td :class="column">{{ item.bidvol }}</td>
              <td :class="column">{{ item.bid }}</td>
              <td :class="column">{{ item.ask }}</td>
              <td :class="column">{{ item.askvol }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <!-- toggle time and trades-->
      <v-col class="py-0">
        <v-content class="px-12">
          <v-progress-linear
            background-color="error"
            color="#48FFD5"
            value="50"
            height="5"
          ></v-progress-linear>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "BidAsk",
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
        }
      ]
    };
  }
};
</script>

<style>
.header {
  /* background: rgb(9, 26, 43); */
  background: #0b1f33 !important;
}
.column {
  background: #0b1f33;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
</style>
