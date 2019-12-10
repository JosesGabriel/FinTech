<template>
  <v-card
    class="mb-3"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
  >
    <div class="pa-0 pl-2">
      <div class="body-2 font-weight-black">Suggested Traders</div>
      <v-divider></v-divider>
      <v-list class="transparent">
        <v-list-item v-for="n in 5" :key="n" class="px-0 mb-2">
          <div>
            <v-avatar class="mr-2" color="grey" size="35">
              <v-img src="test.jpg"></v-img>
            </v-avatar>
          </div>
          <div class="no-wrap caption">
            <span class="font-weight-medium">Lakeith Hathfield</span><br />
            <span style="font-size: 11px;">420 Friends</span>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon color="success"
              ><v-icon>mdi-account-multiple-plus</v-icon></v-btn
            >
          </div>
        </v-list-item>
        <router-link to="/login" class="whoToMingle__link--viewMembers caption">
          Show more
        </router-link>
      </v-list>
    </div>
  </v-card>
</template>
<style scoped>
.whoToMingle__link--viewMembers {
  text-decoration: none;
}
.no-wrap {
  white-space: nowrap;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
