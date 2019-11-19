<template>
  <v-container class="gameView__container pa-0">
    <v-row>
      <v-col cols="8 py-0">
        <v-container>
          <v-row>
            <v-col cols="12 pa-0 chart__wrapper">
              <TVChart />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12 py-0">
              <GameDashboard />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="4" class="pl-0">
        <v-container>
          <v-row>
            <GameVariables />
          </v-row>
          <v-row>
            <RankingTable />
          </v-row>
          <v-row>
            <ChatClient />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.gameView__container {
  margin-top: 40px;
  max-width: 100%;
}
</style>
<script>
import TVChart from "~/components/game/TVChartContainer";
import GameDashboard from "~/components/game/ingame/GameDashboard";
import ChatClient from "~/components/game/ChatClient";
import GameVariables from "~/components/game/ingame/GameVariables";
import RankingTable from "~/components/game/ingame/RankingTable";
export default {
  layout: "game",
  components: {
    TVChart,
    GameDashboard,
    ChatClient,
    GameVariables,
    RankingTable
  }
};
</script>
