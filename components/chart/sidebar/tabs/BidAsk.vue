<template>
  <v-content>
    <v-row class="py-0">
      <!-- bid and ask -->
      <v-col class="py-0 mt-1">
        <span class="caption ml-4 font-weight-bold white--text"
          >Bid and Ask</span
        >
        <v-content>
          <v-simple-table dense dark fixed-header height="110" class="mx-2">
            <thead>
              <tr>
                <th :class="header">#</th>
                <th :class="header">VOL</th>
                <th :class="header">BID</th>
                <th :class="header">ASK</th>
                <th :class="header">VOL</th>
                <th :class="header">#</th>
                <th :class="header"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td :class="column" style="width:10%">{{ item.bidnum }}</td>
                <td :class="column" style="width:18%">{{ item.bidvol }}</td>
                <td :class="column" style="width:15%">{{ item.bid }}</td>
                <td :class="column" style="width:20%">{{ item.ask }}</td>
                <td :class="column" style="width:18%">{{ item.askvol }}</td>
                <td :class="column" style="width:10%">{{ item.asknum }}</td>
                <td :class="column"></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-content>
      </v-col>
    </v-row>
    <v-row>
      <!-- toggle bid and ask -->
      <v-col class="py-0 mt-3 mb-3">
        <v-content>
          <v-row>
            <v-col class="col-5 text-right pa-0">
              <span class="overline white--text font-weight-bold"
                >Top Five</span
              >
            </v-col>
            <v-col class="col-2 text-center pa-0">
              <v-icon
                v-show="toggleButton"
                color="#48ffd5"
                class="icon__toggle"
                @click="toggleBidAsk"
                >toggle_off</v-icon
              >
              <v-icon
                v-show="!toggleButton"
                color="error"
                class="icon__toggle"
                @click="toggleBidAsk"
                >toggle_on</v-icon
              >
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
        <v-simple-table dense dark fixed-header height="110" class="mx-2">
          <thead>
            <tr>
              <th :class="header">TIME</th>
              <th :class="header">VOL</th>
              <th :class="header">PRICE</th>
              <th :class="header">BUYER</th>
              <th :class="header">SELLER</th>
              <th :class="header"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td :class="column" style="width:15%">{{ item.bidnum }}</td>
              <td :class="column" style="width:20%">{{ item.bidvol }}</td>
              <td :class="column" style="width:20%">{{ item.bid }}</td>
              <td :class="column" style="width:20%">{{ item.ask }}</td>
              <td :class="column" style="width:20%">{{ item.askvol }}</td>
              <td :class="column"></td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row class="mt-5">
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
      toggleButton: true,
      header: "text-right overline header white--text font-weight-bold",
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
          id: 41,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 51,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 412,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        },
        {
          id: 512,
          bidnum: 1,
          bidvol: 100,
          bid: 7.8,
          ask: 8.0,
          askvol: 110,
          asknum: 1
        }
      ]
    };
  },
  methods: {
    toggleBidAsk: function() {
      this.toggleButton = !this.toggleButton;
    }
  }
};
</script>

<style>
.header {
  background: #0b1f33 !important;
}
.column {
  background: #0b1f33 !important;
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
.icon__toggle {
  cursor: pointer;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
</style>
