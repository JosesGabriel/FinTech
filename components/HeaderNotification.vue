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
      <v-container :dark="lightSwitch == 0 ? false : true" class="pa-0 pt-3">
        <v-list class="py-0 userMessage__dropdown-body scrollbar">
          <NotificationCard
            v-if="index <= 2"
            v-for="(item, index) in dataNotification"
            :key="index"
            :notification="item"
            @click="closeDropdown()"
          />
        </v-list>
        <v-row no-gutters class="userMessage__dropdown-footer">
          <router-link
            to="/notification"
            class="no-transform userMessage__dropdown-link text-center"
          >
            <span
              @click="closeDropdown()"
              :class="lightSwitch == 0 ? 'black--text' : 'white--text'"
              class="pa-2 caption d-block seeall_dropdown-footer"
            >See All</span>
          </router-link>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import NotificationCard from "./notification/NotificationCard";

export default {
  components: {
    NotificationCard
  },
  props: {
    dataNotification: {
      default() {
        return [];
      },
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    }
  },
  methods: {
    closeDropdown(event) {
      this.$emit("clicked");
    }
  }
};
</script>
<style scoped>
.seeall_dropdown-footer {
  width: 100%;
}
.userMessage__dropdown.theme--dark .userMessage__dropdown-header {
  background: #00121e;
}
.userMessage__dropdown.theme--light .userMessage__dropdown-header {
  background: rgb(155, 151, 151);
}
.userMessage__dropdown.theme--dark .userMessage__dropdown-footer {
  background: #00121e;
}
.userMessage__dropdown.theme--light .userMessage__dropdown-footer {
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
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.47);
}
.userMessage__dropdown--caret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid rgba(216, 216, 216, 0.62);
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
.userMessage__dropdown-link {
  width: 100%;
}
</style>

<style>
.userMessage__dropdown-title {
  font-weight: 700;
  white-space: normal;
  white-space: inherit;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.listItem__content {
  align-items: unset !important;
}
</style>