<template>
  <div>
    <v-toolbar
      class="settings__toolbar"
      flat
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-toolbar-title><strong>Advertisement Settings</strong></v-toolbar-title>
    </v-toolbar>
    <v-divider
      class="settings__divider"
      :dark="lightSwitch == 0 ? false : true"
      vertical
    ></v-divider>

    <v-card color="transparent" :dark="lightSwitch == 0 ? false : true" flat>
      <v-card-text class="py-0">
        <v-container class="pa-0">
          <v-row v-for="n in settingsLabelList.length" :key="n">
            <v-col cols="4">
              <span>{{ settingsLabelList[n - 1] }}</span>
            </v-col>
            <v-col cols="6">
              <span>John Paul George</span>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn text class="no-transform">Change</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <a>Feed Preferences</a>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <a>Delete Your Account and Information</a>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      settingsLabelList: [
        "Name",
        "User Account",
        "Contact",
        "Email Address",
        "Password"
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
