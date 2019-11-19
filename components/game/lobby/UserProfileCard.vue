<template>
  <v-card max-width="344" class="mx-auto profileCard" color="#00121e" dark>
    <v-list-item class="pa-0">
      <v-list-item-avatar color="grey" tile class="ma-0" size="65px">
        <v-img src="test.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content class="profileCard__header py-0">
        <div class="container py-1">
          <div class="row">
            <div class="col-6 profileCard__header--username pl-2 py-3 pa-0">
              <span class="title">Orange </span>
            </div>
            <div class="col-6 py-0 text-center">
              <div class="text-uppercase">Rank</div>
              <span class="headline">1</span>
            </div>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="pa-0">
      <div class="container pb-0">
        <div class="row">
          <div class="col-6">
            <div class="">Winrate</div>
            <span
              class="display-1 font-weight-black profileCard__header--winrate"
              >100%</span
            >
          </div>
          <div class="col-6">
            <div class="">No. Of Games</div>
            <span class="display-1 font-weight-black text-right">420</span>
          </div>
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="pt-0">
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
            <span class="title">9,999,999</span>
          </div>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>
<style>
.profileCard__header {
  border-bottom: 2px solid #1de9b6;
  background-color: #0c1a2b;
}
.profileCard__header--username {
  border-right: 2px solid #1de9b6;
}
.profileCard__header--winrate {
  color: #1de9b6;
}
</style>
<script>
export default {
  data() {
    return {
      isLightMode: 0
    };
  },
  mounted() {
    if (localStorage.currentMode) this.isLightMode = localStorage.currentMode;
  }
};
</script>
