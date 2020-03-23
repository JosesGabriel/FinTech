<template>
  <v-card
    class="transparent__bg"
    elevation="0"
    :dark="lightSwitch == 1 ? true : false"
    color="transparent"
  >
    <v-container
      :dark="lightSwitch == 1 ? true : false"
      class="pr-md-0 pr-lg-0 pl-5"
    >
      <v-row no-gutters class="heading-underline">
        <span
          :class="lightSwitch == 1 ? true : false"
          class="pa-2 pb-1 d-block font-weight-bold subtitle-1"
          >Vyndue Rooms</span
        >
      </v-row>
      <v-divider></v-divider>
      <v-list :dark="lightSwitch == 1 ? true : false" color="transparent">
        <v-list-item v-for="item in items" :key="item.title" class="px-1">
          <v-list-item-avatar class="mr-3" size="35">
            <img src="default.png" />
          </v-list-item-avatar>

          <v-list-item-content class="py-2">
            <v-list-item-title
              class="caption ma-0"
              :class="lightSwitch == 1 ? 'white--text' : 'black--text'"
              v-text="item.title"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="caption"
              v-text="item.subtitle"
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              filled
              color="success"
              x-small
              class="text-capitalize black--text font-weight-bold"
              rounded
              >Join</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
// import { client } from "~/assets/js/vyndue/client.js";

export default {
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    fontColor() {
      return this.lightSwitch == 1 ? "white--text" : "black--text";
    }
  },
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
