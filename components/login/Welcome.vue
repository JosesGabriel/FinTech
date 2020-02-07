<template>
  <v-card height="584px" :dark="isLightMode == 0 ? false : true">
    <div
      class="display-1 font-weight-bold loginCard--intro text-center py-2 pt-6"
    >
      Welcome to the community!
    </div>
    <div class="body-2 text-center">
      Check your email to verify your account
    </div>
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <v-row class="login__cardtext">
          <v-col cols="12" class="pa-0">
            <v-img src="/login/castle.png" contain></v-img>
          </v-col>
        </v-row>
        <div class="body-2 text-center login__cardtext">
          What's a humble brag between peers? <br />Let them know you're in
        </div>
        <div class="body-2 text-center">
          <v-hover v-slot:default="{ hover }">
            <v-btn x-large class="display-1 mr-4" icon>
              <v-icon x-large :color="!hover ? '' : 'success'"
                >mdi-facebook</v-icon
              >
            </v-btn>
          </v-hover>
          <v-hover v-slot:default="{ hover }" x-large>
            <v-btn class="display-1 mr-4" icon>
              <v-icon x-large :color="!hover ? '' : 'success'"
                >mdi-twitter</v-icon
              >
            </v-btn>
          </v-hover>
        </div>
      </v-container>
    </v-card-text>
    <a
      class="float-right secondarytext--text skip__btn font-weight-bold overline"
      @click="$emit('stepper', 2)"
      >Skip</a
    >
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    isLightMode: 0
  }),
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>

<style></style>
