<template>
  <div class="container py-0 chatClient__wrapper">
    <div class="row client__header">
      <div class="col-8">Lobby</div>
      <div v-if="!playerInGame" class="col-4">Members</div>
    </div>
    <div class="row">
      <div :class="!playerInGame ? 'col-8' : 'col-12'">
        <ChatMessages />
      </div>
      <div v-if="!playerInGame" class="col-4 chatMembers__container">
        <ChatMembers class="chatMembers" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 pa-0">
        <ChatComposer />
      </div>
    </div>
  </div>
</template>
<style>
.container {
  color: white;
}
.chatClient__wrapper {
  border-left: 2px solid #0c1a2b;
}
.client__header {
  background-color: #0c1a2b;
}
.chatMembers__container {
  border-right: 1px solid #0c1a2b;
  border-left: 1px solid #0c1a2b;
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
