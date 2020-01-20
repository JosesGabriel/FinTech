<template>
  <div>
    <v-toolbar
      class="settings__toolbar"
      flat
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-toolbar-title
        ><strong>Subscriptions And Payments</strong></v-toolbar-title
      >
    </v-toolbar>
    <v-divider
      class="settings__divider"
      :dark="lightSwitch == 0 ? false : true"
      vertical
    ></v-divider>

    <v-card
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
      flat
      min-height="400"
    >
      <v-card-text class="py-0">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <span>Go ALPHA</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span>Purchase History</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span>Saved Payment Methods</span>
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
