<template>
  <v-content>
    <!-- bid and ask -->
    <v-card color="#00121e" style="height:190px">
      <v-row class="py-0">
        <v-col class="py-0 mt-1">
          <span class="caption ml-4 font-weight-bold white--text"
            >Bid and Ask</span
          >
          <v-content>
            <v-simple-table
              dense
              dark
              fixed-header
              height="110"
              style="background:#00121e"
              class="mx-2"
            >
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
                <span
                  :class="{ 'white--text font-weight-bold': !toggleButton }"
                  class="overline"
                  >Top Five</span
                >
              </v-col>
              <v-col class="col-2 pa-0">
                <v-content>
                  <v-switch
                    v-model="toggleButton"
                    class="toggleButton"
                    color="#48FFD5"
                  ></v-switch>
                </v-content>
              </v-col>
              <v-col class="col-5 text-left pa-0">
                <span
                  :class="{ 'white--text font-weight-bold': toggleButton }"
                  class="overline"
                  >Full Depth</span
                >
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
    </v-card>

    <!-- time and trades -->
    <v-card color="#00121e" class="card__timetrade">
      <v-row class="py-0">
        <v-col class="py-0 mt-3">
          <span class="caption ml-4 font-weight-bold white--text"
            >Time and Trade</span
          >
          <v-simple-table
            dense
            dark
            fixed-header
            style="background:#00121e"
            height="calc(100vh - 650px)"
            class="mx-2"
          >
            <thead>
              <tr>
                <th class="pl-3 overline header white--text font-weight-bold">
                  TIME
                </th>
                <th :class="header">VOL</th>
                <th :class="header">PRICE</th>
                <th :class="header">BUYER</th>
                <th :class="header">SELLER</th>
                <th :class="header"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in trades" :key="item.id">
                <td :class="column" style="width:20%">{{ item.time }}</td>
                <td :class="column" style="width:15%">{{ item.vol }}</td>
                <td :class="column" style="width:18%">{{ item.price }}</td>
                <td :class="column" class="font-weight-bold" style="width:18%">
                  {{ item.buyer }}
                </td>
                <td :class="column" class="font-weight-bold" style="width:20%">
                  {{ item.seller }}
                </td>
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
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: "BidAsk",
  data() {
    return {
      toggleButton: false,
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
      ],
      trades: [
        {
          id: 1,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 2,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 3,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 4,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 5,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 6,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 11,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 21,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 31,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 41,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 51,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 61,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 12,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 22,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 32,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 42,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 52,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        },
        {
          id: 62,
          time: "11:46 AM",
          vol: "500",
          price: "8.00",
          buyer: "COL",
          seller: "NOMU"
        }
      ]
    };
  }
};
</script>

<style>
.header {
  background: #00121e !important;
}
.column {
  background: #00121e !important;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none !important;
}
.theme--dark.v-data-table.v-data-table--fixed-header thead th {
  /* background: #424242;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.12); */
  box-shadow: none !important;
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
.card__timetrade {
  height: calc(100vh - 559px);
}
.toggleButton {
  transform: scale(0.675);
  position: absolute;
  top: -24px;
  left: 7px;
}
</style>
