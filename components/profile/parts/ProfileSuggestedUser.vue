<template>
  <v-card class="transparent__bg" dark elevation="0">
    <v-container dark class="pr-md-0 pr-lg-0">
      <v-row no-gutters class="heading-underline">
        <span class="white--text pa-2 d-block font-weight-bold subtitle-1">Suggested Traders</span>
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
            >Follow</v-btn>
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
          title: "Gaven Anselmo",
          subtitle: "2,000 Friends"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Chaz Rosario",
          subtitle: "2,000 Friends"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Morgan Monceda",
          subtitle: "9,999 Friends"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Yance Buenavidez",
          subtitle: "9,999 Friends"
        },
        {
          icon: "mdi-account",
          iconClass: "grey lighten-1 darkchart--text",
          title: "Sangco Katigbak",
          subtitle: "9,999 Friends"
        }
      ]
    };
  }
};
</script>