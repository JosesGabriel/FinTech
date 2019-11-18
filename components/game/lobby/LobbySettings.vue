<template>
  <div class="container mt-6">
    <div class="row lobbySettings__header">
      <div class="col-12">
        <span>Settings</span>
      </div>
    </div>
    <span class="caption mt-2">Game Settings</span>
    <div class="row">
      <div class="col-6 pr-0 pb-0">
        <v-select
          class="lobbySettings__select"
          :items="items"
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
        <v-select
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
        ></v-select>
      </div>
    </div>
    <div class="row">
      <div class="col-6 pr-0 py-0">
        <v-select
          class="lobbySettings__select"
          :items="items"
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
          class="lobbySettings__select"
          :items="items"
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
          v-model="roomType__model"
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
    <div v-if="roomType__model == 1" class="row">
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
          class="lobbySettings__select"
          :items="items"
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
          @click="joinGame()"
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
  background-color: #0c1a2b;
}
.lobbySettings__select {
  transform: scale(0.8);
  transform-origin: left;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      roomType__model: null
    };
  },
  computed: {
    ...mapGetters({
      playerInLobby: "game/getPlayerInLobby",
      playerIsHost: "game/getPlayerIsHost",
      playerInGame: "game/getPlayerInGame"
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
    }
  }
};
</script>
