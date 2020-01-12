<template>
  <div>
    <v-toolbar
      class="settings__toolbar"
      flat
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-toolbar-title><strong>Privacy Settings</strong></v-toolbar-title>
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
        <v-expansion-panels flat>
          <v-expansion-panel v-for="n in privacyLabelList.length" :key="n">
            <v-expansion-panel-header
              :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
              >{{ privacyLabelList[n - 1] }}</v-expansion-panel-header
            >
            <v-expansion-panel-content
              :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
            >
              <v-container class="py-0"
                ><v-row
                  v-for="i in profilePrivacyOptions[n - 1].length"
                  :key="i"
                >
                  <v-col cols="5">
                    <span>{{ profilePrivacyOptions[n - 1][i - 1] }}</span>
                  </v-col>
                  <v-col cols="5">
                    <v-row
                      v-if="privacyToggleMode && currentSettingIndex == i - 1"
                    >
                      <v-col cols="12"
                        ><v-select
                          :items="privacyOptions"
                          placeholder="Public"
                          dense
                          hide-details
                          success
                          outlined
                          @change="currentSetting = $event"
                        ></v-select
                      ></v-col>
                    </v-row>
                    <span v-else>Public</span>
                  </v-col>
                  <v-col cols="2" class="pa-0">
                    <v-btn
                      v-if="privacyToggleMode && currentSettingIndex == i - 1"
                      text
                      class="no-transform"
                      @click="updateAccount"
                      >Save</v-btn
                    >
                    <v-btn
                      v-else
                      text
                      class="no-transform"
                      @click="
                        (privacyToggleMode = !privacyToggleMode),
                          (currentSettingIndex = i - 1)
                      "
                      >Change</v-btn
                    >
                  </v-col>
                </v-row></v-container
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      privacyLabelList: ["Profile"],
      profilePrivacyOptions: [
        [
          "Who can see your profile?",
          "Who can connect with you?",
          "Who can follow you?",
          "Who can see your connections?"
        ]
      ],
      privacyToggleMode: false,
      currentSettingIndex: "",
      privacyOptions: ["Public", "Only Me"],
      currentSetting: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {},
  methods: {
    showAlert(alert) {
      this.alert = true;
      this.alertState = alert[0];
      this.alertMessage = alert[1];
    },
    updateAccount() {
      console.log(
        "Update option at index [ " +
          this.currentSettingIndex +
          " ] with the new value of [ " +
          this.currentSetting +
          " ]"
      );
      //READY TO POST TO ENDPOINT
      // this.$api.accounts.updateSettings
      //   .putnoid(payload)
      //   .then(response => {
      //     this.alert.push(true);
      //     this.alert.push(response.message);
      //   })
      //   .catch(e => {
      //     this.alert.push(false);
      //     this.alert.push("Error Updating");
      //   })
      //   .finally(
      //     function() {
      //       this.cardLoader = false;
      //       this.$emit("alert", this.alert);
      //     }.bind(this)
      //   );
      this.currentSetting = "";
      this.privacyToggleMode = false;
    }
  }
};
</script>
