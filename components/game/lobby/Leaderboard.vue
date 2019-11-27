<template>
  <div class="container pt-0 d-flex leaderboard__wrap transparent">
    <div class="row leaderboard__header">
      <div class="col-12 pa-0">
        <span class="text--green subtitle-1">Leaderboard</span>
      </div>
    </div>
    <div v-for="n in 10" :key="n" class="leaderboard__list row mb-1">
      <div class="col-2 title py-0 pt-2">{{ n }}</div>
      <div class="col-2 px-0 py-0 pt-2">
        <v-avatar class="profile" color="grey" size="30">
          <v-img src="test.jpg"></v-img>
        </v-avatar>
      </div>
      <div class="col-5 pa-0 pt-1">
        <div>Orange</div>
        <div class="tiny-font">
          <span style="color: #bdbdbd">Winrate 100% | Coins 10,000</span>
        </div>
      </div>
      <div class="col-3">
        <v-icon dark>mdi-flower-outline</v-icon>
      </div>
    </div>
  </div>
</template>
<style>
/* .leaderboard__header {
  background-color: #0c1a2b;
  color: white;
  border-bottom: 2px solid #1de9b6;
} */
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
  height: calc(100vh - 225px);
}
.leaderboard__list {
  /* align-self: flex-start; */
  /* max-width: 70%; */
  display: inline-flex;
  background-color: #03232f;
  border-radius: 6px;
}
</style>
<script>
export default {
  data() {
    return {};
  }
};
</script>
