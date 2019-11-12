<template>
  <v-container class="game__container">
    <v-row>
      <v-col cols="3">
        <UserProfileCard />
      </v-col>
      <v-col cols="9" class="pb-0">
        <RoomsTable />
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
        <AdCarousel class="mb-5" />
        <AdCarousel />
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
import RoomsTable from "~/components/game/RoomsTable";
import Leaderboard from "~/components/game/Leaderboard";
import ChatClient from "~/components/game/ChatClient";
import AdCarousel from "~/components/game/AdCarousel";

export default {
  layout: "main",
  components: {
    UserProfileCard,
    RoomsTable,
    Leaderboard,
    ChatClient,
    AdCarousel
  }
};
</script>
