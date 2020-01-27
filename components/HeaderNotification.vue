<template>
  <div>
    <div class="userMessage__dropdown--caret"></div>
    <v-card
      :background-color="lightSwitch == 0 ? 'lightcard' : 'darkcard'"
      :dark="lightSwitch == 0 ? false : true"
      outlined
      max-height=" 445px"
      max-width="430px"
      width="430px"
      class="userMessage__dropdown"
    >
      <v-container dark class="pa-0">
        <v-row no-gutters class="userMessage_dropdown-header">
          <span class="white--text pa-4 pb-2 body-2">Notifications</span>
        </v-row>
        <v-list class="pt-0 userMessage__dropdown-body scrollbar">
          <v-list-item v-for="item in items" :key="item.title" @click>
            <v-list-item-avatar class="mr-3" size="35">
              <img src="/Icon/user-default.svg" />
            </v-list-item-avatar>

            <v-list-item-content class="py-2">
              <v-list-item-title class="caption font-weight-bold ma-0" v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle class="caption" v-text="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <span class="overline no-transform tertiary--text" v-text="item.created_at"></span>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-row no-gutters class="userMessage_dropdown-footer text-center">
          <span class="white--text pa-2 caption d-block seeall_dropdown-footer">See All</span>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
  data() {
    return {
      items: [
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Lyduz Public Community",
          subtitle: "All Things Tradings",
          created_at: "a few seconds ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Traders Lounge",
          subtitle: "Ms. Gandah’s Trading Strategies",
          created_at: "3 minutes ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Feedback and Suggestions",
          subtitle: "How do we improve Lyduz",
          created_at: "2 hours ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Charting + News",
          subtitle: "Share your chart picks and latest news updates!",
          created_at: "a week ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Master Lists",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "asdasd asdasd",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "sdgdsagds safasfasf",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "dgsdgsdgsdg",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "afasfasfasf",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "afasfa123sfasf",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "afas31423rdsffasfasf",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "afasfa231423fdssfasf",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "afasfa123123sfasf",
          subtitle: "Free Watchlist’s",
          created_at: "2 months ago"
        }
      ]
    };
  },
  mounted() {
    console.log("profile");
  }
};
</script>
<style scoped>
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