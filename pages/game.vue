<template>
  <v-container class="game__container">
    <v-row>
      <v-col cols="3">
        <UserProfileCard />
      </v-col>
      <v-col cols="9" class="pb-0">
        <LobbyTable />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="pt-0 leaderBoards__column">
        <Leaderboard />
      </v-col>
      <v-col cols="6" class="pt-0">
        <ChatClient />
      </v-col>
      <v-col cols="3" class="pt-0">
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
.game__container {
  max-width: 1080px;
  margin-top: 40px;
}
.leaderBoards__column {
  position: relative;
  bottom: 60px;
}
</style>
<script>
import UserProfileCard from "~/components/game/UserProfileCard";
import LobbyTable from "~/components/game/LobbyTable";
import Leaderboard from "~/components/game/Leaderboard";
import ChatClient from "~/components/game/ChatClient";
import AdCarousel from "~/components/game/AdCarousel";
import LobbySettings from "~/components/game/LobbySettings";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    UserProfileCard,
    LobbyTable,
    Leaderboard,
    ChatClient,
    AdCarousel,
    LobbySettings
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
    })
  }
};
</script>
