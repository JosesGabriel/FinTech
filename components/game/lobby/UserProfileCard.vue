<template>
  <v-card
    class="mx-auto profileCard"
    color="transparent"
    flat
    :dark="lightSwitch == 0 ? false : true"
  >
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
        <div class="container py-0">
          <div class="row">
            <div class="col-12 profileCard__header--username py-0">
              <span class="headline success--text font-weight-bold"
                >{{ $auth.loggedIn ? $auth.user.data.user.username : "Guest" }}
              </span>
            </div>
            <div class="col-12 py-0">
              <v-avatar class="profile" color="grey" size="30">
                <v-img src="/badges/badge.svg"></v-img>
              </v-avatar>
              <span>Archon</span>
            </div>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-text
      class="pa-0 playerStats__container mt-2"
      :class="
        lightSwitch == 0
          ? 'playerStats__container--light'
          : 'playerStats__container--dark'
      "
    >
      <div class="container py-0">
        <div class="row">
          <div class="col-4 text-center py-0 px-0">
            <span
              class="font-weight-black"
              :style="lightSwitch == 0 ? 'color: black;' : 'color: white;'"
              >Winrate</span
            ><br />
            <span class="title font-weight-medium success--text"
              >{{ playerData.win_percentage }}%</span
            >
          </div>
          <div class="col-4 text-center py-0 px-0">
            <span class="font-weight-black" :style="lightSwitch == 0 ? 'color: black;' : 'color: white;'"
              >Rank</span
            ><br />
            <span class="title font-weight-medium success--text">{{
              playerData.ranking
            }}</span>
          </div>
          <div class="col-4 text-center py-0 px-0">
            <span
              class="caption no-wrap font-weight-black"
              :style="lightSwitch == 0 ? 'color: black;' : 'color: white;'"
            >
              No. Of Games </span
            ><br />
            <span class="title font-weight-medium success--text">{{
              playerData.series_played_count
            }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <div class="container pa-0">
      <div class="row">
        <div class="col-12 py-0">
          <div class="row">
            <div class="col-12 d-flex justify-space-between py-0 pt-2">
              <div>
                <span>Lydian </span>
                <span>{{ playerData.coins }}</span>
              </div>
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
  border-bottom: 2px solid #03dac5;
  background-color: #0c1a2b;
}
.profileCard__header--username {
  border-right: 2px solid #03dac5;
} */
.avatar__img--border {
  border: 5px solid #03dac5;
}
.no-wrap {
  white-space: nowrap;
}
.playerStats__container--dark {
  border: 1px solid #03dac5;
  background-color: #014241;
}
.playerStats__container--light {
  background-color: #e6efed;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isLightMode: 0
    };
  },
  computed: {
    ...mapGetters({
      playerData: "game/getPlayerData",
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  }
};
</script>
