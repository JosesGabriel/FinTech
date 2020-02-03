<template>
  <v-container class="pa-0" dark>
    <v-card class="transparent__bg pa-3 mb-2" outlined dark>
      <v-row no-gutters>
        <span class="white--text pa-2 d-block body-2">
          Following ·
          <span class="tertiary--text caption">10,000</span>
        </span>
        <!-- <v-spacer></v-spacer> -->
        <!-- <span class="tertiary--text pa-2 caption">See all</span> -->
        <!-- <v-btn color="success" icon>
          <v-icon small>mdi-pencil</v-icon>
        </v-btn> -->
      </v-row>
      <v-row no-gutters>
        <v-col v-for="n in 6" :key="n" class="pa-1" cols="4">
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
          <v-card flat class="d-block success--text caption text-center pa-2 pb-0 pt-1">Alexandra Keuls</v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>