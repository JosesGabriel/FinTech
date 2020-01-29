<template>
  <div>
    <div class="userMessage__dropdown--caret"></div>
    <v-card
      :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
      :dark="lightSwitch == 0 ? false : true"
      outlined
      max-height="445px"
      max-width="350px"
      width="350px"
      class="userMessage__dropdown"
    >
      <v-container :dark="lightSwitch == 0 ? false : true" class="pa-0">
        <v-row no-gutters class="userMessage_dropdown-header">
          <span class="pa-4 pb-2 body-2">Notifications</span>
        </v-row>
        <v-list class="py-0 userMessage__dropdown-body scrollbar">
          <v-list-item v-for="item in message" :key="item.index" @click three-line>
            <v-list-item-avatar class="mr-3" size="35">
              <img :src="item.sender_picture" />
            </v-list-item-avatar>

            <v-list-item-content class="py-2">
              <v-list-item-subtitle class="body-2 ma-0 userMessage_dropdown-title">
                {{ item.full_name }}
                <span class="body-2 ma-0">{{ item.message }}</span>
              </v-list-item-subtitle>
              <span class="caption tertiary--text">{{ localFormat(new Date(), "fn") }}</span>
            </v-list-item-content>

            <v-list-item-action></v-list-item-action>
          </v-list-item>
        </v-list>
        <v-row no-gutters class="userMessage_dropdown-footer text-center">
          <span class="pa-2 caption d-block seeall_dropdown-footer">See All</span>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { LocalFormat } from "~/assets/js/helpers/datetime";

export default {
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      notification: "global/getNotification"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    }
  },
  data() {
    return {
      message: []
    };
  },
  watch: {
    notification() {
        this.message.unshift(this.notification)
    }
  },
  mounted() {
    console.log(this.notification);
  },
  methods: {
      localFormat : LocalFormat
  }
};
</script>
<style scoped>
.userMessage_dropdown-title {
  font-weight: 700;
}
.seeall_dropdown-footer {
  width: 100%;
}
.userMessage__dropdown.theme--dark .userMessage_dropdown-header {
  background: #00121e;
}
.userMessage__dropdown.theme--light .userMessage_dropdown-header {
  background: #fff;
}
.userMessage__dropdown.theme--dark .userMessage_dropdown-footer {
  background: #00121e;
}
.userMessage__dropdown.theme--light .userMessage_dropdown-footer {
  background: #fff;
}
.userMessage__dropdown-body {
  overflow: auto;
  max-height: 360px;
}
/* Notification dropdown */
.userMessage__dropdown {
  position: absolute;
  top: 40px;
  right: 216px;
  margin-right: 10px;
}
.userMessage__dropdown--caret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid rgb(182, 182, 182, 0.2);
  position: absolute;
  right: 237px;
  top: 33px;
}
.userMessage__dropdown--border {
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
  background-color: #b2b7bb;
}
.userSettings__logout {
  margin-bottom: -8px;
  padding-bottom: 10px;
  margin-left: -8px;
  margin-right: -8px;
}

.userMessage__dropdown--settings {
  font-size: 14px;
}
.userMessage__dropdown--border > .v-input--switch > .v-input__control {
  height: 30px !important;
}
</style>