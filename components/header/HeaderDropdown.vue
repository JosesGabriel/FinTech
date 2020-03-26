<template>
  <div>
    <v-card
      outlined
      max-width="150px"
      class="userSettings__dropdown"
      :dark="lightSwitch == 0 ? false : true"
      :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
      :class="{'userSettings__dropdown-xsOnly': $vuetify.breakpoint.xsOnly}"
    >
      <v-card-actions class="d-block">
        <v-row
          class="userSettings__settings"
          :class="lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
        >
          <v-col class="pt-0 pb-2 userSettings__dropdown--border">
            <router-link :to="$vuetify.breakpoint.mdAndUp ? '/settings' : ''" class="no-transform" :style="{ color: toggleFontColor }">
              <span class="userSettings__dropdown--settings">Settings</span>
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="padding-top: 9px;" class="ml-1 pb-0 userSettings__dropdown--border">Lights</v-col>
          <v-col
            style="padding-top: 9px;"
            class="mr-1 pb-0 pl-6 pr-0 userSettings__dropdown--border"
          >
            <v-switch v-model="lightSwitch_m" dense color="success"></v-switch>
          </v-col>
        </v-row>
        <v-row
          class="userSettings__logout"
          :class="lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover'"
        >
          <v-col style="font-size:14px;" class="text-left pl-3 pb-0 pt-2" @click="logout()">Logout</v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

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
    }),
    /**
     * Toggle font color base on current theme mode
     *
     * @return  {string}  returns color string
     */
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "black !important"
        : "white !important";
    }
  },
  watch: {
    /**
     * Watches light switch. Updates localStorage value to new value
     *
     * @return
     */
    lightSwitch_m() {
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

<style>
.userSettings__dropdown {
  position: absolute;
  top: 45px;
  right: 20px;
  margin-right: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.47);
}
.userSettings__dropdown.userSettings__dropdown-xsOnly {
  top: 52px;
  right: 4px;
}
.userSettings__dropdown--border {
  border-bottom: 1px solid rgb(182, 182, 182, 0.2);
  font-size: 14px;
}
.userSettings__logout:hover {
  cursor: pointer;
}
.v-input--switch > .v-input__control > .v-messages.theme--dark {
  display: none;
}
.v-btn:hover:before {
  background: transparent;
}
.v-input--switch__thumb {
  background-color: #03dac5;
}

.userSettings__settings {
  padding-top: 8px;
  margin-top: -9px;
  margin-left: -8px;
  margin-right: -8px;
}
.darkModeHover:hover {
  background-color: #142530;
}
.lightModeHover:hover {
  background-color: #e5e5e5;
}
.userSettings__logout {
  margin-bottom: -8px;
  padding-bottom: 10px;
  margin-left: -8px;
  margin-right: -8px;
}

.userSettings__dropdown--settings {
  font-size: 14px;
}
.userSettings__dropdown--border > .v-input--switch > .v-input__control {
  height: 30px !important;
}
.userSettings__dropdown.theme--dark:after {
  content: "";
  position: absolute;
  top: -10.5px;
  right: 11px;
  border-bottom: 10px solid #00121e;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userSettings__dropdown.theme--dark:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-bottom: 10px solid #1f2f39;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userSettings__dropdown.theme--light:after {
  content: "";
  position: absolute;
  top: -10.5px;
  right: 11px;
  border-bottom: 10px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userSettings__dropdown.theme--light:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-bottom: 10px solid rgba(0, 0, 0, 0.12);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
</style>
