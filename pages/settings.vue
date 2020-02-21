<template>
  <v-container class="page__wrapper">
    <v-row class="mb-5" no-gutters>
      <v-col cols="12">
        <v-tabs
          active-class="tertiary--text"
          background-color="transparent"
          vertical
          hide-slider
          :dark="lightSwitch == 0 ? false : true"
        >
          <v-tab class="no-transform caption font-weight-bold settings__tabs">
            <span :class="fontColorPrimary" class="text-right">Account</span>
          </v-tab>
          <!-- TODO put back when endpoints are functional -->
          <!-- <v-tab class="no-transform caption settings__tabs">
            Privacy Settings
          </v-tab>
          <v-tab class="no-transform caption settings__tabs">
            Notifications
          </v-tab>-->
          <v-tab-item>
            <AccountCard @alert="showAlert" />
          </v-tab-item>
          <v-tab-item>
            <!-- <PrivacyCard /> -->
          </v-tab-item>
          <v-tab-item>
            <!-- <NotificationsCard /> -->
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountCard from "~/components/settings/AccountCard.vue";
import AdsCard from "~/components/settings/AdsCard.vue";
import NotificationsCard from "~/components/settings/NotificationsCard.vue";
import PaymentsCard from "~/components/settings/PaymentsCard.vue";
import PrivacyCard from "~/components/settings/PrivacyCard.vue";
export default {
  layout: "main",
  components: {
    AccountCard,
    AdsCard,
    NotificationsCard,
    PaymentsCard,
    PrivacyCard
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    fontColorPrimary() {
      return this.lightSwitch == 1 ? "white--text" : "black--text";
    }
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    /**
     * Fires global snackbar alert
     *
     * @param   {object}  alert
     *
     * @return
     */
    showAlert(alert) {
      let alertM = {
        model: true,
        state: alert[0],
        message: alert[1]
      };
      this.setAlert(alertM);
    }
  }
};
</script>

<style>
/* DONT TOUCH, call Joses if you really want to change this */
.v-slide-group__content.v-tabs-bar__content span {
  width: 100%;
}
.settings__divider {
  position: absolute;
}
.settings__tabs {
  position: relative;
  top: 61px;
}
</style>
