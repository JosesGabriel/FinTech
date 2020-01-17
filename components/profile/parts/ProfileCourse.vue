<template>
  <v-card class="transparent__bg" dark elevation="0">
    <v-container dark>
      <v-row no-gutters>
        <span class="white--text pa-2 d-block subtitle-1">Add new skills with these courses</span>
      </v-row>
      <v-list-item v-for="n in 3" :key="n" class="pa-0" @click dense three-line>
        <v-img
          :aspect-ratio="7/3"
          width="10px"
          class="mx-2"
          src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title>Three-line item Secondary line text Lorem ipsum dolor sit amet,</v-list-item-title>
          <v-list-item-subtitle>Secondary line text Lorem ipsum dolor sit amet,</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-card>
</template>