<template>
  <div class="container py-0">
    <div class="row client__header">
      <div class="col-8">Lobby</div>
      <div v-if="playerInGame" class="col-4">Members</div>
    </div>
    <div class="row">
      <div :class="!playerInGame ? 'col-12' : 'col-8'">
        <ChatMessages />
      </div>
      <div v-if="playerInGame" class="col-4 chatMembers__container">
        <ChatMembers class="chatMembers" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ChatComposer />
      </div>
    </div>
  </div>
</template>
<style>
.container {
  color: white;
}
.client__header {
  background-color: black;
}
.chatMembers__container {
  border-right: 1px solid black;
  border-left: 1px solid black;
}
</style>
<script>
import ChatMessages from "~/components/game/chat/ChatMessages";
import ChatMembers from "~/components/game/chat/ChatMembers";
import ChatComposer from "~/components/game/chat/ChatComposer";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    ChatMessages,
    ChatMembers,
    ChatComposer
  },
  computed: {
    ...mapGetters({
      playerInGame: "game/getPlayerInGame"
    })
  },
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame"
    })
  }
};
</script>
