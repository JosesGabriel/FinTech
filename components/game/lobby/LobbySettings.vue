<template>
  <div class="container d-flex lobbySettings__wrap">
    <v-overlay :value="fullScreenLoader">
      <v-progress-circular
        color="success"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div class="row lobbySettings__header">
      <div class="col-12">
        <span style="color: black;">Settings</span>
      </div>
    </div>
    <span class="caption mt-2">Game Settings</span>
    <div class="row">
      <div class="col-6 pr-0 pb-0">
        <v-select
          v-model="playerCountModel"
          class="lobbySettings__select"
          :items="playerCount"
          label="Players"
          placeholder="Players"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          outlined
          dark
          :disabled="!playerIsHost"
        ></v-select>
      </div>
      <div class="col-6 pl-0 pb-0">
        <!-- <v-select
          class="lobbySettings__select"
          :items="items"
          label="Coin Bet"
          placeholder="Coin Bet"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          outlined
          dark
          :disabled="!playerIsHost"
        ></v-select> -->
        <v-text-field
          v-model="coinsModel"
          label="Coin Bet"
          prepend-inner-icon="mdi-coins"
          type="number"
          color="success"
          dark
        ></v-text-field>
      </div>
    </div>
    <div class="row">
      <div class="col-6 pr-0 py-0">
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
          dark
          :disabled="!playerIsHost"
        ></v-select>
      </div>
      <div class="col-6 pl-0 py-0">
        <v-select
          v-model="chartCountModel"
          class="lobbySettings__select"
          :items="chartCount"
          label="No. Of Charts"
          placeholder="No. Of Charts"
          background-color="transparent"
          color="success"
          item-color="success"
          append-icon="mdi-chevron-down"
          outlined
          dark
          :disabled="!playerIsHost"
        ></v-select>
      </div>
    </div>
    <span class="caption">Room Type</span>
    <div class="row">
      <div class="col-12 py-0">
        <v-radio-group
          v-model="roomTypeModel"
          dark
          row
          class="lobbySettings__select mt-0"
          color="success"
          dense
          :disabled="!playerIsHost"
        >
          <v-radio label="Public" :value="0"></v-radio>
          <v-radio label="Private" :value="1"></v-radio>
        </v-radio-group>
      </div>
    </div>
    <div v-if="roomTypeModel == 1" class="row">
      <div class="col-12 pt-0">
        <v-text-field
          label="Password"
          placeholder="Input password"
          class="lobbySettings__select"
          outlined
          dense
          dark
          :disabled="!playerIsHost"
        ></v-text-field>
      </div>
    </div>
    <div class="row">
      <div class="col-12 py-0">
        <v-select
          v-model="limitModel"
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
          dark
          :disabled="!playerIsHost"
        ></v-select>
      </div>
    </div>
    <span class="caption">Invite/share settings</span>
    <div class="row">
      <div class="col-12 py-0">
        <v-switch
          class="lobbySettings__select"
          label="Allow Player Invite"
          dark
          color="success"
          dense
          flat
          hide-details
          :disabled="!playerIsHost"
        ></v-switch>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pb-0">
        <span class="caption">Invite</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 py-0">
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
    </div>
    <div class="row">
      <div class="col-12 text-right d-flex">
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
          @click="checkFields()"
          >Start Game</v-btn
        >
        <v-btn
          v-if="!playerIsHost"
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
.lobbySettings__header {
  background-color: #1de9b6;
}
.lobbySettings__select {
  transform: scale(0.8);
  transform-origin: left;
}
.lobbySettings__wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: auto;
  height: calc(100vh - 136px);
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      fullScreenLoader: false,
      items: [1, 2, 3, 4, 5],
      playerCountModel: 0,
      coinsModel: 0,
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
      marketModel: ""
    };
  },
  computed: {
    ...mapGetters({
      playerInLobby: "game/getPlayerInLobby",
      playerIsHost: "game/getPlayerIsHost",
      playerInGame: "game/getPlayerInGame",
      playerID: "game/getPlayerID"
    })
  },
  methods: {
    ...mapActions({
      setPlayerInLobby: "game/setPlayerInLobby",
      setPlayerIsHost: "game/setPlayerIsHost",
      setPlayerInGame: "game/setPlayerInGame"
    }),
    leaveLobby() {
      this.setPlayerInLobby(false);
    },
    joinGame() {
      this.setPlayerInGame(true);
    },
    checkFields() {
      if (
        this.playerCountModel != "" &&
        this.coinsModel != "" &&
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
        this.fullScreenLoader = true;
        const params = {
          mode: "practice",
          market: this.marketModel,
          time_limit: this.limitModel,
          players: {
            "0": this.playerID
          },
          meta: {
            creator: this.playerID
          }
        };
        this.$axios
          .$post(process.env.DEV_API_URL + "/game/series/", params)
          .then(response => {
            this.setPlayerInGame(true);
          });
      }
    }
  }
};
</script>
