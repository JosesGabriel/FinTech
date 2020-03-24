<template>
  <v-card-actions>
    <v-btn text color="deep-purple accent-4">
      Read
    </v-btn>
    <v-btn text color="deep-purple accent-4">
      Bookmark
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon @click="dockToggle = false">
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </v-card-actions>
</template>
