<template>
  <v-container class="gameLobby__container">
    <v-row>
      <v-col cols="3 py-0 px-1">
        <UserProfileCard class="bordered__component" />
        <div v-if="showSettings == false">
          <Leaderboard class="bordered__component" />
        </div>
        <div v-else>
          <span style="color: #03dac5;">Game Settings</span>
          <LobbySettings @showSettings="showSettings = false" />
        </div>
      </v-col>
      <v-col cols="6" class="px-0"
        ><AdCarousel class="mb-5" />
        <LobbyTable @showSettings="showSettings = true" />
      </v-col>
      <v-col cols="3"><ChatClient /></v-col>
    </v-row>
  </v-container>
</template>
<style>
.gameLobby__container {
  margin-top: 40px;
}
.bordered__component {
  border: 2px solid #0c1a2b;
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
  layout: "game",
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
      show: true,
      showSettings: false
    };
  }
};
</script>
