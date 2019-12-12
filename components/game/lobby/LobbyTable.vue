<template>
  <div>
    <v-data-table
      :loading="loader"
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
      <!-- <template v-slot:item="props">
        <tr @click="selectRoom(props.item)">
          <td
            v-for="(n, index) in Object.keys(props.item).length"
            :key="n"
            class="text-center font-weight-black"
          >
            {{ props.item[[Object.keys(props.item)[n - 1]]] }}
          </td>
        </tr>
      </template> -->
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
          createLobby();
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
const sdk = require("matrix-js-sdk");
const HSUrl = "https://im.arbitrage.ph";
const client = sdk.createClient(HSUrl);
const roomID = "!OlWVatkysuERsuXfCS:im.arbitrage.ph";
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
          value: "RoomNumber",
          class: "tableHeader"
        },
        {
          text: "PLAYERS",
          align: "center",
          value: "Players",
          class: "tableHeader"
        },
        {
          text: "MARKET",
          align: "center",
          value: "Market",
          class: "tableHeader"
        },
        {
          text: "TIME",
          align: "center",
          value: "TimeLimit",
          class: "tableHeader"
        },
        {
          text: "CHARTS",
          align: "center",
          value: "NumCharts",
          class: "tableHeader"
        },
        {
          text: "STAKE",
          align: "center",
          value: "Stake",
          class: "tableHeader"
        },
        {
          text: "POT",
          align: "center",
          value: "PotMoney",
          class: "tableHeader"
        },
        {
          text: "SETTING",
          align: "center",
          value: "Visibility",
          class: "tableHeader"
        }
      ],
      items: [],
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
      ],
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      playerInLobby: "game/getPlayerInLobby",
      playerIsHost: "game/getPlayerIsHost",
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted: function() {
    this.loadRooms();
  },
  methods: {
    ...mapActions({
      setPlayerInLobby: "game/setPlayerInLobby",
      setPlayerIsHost: "game/setPlayerIsHost"
    }),
    joinLobby() {
      this.setPlayerInLobby(true);
    },
    createLobby() {
      this.$emit("showSettings");
      //create Vyndue Game Room first:
      // this.setPlayerInLobby(true);
    },
    selectRoom(a) {
      if (!this.playerInLobby) {
        this.selectedRoom = Object.values(a);
        console.log(this.selectedRoom[0]);
      }
    },
    loadRooms() {
      this.loader = true;
      client
        .login("m.login.password", {
          user: "@lerroux:im.arbitrage.ph",
          password: "angelus69"
        })
        .then(response => {
          myToken = response.access_token;
        });
      client.startClient();
      client.on(
        "sync",
        function(state, prevState, data) {
          switch (state) {
            case "PREPARED": {
              console.log(client.getRooms());
              let vyndueRooms = client.getRooms();
              for (let i = 0; i < vyndueRooms.length; i++) {
                if (vyndueRooms[i].tags.Options != undefined) {
                  let potMoney =
                    vyndueRooms[i].tags.Options.Players *
                    vyndueRooms[i].tags.Options.Stake;
                  vyndueRooms[i].tags.Options["RoomNumber"] = i;
                  vyndueRooms[i].tags.Options["PotMoney"] = potMoney;
                  this.items.push(vyndueRooms[i].tags.Options);
                }
              }
              this.loader = false;
            }
          }
        }.bind(this)
      );
      // client.on("event", function(event) {
      //   if (event.getType() == "m.room.create") {
      //     console.log("new room");
      //   }
      // });
    }
  }
};
</script>
