<template>
  <div>
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
            class="no-transform"
          >
            <span
              @click="closeDropdown()"
              :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              class="pa-2 caption seeall_dropdown-footer"
            >See All</span>
          </router-link>
          <v-spacer></v-spacer>
          <span
            @click="markAllRead"
            class="markAll_btn caption py-1 px-3"
            :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
          >Mark all as read</span>
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
    markAllRead() {
      this.dataNotification.filter(x =>
        x.status == "unread" ? (x.status = "read") : (x.status = "read")
      );

      this.$api.social.notification.markall().then(response => {
        if (response.success) {
        }
      });
    },
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
.userMessage__dropdown.theme--dark .userMessage__dropdown-footer {
  background: #00121e;
  border-radius: 10px;
}
.userMessage__dropdown.theme--light .userMessage__dropdown-footer {
  background: #fff;
  border-radius: 10px;
}
.userMessage__dropdown-body {
  overflow: auto;
  max-height: 360px;
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
}
/* Notification dropdown */
.userMessage__dropdown {
  position: absolute;
  top: 45px;
  right: 248px;
  margin-right: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.47);
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
.markAll_btn {
  cursor: pointer;
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
.userMessage__message {
  line-height: 15px !important;
  display: block;
}
.userMessage__dropdown.theme--dark:after {
  content: "";
  position: absolute;
  top: -10.5px;
  right: 11px;
  border-bottom: 10px solid #00121e;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userMessage__dropdown.theme--dark:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-bottom: 10px solid #1f2f39;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userMessage__dropdown.theme--light:after {
  content: "";
  position: absolute;
  top: -10.5px;
  right: 11px;
  border-bottom: 10px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userMessage__dropdown.theme--light:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-bottom: 10px solid rgba(0, 0, 0, 0.12);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
</style>