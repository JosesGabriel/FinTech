<template>
  <v-container class="gameLobby__container">
    <v-row>
      <v-col cols="9">
        <v-container>
          <v-row>
            <v-col cols="4">
              <UserProfileCard />
            </v-col>
            <v-col cols="8">
              <LobbyTable />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pt-0 leaderBoards__column">
              <Leaderboard />
            </v-col>
            <v-col cols="8" class="pt-0">
              <ChatClient />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="3">
        <div v-if="!playerInLobby">
          <AdCarousel class="mb-5" />
          <AdCarousel />
        </div>
        <div v-if="playerInLobby">
          <LobbySettings />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.gameLobby__container {
  margin-top: 40px;
}
</style>
<script>
import UserProfileCard from "~/components/game/lobby/UserProfileCard";
import LobbyTable from "~/components/game/lobby/LobbyTable";
import Leaderboard from "~/components/game/lobby/Leaderboard";
import ChatClient from "~/components/game/ChatClient";
import AdCarousel from "~/components/game/lobby/AdCarousel";
import LobbySettings from "~/components/game/lobby/LobbySettings";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "chart",
  components: {
    UserProfileCard,
    LobbyTable,
    Leaderboard,
    ChatClient,
    AdCarousel,
    LobbySettings
  },
  data() {
    return {
      show: true
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
      setPlayerIGame: "game/setPlayerInGame"
    })
  }
};
</script>
