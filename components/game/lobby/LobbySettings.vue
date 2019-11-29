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
          :disabled="!playerIsHost"
        ></v-select>
      </div>
      <div class="col-6 pa-0 pl-5">
        <v-text-field
          v-model="coinsModel"
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
          :disabled="!playerIsHost"
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
          :disabled="!playerIsHost"
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
          :disabled="!playerIsHost"
        >
          <v-radio class="caption" label="Public" :value="0"></v-radio>
          <v-radio label="Private" :value="1"></v-radio>
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
          :disabled="!playerIsHost"
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
          :disabled="!playerIsHost"
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
