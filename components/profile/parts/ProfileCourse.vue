<template>
  <v-card class="transparent__bg" dark elevation="0">
    <v-container dark>
      <v-row no-gutters>
        <span class="white--text pa-2 d-block subtitle-1">Add new skills with these courses for free</span>
      </v-row>
      <v-list-item v-for="n in 3" :key="n" class="pa-0" @click dense>
        <v-img
          :aspect-ratio="7/3"
          width="10px"
          class="mx-2"
          src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
        ></v-img>

        <v-list-item-content two-line>
          <!-- <v-list-item-title>How to use 5 minutes and 1 hour time frame as EXIT</v-list-item-title> -->
          <v-list-item-headline class="body-2">How to use 5 minutes and 1 hour time frame as EXIT</v-list-item-headline>
          <v-list-item-subtitle>154,150 Views</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-card>
</template>