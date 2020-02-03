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
        <v-row class="userSettings__settings"  :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover' " >
          <v-col class="pt-0 pb-2 userSettings__dropdown--border">
              <router-link to="/settings" class="no-transform" :style="{ color: toggleFontColor }">
                <span class="userSettings__dropdown--settings"> Settings</span>
              </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="padding-top: 9px;" class="ml-1 pb-0 userSettings__dropdown--border">
              Lights
          </v-col>
           <v-col style="padding-top: 9px;" class="mr-1 pb-0 pl-6 pr-0 userSettings__dropdown--border">
               <v-switch
                dense
                v-model="lightSwitch_m"
                color="success"
              ></v-switch>
          </v-col>
        </v-row>
        <v-row class="userSettings__logout"  :class="this.lightSwitch == 0 ? 'lightModeHover' : 'darkModeHover' ">
          <v-col  @click="logout()"  style="font-size:14px;" class="text-left pl-3 pb-0 pt-2">
            <!--<v-btn 
              class="ml-1 pt-2 text-capitalize userSettings__logoutBtn"  
              text 
              style="font-size:14px;"
              @click="logout()"
              >Logout</v-btn> --> 
              Logout
          </v-col>   
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
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
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
  top: 40px;
  right: 20px;
  margin-right: 10px;
  box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 4px 7px 4px rgba(0, 0, 0, 0.14), 0px 5px 5px 0px rgba(0, 0, 0, 0.12);

}
.userSettings__dropdown--caret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid rgb(182, 182, 182, 0.2);
  position: absolute;
  right: 40px;
  top: 33px;
}
.userSettings__dropdown--border {
  border-bottom:  1px solid rgb(182, 182, 182, 0.2);
  font-size: 14px;
}
.userSettings__logout:hover{
  cursor: pointer;
}
.v-input--switch > .v-input__control > .v-messages.theme--dark{
  display: none;
}
.v-btn:hover:before{
  background: transparent;
}
.v-input--switch__thumb {
  background-color: #03dac5;
}

.userSettings__settings{
  padding-top: 8px;
  margin-top: -9px;
  margin-left: -8px;
  margin-right: -8px;
}
.darkModeHover:hover{
  background-color: #142530;
}
.lightModeHover:hover{
  background-color: #E5E5E5;
}
.userSettings__logout{
  margin-bottom: -8px;
  padding-bottom: 10px;
  margin-left: -8px;
  margin-right: -8px;
}

.userSettings__dropdown--settings{
  font-size: 14px;
}
.userSettings__dropdown--border > .v-input--switch > .v-input__control {
  height: 30px !important;
}
</style>
