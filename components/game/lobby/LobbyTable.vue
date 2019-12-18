<template>
  <div>
    {{ selectedRoom }}
    <v-data-table
      v-model="selectedRoom"
      :loading="loader"
      :dark="lightSwitch == 0 ? false : true"
      :headers="playerCurrentChatRoom != defaultRoom ? headersJoined : headers"
      :items="items"
      item-key="RoomNumber"
      hide-default-footer
      fixed-header
      height="calc(100vh - 450px)"
      single-select
      show-select
      class="elevation-1 lobby__table transparent__bg text__secondary--light"
      :footer-props="{
        disableItemsPerPage: true,
        disablePagination: true
      }"
    >
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
require("dotenv").config();
import { mapActions, mapGetters } from "vuex";
import { client } from "~/assets/client.js";
export default {
  data() {
    return {
      selectedRoom: [],
      dialog: false,
      itemKey: "",
      headers: [
        {
          text: "ROOM ID",
          align: "center",
          value: "RoomID",
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
          text: "READY",
          align: "center",
          value: "status",
          class: "tableHeader"
        }
      ],
      defaultRoom: process.env.DEFAULT_CHAT_ROOM_ID,
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      playerCurrentLobby: "game/getPlayerCurrentLobby",
      playerIsHost: "game/getPlayerIsHost",
      lightSwitch: "global/getLightSwitch",
      playerCurrentChatRoom: "game/getPlayerCurrentChatRoom"
    })
  },
  watch: {
    playerCurrentChatRoom: function() {
      if (this.playerCurrentChatRoom == process.env.DEFAULT_CHAT_ROOM_ID) {
        this.loadDefaultRoom();
      } else {
        // this.loadLobby(this.playerCurrentChatRoom);
      }
    }
  },
  mounted: function() {
    this.loadDefaultRoom();
  },
  methods: {
    ...mapActions({
      setPlayerCurrentLobby: "game/setPlayerCurrentLobby",
      setPlayerIsHost: "game/setPlayerIsHost"
    }),
    joinLobby() {
      // this.setplayerCurrentLobby(true);
    },
    createLobby() {
      this.$emit("showSettings");
      //create Vyndue Game Room first:
      // this.setplayerCurrentLobby(true);
    },
    // selectRoom(a) {
    //   if (this.playerCurrentLobby == "") {
    //     this.selectedRoom = Object.values(a);
    //     console.log(this.selectedRoom[0]);
    //   }
    // },
    loadLobby(id) {
      let room = client.getRoom(id);
      console.log(room);
      if (room.currentState._joinedMemberCount == 1) {
        this.items[0].playerName = this.$auth.user.data.user.username;
        this.items[0].status = "READY";
      }
    },
    loadDefaultRoom() {
      this.loader = true;
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
