<template>
  <v-container class="page__wrapper">
    <v-row class="mb-5" no-gutters>
      <v-col cols="12">
        <v-tabs
          active-class="success--text"
          background-color="transparent"
          vertical
          hide-slider
          :dark="lightSwitch == 0 ? false : true"
        >
          <v-tab class="no-transform caption settings__tabs">
            Account
          </v-tab>
          <!-- <v-tab class="no-transform caption settings__tabs">
            Subscription and Payments
          </v-tab> -->
          <v-tab class="no-transform caption settings__tabs">
            Privacy Settings
          </v-tab>
          <!-- <v-tab class="no-transform caption settings__tabs">
            Ads
          </v-tab> -->
          <v-tab class="no-transform caption settings__tabs">
            Notifications
          </v-tab>
          <v-tab-item>
            <AccountCard @alert="showAlert" />
          </v-tab-item>
          <!-- <v-tab-item>
            <PaymentsCard />
          </v-tab-item> -->
          <v-tab-item>
            <PrivacyCard />
          </v-tab-item>
          <!-- <v-tab-item>
            <AdsCard />
          </v-tab-item> -->
          <v-tab-item>
            <NotificationsCard />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-snackbar v-model="alert" :color="alertState ? 'success' : 'error'">
      {{ alertMessage }}
      <v-btn color="white" text @click="alert = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
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
  data() {
    return {
      alert: false,
      alertState: "",
      alertMessage: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted: function() {},
  methods: {
    showAlert(alert) {
      this.alert = true;
      this.alertState = alert[0];
      this.alertMessage = alert[1];
    }
  }
};
</script>
<style>
/* DONT TOUCH, call Joses if you really want to change this */
.v-slide-group__content.v-tabs-bar__content {
  align-items: flex-end;
}
.settings__divider {
  position: absolute;
}
.settings__tabs {
  position: relative;
  top: 50px;
}
</style>
