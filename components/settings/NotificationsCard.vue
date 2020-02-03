<template>
  <div>
    <v-toolbar
      class="settings__toolbar"
      flat
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-toolbar-title><strong>Notifications</strong></v-toolbar-title>
    </v-toolbar>
    <v-divider
      class="settings__divider"
      :dark="lightSwitch == 0 ? false : true"
      vertical
    ></v-divider>

    <v-card
      color="transparent"
      min-height="400"
      :dark="lightSwitch == 0 ? false : true"
      flat
    >
      <v-card-text class="py-0">
        <v-container>
          <v-row>
            <span>Notification Channel</span>
          </v-row>
          <v-row>
            <span class="ml-6 my-1">Vyndue</span>
          </v-row>
          <v-row>
            <span class="ml-6 my-1">Email</span>
          </v-row>
          <v-row>
            <span class="ml-6 my-1">Push Notifications</span>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <span>Messages</span>
          </v-row>
          <v-row>
            <v-col cols="5">
              <span>Who can send you messages? </span>
            </v-col>
            <v-col cols="5">
              <span>Everyone</span>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn text class="no-transform">Change</v-btn>
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
  data() {
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
