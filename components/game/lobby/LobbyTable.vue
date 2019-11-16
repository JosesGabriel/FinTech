<template>
  <div>
    <v-data-table
      dark
      :headers="playerInLobby ? headersJoined : headers"
      :items="playerInLobby ? itemsJoined : items"
      :items-per-page="10"
      height="230px"
      style="background-color: transparent"
      class="elevation-1 lobbyTable"
      :footer-props="{
        disableItemsPerPage: true,
        disablePagination: true
      }"
    ></v-data-table>
    <div class="table__footer">
      <v-btn
        small
        outlined
        color="success"
        @click="
          joinLobby();
          setPlayerIsHost(false);
        "
        >Join Game</v-btn
      >

      <v-btn small outlined color="success" @click.stop="dialog = true"
        >Create Game</v-btn
      >
      <v-dialog v-model="dialog" max-width="290">
        <v-card dark color="#0c1a2b">
          <v-card-actions>
            <v-btn
              color="success"
              outlined
              @click="
                dialog = false;
                joinLobby();
              "
            >
              Single Player
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              outlined
              @click="
                dialog = false;
                joinLobby();
                setPlayerIsHost(true);
              "
            >
              Multiplayer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
.v-data-footer__icons-before,
.v-data-footer__icons-after {
  visibility: hidden;
}
.table__footer {
  position: relative;
  bottom: 30px;
  display: inline;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
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
      items: [
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
        },
        {
          name: "008",
          players: 375,
          market: "PSE",
          time: 94,
          charts: 0.0,
          coinbet: "110"
        }
      ],
      headersJoined: [
        {
          text: "PLAYERS",
          align: "center",
          value: "playerName",
          class: "tableHeader"
        },
        {
          text: "RANK",
          align: "center",
          value: "rank",
          class: "tableHeader"
        },
        {
          text: "READY",
          align: "center",
          value: "ready",
          class: "tableHeader"
        }
      ],
      itemsJoined: [
        {
          playerName: "Orange",
          rank: "1",
          ready: "READY"
        },
        {
          playerName: "Jeff_ology",
          rank: "3",
          ready: "READY"
        },
        {
          playerName: "Kring-Krungchao",
          rank: "4",
          ready: "READY"
        },
        {
          playerName: "Kureyri",
          rank: "2",
          ready: "READY"
        },
        {
          playerName: "aimeumemura",
          rank: "9",
          ready: "READY"
        },
        {
          playerName: "Red",
          rank: "5",
          ready: "READY"
        },
        {
          playerName: "Fuschia",
          rank: "8",
          ready: ""
        },
        {
          playerName: "Purple",
          rank: "10",
          ready: "READY"
        },
        {
          playerName: "AliceBlue",
          rank: "7",
          ready: ""
        },
        {
          playerName: "Psalm",
          rank: "6",
          ready: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      playerInLobby: "game/getPlayerInLobby",
      playerIsHost: "game/getPlayerIsHost"
    })
  },
  methods: {
    ...mapActions({
      setPlayerInLobby: "game/setPlayerInLobby",
      setPlayerIsHost: "game/setPlayerIsHost"
    }),
    joinLobby() {
      this.setPlayerInLobby(true);
    }
  }
};
</script>
