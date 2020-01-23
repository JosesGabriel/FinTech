<template>
  <v-card class="transparent__bg" dark elevation="0">
    <v-container dark class="pr-md-0 pr-lg-0">
      <v-row no-gutters class="heading-underline">
        <span class="white--text pa-2 d-block font-weight-bold subtitle-1">Vyndue Rooms</span>
      </v-row>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" @click>
          <v-list-item-avatar class="mr-3" size="35">
            <img src="/Icon/user-default.svg" />
          </v-list-item-avatar>

          <v-list-item-content class="py-2">
            <v-list-item-title class="caption font-weight-bold ma-0" v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle class="caption" v-text="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              outlined
              color="success"
              x-small
              class="text-capitalize font-weight-bold"
              rounded
            >Join</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Lyduz Public Community",
          subtitle: "All Things Tradings"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Traders Lounge",
          subtitle: "Ms. Gandah’s Trading Strategies"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Feedback and Suggestions",
          subtitle: "How do we improve Lyduz"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Charting + News",
          subtitle: "Share your chart picks and latest news updates!"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Master Lists",
          subtitle: "Free Watchlist’s"
        }
      ]
    };
  }
};
</script>