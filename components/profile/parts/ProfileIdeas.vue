<template>
  <v-container class="pa-0" dark>
    <v-card class="transparent__bg pa-3 mb-2" outlined dark>
      <v-row no-gutters>
        <span class="white--text pa-2 d-block subtitle-1">Ideas</span>
        <!-- <v-spacer></v-spacer>
        <v-btn color="success" icon>
          <v-icon small>mdi-pencil</v-icon>
        </v-btn> -->
      </v-row>
      <v-list-item v-for="n in 3" :key="n" class="pa-0" @click dense three-line>
        <v-img
          aspect-ratio="1"
          height="90px"
          class="ma-2"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        ></v-img>
        <v-list-item-content class="pa-3">
          <!-- <v-list-item-title>Three-line item Secondary line text Lorem ipsum dolor sit amet</v-list-item-title> -->
          <v-list-item-subtitle class="white--text font-weight-bold">
            PLDT gets buy offers for
            Ayala building; other assets...
          </v-list-item-subtitle>
          <v-list-item-subtitle>Jan 2 · 2 mins read</v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon small class="pr-1">fa-sign-language</v-icon>1,000 claps
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>