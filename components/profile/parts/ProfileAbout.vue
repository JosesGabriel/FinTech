<template>
  <v-container class="pa-0" dark>
    <v-card class="transparent__bg pa-3 mb-2" outlined dark>
      <v-row no-gutters>
        <span class="white--text pa-2 d-block subtitle-1">About</span>
        <v-spacer></v-spacer>
        <v-btn color="success" icon><v-icon small>mdi-pencil</v-icon></v-btn>
      </v-row>
      <span
        class="px-2 d-block body-2"
      >She is one of the most followed Instagram personalities with more than 1.4+ million followers.</span>

      <v-row no-gutters>
        <v-col v-for="n in 6" :key="n" class="d-flex child-flex pa-2" cols="2">
          <v-card flat tile class="d-flex">
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="transparent__bg" outlined dark>
      <v-container dark>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle class="mb-3">Manila, Philippines</v-list-item-subtitle>
            <v-list-item-title>Reputation</v-list-item-title>
            <v-list-item-subtitle class="mb-3">10,000</v-list-item-subtitle>
            <v-list-item-title>Ideas Published</v-list-item-title>
            <v-list-item-subtitle class="mb-3">8</v-list-item-subtitle>
            <v-list-item-title>Contact</v-list-item-title>
            <v-list-item-subtitle>
              <v-icon small color="secondary" class="pa-1">mdi-phone</v-icon>(+63) 908 818 4444
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon small color="secondary" class="pa-1">mdi-email-outline</v-icon>mariamalalawi@gg.com
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon small color="secondary" class="pa-1">mdi-facebook</v-icon>https://www.facebook.com/ivanaxalawi/
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon small color="secondary" class="pa-1">mdi-twitter</v-icon>https://twitter.com/ivanaalawi?lang=en
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </v-card>
  </v-container>
</template>