<template>
  <div>
    <div class="userSettings__dropdown--caret"></div>
    <v-card
      :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
      :dark="lightSwitch == 0 ? false : true"
      outlined
      max-width="150px"
      class="userSettings__dropdown"
    >
      <v-card-actions class="d-block">
        <router-link to="/settings" class="no-transform">
          <v-btn outlined text block class="mb-2">Settings</v-btn></router-link
        >
        <v-btn outlined text block @click="logout()">Logout</v-btn>
        <v-switch
          v-model="lightSwitch_m"
          color="warning"
          :label="lightSwitch_m ? 'Light' : 'Dark'"
        ></v-switch>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style>
.userSettings__dropdown {
  position: absolute;
  top: 53px;
  right: 10px;
  margin-right: 10px;
}
.userSettings__dropdown--caret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid rgb(182, 182, 182, 0.2);
  position: absolute;
  right: 40px;
  top: 36px;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      alert: false,
      alertState: false,
      alertMessage: "",
      lightSwitch_m: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    lightSwitch_m: function() {
      this.setLightSwitch(this.lightSwitch_m ? 0 : 1);
      localStorage.currentMode = this.lightSwitch;
    }
  },
  mounted() {
    this.lightSwitch_m = this.lightSwitch == 0 ? true : false;
  },
  methods: {
    ...mapActions({
      setLightSwitch: "global/setLightSwitch"
    }),
    /**
     * fires when user clicks logout button
     *
     * @return
     */
    logout() {
      this.$auth.logout();
    }
  }
};
</script>
