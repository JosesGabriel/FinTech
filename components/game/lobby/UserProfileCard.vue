<template>
  <v-card max-width="344" class="mx-auto profileCard" color="#00121e" flat dark>
    <v-list-item class="pa-0">
      <v-list-item-avatar color="grey" class="ma-0" size="65px">
        <v-img
          class="avatar__img--border"
          :src="
            $auth.loggedIn ? $auth.user.data.user.profile_image : 'default.png'
          "
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content class="profileCard__header py-0">
        <div class="container py-1">
          <div class="row">
            <div class="col-12 profileCard__header--username py-0">
              <span class="headline text--green font-weight-bold"
                >{{ $auth.loggedIn ? $auth.user.data.user.username : "Guest" }}
              </span>
            </div>
            <div class="col-12 py-0">
              <span>Lydian</span>
              <span>{{ playerCoins }}</span>
            </div>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="pa-0 playerStats__container mt-2">
      <div class="container py-0">
        <div class="row">
          <div class="col-4 text-center py-1 px-0">
            <span>Winrate</span><br />
            <span class="title font-weight-medium text--green">100%</span>
          </div>
          <div class="col-4 text-center py-1 px-0">
            <span>Rank</span><br />
            <span class="title font-weight-medium text--green">{{
              playerRanking
            }}</span>
          </div>
          <div class="col-4 text-center py-1 px-0">
            <span class="caption no-wrap"> No. Of Games </span><br />
            <span class="title font-weight-medium text--green">420</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <div class="container pa-0">
      <div class="row">
        <div class="col-12 py-0">
          <div class="row">
            <div class="col-12 d-flex justify-space-between py-0 pt-1">
              <v-btn icon small>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn outlined color="success" small>Play Game</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <v-card-actions class="pt-0">
      <div class="container py-0">
        <div class="row">
          <div class="col-6">
            <span>
              <v-icon>
                mdi-coins
              </v-icon></span
            >
          </div>
          <div class="col-6">
            <span class="title">{{ playerCoins }}</span>
          </div>
        </div>
      </div>
    </v-card-actions> -->
  </v-card>
</template>
<style>
/* .profileCard__header {
  border-bottom: 2px solid #1de9b6;
  background-color: #0c1a2b;
}
.profileCard__header--username {
  border-right: 2px solid #1de9b6;
} */
.avatar__img--border {
  border: 5px solid #1de9b6;
}
.no-wrap {
  white-space: nowrap;
}
.playerStats__container {
  background-color: #014241;
  border: 1px solid #1de9b6;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isLightMode: 0
    };
  },
  computed: {
    ...mapGetters({
      playerRanking: "game/getPlayerRanking",
      playerCoins: "game/getPlayerCoins"
    })
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  }
};
</script>
