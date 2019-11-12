<template>
  <div>
    <v-data-table
      dark
      :headers="headers"
      :items="desserts"
      :items-per-page="4"
      style="background-color: transparent"
      class="elevation-1"
      :footer-props="{
        disableItemsPerPage: true
      }"
    ></v-data-table>
    <div class="table__footer">
      <v-btn small outlined color="success">Join Game</v-btn>
      <v-btn small outlined color="success">Create Game</v-btn>
    </div>
  </div>
</template>
<style>
.tableHeader {
  background-color: black;
}
.v-data-footer__select {
  display: none;
}
.table__footer {
  position: relative;
  bottom: 30px;
  display: inline;
}
</style>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "ROOM #",
          align: "center",
          value: "name",
          class: "tableHeader"
        },
        {
          text: "PLAYERS",
          align: "center",
          value: "players",
          class: "tableHeader"
        },
        {
          text: "MARKET",
          align: "center",
          value: "market",
          class: "tableHeader"
        },
        { text: "TIME", align: "center", value: "time", class: "tableHeader" },
        {
          text: "CHARTS",
          align: "center",
          value: "charts",
          class: "tableHeader"
        },
        {
          text: "COIN BET",
          align: "center",
          value: "coinbet",
          class: "tableHeader"
        },
        {
          text: "POT MONEY",
          align: "center",
          value: "coinbet",
          class: "tableHeader"
        },
        {
          text: "SETTING",
          align: "center",
          value: "coinbet",
          class: "tableHeader"
        }
      ],
      desserts: [
        {
          name: "003",
          players: 159,
          market: "PSE",
          time: 24,
          charts: 4.0,
          coinbet: "100"
        },
        {
          name: "004",
          players: 237,
          market: "NYSE",
          time: 37,
          charts: 4.3,
          coinbet: "1000"
        },
        {
          name: "005",
          players: 262,
          market: "NYSE",
          time: 23,
          charts: 6.0,
          coinbet: "700"
        },
        {
          name: "006",
          players: 305,
          market: "FOREX",
          time: 67,
          charts: 4.3,
          coinbet: "180"
        },
        {
          name: "007",
          players: 356,
          market: "CRYPTO",
          time: 49,
          charts: 3.9,
          coinbet: "160"
        },
        {
          name: "008",
          players: 375,
          market: "PSE",
          time: 94,
          charts: 0.0,
          coinbet: "110"
        },
        {
          name: "009",
          players: 392,
          market: "PSE",
          time: 98,
          charts: 0,
          coinbet: "200"
        }
      ]
    };
  }
};
</script>
