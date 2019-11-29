<template>
  <div>
    <v-data-table
      :dark="lightSwitch == 0 ? false : true"
      :headers="playerInLobby ? headersJoined : headers"
      :items="playerInLobby ? itemsJoined : items"
      hide-default-footer
      fixed-header
      height="calc(100vh - 450px)"
      class="elevation-1 lobby__table transparent__bg text__secondary--light"
      :footer-props="{
        disableItemsPerPage: true,
        disablePagination: true
      }"
    >
      <template v-slot:item="props">
        <tr @click="selectRoom(props.item)">
          <td
            v-for="(n, index) in Object.keys(props.item).length"
            :key="n"
            class="text-center font-weight-black"
          >
            {{ props.item[[Object.keys(props.item)[n - 1]]] }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="table__footer">
      <v-btn
        small
        outlined
        class="gamefooter__btn"
        color="success"
        @click="
          joinLobby();
          setPlayerIsHost(false);
        "
        >Join Game</v-btn
      >

      <v-btn
        small
        outlined
        class="gamefooter__btn"
        color="success"
        @click="
          dialog = false;
          joinLobby();
          setPlayerIsHost(true);
        "
        >Create Game</v-btn
      >
    </div>
  </div>
</template>
<style>
.v-data-table-header tr th {
  background-color: #03dac5 !important;
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
  bottom: 28px;
  display: block;
}
tr span {
  color: black;
}
.lobby__table {
  background-color: #03232f;
  border: 1px solid #03dac5;
  height: calc(100vh - 405px);
}
.gamefooter__btn {
  position: relative;
  bottom: 10px;
  left: 10px;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedRoom: [],
      dialog: false,
      itemKey: "",
      headers: [
        {
          text: "ROOM #",
          align: "center",
          value: "roomName",
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
          text: "STAKE",
          align: "center",
          value: "coinbet",
          class: "tableHeader"
        },
        {
          text: "POT",
          align: "center",
          value: "potMoney",
          class: "tableHeader"
        },
        {
          text: "SETTING",
          align: "center",
          value: "setting",
          class: "tableHeader"
        }
      ],
      items: [
        {
          roomName: "003",
          players: 159,
          market: "PSE",
          time: 24,
          charts: 4.0,
          coinbet: "100",
          potMoney: "900",
          setting: "Private"
        },
        {
          roomName: "004",
          players: 237,
          market: "NYSE",
          time: 37,
          charts: 4.3,
          coinbet: "1000",
          potMoney: "900",
          setting: "Private"
        },
        {
          roomName: "005",
          players: 262,
          market: "NYSE",
          time: 23,
          charts: 6.0,
          coinbet: "700",
          potMoney: "900",
          setting: "Public"
        },
        {
          roomName: "006",
          players: 305,
          market: "FOREX",
          time: 67,
          charts: 4.3,
          coinbet: "180",
          potMoney: "900",
          setting: "Public"
        },
        {
          roomName: "007",
          players: 356,
          market: "CRYPTO",
          time: 49,
          charts: 3.9,
          coinbet: "160",
          potMoney: "900",
          setting: "Public"
        },
        {
          roomName: "008",
          players: 375,
          market: "PSE",
          time: 94,
          charts: 0.0,
          coinbet: "110",
          potMoney: "900",
          setting: "Public"
        },
        {
          roomName: "007",
          players: 356,
          market: "CRYPTO",
          time: 49,
          charts: 3.9,
          coinbet: "160",
          potMoney: "900",
          setting: "Public"
        },
        {
          roomName: "008",
          players: 375,
          market: "PSE",
          time: 94,
          charts: 0.0,
          coinbet: "110",
          potMoney: "900",
          setting: "Public"
        }
        // {
        //   roomName: "",
        //   players: "",
        //   market: "",
        //   time: "",
        //   charts: "",
        //   coinbet: "",
        //   potMoney: "",
        //   setting: ""
        // },
        // {
        //   roomName: "",
        //   players: "",
        //   market: "",
        //   time: "",
        //   charts: "",
        //   coinbet: "",
        //   potMoney: "",
        //   setting: ""
        // },
        // {
        //   roomName: "",
        //   players: "",
        //   market: "",
        //   time: "",
        //   charts: "",
        //   coinbet: "",
        //   potMoney: "",
        //   setting: ""
        // }
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
      playerIsHost: "game/getPlayerIsHost",
      lightSwitch: "global/getLightSwitch"
    })
    // gray: function() {
    //   this.gray = n;
    //   return this.gray;
    // }
  },
  methods: {
    ...mapActions({
      setPlayerInLobby: "game/setPlayerInLobby",
      setPlayerIsHost: "game/setPlayerIsHost"
    }),
    joinLobby() {
      this.setPlayerInLobby(true);
    },
    selectRoom(a) {
      if (!this.playerInLobby) {
        this.selectedRoom = Object.values(a);
        console.log(this.selectedRoom[0]);
      }
    }
  }
};
</script>
