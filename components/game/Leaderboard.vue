<template>
  <div class="container pt-0">
    <div class="row leaderboard__header">
      <div class="col-12"><span>Leaderboard</span></div>
    </div>
    <div v-for="n in 7" :key="n" class="row leaderboard__content">
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
  background-color: black;
  color: white;
  border-bottom: 2px solid #1de9b6;
}
.leaderboard__content {
  color: white;
}
</style>
<script>
export default {
  data() {
    return {};
  }
};
</script>
