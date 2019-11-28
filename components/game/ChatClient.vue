<template>
  <div class="container py-0 chatClient__wrapper">
    <div class="row client__header">
      <div class="col-8 subtitle-2 py-2" style="color: black">Lobby</div>
    </div>
    <div class="row">
      <div class="col-12 pr-0">
        <ChatMessages />
      </div>
    </div>
    <div class="row">
      <div class="col-12 pa-0">
        <ChatComposer />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  color: white;
}
.chatClient__wrapper {
  border: 2px solid #1de9b6;
}
.client__header {
  background-color: #1de9b6;
}
.chatMembers__container {
  border-right: 1px solid #1de9b6;
  border-left: 1px solid #1de9b6;
}
</style>
<script>
import ChatMessages from "~/components/game/chat/ChatMessages";
import ChatComposer from "~/components/game/chat/ChatComposer";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    ChatMessages,
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
