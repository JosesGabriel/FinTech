<template>
  <div class="container pt-0 d-flex leaderboard__wrap">
    <div class="row leaderboard__header">
      <div class="col-12"><span>Leaderboard</span></div>
    </div>
    <div v-for="n in 9" :key="n" class="leaderboard__list row">
      <div class="col-2 title pb-0">{{ n }}</div>
      <div class="col-2 px-0 pt-4 pb-0">
        <v-avatar class="profile" color="grey" size="34" tile>
          <v-img src="test.jpg"></v-img>
        </v-avatar>
      </div>
      <div class="col-8 pb-0">
        <div>Orange</div>
        <div class="caption">
          <span>100%</span>
          <span class="float-right">9,999,999</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.leaderboard__header {
  background-color: #0c1a2b;
  color: white;
  border-bottom: 2px solid #1de9b6;
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
  height: calc(100vh - 448px);
}
.leaderboard__list {
  align-self: flex-start;
  max-width: 70%;
  display: inline-flex;
}
</style>
<script>
export default {
  data() {
    return {};
  }
};
</script>
