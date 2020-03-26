<template>
  <div
    @click="closeDropdown()"
    :width="$vuetify.breakpoint.smAndUp ? '350px' : '95%'"
    :background="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
    :class="[($vuetify.breakpoint.smAndUp ? 'userMessage__dropdown-smAndUp' : 'userMessage__dropdown-smAndDown'), (lightSwitch == 1 ? 'darkmode' : 'lightmode')]"
    class="userMessage__dropdown"
    max-height="445px"
    max-width="95%"
  >
    <v-list class="py-0 userMessage__dropdown-body scrollbar">
      <NotificationCard
        v-for="(item, index) in dataNotification"
        v-if="index <= 5"
        :key="index"
        :notification="item"
      />
      <span
        v-if="dataNotification.length == 0"
        class="caption d-flex justify-center py-3"
      >No notification yet.</span>
    </v-list>
    <v-row no-gutters class="userMessage__dropdown-footer">
      <router-link to="/notification" class="no-transform">
        <span
          :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
          class="pa-2 caption seeall_dropdown-footer"
          @click="closeDropdown()"
        >See All</span>
      </router-link>
      <v-spacer></v-spacer>
      <span
        class="markAll_btn caption py-1 px-3"
        :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
        @click="markAllRead"
      >Mark all as read</span>
    </v-row>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import NotificationCard from "~/components/notification/NotificationCard";

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
    /**
     * toggle font color base on current theme mode
     *
     * @return  {string}  return string
     */
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "black !important"
        : "white !important";
    }
  },
  methods: {
    ...mapActions({
      setMarkAll: "global/setMarkAll"
    }),
    /**
     * Fires when mark all as unread button is clicked
     * Then emit dropdown to close
     *
     * @return  {string}  returns object
     */
    markAllRead() {
      this.dataNotification.filter(x =>
        x.status == "unread" ? (x.status = "read") : (x.status = "read")
      );

      this.$api.social.notification.markall().then(response => {
        if (response.success) {
          this.$emit("clicked");
          let counter = 0;
          this.setMarkAll((counter += 1));
        }
      });
    },
    /**
     * Execute this function when closeDropdown is called
     *
     * @return  {string}         emit bolean to parent component
     */
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
  max-height: 400px;
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
}
/* Notification dropdown */
.userMessage__dropdown.darkmode {
  border: thin solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}
.userMessage__dropdown.lightmode {
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
.userMessage__dropdown-smAndUp {
  position: absolute;
  top: 45px;
  right: 168px;
  margin-right: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.12);
}
.userMessage__dropdown-smAndDown {
  margin: 0 5px;
  position: absolute;
  top: 52px;
  right: 0;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.47);
}
.userMessage__dropdown-smAndUp:after {
  content: "";
  position: absolute;
  top: -9px;
  right: 11px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userMessage__dropdown-smAndDown:after {
  content: "";
  position: absolute;
  top: -9px;
  right: 112px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userMessage__dropdown-smAndUp:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 11px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.userMessage__dropdown-smAndDown:before {
  content: "";
  position: absolute;
  top: -11px;
  right: 112px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

.userMessage__dropdown-smAndUp.darkmode:after,
.userMessage__dropdown-smAndDown.darkmode:after {
  border-bottom: 10px solid #00121e;
}
.userMessage__dropdown-smAndUp.darkmode:before,
.userMessage__dropdown-smAndDown.darkmode:before {
  border-bottom: 10px solid rgba(255, 255, 255, 0.12);
}
.userMessage__dropdown-smAndUp.lightmode:after,
.userMessage__dropdown-smAndDown.lightmode:after {
  border-bottom: 10px solid #f2f2f2;
}
.userMessage__dropdown-smAndUp.lightmode:before,
.userMessage__dropdown-smAndDown.lightmode:before {
  border-bottom: 10px solid rgba(0, 0, 0, 0.12);
}

/* end */
.markAll_btn {
  cursor: pointer;
}
.darkmode {
  background: #00121e;
}
.lightmode {
  background: #f2f2f2;
}
</style>