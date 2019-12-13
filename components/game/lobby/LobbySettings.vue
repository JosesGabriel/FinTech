<template>
  <div class="container d-flex lobbySettings__wrap px-0">
    <v-overlay :value="fullScreenLoader">
      <v-progress-circular
        color="success"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div class="row">
      <div class="col-6 pa-0 pl-5">
        <v-select
          v-model="playerCountModel"
          class="lobbySettings__select"
          success
          :items="playerCount"
          label="Players"
          placeholder="Players"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          hide-details
          dense
          outlined
          dark
          :disabled="disableFields"
        ></v-select>
      </div>
      <div class="col-6 pa-0 pl-5">
        <v-text-field
          v-model="stakeModel"
          outlined
          dense
          success
          hide-details
          label="Stake"
          type="number"
          color="success"
          class="stake__field"
          dark
        ></v-text-field>
      </div>
      <div class="col-6 pa-0 pl-5">
        <v-select
          v-model="chartCountModel"
          class="lobbySettings__select"
          success
          :items="chartCount"
          label="No. Of Charts"
          placeholder="No. Of Charts"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          outlined
          hide-details
          dark
          :disabled="disableFields"
        ></v-select>
      </div>
      <div class="col-6 pa-0 pl-5">
        <v-select
          v-model="marketModel"
          class="lobbySettings__select"
          :items="market"
          label="Market"
          placeholder="Market"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          outlined
          hide-details
          success
          dark
          :disabled="disableFields"
        ></v-select>
      </div>
      <div class="col-6 pa-0 roomtype__radio--wrapper pl-5">
        <span class="caption">Room Type</span>
        <v-radio-group
          v-model="roomTypeModel"
          dark
          row
          class="lobbySettings__select mt-0"
          color="success"
          dense
          hide-details
          :disabled="disableFields"
        >
          <v-radio class="caption" label="Public" value="Public"></v-radio>
          <v-radio label="Private" value="Private"></v-radio>
        </v-radio-group>
      </div>
      <div class="col-6 pa-0 pl-5">
        <v-select
          v-model="limitModel"
          success
          class="lobbySettings__select"
          :items="timeLimit"
          item-value="value"
          label="Time Limit"
          placeholder="Time Limit"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          outlined
          hide-details
          dark
          :disabled="disableFields"
        ></v-select>
      </div>
      <span class="caption pl-5">Invite/share settings</span>
      <div class="col-12 pa-0 d-flex">
        <v-switch
          class="lobbySettings__select pl-5 mt-0"
          label="Allow Player Invite"
          dark
          color="success"
          dense
          flat
          hide-details
          :disabled="disableFields"
        ></v-switch>
        <v-btn text icon color="white">
          <v-icon>mdi-facebook-box</v-icon>
        </v-btn>
        <v-btn text icon color="white">
          <v-icon>mdi-twitter-box</v-icon>
        </v-btn>
        <v-btn text icon color="white">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </div>
      <div class="col-12 text-right d-flex py-0 ml-2">
        <v-btn
          class="lobbySettings__select"
          dense
          outlined
          color="success"
          @click="leaveLobby()"
          >Cancel</v-btn
        >
        <v-btn
          v-if="playerIsHost"
          class="lobbySettings__select"
          dense
          outlined
          color="success"
          @click="createGame()"
          >Start Game</v-btn
        >
        <v-btn
          v-if="disableFields"
          class="lobbySettings__select"
          dense
          outlined
          color="success"
          @click="joinGame()"
          >Ready</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style>
.lobbySettings__select {
  transform: scale(0.8);
  transform-origin: top left;
}
.lobbySettings__wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
  height: calc(100vh - 266px);
  background-color: #01202a;
}
.stake__field {
  transform: scale(0.8);
  transform-origin: top left;
}
.roomtype__radio--wrapper {
  position: relative;
  bottom: 15px;
}
</style>
<script>
require("dotenv").config();
const sdk = require("matrix-js-sdk");
const HSUrl = "https://im.arbitrage.ph";
const client = sdk.createClient(HSUrl);
const roomID = "!OlWVatkysuERsuXfCS:im.arbitrage.ph";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      fullScreenLoader: false,
      items: [1, 2, 3, 4, 5],
      playerCountModel: 0,
      stakeModel: 0,
      roomTypeModel: null,
      timeLimit: [
        {
          text: "5 Minutes",
          value: 5
        },
        {
          text: "10 Minutes",
          value: 10
        },
        {
          text: "15 Minutes",
          value: 15
        },
        {
          text: "20 Minutes",
          value: 20
        }
      ],
      chartCountModel: 0,
      playerCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      market: ["PSE"],
      chartCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      limitModel: "",
      marketModel: "",
      disableFields: false
    };
  },
  computed: {
    ...mapGetters({
      playerIsHost: "game/getPlayerIsHost",
      playerInGame: "game/getPlayerInGame",
      playerID: "game/getPlayerID",
      playerCurrentChatRoom: "game/getPlayerCurrentChatRoom"
    })
  },
  methods: {
    ...mapActions({
      setPlayerCurrentLobby: "game/setPlayerCurrentLobby",
      setPlayerIsHost: "game/setPlayerIsHost",
      setPlayerInGame: "game/setPlayerInGame",
      setPlayerCurrentChatRoom: "game/setPlayerCurrentChatRoom"
    }),
    leaveLobby() {
      this.setPlayerCurrentLobby("");
      if (this.playerCurrentChatRoom != process.env.DEFAULT_CHAT_ROOM_ID) {
        client.leave(this.playerCurrentChatRoom);
        this.setPlayerCurrentChatRoom(process.env.DEFAULT_CHAT_ROOM_ID);
        this.$emit("showSettings");
      }
    },
    joinGame() {
      this.setPlayerInGame(true);
    },
    checkFields() {
      if (
        this.playerCountModel != "" &&
        this.stakeModel != "" &&
        this.marketModel != "" &&
        this.chartCountModel != "" &&
        this.limitModel != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    createGame() {
      if (!this.checkFields) {
        console.log("alert");
      } else {
        let playerCountModel = this.playerCountModel;
        let stakeModel = this.stakeModel;
        let chartCountModel = this.chartCountModel;
        let marketModel = this.marketModel;
        let roomTypeModel = this.roomTypeModel;
        let limitModel = this.limitModel;
        this.fullScreenLoader = true;
        // const params = {
        //   mode: "practice",
        //   market: this.marketModel,
        //   time_limit: this.limitModel,
        //   players: {
        //     "0": this.playerID
        //   },
        //   meta: {
        //     creator: this.playerID
        //   }
        // };
        // this.$axios
        //   .$post(process.env.DEV_API_URL + "/game/series/", params)
        //   .then(response => {
        //     this.setPlayerInGame(true);
        //   });
        var myToken = "";
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
              case "PREPARED":
                var options = {
                  preset: "public_chat",
                  room_alias_name: Math.random()
                    .toString(36)
                    .substr(2, 5),
                  name: Math.random()
                    .toString(36)
                    .substr(2, 5),
                  topic: "Game Room",
                  creation_content: {
                    "m.federate": false
                  }
                };
                axios.defaults.headers.common["Authorization"] =
                  `Bearer ` + myToken;
                axios
                  .post(
                    "https://im.arbitrage.ph/_matrix/client/r0/createRoom",
                    options
                  )
                  .then(
                    function(response) {
                      // console.log(response.data["room_id"]);
                      var gameOptions = {
                        Players: playerCountModel,
                        Stake: stakeModel,
                        NumCharts: chartCountModel,
                        Market: marketModel,
                        Visibility: roomTypeModel,
                        TimeLimit: limitModel
                      };
                      client.setRoomTag(
                        response.data["room_id"],
                        "Options",
                        gameOptions,
                        function(response) {
                          console.log(response);
                        }
                      );
                      //If reached here, room creation is successful
                      // Join newly created room, by changing vuex currentChatRoom. Variable is watched, onchange, chatroom is re-rendered
                      this.setPlayerCurrentChatRoom(response.data["room_id"]);
                      this.disableFields = true;
                      this.fullScreenLoader = false;
                    }.bind(this)
                  )
                  .catch(function(error) {
                    console.log(error);
                  });
                break;
            }
          }.bind(this)
        );
        return true;
      }
    }
  }
};
</script>
