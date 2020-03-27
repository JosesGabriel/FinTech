<template>
  <v-list-item>
    <v-btn icon color="success" @click="$emit('showRooms')">
      <v-icon>mdi-reorder-horizontal</v-icon>
    </v-btn>
    <v-list-item-avatar color="grey">
      <v-img :src="currentRoom.avatarUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="pl-2">
      <v-list-item-title class="body-1 font-weight-black">{{
        currentRoom.displayName
      }}</v-list-item-title>
    </v-list-item-content>
    <v-btn icon @click="$emit('hideDock')">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      currentRoom: "vyndue/getCurrentRoom"
    })
  }
};
</script>
