<template>
  <v-card
    :dark="lightSwitch == 0 ? false : true"
    color="transparent"
    flat
    :loading="loader"
    ><div class="container pt-0 d-flex leaderboard__wrap transparent">
      <div class="row leaderboard__header">
        <div class="col-12 pa-0">
          <span class="text--green subtitle-1">Leaderboard</span>
        </div>
      </div>
      <div
        v-for="n in leaderboardObject.length"
        :key="n"
        class="leaderboard__list row mb-1 pt-2"
        :class="
          lightSwitch == 0
            ? 'leaderboard__list--light'
            : 'leaderboard__list--dark'
        "
      >
        <div class="col-2 title py-0">{{ n }}</div>
        <div class="col-2 px-0 py-0 pt-">
          <v-avatar class="profile" color="grey" size="30">
            <v-img src="test.jpg"></v-img>
          </v-avatar>
        </div>
        <div class="col-5 pa-0">
          <div style="font-size: 0.8em;" class="font-weight-black">
            Joses
          </div>
          <div class="tiny-font">
            <span
              >Winrate
              <strong>{{ leaderboardObject[n - 1].win_percentage }}%</strong> |
              Coins <strong>{{ leaderboardObject[n - 1].coins }}</strong></span
            >
          </div>
        </div>
        <div class="col-3 pa-0">
          <v-avatar class="profile" color="grey" size="30">
            <v-img src="/badges/badge.svg"></v-img>
          </v-avatar>
        </div>
      </div></div
  ></v-card>
</template>
<style>
.tiny-font {
  font-size: 0.525rem;
}
.leaderboard__content {
  color: white;
}
.leaderboard__wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: auto;
  height: calc(100vh - 221px);
}
.leaderboard__list {
  display: inline-flex;
  border-radius: 6px;
}
.leaderboard__list--dark {
  background-color: #03232f;
}
.leaderboard__list--light {
  background-color: #e6efed;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loader: false,
      leaderboardObject: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted: function() {
    this.loadLeaderboards();
  },
  methods: {
    loadLeaderboards() {
      this.loader = "primary";
      this.$api.game.leaderboards
        .index()
        .then(response => {
          if (response.success) {
            this.leaderboardObject = response.data.players;
            this.loader = false;
            return true;
          }
        })
        .catch(e => {
          return false;
        });
    }
  }
};
</script>
